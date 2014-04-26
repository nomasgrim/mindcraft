module.exports = function(grunt) {

  // Utility function from Underscore.
  // http://underscorejs.org/#extend
  var extend = require('lodash/dist/lodash.underscore').extend;

  // Project-level paths.
  var paths = grunt.config('paths');

  // Grunt Config extending utility.
  var extendConfigPath = [
        paths.project,
        paths.grunt,
        'util-extendconfig.js'
      ].join('/'),
      extendConfig = require(extendConfigPath);

  // Task chain JSON configuration data.
  var confPath = [
        paths.dynamicConfig,
        'markup.json'
      ].join('/'),
      conf = grunt.file.readJSON(confPath);

  // Put it all together.
  extendConfig(grunt, conf);

  // Load custom Jade helpers module.
  var jadeLocalsPath = [
        paths.project,
        paths.src,
        'scripts/jade/helpers/jade_locals.js'
      ].join('/'),
      jadeLocals = require(jadeLocalsPath)(grunt);

  // Site-level paths.
  // Expose links editable in centralized JSON file.
  var jadePathsPath = [
    paths.src,
    'scripts/jade/helpers/paths.json'
  ].join('/');

  // Gather paths in Jade locals.
  jadeLocals.paths = extend({}, paths, grunt.file.readJSON(jadePathsPath));

  // Initial `markup.json` config may specify some Jade locals data.
  // Extend JSON data with Jade locals module & expose via `grunt.config`.
  var jadeLocalsConfigPath = 'jade.html.options.data';
  var data = grunt.config(jadeLocalsConfigPath) || {};
  extend(data, jadeLocals);
  grunt.config(jadeLocalsConfigPath, data);

  // Define a filter for cleaning generated markup.
  function checkForJadeFile(filepath) {
    // Remove HTML that has a corresponding Jade source.
    // Avoid deleting "dropped in" html.
    var jadepath = filepath.replace('.html','.jade');
    return grunt.file.exists('<%= paths.src %>/markup/htdocs/' + jadepath);
  }

  var cleanGenMarkup = grunt.config('clean.genMarkup') || {};
  extend(cleanGenMarkup, {filter: checkForJadeFile});
  grunt.config('clean.genMarkup', cleanGenMarkup);

};
