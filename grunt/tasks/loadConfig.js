var _ = require('lodash/dist/lodash.underscore');

module.exports = function(grunt) {
  grunt.config.requires('mainTasks');
  grunt.config.requires('paths');

  var mainTasks = grunt.config('mainTasks');
  var paths = grunt.config('paths');

  function getPath(chain) {
    var path = [paths.project, paths.dynamicConfig, 'grunt-'+chain+'.js'];
    return path.join('/');
  }

  function prefixTask(task, name) {
      return _.compact([task, name]).join(':');
    }

  grunt.registerTask('loadConfig', 'Dynamically loads task chain configuration into Grunt.', function(){
    var taskChain = _.first(this.args);
    var configPath;


    if( !taskChain ) {
      grunt.task.run(_.map(mainTasks, function(task) {
        return prefixTask('loadConfig', task);
      }));
    } else {
      configPath = getPath(taskChain);
      require(configPath)(grunt);
      grunt.log.ok('Loaded configuration from: '+configPath.replace(paths.project, '.'));
    }

  });

  grunt.registerTask('load-and-watch', 'Loads a config & sets up watchers for a task chain.', function() {
    var taskChain = _.first(this.args);
    function mapper(task) {
      return prefixTask(task, taskChain);
    }

    grunt.task.run(_.map(['loadConfig', 'watch'], mapper));
  });
};