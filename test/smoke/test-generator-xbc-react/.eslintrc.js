module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 6,
		sourceType: "module"
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:prettier/recommended"
	],
	// required to lint *.vue files
	plugins: ["react"],
	// add your custom rules here
	rules: {
		"prettier/prettier": "error",
		// allow async-await
		"generator-star-spacing": "off",
		// allow debugger during development
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error"
	}
};
