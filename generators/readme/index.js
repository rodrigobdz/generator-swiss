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
				utils.githubUsername,
				utils.website
			]);
		}

		const repoName = utils.repoName(props.moduleName);

		const tpl = {
			moduleName: props.moduleName,
			description: props.description,
			githubUsername: props.githubUsername,
			website: props.website,
			repoName
		};

		this.fs.copyTpl([
			`${this.templatePath()}/readme.md`
		], this.destinationPath(), tpl);
    
    utils.mv(this, 'markdownlint.yml', '.markdownlint.yml');
	}
};
