import * as api from "../services/example";
export default {
	namespace: "preTable",
	state: {
		province: "北京",
		month: 1,
		vehicle: "SUV",
		preTableList: [],
		modelList: [],
		predictionList: {}
	},
	reducers: {
		getPreTableList(state, action) { //本地更新生活随笔列表数据
			return {
				...state,
				preTableList: action.data
			}
		},
		getProvince(state, action) {
			return {
				...state,
				province: action.data
			}
		},
		getMonth(state, action) {
			return {
				...state,
				month: action.data
			}
		},
		getVehicle(state, action) {
			return {
				...state,
				vehicle: action.data
			}
		},
		getModel(state, action) {
			return {
				...state,
				modelList: action.data
			}
		},
		getPrediction(state, action) {
			console.log("你好啊");
			return {
				...state,
				predictionList: action.data
			}
		},
		getChartMonthChange(state, action) {
			console.log("真好呀");
			return {
				...state,
				predictionList: {
					model: "暂无数据",
					bodyType: "暂无数据",
					forecastVolum: "暂无数据",
					regMonth: "暂无数据",
					province: "暂无数据"
				}
			}
		}
	},
	effects: {
		* getPreTableHttp({ //获取生活随笔的列表，向后台的请求
			payload
		}, {
			call,
			put
		}) {
			const result = yield call(api.getPreTable, payload);
			yield put({
				type: "getPreTableList",
				data: result.data
			})
		},
		* getModelHttp({
			payload
		}, {
			call,
			put
		}) {
			const result = yield call(api.getModel);
			yield put({
				type: "getModel",
				data: result.data
			})
		},
		* getPredictionHttp({
			payload
		}, {
			call,
			put
		}) {
			const result = yield call(api.getPrediction, payload);
			console.log(result);
			if (result.data.length == 0) {
				yield put({
					type: "getChartMonthChange"
				})
			} else {
				console.log("我终于见到你了");
				yield put({
					type: "getPrediction",
					data: result.data[0]
				})
			}
		},
		* getChartMonthHttp({
			payload
		}, {
			call,
			put
		}) {
			console.log(payload);
			const result = yield call(api.getChartMonth, payload);
			console.log(result);
		}
	}
}