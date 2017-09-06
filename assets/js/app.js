$(document).ready(function(){

// Initialize Firebase
var database = firebase.database();

//**************GLOBAL VARIABLES**************//

// Array of markers...used for early testing
var markers = [
  {
  coords:{lat:33.4255,lng:-111.9400},
  iconImage: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  popUp: "<h4>Tempe, AZ</h4>"
  },
  {
  coords:{lat: 33.307575,lng: -111.844940},
  popUp: "<h4>Chandler, AZ</h4>"
  },
  {
  coords:{lat: 33.5806,lng: -112.2374},
  popUp: "<h4>Peoria, AZ</h4>"
  }
];
var options = {};

var dataArray = [];

//****************FUNCTIONS****************//

// Adding click event listen listener to testDD button
  $("#testDD").on("click", function() {

    // Constructing a queryURL
    var queryURL = "https://data.cdc.gov/resource/xhcb-kq4k.json";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After data comes back from the request
      .done(function(response) {

        // Store the data into the global array
        for (var i = 0; i < response.length; i++) {
          dataArray.push(response[i]);

          if (response[i].state && response[i].alcohol_impaired_driving_deaths) {
            // store values for simplicity/clarity
            var deaths = response[i].alcohol_impaired_driving_deaths;
            var stName = response[i].state_state;
            // get the latitude and longitude values
            var x = response[i].state.coordinates[1];
            var y = response[i].state.coordinates[0];

            // new, correctly laid out object for coords
            var latLong = {coords:{lat: x,lng: y}};
            // new object for onclick pop up window
            var deathsPopUp = {popUp:"<h4 id='pop'>"+stName+" had "+deaths+" drunk driver deaths</h4>"};
            // new object for the marker labels
            var deathsLabel = {label:deaths};

            // add each object to the json object
            $.extend(response[i], deathsLabel, deathsPopUp, latLong);
          }

          console.log(response[i]);

        }

        initMap();

      });
  });


//**************GOOGLE MAP**************//
  function initMap() {

    // map options
      options = {
        zoom: 4,
        center: {lat: 39.8283,lng: -98.5795}
    }

    // new map
    var map = new google.maps.Map(document.getElementById("map"), options);

    // // Add markers on click on map
    //   // listen for click on map
    //   google.maps.event.addListener(map, "click", function(event){
    //     // add marker at location of click
    //     addMarker({coords:event.latLng});
    //   });

    // Add Marker Function
      function addMarker(props){
        var marker = new google.maps.Marker({
          position: props.coords,
          map: map,
          label: props.label
        });

        // check for custom icon
        if(props.iconImage) {
          // set icon image
          marker.setIcon(props.iconImage);
        }
        // check for popUp
        if (props.popUp) {
          // pop-up window
          var infoWindow = new google.maps.InfoWindow({
            content: props.popUp
          });
          // click the marker to show the window
          marker.addListener("click", function(){
            infoWindow.open(map, marker);
          });
        }
      }


      // loop thru markers array
      for (var i = 0; i < dataArray.length; i++){
        addMarker(dataArray[i]);
      }
  };

  google.maps.event.addDomListener(window, "load", initMap);



});
