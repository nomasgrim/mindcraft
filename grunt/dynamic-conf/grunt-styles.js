module.exports = function(grunt) {

  var extendConfig = require('../util-extendconfig.js'),
      conf = grunt.file.readJSON('grunt/dynamic-conf/styles.json');

  extendConfig(grunt, conf);

};
