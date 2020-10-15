import { run } from "./build.js"

module.exports = ctx => {
	let runParams = {
		env: "test"
	}
	run(ctx, runParams)
}
