// # `grunt.initConfig` module
// ## Takes a `grunt`, returns initial configuration object.
module.exports = function(grunt) {

  // Main tasks are the independent task chains we want to run.
  var mainTasks = ['scripts', 'styles', 'markup'];

  // Shared tasks are common to two or more main task chains.
  var sharedTasks = ['jade','copy', 'clean', 'watch'];

  // ## Supported builds
  // ### Dev
  // Build HTML files referencing source scripts & styles.
  //
  // ## Prod
  // Build HTML files referencing minified scripts & styles.
  var buildSupport = ['dev', 'prod', 'almond'];

  // Read build info from --dev or
  // --build="build" command line args.
  // Default to prod.
  var build = grunt.option('dev') && 'dev' ||
              grunt.option('almond') && 'almond' ||
              grunt.option('build') ||
              'prod';

  // Project-level paths.
  var paths = grunt.file.readJSON('paths.json');
  paths.project = process.cwd();

  // Initialize configuration object.
  var conf = {
    // Expose environment variables.
    env: process.env,
    // Use an environment variable with a default.
    port: process.env.PORT || 8000,
    // Slurp in project's `package.json`.
    pkg: grunt.file.readJSON('package.json'),
    // Expose project paths.
    paths: paths,
    // Include variables defined above.
    mainTasks: mainTasks,
    sharedTasks: sharedTasks,
    build: build,
    buildSupport: buildSupport,
    // Define simple cleaning task.
    clean: {
      // Remove `build` directory entirely.
      // Uses `grunt.template` to reference `paths`.
      build: ['<%= paths.build %>/']
    }
  };

  // JSON Grunt Task configurations to be loaded before initialization.
  // Config key is the filename without extension (listed here).
  // Config value is the parsed JSON.
  function jsonConfig(name) {
    // Grab config from name.
    var configPath = [
          paths.config,
          name+'.json'
        ].join('/'),
        config = grunt.file.readJSON(configPath);
    // Assign to conf.
    conf[name] = config;
  }

  // Iterate over configs.
  ['meta', 'jshint', 'watch', 'connect', 'concurrent', 'symlink'].forEach(jsonConfig);

  return conf;

};