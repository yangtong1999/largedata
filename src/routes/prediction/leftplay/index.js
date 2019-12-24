import React, {
	Component
} from 'react';
import style from "./index.css";
import echarts from "echarts";
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
class LeftPlay extends Component {
	componentDidMount() {
		this.props.dispatch({
			type: "preTable/getPreTableHttp",
			payload: {
				province: this.props.province,
				month: parseInt(this.props.month),
				vehicle: this.props.vehicle
			}
		});
	}
	monthSelect(e) {
		this.props.dispatch({
			type: "preTable/getMonth",
			data: parseInt(e.target.value)
		});
		this.props.dispatch({
			type: "preTable/getPreTableHttp",
			payload: {
				province: this.props.province,
				month: parseInt(e.target.value),
				vehicle: this.props.vehicle
			}
		})
	}
	vehicleSelect(e) {
		this.props.dispatch({
			type: "preTable/getVehicle",
			data: parseInt(e.target.value)
		});
		this.props.dispatch({
			type: "preTable/getPreTableHttp",
			payload: {
				province: this.props.province,
				month: this.props.month,
				vehicle: e.target.value
			}
		})
	}
	render() {
		const {
			preTableList
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
		for (let i = 0; i < preTableList.length; i++) {
			data.push({
				key: i,
				vehicle: preTableList[i].model,
				sale: preTableList[i].forecastVolum
			});
		}
		const listValue = [];
		for (let i = 0; i < 4; i++) {
			listValue[i] = i + 1;
		}
		const vehicleList = ["MPV", "Sedan", "SUV", "Hatchback"];
		return (
			<div className = {style.leftplayWrapper}>
                <div className = {style.titleWrapper}>
                   <select className = {style.select} onChange = {this.monthSelect.bind(this)}  style={{ width: 150 }}>
					    {
								listValue.map((item)=>{
									return(
		                              <option key = {item} value ={item}>{item}月</option>
									)
								})
							}
					</select>
					<select className = {style.select} onChange = {this.vehicleSelect.bind(this)}  style={{ width: 150 }}>
					    {
								vehicleList.map((item,index)=>{
									return(
		                              <option key = {item}value ={item}>{item}</option>
									)
								})
							}
					</select>
                </div>
                <Table className = {style.table} columns={columns} dataSource={data} pagination={{ pageSize: 10}} scroll={{ y: 270 }} />
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		province: state.preTable.province,
		month: state.preTable.month,
		vehicle: state.preTable.vehicle,
		preTableList: state.preTable.preTableList
	}
}
export default connect(mapStateToProps)(LeftPlay);