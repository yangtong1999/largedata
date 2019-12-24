import React, {
	Component
} from 'react';
import style from "./index.css";
import {
	connect
} from "dva";
import {
	Select,
	Button,
	Carousel,
	Modal
} from 'antd';
const {
	Option
} = Select;
class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			month: null,
			vehicle: "",
			model: "",
			province: props.province,
			visible: false
		}
	}
	componentDidMount() {
		this.props.dispatch({
			type: "preTable/getModelHttp"
		})
	}
	handlePre() {
		this.setState({
			province: this.props.province
		});
		if (this.state.month == null || this.state.vehicle == "" || this.state.model == "") {
			alert("请选择月份，车身类型以及车型");
		} else {
			this.props.dispatch({
				type: "preTable/getPredictionHttp",
				payload: this.state
			});
			this.setState({
				visible: true
			});
		}
	}

	handleOk = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	handleCancel = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};
	render() {
		console.log(this.state);
		const listValue = [];
		for (let i = 0; i < 4; i++) {
			listValue[i] = i + 1;
		}
		const vehicleList = ["MPV", "Sedan", "SUV", "Hatchback"];
		const {
			modelList,
			predictionList
		} = this.props;
		return (
			<div>
			<div className  = {style.SearchWrapper}>
			    <Select className = {style.select} onChange = {(e)=>this.setState({month:parseInt(e)})} defaultValue="点击选择月份" style={{ width: 180 }}>
			    {
						listValue.map((item)=>{
							return(
                              <Option key = {item} value ={item}>{item}月</Option>
							)
						})
					}
			    </Select>
			    <Select className = {style.select} onChange = {(e)=>this.setState({vehicle:e})} defaultValue="点击选择车身类型" style={{ width: 180 }}>
			    {
								vehicleList.map((item,index)=>{
									return(
		                              <Option key = {item} value ={item}>{item}</Option>
									)
								})
							}
			    </Select>
			     <Select className = {style.select} onChange = {(e)=>this.setState({model:e})} defaultValue="点击选择车型" style={{ width: 180 }}>
			    {
								modelList.map((item,index)=>{
									return(
		                              <Option key = {item} value ={item}>{item}</Option>
									)
								})
							}
			    </Select>
			    <Button className = {style.select} style={{ width: 180 }} type="primary" onClick = {this.handlePre.bind(this)}>点击预测</Button>
			    <Modal
				      title="预测结果为"
				      visible={this.state.visible}
				      onOk={this.handleOk}
				      onCancel={this.handleCancel}
				    >
				    <div>
				     <span>省份:{predictionList.province}模型:{predictionList.model} 车身类型:{predictionList.bodyType} 月份:{predictionList.regMonth}</span>
				     <br/>
				     <span><b>销量:{predictionList.forecastVolum}</b></span>
				     <p>如果想选取其他城市/省份，请点击左边的地图进行选择</p>
				     </div>
				    </Modal>
			    </div>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		month: state.preTable.month,
		modelList: state.preTable.modelList,
		province: state.preTable.province,
		predictionList: state.preTable.predictionList
	}
}
export default connect(mapStateToProps)(Search);