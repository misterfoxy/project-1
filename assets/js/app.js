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
      zoom: 10,
      center: {lat: 33.4484,lng: -112.0740}
  }

  // new map
  var map = new google.maps.Map(document.getElementById("map"), options);

  // listen for click on map
  google.maps.event.addListener(map, "click", function(event){
    // add marker at location of click
    addMarker({coords:event.latLng});
  });

  // Add Marker Function 
  function addMarker(props){
    var marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    // icon: props.iconImage
  });
  
    // check for custom icon
    if(props.iconImage) {
      // set icon image
      marker.setIcon(props.iconImage);
    }
    // check for content
    if (props.content) {
      // pop-up window
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });
      // click the marker to show the window
      marker.addListener("click", function(){
        infoWindow.open(map, marker);
      });
    }
  }


  // Array of markers
  var markers = [
    {
    coords:{lat:33.4255,lng:-111.9400},
    iconImage: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    content: "<h4>Tempe, AZ</h4>"
    },
    {
    coords:{lat: 33.307575,lng: -111.844940},
    content: "<h4>Chandler, AZ</h4>"
    },
    {
    coords:{lat: 33.5806,lng: -112.2374},
    content: "<h4>Peoria, AZ</h4>"
    }
  ];

  // loop thru markers array
  for (var i = 0; i < markers.length; i++){
    addMarker(markers[i]);
  }       
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
