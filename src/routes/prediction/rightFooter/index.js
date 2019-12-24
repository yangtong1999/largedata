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
import {
	connect
} from "dva";
const {
	Option
} = Select;
class RightFooter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vehicle: "",
			model: "",
			province: props.province
		}
	}
	componentDidMount() {
		this.initMapDidMount();
	}
	initMapDidMount() {
		var mapChart = echarts.init(document.getElementById('echarts2'));
		const option = {
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				axisTick: {
					alignWithLabel: true
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
			}],
			yAxis: [{
				type: 'value',
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
			}],
			series: [{
				name: '直接访问',
				type: 'bar',
				barWidth: '60%',
				data: [10, 52, 200, 334, 390, 330, 220]
			}]
		};

		mapChart.setOption(option, true);
	}
	handleChange() {
		if (this.state.vehicle == "" || this.state.model == "") {
			alert("请选择:车身类型以及车型");
		} else {
			this.props.dispatch({
				type: "preTable/getChartMonthHttp",
				payload: this.state
			});
		}
	}
	render() {
		const {
			modelList
		} = this.props;
		const vehicleList = ["MPV", "Sedan", "SUV", "Hatchback"];
		return (
			<div className = {style.rightFooter}>
               <div className = {style.titleWrapper}>
                   <Select className = {style.select} onChange = {(e)=>this.setState({model:e})} defaultValue="点击选择车型"  style={{ width: 150 }}>
					    {
								modelList.map((item)=>{
									return(
		                              <Option key = {item} value ={item}>{item}</Option>
									)
								})
						}
					</Select>
					<Select className = {style.select} onChange = {(e)=>this.setState({vehicle:e})} defaultValue="点击选择车身类型"  style={{ width: 150 }}>
					    {
								vehicleList.map((item,index)=>{
									return(
		                              <Option key = {item}value ={item}>{item}</Option>
									)
								})
							}
					</Select>
					<Button type = "primary" className = {style.select} onClick = {this.handleChange.bind(this)}>点击切换图表内容</Button>
                </div>
			<div id="echarts2" className = {style.echarts2} style={{width:"90%",height: '80%',mergeLeft:"0px"}} />
			</div>
		)
	}
}
const mapStateToprops = (state) => {
	return {
		province: state.preTable.province,
		modelList: state.preTable.modelList
	}
}
export default connect(mapStateToprops)(RightFooter);