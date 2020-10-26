import http from "./http"
import "../services"

class Api {
	http: any
	constructor() {
		this.http = http
	}

	//上传图片
	uploadImg(params) {
		return this.http.upload("/m/pub/uploadImg", params)
	}

	//获取用户基本信息
	myinfo() {
		return this.http.get("/account/myinfo")
	}

	//修改用户信息
	updateInfo(params) {
		return this.http.post("/account/updateInfo", params)
	}

	//获取自营系统列表
	getAddressableApp(params) {
		return this.http.get("/sso/getAddressableApp", params)
	}

	// 获取新的token
	getRedirectionUrl(params) {
		return this.http.get("/sso/getRedirectionUrl", params)
	}

	//退出登录
	logout(params) {
		return this.http.get("/account/logout", params)
	}

	//菜单数据读取
	queryVerify() {
		return this.http.get("/sso/myAuthVals")
	}

	//微信二维码扫码
	getQrcode() {
		return this.http.get("/wx/getQrcode")
	}

	//登录
	login(params) {
		return this.http.postJson("/account/login", params)
	}
}

export default new Api()
