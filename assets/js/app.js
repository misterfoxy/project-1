$(document).ready(function() {
  $('#alertUser').modal('show');


  //**************GLOBAL VARIABLES**************//



    // Google Map options. Initial settings on Arizona
    var options = {
      zoom: 6,
      center: {
        lat: 34.048927,
        lng: -111.093735
      }
    }

    // Push the json's into this array
    var dataArray = [];
    // As needed, we generate Time Buttons for data.
    // Initially, year values are stored in this array,
    var years = [];
    // then we remove duplicates and store in this array.
    var uniqueYears = [];

    // This will be the year of data to be displayed
    // It will change onclick of a Time Button
    var clickedYear = 2014;

    var dataValue = "";


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
          })
        }
      }

      // Adds a marker for each object in the dataArray
      for (var i = 0; i < dataArray.length; i++) {
        addMarker(dataArray[i]);
      }

    };

    google.maps.event.addDomListener(window, "load", initMap);

  //****************FUNCTIONS****************//

    // Each dataset has it's own function for the time being.
    // Long term, we would want to make this as generic as possible
    // or have users define necessary values for us. (ie collumn 3 is the year or city name)
      // MD Drug Death (dataset #1) function
      function dataset1 () {

        for (var j = 0; j < dataArray.length; j++) {


          // Must clear the years array w each pass or it'll dup populate due to for loop in a for loop
          years = [];

          // Store the year values in the years array for the Time Buttons
          years.push(dataArray[j].calendar_year);

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
          if (dataArray[j].calendar_year == clickedYear) {
            var alcohol = dataArray[j].alcohol_deaths;
            var benzo = dataArray[j].benzodiazepine_deaths;
            var cocaine = dataArray[j].cocaine_deaths;
            var fentanyl = dataArray[j].fentanyl_deaths;
            var heroin = dataArray[j].heroin_deaths;
            var opiod = dataArray[j].prescription_opiod_deaths;
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
          $.extend(dataArray[j], deathsPopUp, latLong);
        }
      };

      // US Drunk Driving (dataset #2) function
      function dataset2 () {

        for (var i = 0; i < dataArray.length; i++) {

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
          var deaths = dataArray[i].alcohol_impaired_driving_deaths;
          var allDeaths = dataArray[i].occupant_deaths;
          var stName = dataArray[i].state_state;

          // get the latitude and longitude values
          var x = dataArray[i].state.coordinates[1];
          var y = dataArray[i].state.coordinates[0];

          // object for coords
          var latLong = {
            coords: {
              lat: x,
              lng: y
            }
          };
          // infoWindow content
          var deathsPopUp = {
            popUp: "<div id='pop'><div class='popTitle'>" + stName + "</div>" +
            "<p>" + deaths + " drunk driver deaths</p>" +
            "<p>"+allDeaths+" total auto fatalities due to a drunk driver</p>"+
            "</div>"
          };
          // object for the marker labels
          var deathsLabel = {
            label: deaths
          };

          // add each object to the json object
          $.extend(dataArray[i], deathsLabel, deathsPopUp, latLong);

        }
      };

      // WW Pop (dataset #3) function
      function dataset3 () {

        for (var i = 0; i < dataArray.length; i++) {

          // Must clear the years array w each pass or it'll dup populate due to for loop in a for loop
          years = [];

          // Store the year values in the years array for the Time Buttons
          for (var j = 1990; j < 2015; j++) {
            years.push(dataArray[i].popData[j].year);
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
          var country = dataArray[i].countryName;
          var children = Math.round(dataArray[i].popData[clickedYear].percent_0_to_14);
          var adults = Math.round(dataArray[i].popData[clickedYear].percent_15_to_64);
          var elderly = Math.round(dataArray[i].popData[clickedYear].percent_65_plus);
          var totalPop = dataArray[i].popData[clickedYear].total;

          // object for onclick pop up window
          var popPopUp = {popUp:
            '<div id="pop">' +
              '<h3 class="popTitle">Population breakdown for ' + country + ' in ' + clickedYear + ':</h3>' +
                '<ul>' +
                  '<li>Total Population: '+ totalPop +'</li>' +
                  '<li>Ages 0 to 14:  '+ children +'%</li>' +
                  '<li>Ages 15 to 64:  '+ adults +'%</li>' +
                  '<li>Ages 65+:  '+ elderly +'%</li>' +
                '</ul>' +
            '</div>'};

          // add each object to the json object
          $.extend(dataArray[i], popPopUp);
        }
      };


    // Creat buttons in bottom left to sort thru years of data
    function makeTimeButtons() {

      // Create the HTML for where to display this and clear it to begin.
      var title = "<p>Time</p>";
      var buttons = "<div id='timeButtons'></div>"
      $("#timeArea").html(title + buttons);
      $('#timeButtons').empty();

      // Gets rid of any duplicate entries in the years array and stores in uniqueYears
      $.each(years, function(i, el){
        if($.inArray(el, uniqueYears) === -1) uniqueYears.push(el);
      });

      // Sort the buttons and create the HTML for them.
      uniqueYears.sort();
      for (var i = 0; i < uniqueYears.length; i++) {
        var yearNum = parseInt(uniqueYears[i]);
        var newBtn = $('<button>');
        newBtn.text(uniqueYears[i]);
        newBtn.attr('data-year', yearNum);
        newBtn.addClass('btn btn-warning timeBtn');
        $('#timeButtons').append(newBtn);
      }
    };


    // Gets the year value and displays the relevant data
    function grabYear(){

      // Get the data-year value from the Time Button that was clicked
      clickedYear = $(this).attr('data-year');

      // Loop thru the dataArray,
      for (var i = 0; i < dataArray.length; i++) {

        // and depending on which dataset it is, get new values and display relevant data.
        if (dataValue === "https://data.maryland.gov/resource/ryrr-nv83.json") {

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

        else if (dataValue === "https://pinpoint-1504233261910.firebaseio.com/newWorldPopData.json") {

          var country = dataArray[i].countryName;
          var children = Math.round(dataArray[i].popData[clickedYear].percent_0_to_14);
          var adults = Math.round(dataArray[i].popData[clickedYear].percent_15_to_64);
          var elderly = Math.round(dataArray[i].popData[clickedYear].percent_65_plus);
          var totalPop = dataArray[i].popData[clickedYear].total;

          // object for onclick pop up window
          var popPopUp = {popUp:
            '<div id="pop">' +
              '<h3 class="popTitle">Population breakdown for ' + country + ' in ' + clickedYear + ':</h3>' +
                '<ul>' +
                  '<li>Total Population: '+ totalPop +'</li>' +
                  '<li>Ages 0 to 14:  '+ children +'%</li>' +
                  '<li>Ages 15 to 64:  '+ adults +'%</li>' +
                  '<li>Ages 65+:  '+ elderly +'%</li>' +
                '</ul>' +
            '</div>'};

          // add each object to the json object
          $.extend(dataArray[i], popPopUp);
        }
      }

      initMap();

    }



  //****************MAIN PROCESS****************//
    // It all starts with the click on the PinPoint! button...
    $("#pinpoint").on("click", function() {

      // Begin by emptying Time Buttons and reseting arrays
      $("#timeArea").empty();

      // Empty both global arrays first
      dataArray = [];
      years = [];
      uniqueYears = [];
      clickedYear = 2014;



      // Now we'll grab all radio buttons to find out which dataset was checked
      var whichDataset = document.getElementsByName("datasets");

      // Run a for loop thru them all,
      var len = whichDataset.length;
      for (var i = 0; i < len; i++) {

        // find the one that is checked,
        if (whichDataset[i].checked) {

          // and get the value (json url) for that dataset.
          dataValue = whichDataset[i].value;
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
            if (dataValue === "https://data.maryland.gov/resource/ryrr-nv83.json") {
              dataset1();
              $('#currentDataset').text("Change over time in set location");
            }

            // Else, if the data was the ***DRUNK DRIVING*** data...
            else if (dataValue === "https://data.cdc.gov/resource/xhcb-kq4k.json") {
              dataset2();
              $('#currentDataset').text("Value of multiple locations for set time");
            }

            // Else, if it the data is the ***WW POP*** data
            else if (dataValue === "https://pinpoint-1504233261910.firebaseio.com/newWorldPopData.json") {
              dataset3();
              $('#currentDataset').text("Long Term Vision of Project");
            }
            
          }

          initMap();

        })
    });


    // Added dynamically generated button onclick to pull data year
    $(document).on("click", '.timeBtn', grabYear);

});
