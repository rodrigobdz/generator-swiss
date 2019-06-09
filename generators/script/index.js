'use strict';
const Generator = require('yeoman-generator');
const utils = require('../utils');

module.exports = class extends Generator {
	async prompting() {
		const props = await this.prompt([
			utils.moduleName(this.appname),
			utils.description
		]);

		const tpl = {
			description: props.description
		};

		this.fs.copyTpl([
			`${this.templatePath()}/script.sh`
		], this.destinationPath(), tpl);

		utils.mv(this, 'script.sh', `${props.moduleName}.sh`);
	}
};
