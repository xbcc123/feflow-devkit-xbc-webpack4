import Vue from "vue"
import Vuex from "vuex"

// 产品
import demo from "./modules/demo"
import global from "./modules/global"

import createLogger from "./plugins/logger"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"

export default new Vuex.Store({
	state: {
		queryVerify: []
	},
	mutations: {
		updataQueryVerify(state, data) {
			state.queryVerify = data
		}
	},
	modules: {
		demo,
		global
	},
	strict: debug,
	plugins: debug ? [createLogger()] : []
})
