ROSM.JSON = {
  callbacks: {
    "routing": function() {},
    "poi": function() {},
    "geocoder": function() {}
  },

  empty: function() {},
  // callback: function(label) {},

  call: function(label, query, callback_function) {
    // ROSM.JSON.callback = callback_function;
    ROSM.JSON.callbacks[label] = $.ajax(query)
      .done(function(response) {
        callback_function(response);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("err: " + textStatus + ' ' + errorThrown);
      });
  },

  clear: function(label) {
    ROSM.JSON.callbacks[label] = function() {};
  },

  reset: function() {
    ROSM.JSON.callbacks = {};
  }
}
