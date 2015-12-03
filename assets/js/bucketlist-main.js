'use strict';
var blapi = blapi || {};

$(document).ready(function() {
  $('#list-window').hide();
  $('#current-user').hide();

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
            'marker-color': '#fd8b34',
            'marker-size': 'small'
          })
        })
      .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' + venue.name + '</a></strong><br>' + venue.categories[0].name + '<br><a href="#list-window"><button type="button" class="btn-xs add-to-list" value="' + venue.name + '"">Add To List</button></a>')
        .addTo(foursquarePlaces);
    }
  };

  // register user
  $('#register').click(function(){
    var credentials = {
      username: $('#regUsername').val(),
      password: $('#regPassword').val(),
      confirmpassword: $('#confirmPassword').val()
    };
    var cb = function() {
    };
    if (credentials.password !== credentials.confirmPassword) {
      alert('Password and confirmation do not match');
      return;
    }
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
      $('#list-window').hide();
      $('#current-user').hide();
    };
    blapi.login(credentials, cb);
  });

  // logout user
  $('#logout').click(function(){
    var cb = function() {
    };
    blapi.logout(cb);
  });

  var refreshList = function(err, data){
    if (err) {
      console.error(err);
    }
    var listTemplateHTML = listTemplate({ list: data.list });
    $('#list-results').html(listTemplateHTML);
  };

  $('#map').on('click', '.add-to-list', function(){
    var venue = {
      venue: $(this).attr('value')
    };
    blapi.addToList(venue, function (err){
      if (err) {
        console.error(err);
      }
      blapi.showList(refreshList);
    });
  });

  var listTemplate = Handlebars.compile($('#list-template').html());

  $('#show-list').click(function(){
    blapi.showList(refreshList);
  });

// Show Update Form
  // $('#list-results').on('click', '.show-edit', function(e){
  //   e.preventDefault();
  //   var itemID = this.dataset.id;
  //   console.log($('.patch-form').find('[data-id="' + itemID + '"]').css());
  //   $('.patch-form').find("[data-id='" + itemID + "']").css('display:');
  // });

  // Note Patch Click Handler
  $('#list-results').on('submit', '.patch-form', function(e){
    e.preventDefault();

    var itemID = this.dataset.id;
    var noteContents = $(this).find('input[name="note"]').val();

    var updatedNote = {
      _id: itemID,
      note: noteContents
    };

    console.log(updatedNote);

    blapi.updateList(updatedNote, function(err){
      if (err) {
        console.error(err);
      }
      blapi.showList(refreshList);
    });
  });

  // Delete Post
  $('#list-results').on('click', '.delete-item', function(e){
    e.preventDefault();
    var itemID = this.dataset.id;
    var item = { _id: itemID };
    blapi.deleteItem(item, function(err){
      if (err){
        console.error(err);
      }
      console.log(JSON.stringify(item) + ' deleted');
      blapi.showList(refreshList);
    });
  });


});  // end document ready function
