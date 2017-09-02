$(document).ready(function(){
 
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyA7EoNUx2snHlqW2iQyQUSfAAjNnOCtLps",
//     authDomain: "pinpoint-1504233261910.firebaseapp.com",
//     databaseURL: "https://pinpoint-1504233261910.firebaseio.com",
//     projectId: "pinpoint-1504233261910",
//     storageBucket: "pinpoint-1504233261910.appspot.com",
//     messagingSenderId: "290809530653"
//   };
//   firebase.initializeApp(config);

// var database = firebase.database();


// Google Map code
  function initMap() {

    // map options
    var options = {
        zoom: 5,
        center: {lat: 33.4484, lng: -112.0740}
    }

    // new map
    var map = google.maps.Map($("#map"), options);

    // add marker
    var marker = new google.maps.Marker({
      position: {lat:33.4255, lng:-111.9400},
      map: map,
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    })

  }



  //drunk driving deaths by state from 05-14 where driver had 0.8 or greater BAC
  // var queryURL = 'https://data.cdc.gov/resource/xhcb-kq4k.json';
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).done(function(data){
  //
  //
  //   var states = [];
  //   var deaths = [];
  //
  //   for(var i = 0; i < data.length; i++){
  //     states.push(data[i].state_state);
  //     deaths.push(data[i].alcohol_impaired_driving_deaths);
  //
  //     var newState = $('<p>');
  //     newState.text(states[i]);
  //     $('#states').append(newState);
  //
  //     var newDeath = $('<p>');
  //     newDeath.text(deaths[i]);
  //     $('#deaths').append(newDeath);
  //
  //
  //
  //     };
      /* sort number of casualties from highest to lowest
      deaths.sort(function(a,b){return b-a});
      console.log(deaths);
      */
  //   }
  //
  //
  // );

});
