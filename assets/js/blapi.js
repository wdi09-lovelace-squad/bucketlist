'use strict';
var blapi = {
  url: 'http://localhost:3000',

  // boiler plate ajax callback wrapper
  ajax: function (config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxhr: jqxhr, status: status, error: error});
    });
  },

  register: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/signup',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      xhrFields: { withCredentials: true }, // tells jquery to use cookies
      dataType: 'json'
    }, callback);
  },

  logout: function (callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/logout',
      contentType: 'application/json; charset=utf-8',
      xhrFields: { withCredentials: true }, // tells jquery to use cookies
      dataType: 'json'
    }, callback);
  },

} // end blapi

