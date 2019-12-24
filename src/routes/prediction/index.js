import React, {
	Component
} from 'react';
import style from "./index.css";
import echarts from "echarts";
import "jquery";
import {
	mapJson,
	geoCoordMap
} from "../../config/china.js";
import Home from "../home";
import LeftPlay from "./leftplay";
import RightFooter from "./rightFooter";
import LeftFooter from "./leftFooter";
import Search from "./search";
import Carousels from "./carousel";
import ChinaMap from "../../components/ChinaMap";
class Prediction extends Component {
	render() {
		return (
			<div className = {style.predictionWrapper}>
			<span className = {style.title}>乘用车细分市场销量预测分析平台</span>
			<div className = {style.mapWrapper}>
			  <LeftPlay/>
			  <ChinaMap width = "500px"/>
			  <div>
			  	 <div className = {style.rightPlay1}>
                    <Search/>
			  	 </div>
			  	 <div className = {style.rightPlay2}>
                    <Carousels/>
			  	 </div>
			  </div>
			</div>
			<div className = {style.footer}>
			<RightFooter/>
			  <LeftFooter/>
			</div>
			</div>
		)
	}
}
export default Prediction;