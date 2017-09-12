$(document).ready(function() {
  $('#alertUser').modal('show');
  // Initialize Firebase
  var database = firebase.database();

  //**************GLOBAL VARIABLES**************//



  // Google Map options. Initial settings on Arizona
  var options = {
    zoom: 6,
    center: {
      lat: 34.048927,
      lng: -111.093735
    }
  }

  var dataArray = [];
  var years = [];
  // This will be the year of data to be displayed
  // It will change onclick of a Time Button
  var clickedYear = 2016;
  // Separate year variable for the WW Pop data due to diff date range
  var year = 2014;




  //****************FUNCTIONS****************//

  // It all starts with the click on the PinPoint! button...
  $("#pinpoint").on("click", function() {

    // Begin by emptying Time Buttons and reseting arrays
    $("#timeArea").empty();

    // Empty both global arrays first
    dataArray = [];
    years = [];

    // Now we'll grab all radio buttons to find out which dataset was checked
    var whichDataset = document.getElementsByName("datasets");

    // Run a for loop thru them all,
    var len = whichDataset.length;
    for (var i = 0; i < len; i++) {

      // find the one that is checked,
      if (whichDataset[i].checked) {

        // and get the value (json url) for that dataset.
        var dataValue = whichDataset[i].value;
        // var dataValue will be a local variable inside the scope of the #pinpoint
        // onclick functions. Vars declared and assigned in if statements and for loops
        // fall into the scope of the parent since they are not themselves functions,
        // but just code blocks.
      }
    }

    // Now that we know which dataset the user wants, let's proceed:
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
          // If it the data is the ***DRUG DEATHS*** data
          if (response[i].calendar_year) {

            // Store the year values in the years array for the Time Buttons
            years.push(response[i].calendar_year);

            // Add buttons to bottom left for going through time choices
            makeTimeButtons();

            // Set the map options for location and zoom
            options = {
              zoom: 8,
              // Baltimore, MD
              center: {
                lat: 39.2904,
                lng: -76.6122
              }
            }

            // Next, store values for simplicity/clarity
            // get the latitude and longitude values for Baltimore
            var x = 39.2904;
            var y = -76.6122;
            // object for coords
            var latLong = {
              coords: {
                lat: x,
                lng: y
              }
            };

            // These will be the values of deaths for the corresponding year only
            // See global var clickedYear for correct year
            // This value changes when the user clicks a Time Button
            if (response[i].calendar_year == clickedYear) {
              var alcohol = response[i].alcohol_deaths;
              var benzo = response[i].benzodiazepine_deaths;
              var cocaine = response[i].cocaine_deaths;
              var fentanyl = response[i].fentanyl_deaths;
              var heroin = response[i].heroin_deaths;
              var opiod = response[i].prescription_opiod_deaths;
            }

            // Create the infoWindow content
            var deathsPopUp = {
              popUp: '<div id="pop">' +
                '<div class="popTitle">Overdose Deaths in Maryland in ' + clickedYear + '</div>' +
                '<ul>' +
                '<li>Alcohol: ' + alcohol + '</li>' +
                '<li>Benzodiazepine:  ' + benzo + '</li>' +
                '<li>Cocaine:  ' + cocaine + '</li>' +
                '<li>Fentanyl:  ' + fentanyl + '</li>' +
                '<li>Heroin:  ' + heroin + '</li>' +
                '<li>Prescription Opiod:  ' + opiod + '</li>' +
                '</ul>' +
                '</div>'
            };

            // add each object to the json object
            $.extend(response[i], deathsPopUp, latLong);
          }

          // Else, if the data was the ***DRUNK DRIVING*** data...
          else if (response[i].state && response[i].alcohol_impaired_driving_deaths) {

            // Start by changing map options for location and zoom
            options = {
              zoom: 4,
              // center of the continental USA
              center: {
                lat: 39.8283,
                lng: -98.5795
              }
            }

            // Next, store values for simplicity/clarity
            var deaths = response[i].alcohol_impaired_driving_deaths;
            var stName = response[i].state_state;

            // get the latitude and longitude values
            var x = response[i].state.coordinates[1];
            var y = response[i].state.coordinates[0];

            // object for coords
            var latLong = {
              coords: {
                lat: x,
                lng: y
              }
            };
            // infoWindow content 
            var deathsPopUp = {
              popUp: "<div id='pop'><div class='popTitle'>" + stName + "</div><p>" + deaths + " drunk driver deaths</p></div>"
            };
            // object for the marker labels
            var deathsLabel = {
              label: deaths
            };

            // add each object to the json object
            $.extend(response[i], deathsLabel, deathsPopUp, latLong);
          }

          // Else, if it the data is the ***WW POP*** data
          else if (response[i].countryName && response[i].popData) {
            
            years = [];
            
            // Store the year values in the years array for the Time Buttons
            for (var j = 1990; j < 2015; j++) {

              years.push(response[i].popData[j].year);
            }

            // Add buttons to bottom left for going through time choices
            makeTimeButtons();

            // Start by changing map options for location and zoom
            options = {
              zoom: 2,
              // Center of the global map
              center: {
                lat: 15,
                lng: 0
              }
            }

            // Next, store values for simplicity/clarity
            var country = response[i].countryName;
            var children = response[i].popData[year].percent_0_to_14;
            var adults = response[i].popData[year].percent_15_to_64;
            var elderly = response[i].popData[year].percent_65_plus;
            var totalPop = response[i].popData[year].total;

            // object for onclick pop up window
            var popPopUp = {popUp:
              '<div id="pop">' +
                '<h3 class="popTitle">Population breakdown for ' + country + ' in ' + year + ':</h3>' +
                  '<ul>' +
                    '<li>Total Population: '+ totalPop +'</li>' +
                    '<li>Ages 0 to 14:  '+ children +'</li>' +
                    '<li>Ages 15 to 64:  '+ adults +'</li>' +
                    '<li>Ages 65+:  '+ elderly +'</li>' +
                  '</ul>' +
              '</div>'};

            // add each object to the json object
            $.extend(response[i], popPopUp);

          }
          console.log(response[i]);
        }
        initMap();
      })
  });


  // Creat buttons in bottom left to sort thru years of data
  function makeTimeButtons() {
    // Create the HTML for where to display this
    var title = "<p>Time</p>";
    var buttons = "<div id='timeButtons'></div>"
    $("#timeArea").html(title + buttons);
    $('#timeButtons').empty();

    years.sort();
    for (var i = 0; i < years.length; i++) {
      var yearNum = parseInt(years[i]);
      var newBtn = $('<button>');
      newBtn.text(years[i]);
      newBtn.attr('data-year', yearNum);
      newBtn.addClass('btn btn-warning timeBtn');
      $('#timeButtons').append(newBtn);
    }
  };

  //added dynamically generated button onclick to pull data year
  $(document).on("click", '.timeBtn', grabYear);

  function grabYear(){
    let years = $(this).attr('data-year');
    console.log(years);
    console.log(dataArray);
    clickedYear = years;
    year = years;
    for (var i = 0; i < dataArray.length; i++) {
      // Now we have actions depending on which dataset was chosen.
      // If it the data is the ***DRUG DEATHS*** data
      if (dataArray[i].calendar_year) {


        // These will be the values of deaths for the corresponding year only
        // See global var clickedYear for correct year
        // This value changes when the user clicks a Time Button
        if (dataArray[i].calendar_year == clickedYear) {
          var alcohol = dataArray[i].alcohol_deaths;
          var benzo = dataArray[i].benzodiazepine_deaths;
          var cocaine = dataArray[i].cocaine_deaths;
          var fentanyl = dataArray[i].fentanyl_deaths;
          var heroin = dataArray[i].heroin_deaths;
          var opiod = dataArray[i].prescription_opiod_deaths;
        }

        var deathsPopUp = {
          popUp: '<div id="pop">' +
            '<div class="popTitle">Overdose Deaths in Maryland in ' + clickedYear + '</div>' +
            '<ul>' +
            '<li>Alcohol: ' + alcohol + '</li>' +
            '<li>Benzodiazepine:  ' + benzo + '</li>' +
            '<li>Cocaine:  ' + cocaine + '</li>' +
            '<li>Fentanyl:  ' + fentanyl + '</li>' +
            '<li>Heroin:  ' + heroin + '</li>' +
            '<li>Prescription Opiod:  ' + opiod + '</li>' +
            '</ul>' +
            '</div>'
        };
        // add each object to the json object
        $.extend(dataArray[i], deathsPopUp);
      }

      else if (dataArray[i].countryName && dataArray[i].popData) {
        
        var country = dataArray[i].countryName;
        var children = dataArray[i].popData[year].percent_0_to_14;
        var adults = dataArray[i].popData[year].percent_15_to_64;
        var elderly = dataArray[i].popData[year].percent_65_plus;
        var totalPop = dataArray[i].popData[year].total;

        // object for onclick pop up window
        var popPopUp = {popUp:
          '<div id="pop">' +
            '<h3 class="popTitle">Population breakdown for ' + country + ' in ' + year + ':</h3>' +
              '<ul>' +
                '<li>Total Population: '+ totalPop +'</li>' +
                '<li>Ages 0 to 14:  '+ children +'</li>' +
                '<li>Ages 15 to 64:  '+ adults +'</li>' +
                '<li>Ages 65+:  '+ elderly +'</li>' +
              '</ul>' +
          '</div>'};

        // add each object to the json object
        $.extend(dataArray[i], popPopUp);

      }
  }
  initMap();
}





