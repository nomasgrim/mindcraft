define(['jquerymigrate', 'json3'], function($, JSON) {
  return function(selector) {
    //empty string will produce "Unexpected End of Input" error message.
    var jsonString = $(selector).html() || '';
    return JSON.parse(jsonString);
  };
});
