import { run } from "./build.js"

module.exports = ctx => {
	let runParams = {
		env: "build"
	}
	run(ctx, runParams)
}
