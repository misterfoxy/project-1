$(document).ready(function(){

  function initMap() {
          var uluru = {lat: -25.363, lng: 131.044};
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
          });
          var marker = new google.maps.Marker({
            position: uluru,
            map: map
          });
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
