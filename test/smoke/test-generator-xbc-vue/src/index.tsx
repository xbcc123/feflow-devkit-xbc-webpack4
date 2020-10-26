import Vue from "vue"
import App from "./App.vue"

import router from "./router"
import store from "./store"
import "./services"


const isDebug_mode = process.env.NODE_ENV !== "production"
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

new Vue({
	el: "#app",
	data: {
		eventHub: new Vue()
	},
	router,
	store,
	components: {
		App
	},
	template: "<App/>"
})
