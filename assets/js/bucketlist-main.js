/*jshint node: true */
'use strict';
var blapi = blapi || {};

$(document).ready(function() {
  $('#search').on('submit', function(e){
    e.preventDefault();
    var searchParams = {    keyword: $('#keyword').val(),
                            location: $('#location').val()
                      };
    $.ajax({
      url: 'http://localhost:3000/venues',
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      processData: false,
      data: JSON.stringify(searchParams),
      dataType: 'json'
    }).done(function(data){
      foursquarePlaces.clearLayers();
      console.log(data.response);
      var searchResultHTML = searchResultTemplate(data.response);
      $('#search-results').html(searchResultHTML);
      searchLayer(data);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  var searchResultTemplate = Handlebars.compile($('#search-result-template').html());

  // L and map ARE defined in index.html
  var foursquarePlaces = L.layerGroup().addTo(map);

  var searchLayer = function(data) {
    for (var i = 0; i < data.response.venues.length; i++) {
      var venue = data.response.venues[i];
      var latlng = L.latLng(venue.location.lat, venue.location.lng);
      var marker = L.marker(latlng, {
          icon: L.mapbox.marker.icon({
            'marker-color': '#3bb2d0',
            'marker-size': 'small'
          })
        })
      .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' + venue.name + '</a></strong><br>' + venue.categories[0].name + '<br><button type="button" class="btn-xs add-to-list" value="' + venue.name + '"">Add To List</button>')
        .addTo(foursquarePlaces);
    }
  };

  // register user
  $('#register').click(function(){
    var credentials = {
      username: $('#regUsername').val(),
      password: $('#regPassword').val(),
      confirmPassword: $('#confirmPassword').val()
    };
    var cb = function() {

    };
    blapi.register(credentials, cb);
  });

  // login user
  $('#login').click(function(){
    var credentials = {
      username: $('#logUsername').val(),
      password: $('#logPassword').val()
    };
    var cb = function() {
      $('#current-user').html($('#logUsername').val());
      console.log($('#logUsername').val());
    };
    blapi.login(credentials, cb);
  });

  // logout user
  $('#logout').click(function(){
    var cb = function() {

    };
    blapi.logout(cb);
  });

  $('#map').on('click', '.add-to-list', function(){
    var venue = {
      venue: $(this).attr('value')
    };
    var cb = function(err) {
      if (err) {
        console.error(err);
      }
      console.log(venue);
    };
    blapi.addToList(venue, cb);
  });

});  // end document ready function

