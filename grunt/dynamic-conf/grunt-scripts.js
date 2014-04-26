module.exports = function(grunt) {

  // Project-level paths.
  grunt.config.requires('paths');
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
        'scripts.json'
      ].join('/'),
      conf = grunt.file.readJSON(confPath);

  // Put it all together.
  extendConfig(grunt, conf);

  // Template names with `processName`.
  var cwdConfigPath = 'jade.jst.options.cwd',
      cwd = grunt.config(cwdConfigPath),
      processNameConfigPath = 'jade.jst.options.processName';

  grunt.config(processNameConfigPath, processName);

  function processName(src) {
    return src.replace(cwd, '').replace(/\.jade$/, '');
  }


};
