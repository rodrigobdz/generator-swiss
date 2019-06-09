'use strict';
const _s = require('underscore.string');
const isScoped = require('is-scoped');
const superb = require('superb');
const normalizeUrl = require('normalize-url');

exports.repoName = name => isScoped(name) ? name.split('/')[1] : name;
exports.slugifyPackageName = name => isScoped(name) ? name : _s.slugify(name);
exports.mv = (that, from, to) => {
	that.fs.move(that.destinationPath(from), that.destinationPath(to));
};

exports.moduleName = appname => ({
	name: 'moduleName',
	message: 'What do you want to name your module?',
	default: _s.slugify(appname),
	filter: x => this.slugifyPackageName(x)
});

exports.description = {
	name: 'description',
	message: 'What is your description?',
	default: `My ${superb.random()} repo`
};

exports.githubUsername = {
	name: 'githubUsername',
	message: 'What is your GitHub username?',
	store: true,
	validate: x => x.length > 0 ? true : 'You have to provide a username'
};

exports.website = {
	name: 'website',
	message: 'What is the URL of your website?',
	store: true,
	validate: x => x.length > 0 ? true : 'You have to provide a website URL',
	filter: x => normalizeUrl(x)
};
