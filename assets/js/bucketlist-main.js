'use strict';

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

  $("#register").click(function(){
    blapi.register(
      $("#regEmail").val(),
      $("#regPassword").val(),
      $("#cofirmPassword").val()
      );
  });

  // login session

  $("#login").click(function(){
    blapi.login(
      $("logemail").val(),
      $("#logPassword").val()
      );
  });

});
