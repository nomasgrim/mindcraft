define(['underscore', 'jquerymigrate','backbone'], function(_, $, Backbone) {
  var app = window.app || {};

  _.extend(app, Backbone.Events);

  app.$window = $(window);
  app.$html = $('html').removeClass('no-app').addClass('app');
  app.$body = $('body');

  return app;

});
