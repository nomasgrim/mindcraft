/**
 * @license gatorade-poy Copyright (c) 2014, VML All Rights Reserved.
 */

/* global define */
define(['jquerymigrate', 'json-helper', 'safeLog', 'backbone','router'],
  function ($, jsonHelper, safeLog, Backbone, app) {
    safeLog('Main loaded.');

    var pathsConfig = window.pathsConfig = jsonHelper('#paths');
    safeLog('Paths config:', pathsConfig);

    var domains = {
      isLocal: !!(document.domain.match(/localhost$/)),
      isStatic: (document.domain === 'gatorade2.vmldev.com')
    };

    var pages = ['home','about'];

    app.pathsConfig = pathsConfig;
    app.pages = pages;
    app.domains = domains;
    safeLog(app.pages);

    $(function(){
      app.router = new app.Router();
      Backbone.history.start();
    });

    return app;
  }
);
