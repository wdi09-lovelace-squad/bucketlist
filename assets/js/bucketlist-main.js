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
      .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' +
        venue.name + '</a></strong><br>' + venue.categories[0].name)
        .addTo(foursquarePlaces);
    }
  };

  // register user
  $("#regAlert").hide();
  $("#register").click(function(){
    var credentials = {
      username: $("#regEmail").val(),
      password: $("#regPassword").val(),
      password: $("#confirmPassword").val()
    };
    var cb = function() {

    }
    blapi.register(credentials, cb);
  });

  // login user
  $("#logAlert").hide();
  $("#login").click(function(){
    var credentials = {
      username: $("#logEmail").val(),
      password: $("#logPassword").val()
    };
    var cb = function() {
      $('#current-user').html($("#logEmail").val());
      console.log($('#logEmail').val());
    }
    blapi.login(credentials, cb);
  });

  // logout user
  $("#logout").click(function(){
    var cb = function() {

    }
    blapi.logout(cb);
  });

});  // end document ready function

