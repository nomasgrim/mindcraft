define(['es5'], function() {
  function safeLog() {
    var logs;
    if(window.console&&window.console.log){
      logs = Array.prototype.slice.call(arguments);
      try {
        console.log.apply(console, logs);
      } catch(e) {
        // attempt to log array
        console.log(logs);
      }
      
    }
  }

  window.safeLog = safeLog;
  return window.safeLog;
});