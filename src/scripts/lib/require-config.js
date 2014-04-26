/* global define */
;(function(window, undefined) {

  // declare app to be global variable
  var app = window.app = window.app || {};

  // Detect which build mode we're in.
  app.builds = {};
  app.builds.isDev = ( window.build && window.build === 'dev' );

  app.builds.isProd = !window.build || ( window.build && window.build === 'prod' );

  // Set up requirejs.
  app.requirejs = {};

  // prod build paths.
  app.requirejs.paths = {
    // jQuery fallbacks
    jquery: 'vendor/jquery.min',
    jquerymigrate: 'vendor/jquery-migrate.min',
  };

  if ( app.builds.isDev ) {
    // dev build paths.
    app.requirejs.paths = {
      components: '../../bower_components',
      es5: "vendor/es5-shim",
      json3: "vendor/json3",
      q: 'vendor/q',
      underscore: "vendor/lodash.underscore",
      'underscore.string': "vendor/underscore.string",
      jquery: 'vendor/jquery',
      jquerymigrate: 'vendor/jquery-migrate',
      transit: 'vendor/jquery.transit',
      touchSwipe: 'vendor/jquery.touchSwipe',
      backbone: 'vendor/backbone',
      // imagesLoaded: 'vendor/imagesLoaded.pkgd',
    };
  }

  var appBase = window.appBase || '/mindcraft/';
  app.requirejs.baseUrl = appBase+'_assets/scripts/';


  // Shim non-AMD libraries.
  app.requirejs.shim = {
    jquerymigrate: {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    transit: {
      deps: ['jquerymigrate'],
      exports: 'jQuery'
    },
    backbone: {
      deps: ['jquerymigrate','underscore'],
      exports: 'Backbone'
    },
    touchSwipe: {
      deps: ['jquerymigrate'],
      exports: 'jQuery'
    },
    mdetect: {
      exports: 'MobileEsp'
    }
  };

  // Set enforceDefine to true
  // http://requirejs.org/docs/api.html#ieloadfail
  app.requirejs.enforceDefine = true;

  require.config(app.requirejs);

  // stub in preloaded libraries
  // jQuery
  if ( window.jQuery ) {

    define('jquery', [], function () {
      return window.jQuery;
    });

    // jQuery Migrate
    if ( window.jQuery.migrateWarnings ) {
      define('jquerymigrate', ['jquery'], function() {
        return window.jQuery;
      });
    }
  }

  // Modernizr
  if ( window.Modernizr ) {
    define('modernizr', [], function() {
      return window.Modernizr;
    });
  }

  // Yepnope
  if ( window.yepnope ) {
    define('yepnope', [], function() {
      return window.yepnope;
    });
  }

  // mdetect
  if ( window.MobileEsp ) {
    define('mdetect', [], function() {
      return window.MobileEsp;
    });
  }

  // kick off app by listing main as a dependency.
  // main contains base-level requirements.
  define(['app', 'safeLog', 'main'], function(app, safeLog) {
    safeLog('App Loaded: ', app);
    return app;
  });

})(this);