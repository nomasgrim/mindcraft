var _ = require('lodash/dist/lodash.underscore');

module.exports = function(grunt) {

  function prefixTask(task, target) {
    return _.compact(_.flatten([task, target])).join(':');
  }

  function chainTasks(tasks){
    // Target shared tasks based on task name.
    var name = grunt.task.current.name;
    // Prep task chain config.
    grunt.task.run(prefixTask('loadConfig', name));
    if (_.isObject(tasks) && _.isArray(tasks.tasks) ) {
      grunt.task.run(tasks.tasks);
    } else if ( _.isArray(tasks) ) {
      grunt.task.run(tasks);
    }
    // diffCopy from build to dist.
    grunt.task.run(prefixTask('diffCopy', name));


    // Conditionally clean build direcotry.
    if(!grunt.option('debug') && !grunt.option('no-clean')) {
      grunt.task.run(prefixTask('clean', name));
    } else {
      grunt.log.ok('Not cleaning intermediate '+name+'.');
    }

    if (_.isObject(tasks) && _.isArray(tasks.postrun) ) {
      grunt.task.run(tasks.postrun);
    }

    // Queue notify to run after all tasks complete.
    grunt.task.run('notify:'+name);

  }

  // Scripts task chain.
  // Copy vendor scripts to build;
  // copy src scripts to build.
  grunt.registerTask('scripts', 'Concatenate and minify Javascript files.', function(){
    var build =  grunt.config('build');
    var buildSupport = grunt.config('buildSupport');

    var rjsTasks, rjsConfigPath, rjsConfig;

    if( !~buildSupport.indexOf(build) ) {
      // fail task
      grunt.warn('Invalid build "'+build+'" specified. Supported builds: '+buildSupport.join(', ')+'\n');
    }

    if( build === 'prod' ) {
      // run all optimizations except for almond.
      rjsConfigPath = grunt.config.process('<%= paths.dynamicConfig %>/scripts.json');
      rjsConfig     = grunt.file.readJSON(rjsConfigPath).requirejs;

      rjsTasks = _.keys(rjsConfig);
      rjsTasks = _.without(rjsTasks, 'options', 'almond');
      rjsTasks = _.map(rjsTasks, function(target) {
        return prefixTask('requirejs', target);
      });
      grunt.log.oklns(rjsTasks.join(' '));
      rjsTasks.push('diffCopy:scripts');
      rjsTasks.push('clean:scripts');
    } else if (build === 'almond') {
      // optimize all pages into one file.
      // not a true almond; allows dynamic requirejs
      // which is used for the social module & async FB SDK loading 
      rjsTasks = ['requirejs:almond', 'diffCopy:scripts', 'clean:scripts'];
    } else if (build === 'dev') {
      // don't optimize anything/
      rjsTasks = [];
    }

    chainTasks({
      tasks: ['jade:jst', 'copy:devScripts', 'copy:vendorScripts'],
      postrun: rjsTasks
    });

  });

  // Styles task chain.
  // Copy vendor styles to build;
  // compile stylus to CSS
  grunt.registerTask('styles', 'Compile Stylus to CSS & minify.', function(){
    chainTasks(['copy:vendorStyles', 'stylus:compile']);
  });


  // Markup task chain.
  // Behave differently given `grunt.option` or task `flag`.
  // Check that build is supported.
  // Symlink Jade helpers & includes;
  // compile Jade to HTML.
  grunt.registerTask('markup', 'Compile Jade to HTML & beautify.', function() {

    // `grunt markup:dev` == `grunt markup --dev` == `grunt markup --build=dev`
    if(this.flags.dev){
      grunt.config('build','dev');
    }

    if(this.flags.almond){
      grunt.config('build','almond');
    }

    var build =  grunt.config('build');
    var buildSupport = grunt.config('buildSupport');
    if( build ) {

      if( !~buildSupport.indexOf(build) ) {
        // fail task
        grunt.warn('Invalid build "'+build+'" specified. Supported builds: '+buildSupport.join(', ')+'\n');
      }

      if(build === 'dev') {
        // log as error to get your attention.
        grunt.log.error('Development build; including unminified scripts.');
      }
    }

    chainTasks(['jade:html']);

  });

  // Simple wrapper to run all three task chains.
  grunt.registerTask('main', "Run main tasks in series.", function() {
    var mainTasks = grunt.config('mainTasks');
    grunt.task.run(mainTasks);
  });

  grunt.config.requires('buildSupport');
  var buildSupport = grunt.config('buildSupport');

  buildSupport.forEach(function(build) {
    grunt.registerTask(build, "Run main tasks with "+build+" options.", function() {
      grunt.option('build', build);
      grunt.task.run('concurrent:main');
    });
  });

};
