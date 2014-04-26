// Other JavaScript APIs are pointless, just making our own. - rdoll
  var IG = {};

  IG.access_token   = null;
  IG.app_id         = null;
  IG.callback_uri   = null;
  IG.queuedCallback = null;
  IG.queuedURL      = null;

  IG.init = function(obj){
    IG.app_id = obj.app_id;
    IG.callback_uri = obj.callback_uri;
  };

  IG.login = function(){
    var w     = 500;
    var h     = 340;
    var left  = (screen.width/2)-(w/2);
    var top   = (screen.height/2)-(h/2);
    var url   = 'https://instagram.com/oauth/authorize/?client_id=' + IG.app_id +'&redirect_uri=' + encodeURIComponent(IG.callback_uri) + '&response_type=token';
    window.open(url,'Instagram','width='+w+',height='+h+',toolbar=0,menubar=0,location=1,status=1,scrollbars=0,resizable=0,left='+left+',top=' + top);
  };

  IG.getImages = function(api_url, callback){
    if(IG.access_token !== null){
      $.ajax({
        dataType: "jsonp",
        url: api_url,
        data: {
          access_token: IG.access_token
        }
      }).success(function(data){
          callback(data);
      });
    } else {
      IG.queuedCallback = callback;
      IG.queuedURL = api_url;
      IG.login();
    }
  };

  IG.receiveAccessToken = function(result){
    IG.access_token = result;
    if(IG.queuedURL !== null && IG.queuedCallback){
      var url = IG.queuedURL;
      var callback = IG.queuedCallback;
      IG.queuedCallback = null;
      IG.queuedURL = null;
      IG.getImages(url, callback);
    }
  };

  window.IG = IG;
