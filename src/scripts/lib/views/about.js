define(['app','backbone','underscore',''],function(app,Backbone,_){
  var AboutView = Backbone.View.extend({
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

  app.aboutView = new AboutView({
    el: $('#about-container').get(0),
    html: $('#about-template').html()
  });

  return app;

});