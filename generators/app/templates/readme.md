# <%= repoName %> [![Build Status](https://travis-ci.com/<%= githubUsername %>/<%= repoName %>.svg?branch=master)](https://travis-ci.com/<%= githubUsername %>/<%= repoName %>)<% if (codecov) { %> [![codecov](https://codecov.io/gh/<%= githubUsername %>/<%= repoName %>/badge.svg?branch=master)](https://codecov.io/gh/<%= githubUsername %>/<%= repoName %>?branch=master)<% } %>

> <%- description %>

## Install

```sh
npm install <%= moduleName %>
```

## Usage

```js
const <%= camelModuleName %> = require('<%= moduleName %>');

<%= camelModuleName %>('unicorns');
//=> 'unicorns & rainbows'
```

## API

### <%= camelModuleName %>(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

Type: `Object`

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.<% if (cli) { %>

## CLI

```sh
$ npm install --global <%= moduleName %>
```

```sh
$ <%= repoName %> --help

  Usage
    <%= repoName %> [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ <%= repoName %>
    unicorns & rainbows
    $ <%= repoName %> ponies
    ponies & rainbows
```<% } %>

## Credits

* [generator-swiss](https://github.com/rodrigobdz/generator-swiss) - The Swiss Army Knife of Yeoman generators

## License

[MIT](license) © [<%= name %>](<%= website %>)
