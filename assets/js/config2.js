//  Used this for fixing messes while re-arraging data...good times, good times....

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA7EoNUx2snHlqW2iQyQUSfAAjNnOCtLps",
  authDomain: "pinpoint-1504233261910.firebaseapp.com",
  databaseURL: "https://pinpoint-1504233261910.firebaseio.com",
  projectId: "pinpoint-1504233261910",
  storageBucket: "pinpoint-1504233261910.appspot.com",
  messagingSenderId: "290809530653"
};
firebase.initializeApp(config);

var database = firebase.database();


// $.ajax({
//     url: "https://pinpoint-1504233261910.firebaseio.com/newWorldPopData.json",
// method: "GET"
// })
// .done(function(response) {

//     for (var i = 0; i < response.length; i++) {

//         var getCoords = response[i].coords;

//         database.ref("worldPop/"+i+"/").update({
//             coords: getCoords
//         })

//     }
// });



$.ajax({
	url: "https://pinpoint-1504233261910.firebaseio.com/newWorldPopData.json",
method: "GET"
})
.done(function(response) {

    for (var i = 0; i < response.length; i++) {

      var newPopDataObj = {
        1990: {
            year: 1990
        }, 
      };
      
      database.ref("newWorldPopData/"+i+"/popData").set({
        year: newPopDataObj
      });

    };
});
  

