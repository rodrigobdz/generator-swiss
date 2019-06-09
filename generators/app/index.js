'use strict';
const humanizeUrl = require('humanize-url');
const Generator = require('yeoman-generator');
const _s = require('underscore.string');
const utils = require('../utils');

module.exports = class extends Generator {
	constructor(...args) {
		super(...args);

		this.option('cli', {
			type: Boolean,
			description: 'Add a CLI'
		});

		this.option('coverage', {
			type: Boolean,
			description: 'Add code coverage with nyc'
		});

		this.option('codecov', {
			type: Boolean,
			description: 'Upload coverage to codecov.io (implies coverage)'
		});
	}

	async prompting() {
		const props = await this.prompt([
			utils.moduleName(this.appname),
			utils.description,
			utils.githubUsername,
			utils.website,
			{
				name: 'cli',
				message: 'Do you need a CLI?',
				type: 'confirm',
				default: Boolean(this.options.cli),
				when: () => this.options.cli === undefined
			},
			{
				name: 'nyc',
				message: 'Do you need code coverage?',
				type: 'confirm',
				default: Boolean(this.options.codecov || this.options.coverage),
				when: () => (this.options.coverage === undefined) && (this.options.codecov === undefined)
			},
			{
				name: 'codecov',
				message: 'Upload coverage to codecov.io?',
				type: 'confirm',
				default: false,
				when: x => (x.nyc || this.options.coverage) && (this.options.codecov === undefined)
			}
		]);

		const or = (option, prop) => this.options[option] === undefined ? props[prop || option] : this.options[option];

		const cli = or('cli');
		const codecov = or('codecov');
		const nyc = codecov || or('coverage', 'nyc');

		const repoName = utils.repoName(props.moduleName);

		const tpl = {
			moduleName: props.moduleName,
			description: props.description,
			camelModuleName: _s.camelize(repoName),
			githubUsername: props.githubUsername,
			repoName,
			name: this.user.git.name(),
			email: this.user.git.email(),
			website: props.website,
			humanizedWebsite: humanizeUrl(props.website),
			cli,
			nyc,
			codecov
		};

		this.fs.copyTpl([
			`${this.templatePath()}/**`,
			'!**/cli.js'
		], this.destinationPath(), tpl);

		if (cli) {
			this.fs.copyTpl(this.templatePath('cli.js'), this.destinationPath('cli.js'), tpl);
		}

		utils.mv(this, 'markdownlint.yml', '.markdownlint.yml');
		utils.mv(this, 'gitignore', '.gitignore');
		utils.mv(this, 'travis.yml', '.travis.yml');
		utils.mv(this, 'npmrc', '.npmrc');
		utils.mv(this, '_package.json', 'package.json');

		this.composeWith(require.resolve('../github'), {
			...props,
			composed: true
		});
	}

	git() {
		this.spawnCommandSync('git', ['init']);
	}

	install() {
		this.installDependencies({bower: false});
	}
};
