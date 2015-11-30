'use strict';
$(document).ready(function(){

  // Setup
  $("#regAlert").hide();
  $("#logAlert").hide();

  // register session
  $("#register").click(function(){
    session.register( $("#regEmail").val(), $("#regPassword").val(), $("#confirmPassword").val() );
  });

  // login session
  $("#login").click(function(){
    session.login( $("#logEmail").val(), $("#logPassword").val(), function(){
    });
  });

}); // end of document ready function
