import React, {
	Component
} from 'react';
import style from "./index.css";
import echarts from "echarts";
import {
	Select,
	Button,
	Carousel
} from 'antd';
const {
	Option
} = Select;
class LeftFooter extends Component {
	componentDidMount() {
		this.initMapDidMount();
	}
	initMapDidMount() {
		var mapChart = echarts.init(document.getElementById('echarts1'));
		var xAxisData = [];
		var data1 = [];
		for (var i = 0; i < 100; i++) {
			xAxisData.push('类目' + i);
			data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
		}
		const option = {
			color: ["white"],
			legend: {
				data: ['bar'],
				align: 'left'
			},
			tooltip: {},
			xAxis: {
				data: xAxisData,
				silent: false,
				splitLine: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'white'
					}
				},
				axisLabel: {
					show: true,
					textStyle: {
						color: "white"
					}
				}
			},
			yAxis: {
				axisLine: {
					lineStyle: {
						color: 'white'
					}
				},
				axisLabel: {
					show: true,
					textStyle: {
						color: "white"
					}
				}
			},
			series: [{
				name: 'bar',
				type: 'bar',
				data: data1,
				animationDelay: function(idx) {
					return idx * 10;
				}
			}],
			animationEasing: 'elasticOut',
			animationDelayUpdate: function(idx) {
				return idx * 5;
			}
		};
		mapChart.setOption(option, true);
	}
	render() {
		const listValue = [];
		for (let i = 0; i < 4; i++) {
			listValue[i] = i + 1;
		}
		const vehicleList = ["MPV", "Sedan", "SUV", "Hatchback"];
		return (
			<div className = {style.leftFooter}>
               <div className = {style.titleWrapper}>
                   <Select className = {style.select} defaultValue="点击选择月份"  style={{ width: 150 }}>
					    {
								listValue.map((item)=>{
									return(
		                              <Option key = {item} value ={item}>{item}月</Option>
									)
								})
							}
					</Select>
					<Select className = {style.select} defaultValue="点击选择车身类型"  style={{ width: 150 }}>
					    {
								vehicleList.map((item,index)=>{
									return(
		                              <Option key = {item}value ={item}>{item}</Option>
									)
								})
							}
					</Select>
                </div>
			<div id="echarts1" className  = {style.echarts1} style={{width:"100%",height: '100%',mergeLeft:"0px"}} />
			</div>
		)
	}
}
export default LeftFooter;