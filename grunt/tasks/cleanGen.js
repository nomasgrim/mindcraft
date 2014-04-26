var _ = require('lodash/dist/lodash.underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());

module.exports = function(grunt) {
  grunt.config.requires('mainTasks');
  var mainTasks = grunt.config('mainTasks');

  function cleanGen (target){
    return 'clean:gen'+_.capitalize(target);
  }

  grunt.registerTask('clean:gen',
    'Remove / clean all final generated files.',
    _.map(mainTasks, cleanGen)
  );

};
