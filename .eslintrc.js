module.exports = {
	root: true,
	"env": {
		"browser": true,
		"node": true,
		"es6": true,
		"commonjs": true,
	},
	"parserOptions": {
        "sourceType": "module"
	},
	"ecmaFeatures": {
        "modules": true,
        "spread" : true,
        "restParams" : true
    },
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended'
	],
	// add your custom rules here
	rules: {
		"prettier/prettier": "error",
		// allow async-await
		'generator-star-spacing': 'off',
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	}
}

