module.exports = {
	root: true,
	parserOptions: {
		// 解析器选项
		parser: "@typescript-eslint/parser" // 一个对Babel解析器的包装，使其能够与 ESLint 兼容
	},
	extends: [
		"eslint:recommended",
		"plugin:vue/recommended",
		"plugin:prettier/recommended"
	],
	// required to lint *.vue files
	plugins: ["vue"],
	// add your custom rules here
	rules: {
		"prettier/prettier": "error",
		// allow async-await
		"generator-star-spacing": "off",
		// allow debugger during development
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		// https://eslint.vuejs.org/rules/html-indent.html
		"vue/html-indent": 0,
		// https://eslint.vuejs.org/rules/max-attributes-per-line.html
		"vue/max-attributes-per-line": 0,
		// https://eslint.vuejs.org/rules/html-self-closing.html
		"vue/html-self-closing": 0,
		// https://eslint.vuejs.org/rules/script-indent.html#options
		// "vue/script-indent": ["error", 'tab'],
		// https://eslint.vuejs.org/rules/html-closing-bracket-newline.html
		"vue/html-closing-bracket-newline": 0,
		// https://eslint.vuejs.org/rules/component-tags-order.html
		"vue/component-tags-order": 0
	}
}
