import path from 'path';
import test from 'ava';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import pify from 'pify';
import utils from './generators/utils';

let generator;

test.beforeEach(async () => {
	await pify(helpers.testDirectory)(path.join(__dirname, 'temp'));
	generator = helpers.createGenerator('swiss:app', ['../generators/app'], null, {skipInstall: true});
});

test.serial('generates expected files', async () => {
	helpers.mockPrompt(generator, {
		moduleName: 'test',
		githubUsername: 'test',
		website: 'test.com',
		cli: false
	});

	await pify(generator.run.bind(generator))();

	assert.file([
		'.editorconfig',
		'.git',
		'.github/ISSUE_TEMPLATE/bug_report.md',
		'.github/ISSUE_TEMPLATE/feature_request.md',
		'.github/pull_request_template.md',
		'.gitattributes',
		'.gitignore',
		'.travis.yml',
		'index.js',
		'license',
		'package.json',
		'changelog.md',
		'code_of_conduct.md',
		'contributing.md',
		'readme.md',
		'test.js',
		'.npmrc'
	]);

	assert.noFile('cli.js');
});

test.serial('CLI option', async () => {
	helpers.mockPrompt(generator, {
		moduleName: 'test',
		githubUsername: 'test',
		website: 'test.com',
		cli: true
	});

	await pify(generator.run.bind(generator))();

	assert.file('cli.js');
	assert.fileContent('package.json', /"bin":/);
	assert.fileContent('package.json', /"bin": "cli.js"/);
	assert.fileContent('package.json', /"meow"/);
	assert.fileContent('package.json', /"update-notifier"/);
});

test.serial('nyc option', async () => {
	helpers.mockPrompt(generator, {
		moduleName: 'test',
		githubUsername: 'test',
		website: 'test.com',
		cli: false,
		nyc: true,
		codecov: false
	});

	await pify(generator.run.bind(generator))();

	assert.noFile('cli.js');
	assert.fileContent('.gitignore', /\.nyc_output/);
	assert.fileContent('.gitignore', /coverage/);
	assert.fileContent('package.json', /"xo && nyc ava"/);
	assert.fileContent('package.json', /"nyc": "/);
	assert.noFileContent('package.json', /"codecov":/);
	assert.noFileContent('package.json', /"lcov"/);
	assert.noFileContent('.travis.yml', /codecov/);
});

test.serial('codecov option', async () => {
	helpers.mockPrompt(generator, {
		moduleName: 'test',
		githubUsername: 'test',
		website: 'test.com',
		cli: false,
		nyc: true,
		codecov: true
	});

	await pify(generator.run.bind(generator))();

	assert.noFile('cli.js');
	assert.fileContent('.gitignore', /\.nyc_output/);
	assert.fileContent('.gitignore', /coverage/);
	assert.fileContent('package.json', /"xo && nyc ava"/);
	assert.fileContent('package.json', /"nyc": "/);
	assert.fileContent('package.json', /"codecov":/);
	assert.fileContent('package.json', /"lcov"/);
	assert.fileContent('.travis.yml', /codecov/);
});

test('parse scoped package names', t => {
	t.is(utils.slugifyPackageName('author/thing'), 'author-thing', 'slugify non-scoped packages');
	t.is(utils.slugifyPackageName('@author/thing'), '@author/thing', 'accept scoped packages');
	t.is(utils.slugifyPackageName('@author/hi/there'), 'author-hi-there', 'fall back to regular slugify if invalid scoped name');
});

test.serial('prompts for description', async () => {
	helpers.mockPrompt(generator, {
		moduleName: 'test',
		description: 'foo',
		githubUsername: 'test',
		website: 'test.com',
		cli: false,
		nyc: true,
		codecov: true
	});

	await pify(generator.run.bind(generator))();

	assert.fileContent('package.json', /"description": "foo",/);
	assert.fileContent('readme.md', /> foo/);
});

test.serial('defaults to superb description', async () => {
	helpers.mockPrompt(generator, {
		moduleName: 'test',
		githubUsername: 'test',
		website: 'test.com',
		cli: false,
		nyc: true,
		codecov: true
	});

	await pify(generator.run.bind(generator))();

	assert.fileContent('package.json', /"description": "My .+ repo",/);
	assert.fileContent('readme.md', /> My .+ repo/);
});
