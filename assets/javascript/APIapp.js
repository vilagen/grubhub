var z_cityId = $('#cityIDEntry').val().trim()
var cuisine = $('#cuisineEntry').val().trim()

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//        x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }

// var homeAddress = null

// // creating location of user with and pushing that to var homeAddress

// function showPosition(position) {
//         var lat = position.coords.latitude
//         var long = position.coords.longitude
//         homeAddress = lat + ', ' + long
//         console.log(lat)
//         console.log(long)
//         console.log(position.coords.latitude, position.coords.longitude)
//         console.log(homeAddress)
//        }

// // load location when page loads.
// document.addEventListener('DOMContentLoaded', function(){
//   getLocation()
// })

// // can use this to also show position, if we want to place that anywhere on the page.
// document.addEventListener('DOMContentLoaded', function(){ 
//   showPosition()
// })



function getDurationTime(arr) {   

    event.preventDefault()

    console.log(homeAddress)

    for(var i = 0; i < arrRestaurants.length; i++){
      let restaurantlat = arrRestaurants[i].lattitude
      let restaurantlong = arrRestaurants[i].longitude
      let restaurantGeo = restaurantlat + ', ' + restaurantlong
      let restaurantAddress = arrRestaurants[i].address

    var queryURL2 = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=|' + homeAddress + 
                    '&destinations=' + restaurantGeo + '&key=AIzaSyAwprJVRaKbbUc19bvkqHN_8ICjtUSVAJg'
    
    $.ajax({
    url: queryURL2,
    dataType: 'json',
    method: 'GET'
    }).then(function(response){

        let origin = response.origin_addresses[0]
        let destination = response.destination_addresses[0]
        let duration = response.rows[0].elements[0].duration.text
        let distance = response.rows[0].elements[0].distance.text

        let distDiv = $('<div>')
        let originDiv = $('<p>').text('Origin: ' + origin)
        let destDiv = $('<p>').text('Destination: ' + destination)
        let duraDiv = $('<p>').text('Duration: ' + duration)
        let mapDiv = $('<button>').text('Show Map').attr('class', 'mapID')
        
        $(distDiv).append(originDiv, destDiv, duraDiv, mapDiv)
        $('#show-duration').append(distDiv)   
     })
     $(document).on('click', 'button.mapID', function(){
      L.mapquest.key = '31FQyuhib3kxEon57rVHB1EnSyB5wogU';

      var map = L.mapquest.map('map', {
        center: [user_latitude, user_longitude],
        layers: L.mapquest.tileLayer('map'),
        zoom: 10
      });
    
      L.marker([user_latitude, user_longitude], {
        icon: L.mapquest.icons.marker(),
        draggable: false
      }).bindPopup(homeAddress).addTo(map);
    
      L.marker([restaurantlat, restaurantlong], {
        icon: L.mapquest.icons.marker(),
        draggable: false
      }).bindPopup(restaurantAddress).addTo(map);
      console.log(restaurantlat, restaurantlong, restaurantAddress)
     })
    }
  }