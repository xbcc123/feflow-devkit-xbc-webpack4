/* eslint-disable no-undef */
<template>
	<section class="ml30 pt30">
		<h1 class="f30">
			Hello World!!!
		</h1>
		<h1 class="f20 c9 mt10">
			项目类型: Vue
		</h1>
		<h1 class="f20 c9 mt10">
			应用场景: 后台管理
		</h1>
		<h1 class="f20 c9 mt10">
			UI框架: element
		</h1>
		<h1 class="f20 c9 mt10">
			状态管理: Vuex
		</h1>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator"

@Component({
	components: {}
})
export default class Index extends Vue {
	@Prop() readonly propsA!: object

	@Emit()
	test(val) {
		return val
	}

	list: Array<object> = []
	name: string = ""
	number: number = 0
	status: boolean = false

	created() {
		// pont演示
		// let paramsNew: API.post.testCreateUser.Params = {
		// 	gender: "",
		// 	platformList: [],
		// 	username: ""
		// }
		// API.post.testCreateUser.request(paramsNew).then(res => {
		// 	console.log()
		// })
	}
}
</script>

<style scoped lang="scss"></style>
