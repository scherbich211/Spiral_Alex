module.exports = {
	// run tsc on changes to TypeScript files
	'*.ts?(x)': () => 'tsc -p tsconfig.app.json --noEmit',
	'*.{css,scss,less}': ['stylelint --fix --cache', 'prettier --write'],
	'*.{js,ts,json}': ['eslint --fix --cache', 'prettier --write'],
	'*.{html}': ['prettier --write'],
};
