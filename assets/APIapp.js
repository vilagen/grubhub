var x = document.getElementById('show-geolocation');
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
       x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// creating location of user with and pushing that to var homeAddress

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
       "<br>Longitude: " + position.coords.longitude;
        var lat = position.coords.latitude
        var long = position.coords.longitude
        homeAddress = lat + ', ' + long
        console.log(lat)
        console.log(long)
        console.log(position.coords.latitude, position.coords.longitude)
        console.log(homeAddress)
       }

var homeAddress = null

document.addEventListener('DOMContentLoaded', function(){
  getLocation()
})

document.addEventListener('DOMContentLoaded', function(){ 
  showPosition()
})

// creating loop of duration API we found for each restuarant result to get duration

function getDurationTime(arr) {    
    event.preventDefault()

    for(var i = 0; i < arrRestaurants.length; i++){
      let restaurantlat = arrRestaurants[i].lattitude
      let restaurantlong = arrRestaurants[i].longitude
      let restaurantGeo = restaurantlat + ', ' + restaurantlong
      console.log(restaurantGeo)

    var queryURL2 = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=|' + homeAddress + 
                    '&destinations=' + restaurantGeo + '&key=AIzaSyAwprJVRaKbbUc19bvkqHN_8ICjtUSVAJg'
    
    $.ajax({
    url: queryURL2,
    dataType: 'json',
    method: 'GET'
    }).then(function(response){
        console.log(response)
        console.log(response.destination_addresses[0])
        console.log(response.origin_addresses[0])
        console.log(response.rows[0].elements[0].duration.text)

        let origin = response.origin_addresses[0]
        let destination = response.destination_addresses[0]
        let duration = response.rows[0].elements[0].duration.text

        let distDiv = $('<div>')
        let originDiv = $('<p>').text('Origin: ' + origin)
        let destDiv = $('<p>').text('Destination: ' + destination)
        let duraDiv = $('<p>').text('Duration: ' + duration)
        
        $(distDiv).append(originDiv, destDiv, duraDiv)
        $('#show-duration').append(distDiv)        
     })
    }
  }

  $('#durationSubmit').on('click', getDurationTime)