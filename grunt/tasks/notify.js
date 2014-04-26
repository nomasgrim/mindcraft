var _ = require('lodash/dist/lodash.underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());

module.exports = function(grunt) {
  var paths = grunt.config('paths');
  // https://github.com/dylang/grunt-notify
  // helper function used to compose our own "notify" tasks.
  var postNotification = require(paths.project+'/node_modules/grunt-notify/lib/notify-lib.js');


  grunt.registerTask('notify', 'Notifies a task chain is complete.', function() {
    var taskChain = _.first(this.args) || 'grunt';
    taskChain = _.capitalize(taskChain);

    var projectName = grunt.config('pkg.name');
    projectName = _.map(projectName.split('-'), _.capitalize).join(' ');

    postNotification({message: taskChain+' task chain complete.\n'+[projectName, 'grunt'].join(' '), title: taskChain});
  });

};