//**************GOOGLE MAP**************//
  function initMap() {
    // new map
    var map = new google.maps.Map(document.getElementById("map"), options);


    // Add Marker Function
    function addMarker(props) {
      var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
        label: props.label
      });

      // check for custom icon
      if (props.iconImage) {
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
        marker.addListener("click", function() {
          infoWindow.open(map, marker);
        });
      }
    }

    // Adds a marker for each object in the dataArray
    for (var i = 0; i < dataArray.length; i++) {
      addMarker(dataArray[i]);
    }

    // Add markers on click on map
    // listen for click on map
    //google.maps.event.addListener(map, "click", function(event){
    // add marker at location of click
    //addMarker({coords:event.latLng});
    //});
  };

  google.maps.event.addDomListener(window, "load", initMap);

google.maps.event.addListener(infowindow, 'domready', function() {

   // Reference to the DIV which receives the contents of the infowindow using jQuery
   var iwOuter = $('.gm-style-iw');

   /* The DIV we want to change is above the .gm-style-iw DIV.
    * So, we use jQuery and create a iwBackground variable,
    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
    */
   var iwBackground = iwOuter.prev();

   // Remove the background shadow DIV
   iwBackground.children(':nth-child(2)').css({'display' : 'none'});

   // Remove the white background DIV
   iwBackground.children(':nth-child(4)').css({'display' : 'none'});


 });

  // Closes the whole document.ready function
});
