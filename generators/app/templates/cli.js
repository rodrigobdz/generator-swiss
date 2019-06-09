#!/usr/bin/env node
'use strict';
const updateNotifier = require('update-notifier');
const meow = require('meow');
const <%= camelModuleName %> = require('.');

const cli = meow(`
	Usage
	  $ <%= repoName %> [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ <%= repoName %>
	  unicorns & rainbows
	  $ <%= repoName %> ponies
	  ponies & rainbows
`);

updateNotifier({pkg: cli.pkg}).notify();

console.log(<%= camelModuleName %>(cli.input[0] || 'unicorns'));
