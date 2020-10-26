import axios from "axios";
import { message } from "antd";
import app from "@/app";
import qs from "qs";

// 配置axios
let instance = axios.create({
	// baseURL: process.env.API_HOST
	baseURL: 'https://zchd.ezdiamond.cn'
	// timeout: 5000
});

// 禁止多次返回首页
let ISBACKHOME = true

// 请求拦截器
instance.interceptors.request.use(
	config => {
		config.headers.token = app.$storage.get("token");
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// 返回拦截器
instance.interceptors.response.use(
	response => {
		if (!response.status === 200) {
			// 请求失败
			message.error("服务器繁忙，请重试");
		}
		if(response.data.code === 200 ) {
		}else if (response.data.code === 203 ) {
			if(ISBACKHOME) {
				ISBACKHOME = false
				console.log(222, ISBACKHOME)
				message.error(response.data.msg);
				window.location.href = `${window.location.pathname}#/login`;
				setTimeout(() => {
					ISBACKHOME = true
				}, 2000)
			}
		} else {
			message.error(response.data.msg);
		}
		return response;
	},
	error => {
		message.error("服务器繁忙，请重试");
		return Promise.reject(error);
	}
);

export default {
	/**
	 * GET请求
	 *
	 * @param {*} url 请求地址
	 * @param {*} param 请求参数
	 */
	get(url, params) {
		if (!url) {
			return;
		}
		return new Promise((resolve, reject) => {
			instance.get(url, { params }).then(response => {
				const {
					data: { code }
				} = response;
				if (code === 200) {
					resolve(response);
				} else {
					reject(response);
				}
			});
		});
	},

	/**
	 * POST请求
	 *
	 * @param {*} url 请求地址
	 * @param {*} params 请求参数
	 */
	post(url, params) {
		if (!url) {
			return;
		}
		const config = {
			headers: {
				"Content-type": "application/x-www-form-urlencoded"
			}
		};
		return new Promise((resolve, reject) => {
			instance.post(url, qs.stringify(params), config).then(response => {
				const {
					data: { code }
				} = response;
				if (code === 200) {
					resolve(response);
				} else {
					reject(response);
				}
			});
		});
	},
	/**
	 * POST请求
	 *
	 * @param {*} url 请求地址
	 * @param {*} params 请求参数
	 */
	postJson(url, params) {
		if (!url) {
			return;
		}
		return new Promise((resolve, reject) => {
			instance.post(url, params).then(response => {
				const {
					data: { code }
				} = response;
				if (code === 200) {
					resolve(response);
				} else {
					reject(response);
				}
			});
		});
	},

	/**
	 * 文件上传
	 *
	 * @param {*} url 地址
	 * @param {*} formData 表单数据
	 */
	upload(url, formData) {
		if (!url) {
			return;
		}
		return new Promise((resolve, reject) => {
			instance
				.post(url, formData, {
					headers: {
						"Content-Type": "multiple/form-data"
					}
				})
				.then(response => {
					const {
						data: { code }
					} = response;
					if (code === 200) {
						resolve(response);
					} else {
						reject(response);
					}
				});
		});
	}
};
