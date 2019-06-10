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

var arrRestaurants = []

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

// get zomato array results with this function

// function zomato_getRestaurantsList(city, food) {

// event.preventDefault()

// let z_cityId = $('#cityIDEntry').val().trim()
// let cuisines = $('#cuisineEntry').val().trim()

// console.log(z_cityId)
// console.log(cuisines)

// let URL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + z_cityId + "&entity_type=city&count=5&cuisines=" + cuisines;

// $.ajax({
//     url: URL,
//     method: "GET",
//     headers: {
//         "user-key": "e920da7569c4f29f6b0175e74f21679f"
//     },

//     success: function (response) {

//         console.log(response)

//         for (var i = 0; i < response.restaurants.length; i++) {
//             arrRestaurants.push(new restaurant(
//                 response.restaurants[i].restaurant.id,
//                 response.restaurants[i].restaurant.name,
//                 response.restaurants[i].restaurant.featured_image,
//                 response.restaurants[i].restaurant.location.address,
//                 response.restaurants[i].restaurant.location.city,
//                 response.restaurants[i].restaurant.location.zipcode,
//                 response.restaurants[i].restaurant.location.latitude,
//                 response.restaurants[i].restaurant.location.longitude,
//                 response.restaurants[i].restaurant.user_rating.aggregate_rating,
//                 response.restaurants[i].restaurant.user_rating.rating_text,
//                 response.restaurants[i].restaurant.average_cost_for_two,
//                 response.restaurants[i].restaurant.price_range
//             ));
//         }

//         console.log("Here comes the restaurants")
//         console.log(arrRestaurants);
//     }
// })
// }

// the restaurant function dynamically creating array with previous function

// function restaurant(id, name, photo_url, address, address_city, address_zipcode,lattitude, longitude, aggregate_rating, aggregate_rating_text, average_for2, price_range) {
//     this.id = id,
//     this.name = name,
//     this.photo_url = photo_url,
//     this.address = address,
//     this.address_city = address_city,
//     this.address_zipcode = address_zipcode
//     this.lattitude = lattitude,
//     this.longitude = longitude,
//     this.aggregate_rating = aggregate_rating,
//     this.aggregate_rating_text = aggregate_rating_text
//     this.average_for2 = average_for2,
//     this.price_range = price_range    
// }

// click to run zomato list

// $('#cuisineSubmit').on('click', zomato_getRestaurantsList)


// creating loop of duration API we found for each restuarant result to get duration

//   $('#durationSubmit').on('click', getDurationTime)