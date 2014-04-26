var _ = require('lodash/dist/lodash.underscore');

module.exports = function extendConfig(grunt, conf) {
  'use strict';

  function setConf(conf) {
    _.each(conf, function(value, key) {
      grunt.config(key, value);
    });
  }

  function mergeConf(conf) {
    _.each(conf, function(value, key) {
      var current = grunt.config(key) || {};
      grunt.config(key, _.extend(current, value));
    });
  }

  grunt.config.requires('sharedTasks');
  var shared = grunt.config('sharedTasks');

  setConf(_.omit(conf, shared));
  mergeConf(_.pick(conf, shared));

};
