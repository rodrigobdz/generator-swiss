'use strict';
const humanizeUrl = require('humanize-url');
const Generator = require('yeoman-generator');
const _s = require('underscore.string');
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

			this.composeWith(require.resolve('../minimal-readme'), {
				...props,
				composed: true
			});
		}

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
			humanizedWebsite: humanizeUrl(props.website)
		};

		this.fs.copyTpl([
			`${this.templatePath()}/**`
		], this.destinationPath(), tpl);

		this.composeWith(require.resolve('../changelog'), {
			...props,
			composed: true
		});
	}

	renamingFiles() {
		utils.mv(this, 'editorconfig', '.editorconfig');
		utils.mv(this, 'gitattributes', '.gitattributes');
		utils.mv(this, 'pull_request_template.md', '.github/pull_request_template.md');
		utils.mv(this, 'bug_report.md', '.github/ISSUE_TEMPLATE/bug_report.md');
		utils.mv(this, 'feature_request.md', '.github/ISSUE_TEMPLATE/feature_request.md');
	}

	git() {
		this.spawnCommandSync('git', ['init']);
	}
};
