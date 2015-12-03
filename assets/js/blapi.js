/*jshint node: true */
'use strict';

var blapi = {
  url: 'http://calm-oasis-5849.herokuapp.com',

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
    }, callback);
  },

  login: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      xhrFields: { withCredentials: true } // tells jquery to use cookies
      // dataType: 'json'
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

  addToList: function (venue, callback) {
    this.ajax({
      method: 'PUT',
      url: this.url + '/doStuff',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(venue),
      xhrFields: { withCredentials: true } // tells jquery to use cookies
      // dataType: 'json'
    }, callback);
  },

  showList: function(callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/doStuff',
      xhrFields: { withCredentials: true }
    }, callback);
  },

  updateList: function (updateList, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/doStuff',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(updateList),
      xhrFields: { withCredentials: true } // tells jquery to use cookies
    }, callback);
  },

  deleteItem: function (item, callback) {
    this.ajax({
      method: 'DELETE',
      data: item,
      url: this.url + '/doStuff',
      xhrFields: { withCredentials: true }, // tells jquery to use cookies
      dataType: 'json'
    }, callback);
  }

}; // end blapi
