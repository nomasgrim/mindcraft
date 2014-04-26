module.exports = function(grunt) {

  // https://github.com/sindresorhus/time-grunt
  require('time-grunt')(grunt);

  // https://github.com/sindresorhus/load-grunt-tasks
  // reads from ./package.json
  require('load-grunt-tasks')(grunt);

  // some paths.
  var paths = grunt.file.readJSON('paths.json');

  // keeping config minimal. main gruntfile for glue only.
  var initConfig = require('./'+paths.grunt+'/initConfig.js')(grunt);
  grunt.initConfig(initConfig);

  // custom tasks.
  grunt.loadTasks(paths.tasks);

  // default task. Grunt complains if no tasks are registered directly in the gruntfile.
  grunt.registerTask('default', "Grunt.", function() {
    grunt.task.run('symlink', 'concurrent:main');
    if( grunt.option('no-watch') ) {
      grunt.task.run('server');
    } else {
      grunt.task.run('concurrent:server');
    }
  });

};
