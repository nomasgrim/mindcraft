### MindCraft
> Similar to MineCraft but it's Mind Craft

#### Technologies
* Grunt
* frontend (html/javascript/css)
* three js

## [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Installation

### Dependencies

[NodeJS](http://nodejs.org/) v0.10+ (look into [`nvm`](https://github.com/creationix/nvm) for keeping up to date)

* Command line utilities: `grunt`
* NPM packages: `package.json`
* Optional dependencies: `node-canvas`

#### Installing Grunt

In a local terminal, `npm install -g grunt-cli`. This will install the grunt command line interface globally.

#### Installing NPM packages

In project directory, run `npm install`. This will install the tasks and helpers for Grunt & the project, including:

* [Jade](http://jade-lang.com) - HTML templating
* [Stylus](http://learnboost.github.io/stylus/) - Logical CSS preprocessor
* …and other helpful web technologies.

#### Installing optional dependencies

[`node-canvas`](https://github.com/learnboost/node-canvas) is used by [Nib](http://visionmedia.github.io/nib/) to generate base64 encoded PNGs for use as background images, e.g. gradients. Falls back to CSS3 gradients if not available on development environment.

##### Mac OSX installation

* Install [XQuartz](https://xquartz.macosforge.org/landing/).
* Run `brew update && brew doctor` to check if your system is up to date. (requires [Homebrew](http://brew.sh/))
* Install image processing utils with `brew install giflib libpng jpeg`
* Install [Cairo](http://cairographics.org/) with `brew install cairo`
* Finally, install `node-canvas` with `npm install canvas`. You may need to `export PKG_CONFIG_PATH` as discussed in the [wiki](https://github.com/LearnBoost/node-canvas/wiki/Installation---OSX) after the Cairo step.

The above maze is why `node-canvas` is an optional dependency. Once installed, it drastically slows down Stylus compilation time, but can embed a generated image in CSS as a `data-uri`.

## Developing

Once everything is installed, run `grunt` in the project directory. This runs the `default` Grunt task. It will compile the source code into a working static site, launch a [connect](http://www.senchalabs.org/connect/) HTTP server, open your browser to the launched server, and watch files for changes.

### Source Code Compilation

The main purpose of the front-end build system. Split into `markup`, `scripts`, and `styles`, these main tasks take the Jade, Stylus, and Javascript source and package it up for the Web. By default, builds HTML including concatenated & minified Javacript and CSS. With a `grunt --dev` option supplied, it will use unminified source files for debugging.

Optionally run with:

* `grunt markup`
* `grunt scripts`
* `grunt styles`
* `grunt main` - Compiles markup, scripts, and styles in series.
* `grunt concurrent:main` - Compiles markup, scripts, and styles in parallel.

### HTTP Server

By default, launches on port 8000. Will read `$PORT` environment variable. Opens browser once launched. Includes LiveReload client script on served HTML.

Optionally run with:

* `grunt server` - Handy alias.
* `grunt connect:site:keepalive` - Original task form.
* `grunt concurrent:server` - Concurrently run server & watchers.

### Watchers

The following 5 watchers are included in the `default` task (via `concurrent:server`):

* If a source file changes, Grunt will recompile the necessary files (`scripts`, `styles` or `markup`).
* If a public asset changes while watching and browsing on the `connect` webserver, [`LiveReload`](http://livereload.com/) will kick in (powered by Grunt; no additional software necessary).
* If a Javascript file changes (Grunt config or Web script), Grunt will run `jshint` on the changed file.

For a full list of available tasks, run `grunt --help`.

### [Three JS](http://threejs.org/docs/)