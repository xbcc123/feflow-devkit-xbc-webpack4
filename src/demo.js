import { run } from "./build.js"

module.exports = ctx => {
	let runParams = {
		env: "demo"
	}
	run(ctx, runParams)
}
