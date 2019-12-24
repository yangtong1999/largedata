import React, {
	Component
} from 'react';
import echarts from "echarts";
import {
	Icon,
	Button
} from "antd";
import {
	Link
} from "react-router-dom";
import ChinaMap from "../../components/ChinaMap";
import VehicleTable from "../../components/VehicleTable";
import style from "./index.css";
class Home extends Component {
	selectProvince(e) {
		console.log(e);
	}
	render() {
		return (
			<div className = {style.backgroundImg}>
			<span className = {style.title}>乘用车细分市场销量预测分析平台</span>
			<span className ={style.option}>*默认省份为北京，默认月份为1月，默认车身类型为SUV</span>
            <Button className = {style.predictionButton} icon = "area-chart"><Link to = "/prediction">预测分析</Link></Button>
			<div className = {style.Wrapper}>
		      <ChinaMap width = "900px"/>
		     <VehicleTable className ={style.vehicleTable}></VehicleTable>
		     </div>
			</div>
		)
	}
}
export default Home;