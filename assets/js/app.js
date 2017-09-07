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
var options = {
  zoom: 6,
  center: {lat: 34.048927,lng: -111.093735}
  };

var dataArray = [];

//****************FUNCTIONS****************//

// It all starts with the click on the PinPoint! button...
  $("#pinpoint").on("click", function() {
      // To find out which dataset was checked, we'll grab all radio buttons
      var whichDataset = document.getElementsByName("datasets");
      var len = whichDataset.length;

      // Run a for loop thru them all, 
      for (var i=0; i<len; i++) {
        // find the one that is checked,
        if (whichDataset[i].checked) {
          // and get the value (json url) for that dataset.
          var dataValue = whichDataset[i].value;
          // var dataValue will be a local variable inside the scope of the onclick
          // functions. Vars declared and assigned in if statements and for loops fall  
          // into the scope of the parent since they are not themselves functions, 
          // but just code blocks.
          console.log("dataValue: "+dataValue);
        }
      }

  //Now that we know which dataset the user wants, let's proceed:

    // Performing an AJAX request with the queryURL aka dataValue
    $.ajax({
        url: dataValue,
        method: "GET"
      })
      // After data comes back from the request
      .done(function(response) {

        // Store the data into the global array
        for (var i = 0; i < response.length; i++) {
          dataArray.push(response[i]);

          // Now we have actions depending on which dataset was chosen.
          // If the data was the Drunk Driving Data...
          if (response[i].state && response[i].alcohol_impaired_driving_deaths) {

            // Start by creating the applicable options for the map
            options = {
              zoom: 4,
              // center of the continental USA
              center: {lat: 39.8283,lng: -98.5795}
              }

            // Next, store values for simplicity/clarity
            var deaths = response[i].alcohol_impaired_driving_deaths;
            var stName = response[i].state_state;
            // get the latitude and longitude values
            var x = response[i].state.coordinates[1];
            var y = response[i].state.coordinates[0];

            // object for coords
            var latLong = {coords:{lat: x,lng: y}};
            // object for onclick pop up window
            var deathsPopUp = {popUp:"<h4 id='pop'>"+stName+" had "+deaths+" drunk driver deaths</h4>"};
            // object for the marker labels
            var deathsLabel = {label:deaths};

            // add each object to the json object
            $.extend(response[i], deathsLabel, deathsPopUp, latLong);
          }
          // Else, if it the data is the Drug Deaths data
          // else if () {
          // }
          console.log(response[i]);
        }
        initMap();
      })
    });


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




//****************PSEUDOCODE****************//
  // User clicks on a radio button to select data
  // User clicks the PinPoint! button to display data
    // var options will need to be determined by which dataset the user selected 
    // the ajax call will use a url based off of the radio button the user selected


