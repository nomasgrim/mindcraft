define(['app', 'backbone', 'safeLog', 'q', 'views/home','views/about'
  ], function(app, Backbone, safeLog, Q) {

  ////////////////////////
  // Backbone Router
  console.log('in router');
  app.Router = Backbone.Router.extend({
    routes: {
      'home' : 'home',
      'about' : 'about',
      '*path' : "mindcraftRoute"
    },
    renderCreators: function(){
      return;
    },
    home: function(){
      safeLog('on home route');
      app.homeView.render();
    },
    about: function(){
      safeLog('on about route');
      app.aboutView.render();
    },
    mindcraftRoute: function(path) {
      var router = this;
      if(location.pathname === '/mindcraft/'){
        // Main Comic Backbone App path.
        safeLog('path: '+path);
        if(path === null) {
          this.navigate('home', {trigger: true});
        }
        var isPage = _.contains(app.pages, path);
        /*
        if(app.$body.attr('id') == 'fierce-collective') {
          safeLog('here bitch');
        }
        */
      } else {
        // Individual Comic pages. Static only.
        (function(){
          if(app.page) {
            app.state.set({'page': app.page});
          }
        })();
      }

    }
  });

  return app;

});