var _ = require('lodash/dist/lodash.underscore');

module.exports = function(grunt) {
  function checkCopies(target) {
    var confPath = _.compact(['copy', target]).join('.');
    grunt.config.requires(confPath);
    var conf = grunt.config(confPath);

    var srcDestPairs = conf && grunt.task.normalizeMultiTaskFiles(conf);

    function compare(src, dest) {
      var bannerRegex = /^\/\*[\s\S]*?\*\//;
      var newer, older;
      newer = grunt.file.read(src);
      older = grunt.file.read(dest);

      var banner, test;
      test = (newer !== older);

      if( false && target === 'scripts' && grunt.file.isMatch('build/scripts/*.js', src)) {
        grunt.log.ok(src);

        banner = newer.match(bannerRegex);
        banner = banner && banner.toString().split('\n').join('');
        grunt.log.oklns(banner);
        grunt.log.ok("Is banner?", isUglifyBanner(banner));
        if ( banner && isUglifyBanner(banner) ) {
          test = (newer.replace(bannerRegex, '') !== older.replace(bannerRegex, ''));
        } 
        
      }

      grunt.config.requires('pkg.name');
      var check = grunt.config('pkg.name');
      function isUglifyBanner(banner) {
        return banner && !!~banner.indexOf(check);
      }

      return test;
    }


    srcDestPairs = _.filter(srcDestPairs, function(pair) {
      var src = pair && pair.src && _.first(pair.src);
      var dest = pair && pair.dest;
      if(src && dest &&
         grunt.file.isFile(src) && grunt.file.isFile(dest))
        return compare(src, dest);
      else if (src && grunt.file.isFile(src))
        return true;
    });

    grunt.log.ok('Changed files: '+JSON.stringify(_.pluck(srcDestPairs, 'dest')));

    return srcDestPairs;

  }

  // store original values.
  var originalConfig;
  var configKey;

  grunt.registerTask('diffCopy', 'Copy only if changed.', function() {
    var taskChain = _.first(this.args);
    var files = checkCopies(taskChain);

    configKey = 'copy.'+taskChain+'.files';
    originalConfig = grunt.config(configKey);


    if( files && files.length ) {
      grunt.config(configKey, files);
      grunt.task.run('copy:'+taskChain);
      grunt.task.run('diffCopy:postrun');
    } else {
      grunt.log.warn('No files changed; copy:'+taskChain+' not run.');
    }

  });

  // reset config to original values.
  grunt.registerTask('diffCopy:postrun', function() {
    grunt.config(configKey, originalConfig);
  });

};
