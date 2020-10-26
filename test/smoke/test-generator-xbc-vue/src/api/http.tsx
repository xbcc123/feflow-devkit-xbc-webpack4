/* eslint-disable */
import axios from "axios"
import qs from "qs"
import utils from "@/utils/utils"
import { Message } from "element-ui"
import router from "@/router/index"

// 配置axios
let instance = axios.create({
	// eslint-disable-next-line no-undef
	baseURL: process.env.API_HOST
})

// 请求拦截器
instance.interceptors.request.use(
	config => {
		config.headers.clientType = "OMS_WEB"
		config.headers.accessToken = utils.encrypt(
			`${new Date().getTime()},${localStorage.accessToken}`
		)
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// 返回拦截器
instance.interceptors.response.use(
	response => {
		new InterceptorsStatus(response)
		new InterceptorsCode(response)
		return response
	},
	error => {
		new InterceptorsStatus(error.response)
		return Promise.reject(error)
	}
)

// 老板本逻辑根据res.data.code判断不同的状态
class InterceptorsCode {
	code: any
	msg: any
	codeMap: Map<any, any>
	constructor(response) {
		// 如果data code 不存在默认加上code 为了兼容新版本逻辑
		response.data = response.data || {}
		this.code = response.data.code || 200
		this.msg = response.data.msg || ""
		this.codeMap = new Map()
			.set(200, "requestSuccess")
			.set(203, "noLogin")
			.set(206, "noLogin")
		if (this.codeMap.has(this.code)) {
			this[this.codeMap.get(this.code)]()
		} else {
			this.serverError(this.msg)
		}
	}

	// 业务完成
	requestSuccess() {
	}

	// 未登录
	noLogin() {
		setTimeout(() => {
			router.push("/login")
		}, 100)
	}

	// 服务器接口主动报错,一般为业务错误
	serverError(msg) {
		Message.error(msg)
	}
}

// 改版后的拦截规则 全部逻辑根据http状态码判断
// 说明详细地址 http://192.168.16.20/dev-document/dev-doc/blob/master/docs/HTTP%E7%8A%B6%E6%80%81%E7%A0%81%E8%AF%B4%E6%98%8E.md
class InterceptorsStatus {
	info: any
	statusMap: Map<any, any>
	constructor(options) {
		const status = options.status
		this.info = options
		this.statusMap = new Map()
			.set(200, "requestSuccess")
			.set(401, "noPermissions")
			.set(403, "noLogin")
			.set(404, "interfaceNotFound")
			.set(405, "functionError")
			.set(406, "paramsError")
			.set(500, "serverError")
		if (this.statusMap.has(status)) {
			this[this.statusMap.get(status)]()
		}
	}

	// 业务完成
	requestSuccess() {
		// console.log("接口调用成功");
	}

	// 无权限
	noPermissions() {
		Message.error("接口无权限")
	}

	// 未登录
	noLogin() {
		setTimeout(() => {
			router.push("/login")
		}, 100)
	}

	// 接口不存在
	interfaceNotFound() {
		Message.error("接口不存在")
	}

	// 请求方式错误
	functionError() {
		Message.error("请求方式错误")
	}

	// 参数错误
	paramsError() {
		Message.error(this.info.data)
	}

	// 服务器错误
	serverError() {
		Message.error("服务器错误")
	}
}

export default {
	// axios实例
	instance,

	/**
	 * GET请求
	 *
	 * @param {*} url 请求地址
	 * @param {*} param 请求参数
	 */
	get(url, params) {
		if (!url) {
			return
		}
		return new Promise((resolve, reject) => {
			instance.get(url, { params }).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},

	/**
	 * POST请求
	 *
	 * @param {*} url 请求地址
	 * @param {*} params 请求参数
	 */
	post(url, params) {
		if (!url) {
			return
		}
		const config = {
			headers: {
				"Content-type": "application/x-www-form-urlencoded"
			}
		}
		return new Promise((resolve, reject) => {
			instance.post(url, qs.stringify(params), config).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},

	/**
	 * POST请求
	 *
	 * @param {*} url 请求地址
	 * @param {*} params 请求参数
	 */
	postJson(url, params) {
		if (!url) {
			return
		}
		return new Promise((resolve, reject) => {
			instance.post(url, params).then(response => {
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},

	/**
	 * 文件上传
	 *
	 * @param {*} url 地址
	 * @param {*} formData 表单数据
	 */
	upload(url, formData) {
		if (!url) {
			return
		}
		return new Promise((resolve, reject) => {
			instance
				.post(url, formData, {
					headers: {
						"Content-Type": "multiple/form-data"
					}
				})
				.then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
		})
	}
}
