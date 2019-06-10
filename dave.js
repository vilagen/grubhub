var arrRestaurantsWithDistances = [];

function getDurationTime(array, homeGeo) {

  event.preventDefault()

  for (var i = 0; i < array.length; i++) {

    let restaurantlat = array[i].lattitude
    let restaurantlong = array[i].longitude
    let restaurantGeo = restaurantlat + ',' + restaurantlong
   
    callGoogleApi(array[i], homeGeo, restaurantGeo, array.length)

  }
}
function callGoogleApi(restaurant, homeGeo, restaurantGeo, arrLength) {

  var queryURL2 = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=|' + homeGeo +
    '&destinations=' + restaurantGeo + '&key=AIzaSyAwprJVRaKbbUc19bvkqHN_8ICjtUSVAJg'

  $.ajax({
    url: queryURL2,
    dataType: 'json',
    method: 'GET'
  }).then(function (response) {

    console.log(response)
    restaurant.address_google =  response.destination_addresses[0];
    restaurant.durationTime = response.rows[0].elements[0].duration.text;
    restaurant.kilometers = response.rows[0].elements[0].distance.text;
    arrRestaurantsWithDistances.push(restaurant);

   //When array is complete, send to next function
    if(arrRestaurantsWithDistances.length >= arrLength){
      //console.log("HERE COMES THE FINAL ARRAY")
      //console.log(arrRestaurantsWithDistances)

      display_results(arrRestaurantsWithDistances)
  
    }
  
  })
}



