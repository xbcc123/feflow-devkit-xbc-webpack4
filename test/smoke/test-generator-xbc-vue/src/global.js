// 全局文件放少量全局方法，用@/global调用

import http from "@/api/http.tsx"
import storage from "@/api/storage.tsx"
import api from "@/api/api.tsx"
import validate from "@/utils/validate"
import utils from "@/utils/utils"
import mockjs from "mockjs"

class App {
	constructor() {
		this.$storage = storage
		this.$http = http
		this.$api = api
		this.$v = validate
		this.$u = utils
		this.$m = mockjs
	}
}

const app = new App()
export default app
