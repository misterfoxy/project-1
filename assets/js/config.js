

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

// This code was for reorganizing the data in the World Wide Population data set.  

 /* 
  $.ajax({
  	url: "https://pinpoint-1504233261910.firebaseio.com/worldPop.json",
    method: "GET"
  })
  .done(function(response) {

    for (var i = 0; i < response.length; i++) {

      var newCountryNameObj = response[i].countryName;
      var newCoordsObj = response[i].coords;
      // Tried for far too long to accomplish the following in a for loop
      // As far as I could figure, you cannot pass a variable for a key value;
      // as such, this wouldn't work for a for loop as I had hoped. 
      var newPopDataObj = {
        1990: {
          // It is important to take note of HOW to get the property for this key,
          // namely the ending number in brackets. 
        percent_0_to_14: response[i].popData.percent_0_to_14[1990], 
        percent_15_to_64: response[i].popData.percent_15_to_64[1990], 
        percent_65_plus: response[i].popData.percent_65_plus[1990], 
        total: response[i].popData.total[1990],
        year: 1990
        }, 
        1991: {
        percent_0_to_14: response[i].popData.percent_0_to_14[1991], 
        percent_15_to_64: response[i].popData.percent_15_to_64[1991], 
        percent_65_plus: response[i].popData.percent_65_plus[1991], 
        total: response[i].popData.total[1991],
        year: 1991
        }, 
        1992: {
        percent_0_to_14: response[i].popData.percent_0_to_14[1992], 
        percent_15_to_64: response[i].popData.percent_15_to_64[1992], 
        percent_65_plus: response[i].popData.percent_65_plus[1992], 
        total: response[i].popData.total[1992],
        year: 1992
        }, 
        1993: {
        percent_0_to_14: response[i].popData.percent_0_to_14[1993], 
        percent_15_to_64: response[i].popData.percent_15_to_64[1993], 
        percent_65_plus: response[i].popData.percent_65_plus[1993], 
        total: response[i].popData.total[1993],
        year: 1993
        }, 
        1994: {
        percent_0_to_14: response[i].popData.percent_0_to_14[1994], 
        percent_15_to_64: response[i].popData.percent_15_to_64[1994], 
        percent_65_plus: response[i].popData.percent_65_plus[1994], 
        total: response[i].popData.total[1994],
        year: 1994
        }, 
        1995: {
        percent_0_to_14: response[i].popData.percent_0_to_14[1995], 
        percent_15_to_64: response[i].popData.percent_15_to_64[1995], 
        percent_65_plus: response[i].popData.percent_65_plus[1995], 
        total: response[i].popData.total[1995],
        year: 1995
        }, 
        1996: {
        percent_0_to_14: response[i].popData.percent_0_to_14[1996], 
        percent_15_to_64: response[i].popData.percent_15_to_64[1996], 
        percent_65_plus: response[i].popData.percent_65_plus[1996], 
        total: response[i].popData.total[1996],
        year: 1996
        }, 
        1997: {
        percent_0_to_14: response[i].popData.percent_0_to_14[1997], 
        percent_15_to_64: response[i].popData.percent_15_to_64[1997], 
        percent_65_plus: response[i].popData.percent_65_plus[1997], 
        total: response[i].popData.total[1997],
        year: 1997
        }, 
        1998: {
        percent_0_to_14: response[i].popData.percent_0_to_14[1998], 
        percent_15_to_64: response[i].popData.percent_15_to_64[1998], 
        percent_65_plus: response[i].popData.percent_65_plus[1998], 
        total: response[i].popData.total[1998],
        year: 1998
        }, 
        1999: {
        percent_0_to_14: response[i].popData.percent_0_to_14[1999], 
        percent_15_to_64: response[i].popData.percent_15_to_64[1999], 
        percent_65_plus: response[i].popData.percent_65_plus[1999], 
        total: response[i].popData.total[1999],
        year: 1999
        }, 
        2000: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2000], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2000], 
        percent_65_plus: response[i].popData.percent_65_plus[2000], 
        total: response[i].popData.total[2000],
        year: 2000
        }, 
        2001: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2001], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2001], 
        percent_65_plus: response[i].popData.percent_65_plus[2001], 
        total: response[i].popData.total[2001],
        year: 2001
        }, 
        2002: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2002], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2002], 
        percent_65_plus: response[i].popData.percent_65_plus[2002], 
        total: response[i].popData.total[2002],
        year: 2002
        }, 
        2003: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2003], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2003], 
        percent_65_plus: response[i].popData.percent_65_plus[2003], 
        total: response[i].popData.total[2003],
        year: 2003
        }, 
        2004: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2004], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2004], 
        percent_65_plus: response[i].popData.percent_65_plus[2004], 
        total: response[i].popData.total[2004],
        year: 2004
        }, 
        2005: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2005], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2005], 
        percent_65_plus: response[i].popData.percent_65_plus[2005], 
        total: response[i].popData.total[2005],
        year: 2005
        }, 
        2006: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2006], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2006], 
        percent_65_plus: response[i].popData.percent_65_plus[2006], 
        total: response[i].popData.total[2006],
        year: 2006
        }, 
        2007: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2007], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2007], 
        percent_65_plus: response[i].popData.percent_65_plus[2007], 
        total: response[i].popData.total[2007],
        year: 2007
        }, 
        2008: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2008], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2008], 
        percent_65_plus: response[i].popData.percent_65_plus[2008], 
        total: response[i].popData.total[2008],
        year: 2008
        }, 
        2009: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2009], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2009], 
        percent_65_plus: response[i].popData.percent_65_plus[2009], 
        total: response[i].popData.total[2009],
        year: 2009
        }, 
        2010: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2010], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2010], 
        percent_65_plus: response[i].popData.percent_65_plus[2010], 
        total: response[i].popData.total[2010],
        year: 2010
        }, 
        2011: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2011], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2011], 
        percent_65_plus: response[i].popData.percent_65_plus[2011], 
        total: response[i].popData.total[2011],
        year: 2011
        }, 
        2012: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2012], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2012], 
        percent_65_plus: response[i].popData.percent_65_plus[2012], 
        total: response[i].popData.total[2012],
        year: 2012
        }, 
        2013: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2013], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2013], 
        percent_65_plus: response[i].popData.percent_65_plus[2013], 
        total: response[i].popData.total[2013],
        year: 2013
        }, 
        2014: {
        percent_0_to_14: response[i].popData.percent_0_to_14[2014], 
        percent_15_to_64: response[i].popData.percent_15_to_64[2014], 
        percent_65_plus: response[i].popData.percent_65_plus[2014], 
        total: response[i].popData.total[2014],
        year: 2014
        }, 
      };
      
      // Create a new data series called newWorldPopData with the desired layout.
      database.ref("newWorldPopData/"+i+"/").update({
        countryName: newCountryNameObj,
        coords: newCoordsObj,
        popData: newPopDataObj
      });

    };
  });
  */
  

