module.exports = function(grunt) {
  grunt.registerTask('server', "Start a static, filesystem-based server, with live-reload capabilities.", function() {
    grunt.task.run('connect:site:keepalive');
  });
};
