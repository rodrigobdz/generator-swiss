'use strict';
const Generator = require('yeoman-generator');
const utils = require('../utils');

module.exports = class extends Generator {
	async prompting() {
		let props = this.options;

		if (!this.options.composed) {
			props = await this.prompt([
				utils.moduleName(this.appname),
				utils.description,
				utils.githubUsername
			]);
		}

		const repoName = utils.repoName(props.moduleName);

		const tpl = {
			description: props.description,
			githubUsername: props.githubUsername,
			repoName
		};

		this.fs.copyTpl([
			`${this.templatePath()}/changelog.md`
		], this.destinationPath(), tpl);
	}
};
