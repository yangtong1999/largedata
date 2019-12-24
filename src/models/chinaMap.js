import * as api from "../services/example";
export default {
	namespace: "chinaMap",
	state: {
		province: "北京",
		month: 1,
		year: 2016,
		vehicle: "SUV",
		vehicleList: []
	},
	reducers: {
		getProvince(state, action) { //本地更新生活随笔列表数据
			return {
				...state,
				province: action.data
			}
		},
		getYear(state, action) {
			return {
				...state,
				year: action.data
			}
		},
		getMonth(state, action) {
			return {
				...state,
				month: action.data
			}
		},
		getVehivle(state, action) {
			return {
				...state,
				vehicle: action.data
			}
		},
		getvehicleList(state, action) {
			return {
				...state,
				vehicleList: action.data
			}
		}
	},
	effects: {
		* getProvinceHttp({ //获取生活随笔的列表，向后台的请求
			payload
		}, {
			call,
			put
		}) {
			const result = yield call(api.getProvince, payload);
			yield put({
				type: "getvehicleList",
				data: result.data
			})
		}
	}
}