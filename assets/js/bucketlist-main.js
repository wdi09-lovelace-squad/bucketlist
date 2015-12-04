'use strict';
var blapi = blapi || {};

$(document).ready(function() {
  $('#show-list').hide();
  $('#logAlert').hide();
  $('#regAlert').hide();
  $('#logProgress').hide();
  $('#regProgress').hide();

  $('#search').on('submit', function(e){
    e.preventDefault();
    var searchParams = {    keyword: $('#keyword').val(),
                            location: $('#location').val()
                      };
    $.ajax({
      url: 'http://calm-oasis-5849.herokuapp.com/venues',
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      processData: false,
      data: JSON.stringify(searchParams),
      dataType: 'json'
    }).done(function(data){
      foursquarePlaces.clearLayers();
      zoomLayer.clearLayers();
      var searchResultHTML = searchResultTemplate(data.response);
      $('#search-results').html(searchResultHTML);
      searchLayer(data);
      map.fitBounds(zoomLayer.getBounds());
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });

  });

  var searchResultTemplate = Handlebars.compile($('#search-result-template').html());

  // L and map ARE defined in index.html
  var foursquarePlaces = L.layerGroup().addTo(map);
  var zoomLayer = L.featureGroup();

  var searchLayer = function(data) {
    for (var i = 0; i < data.response.venues.length; i++) {
      var venue = data.response.venues[i];
      var latlng = L.latLng(venue.location.lat, venue.location.lng);
      var marker = L.marker(latlng, {
          icon: L.mapbox.marker.icon({
            'marker-color': '#fd8b34',
            'marker-size': 'small'
          }),
          title: venue.id
        })
      .bindPopup('<div id=' + venue.id + '><strong><a href="https://foursquare.com/v/' + venue.id + '">' + venue.name + '</a></strong><br>' + venue.categories[0].name + '<br><a href="#list-window"><button type="button" class="btn btn-default btn-xs add-to-list" value="' + venue.name + '""><i class="fa fa-plus fa-fw"></i> Add</button></a></div>')
        .addTo(foursquarePlaces).addTo(zoomLayer);
    }

  };

  // Hover handler for Search Results

  $('#search-results').on('mouseover', '.list-result', function(){
    var resultID = $(this).attr('value');
    foursquarePlaces.eachLayer(function(marker) {
      if (resultID === marker.options.title) {
        marker.openPopup();
      }
    });
  });

  // register user
  $('#register').click(function(){
    var credentials = {
      username: $('#regUsername').val(),
      password: $('#regPassword').val(),
      confirmpassword: $('#confirmPassword').val()
    };
    if (credentials.password !== credentials.confirmpassword) {
      $('#regAlert').show();
      return;
    } $('#current-user').html('<i class="fa fa-spinner fa-pulse"></i>  Logging in...');
      $('#regProgress').show();
    blapi.register(credentials, function(err) {
      if (err) {
        console.error(err);
      }
      //auto login on successful registration
    var regCb = function(err) {
      if (err){
        console.error(err);
        $('#current-user').html('Login/Register<span class="caret"></span>');
        return;
      } $('#regModal').modal('hide');
        $('#regProgress').hide();
      $('#current-user').html('Welcome, ' + $('#regUsername').val() + '! <span class="caret"></span>');
      $('#show-list').show();
    };

      blapi.login(credentials, regCb);
    });
  });


  // login user
  $('#login').click(function(){
    $('#current-user').html('<i class="fa fa-spinner fa-pulse"></i>  Logging in...');
    $('#logProgress').show();
    var credentials = {
      username: $('#logUsername').val(),
      password: $('#logPassword').val()
    };
    var loginCb = function(err) {
      if (err){
        console.error(err);
        $('#logAlert').show();
        $('#current-user').html('Login/Register<span class="caret"></span>');
        return;
      } $('#logModal').modal('hide');
        $('#logProgress').hide();
      $('#current-user').html('Welcome, ' + $('#logUsername').val() + '! <span class="caret"></span>');
      console.log($('#logUsername').val());
      $('#show-list').show();
    };
    blapi.login(credentials, loginCb);
  });

  // logout user
  $('#logout').click(function(){
    var cb = function(err) {
      if (err){
        console.error(err);
      }
      $('#current-user').html('Login/Register<span class="caret"></span>');
      $('#show-list').hide();
    };
    blapi.logout(cb);
  });


  // Handlebars list click handlers and stuff
  var refreshList = function(err, data){
    if (err) {
      console.error(err);
    }
    var listTemplateHTML = listTemplate({ list: data.list });
    $('#list-results').html(listTemplateHTML);
  };

  // add to list from map pin
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

  $('#search-results').on('click', '.add-from-search', function(){
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

  // list will refresh and open when you click in nav bar
  $('#show-list').on('click', function(){
    blapi.showList(refreshList);
  });

  // click on pencil will show update form
  $('#list-results').on('click', '.show-edit-form', function(e){
    e.preventDefault();
    var itemID = this.dataset.id;
    $('#list-results').on('.patch-form').find("[data-id='" + itemID + "']").toggle();
  });

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
