$(document).ready(function() {

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
    zoom: 4,
    center: {lat: 39.8283,lng: -98.5795}
}

var dataArray = [];
var years = [];



//****************FUNCTIONS****************//

function makeTimeButtons(){
  $('#timeButtons').empty();
  years.sort();

  for(var i=0; i<years.length; i++){
    var yearNum = parseInt(years[i]);
    var newBtn = $('<button>');
    newBtn.text(years[i]);
    newBtn.attr('data-year', yearNum);
    newBtn.addClass('btn btn-warning timeBtn');
    $('#timeButtons').append(newBtn);
  }
}

$('#drugTest').on("click", function(){
  var queryURL = 'https://data.maryland.gov/resource/ryrr-nv83.json';

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(data){
    dataArray = [];
    for(var i=0; i< data.length; i++){
      dataArray.push(data[i]);
      years.push(data[i].calendar_year);
    }

    makeTimeButtons();
  });


  initMarylandMap();

});

function initMarylandMap() {
  var theWire = {lat: 39.0458, lng: -76.6413};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: theWire
  });

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Drug Deaths in Maryland</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: theWire,
    map: map,
    title: 'Uluru (Ayers Rock)'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}







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
        dataArray = [];

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
