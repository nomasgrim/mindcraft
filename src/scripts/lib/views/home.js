define(['app','backbone','underscore',''],function(app,Backbone,_){
  var HomeView = Backbone.View.extend({
    events: {
      //click hover
    },
    initialize: function(options){
      this.html = options.html;
    },
    render: function(){
      this.$el.html(this.html);
    }
  });

  app.homeView = new HomeView({
    el: $('#home-container').get(0),
    html: $('#home-template').html()
  });

  return app;

});