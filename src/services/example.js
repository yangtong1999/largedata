import request from '../utils/request';

export function query() {
	return request('/api/users');
}
export function getModel() {
	return request('http://127.0.0.1:4000/getModel');
}
export function getProvince(data) {
	return request('http://127.0.0.1:4000/getProvince', {
		method: "post",
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify({
			"month": data.month,
			"year": data.year,
			"province": data.province,
			"vehicle": data.vehicle
		})
	});
}
export function getPreTable(data) {
	return request('http://127.0.0.1:4000/getPreTable', {
		method: "post",
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify({
			"month": data.month,
			"province": data.province,
			"vehicle": data.vehicle
		})
	});
}
export function getPrediction(data) {
	return request('http://127.0.0.1:4000/getPrediction', {
		method: "post",
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify({
			"month": data.month,
			"vehicle": data.vehicle,
			"model": data.model,
			"province": data.province
		})
	});
}
export function getChartMonth(data) {
	return request('http://127.0.0.1:4000/getChartMonth', {
		method: "post",
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify({
			"vehicle": data.vehicle,
			"model": data.model,
			"province": data.province
		})
	});
}