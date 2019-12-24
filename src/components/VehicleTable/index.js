import React, {
	Component
} from 'react';
import echarts from "echarts";
import style from "./index.css";
import {
	connect
} from "dva";
import {
	Select,
	Table
} from 'antd';
const {
	Option
} = Select;
class VehicleTable extends Component {
	componentDidMount() {
		this.props.dispatch({
			type: "chinaMap/getProvinceHttp",
			payload: {
				province: this.props.province,
				month: parseInt(this.props.month),
				year: parseInt(this.props.year),
				vehicle: this.props.vehicle
			}
		})
	}
	yearChange(e) {
		this.props.dispatch({
			type: "chinaMap/getYear",
			data: parseInt(e)
		});
		this.props.dispatch({
			type: "chinaMap/getProvinceHttp",
			payload: {
				province: this.props.province,
				month: parseInt(this.props.month),
				year: parseInt(e),
				vehicle: this.props.vehicle
			}
		})
	}
	monthChange(e) {
		this.props.dispatch({
			type: "chinaMap/getMonth",
			data: parseInt(e)
		});
		this.props.dispatch({
			type: "chinaMap/getProvinceHttp",
			payload: {
				province: this.props.province,
				month: parseInt(e),
				year: parseInt(this.props.year),
				vehicle: this.props.vehicle
			}
		})
	}
	vehicleChange(e) {
		this.props.dispatch({
			type: "chinaMap/getVehicle",
			data: e
		});
		console.log(this.props.province);
		this.props.dispatch({
			type: "chinaMap/getProvinceHttp",
			payload: {
				province: this.props.province,
				month: parseInt(this.props.month),
				year: parseInt(this.props.year),
				vehicle: e
			}
		})
	}
	render() {
		const {
			vehicleList
		} = this.props;
		const columns = [{
			title: '车型',
			dataIndex: 'vehicle',
			width: 220,
		}, {
			title: '销量',
			dataIndex: 'sale',
			width: 220,
		}];

		const data = [];
		for (let i = 0; i < vehicleList.length; i++) {
			data.push({
				key: i,
				vehicle: vehicleList[i].model,
				sale: vehicleList[i].salesVolume
			});
		};
		const listValue = [];
		for (let i = 0; i < 12; i++) {
			listValue[i] = i + 1;
		}
		const vehicleBody = ["MPV", "Sedan", "SUV", "Hatchback"];
		return (
			<div className = {style.vehicleWrapper}>
                <Select defaultValue="2016"  className = {style.selectInput1} style={{ width: 100}} onChange = {this.yearChange.bind(this)}>
			      <Option className = {style.optionInput} value="2016">2016</Option>
			      <Option className = {style.optionInput} value ="2017">2017</Option>
			    </Select>
			    <Select defaultValue="1月" className = {style.selectInput1} style={{ width: 100 }} onChange = {this.monthChange.bind(this)}>
			    {
						listValue.map((item)=>{
							return(
                              <Option key = {item} className = {style.optionInput} value ={item} >{item}月</Option>
							)
						})
					}
			    </Select>
			    <Select defaultValue="SUV" className = {style.selectInput1} style={{ width: 100 }} onChange = {this.vehicleChange.bind(this)}>
					    {
								vehicleBody.map((item,index)=>{
									return(
		                              <Option key = {item}value ={item}>{item}</Option>
									)
								})
							}
					</Select>
			    <Table className = {style.table} columns={columns} dataSource={data} pagination={{ pageSize: 10}} scroll={{ y: 400 }} />
			</div>
		)
	}
}
const mapStateToprops = (state) => {
	return {
		vehicle: state.chinaMap.vehicle,
		province: state.chinaMap.province,
		year: state.chinaMap.year,
		month: state.chinaMap.month,
		vehicleList: state.chinaMap.vehicleList
	}
}
export default connect(mapStateToprops)(VehicleTable);