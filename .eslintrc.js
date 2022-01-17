module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: [
		'eslint:recommended',
		'airbnb',
		'prettier',
		'@react-native-community',
		'plugin:@typescript-eslint/recommended',
	],
	plugins: ['json', 'prettier', 'import', '@typescript-eslint', 'unused-imports'],
	rules: {
		'react-hooks/exhaustive-deps': 'off',
		'prettier/prettier': [
			'error',
			{
				// endOfLine: 'auto',
			},
		],
		'no-param-reassign': ['error', {props: false}],
		indent: ['off', 2],
		'linebreak-style': ['error', 'unix'],
		'@typescript-eslint/no-explicit-any': [
			'error',
			{
				fixToUnknown: true,
				ignoreRestArgs: false,
			},
		],
		'import/prefer-default-export': 'off',
		'react-native/no-inline-styles': 'error',
		'@typescript-eslint/no-use-before-define': 'off',
		'import/extensions': ['error', {ignorePackages: true, js: 'never', jsx: 'never', ts: 'never', tsx: 'never'}],
		'react/jsx-filename-extension': ['error', {extensions: ['.tsx']}],
		'react/destructuring-assignment': 0,
		// "react/jsx-max-props-per-line": [1, { maximum: 1 }], //it doesn't work with prettier, you can remove prettier from rules: 'prettier/prettier'...
		// "react/jsx-first-prop-new-line": [1, "multiline"], //it doesn't work with prettier, you can remove prettier from rules: 'prettier/prettier'...
		'react/prop-types': 0,
		'react/prefer-stateless-function': 0,
		'react/react-in-jsx-scope': 0,
		'react/jsx-props-no-spreading': 0,
		'react/jsx-curly-newline': 0, // it conflicts with prettier
		'react/jsx-wrap-multilines': ['error', {arrow: true, return: true, declaration: true}],
		'require-await': 'error',
		'spaced-comment': ['error', 'always'],
		'unused-imports/no-unused-imports': 'error',
		'no-underscore-dangle': 0,
		'no-unused-expressions': ['error', {allowShortCircuit: true}],
		'no-plusplus': 0,
		'class-methods-use-this': 0,
		'@typescript-eslint/no-unused-vars': 'error',
		'max-len': [
			'warn',
			{
				code: 120,
				tabWidth: 2,
				comments: 1000,
				ignoreComments: true,
				ignoreTrailingComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
			},
		],
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/require-default-props': [0, {forbidDefaultForRequired: true, ignoreFunctionalComponents: true}],
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
				project: ['./tsconfig.json'],
			},
		},
	},
};
