module.exports = function(grunt) {

  var _ = require('lodash/dist/lodash.underscore');
  _.str = require('underscore.string');
  _.mixin(_.str.exports());

  var jadeLocals = {};

  // Expose grunt & _ to Jade.
  var gruntOmissions       = ['log', 'verbose', 'package'];
  var gruntLogExports      = ['write','writeln','error','errorlns','ok','oklns','subhead','writeflags','debug'];

  jadeLocals.grunt         = _.omit(grunt, gruntOmissions);
  jadeLocals.grunt.log     = _.pick(grunt.log, gruntLogExports);
  jadeLocals.grunt.verbose = _.pick(grunt.verbose, gruntLogExports);
  jadeLocals._ = _;

  // Expose build as a top-level config.
  var build = grunt.config('build');
  jadeLocals.build = build;

  // Matches "./" preceded by either start of string (^) or "/" (\/).
  // Captures preceding element as either '/' or ''.
  var dotSlashRegex = /(^|\/)\.\//g;
  // Prune & keep preceding slashes by replacing with capture group.
  function pruneDotSlash(url) {
    return url && url.replace(dotSlashRegex, '$1');
  }

  jadeLocals.pruneDotSlash = pruneDotSlash;
  /*
  - console.log(pruneDotSlash())
  - console.log(pruneDotSlash('.'))
  - console.log(pruneDotSlash('./'))
  - console.log(pruneDotSlash('./test'))
  - console.log(pruneDotSlash('./test1/../test2'))
  - console.log(pruneDotSlash('test3././test4/./'))
  */

  // Matches leading slash
  var leadingSlashRegex = /^\//;
  // Trim leading slash.
  function trimLeadingSlash(url) {
    return url && url.replace(leadingSlashRegex, '');
  }

  // Matches trailing slash
  var trailingSlashRegex = /\/$/;
  // Trim trailing slash.
  function trimTrailingSlash(url) {
    return url && url.replace(trailingSlashRegex, '');
  }

  var trimSlashes = _.compose(trimLeadingSlash, trimTrailingSlash);

  jadeLocals.trimLeadingSlash = trimLeadingSlash;
  jadeLocals.trimTrailingSlash = trimTrailingSlash;
  jadeLocals.trimSlashes = trimSlashes;

  var marked = require('marked');

  function includeMarkdown(path) {
    var input = grunt.file.read(path);
    return marked(input, {smartLists: true});
  }

  jadeLocals.includeMarkdown = includeMarkdown;

  function includeJSON(path) {
    var paths = grunt.config('paths');
    var jsonPath = paths.src+'/markup/helpers/scripts/'+path+'.json';
    if (build === 'dev') {
      // raw file
      return grunt.file.read(jsonPath);
    } else {
      // compressed
      return JSON.stringify(grunt.file.readJSON(jsonPath));
    }
  }

  jadeLocals.includeJSON = includeJSON;

  // Expose sportCodes.
  function getJSON(path) {
    var paths = grunt.config('paths');
    var jsonPath = paths.src+'/markup/helpers/scripts/'+path+'.json';
    return grunt.file.readJSON(jsonPath);
  }
  jadeLocals.getJSON = getJSON;


  return jadeLocals;
};
