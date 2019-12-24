import React, {
	Component
} from 'react';
import echarts from "echarts";
import "jquery";
import {
	mapJson,
	geoCoordMap
} from "../../config/china.js";
import {
	connect
} from "dva";
import chinaData from "../../config/chinadata.js";
class ChinaMap extends Component {
	componentDidMount() {
		this.initMapDidMount();
	}
	initMapDidMount() {
		const that = this;
		const {
			month,
			year,
			vehicle
		} = that.props;
		console.log(month);
		echarts.registerMap('china', mapJson); // 注册地图
		var mapChart = echarts.init(document.getElementById('map'));
		const option = {
			backgroundColor: 'rgba(255, 255, 255, 0)',
			tooltip: {
				trigger: 'item'
			},
			series: [{
				name: "当前数据",
				type: 'map',
				mapType: 'china',
				mapLocation: {
					x: 'left'
				},
				zoom: 1.25,
				itemStyle: {
					normal: { //未选中的样式
						areaColor: "rgba(255, 255, 255, 0)",
						label: {
							show: true,
							color: 'white'
						},
						borderWidth: 0.8,
						borderColor: "#81F7F3"
					},
					emphasis: { //选中的样式设置
						areaColor: "#21F7F7",
						borderColor: "white"
					}
				},
				data: chinaData,
			}, ],
			animation: true,
		};
		mapChart.setOption(option, true);

		var total = 31;
		var index = 1; //播放所在下标
		var index1 = 0;

		function Play() {
			var curr = index % total;
			mapChart.dispatchAction({
				type: 'showTip',
				seriesIndex: 0,
				dataIndex: curr
			});
			mapChart.dispatchAction({
				type: 'mapSelect',
				seriesIndex: 0,
				dataIndex: curr
			});
			index++;
			if (index > 31) {
				index = 1;
			}
			var curr1 = index1 % total;
			mapChart.dispatchAction({
				type: 'mapUnSelect',
				seriesIndex: 0,
				dataIndex: curr1
			});
			index1++;
		}
		var mTime = setInterval(Play, 1000);
		mapChart.on("click", function(e) {
			clearInterval(mTime);
			console.log(month);
			that.props.dispatch({
				type: "chinaMap/getProvince",
				data: e.name
			})
			that.props.dispatch({
				type: "chinaMap/getProvinceHttp",
				payload: {
					province: e.name,
					month: month,
					year: year,
					vehicle: vehicle
				}
			})
			that.props.dispatch({
				type: "preTable/getProvince",
				data: e.name
			})
			that.props.dispatch({
				type: "preTable/getPreTableHttp",
				payload: {
					province: e.name,
					month: month,
					vehicle: vehicle
				}
			})
			mapChart.dispatchAction({
				type: 'mapSelect'
			});
			mapChart.dispatchAction({
				type: 'showTip'
			});
			mapChart.dispatchAction({
				type: 'highlight',
				dataIndex: e.dataIndex
			});
		});
	}
	render() {
		const {
			width
		} = this.props;
		return (
			<div id="map" style={{width:width,height: '100%',mergeLeft:"0px"}} />
		)
	}
}
const mapStateToprops = (state) => {
	return {
		month: state.chinaMap.month,
		year: state.chinaMap.year,
		vehicle: state.chinaMap.vehicle
	}
}
export default connect(mapStateToprops)(ChinaMap);