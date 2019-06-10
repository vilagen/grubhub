var z_cityId = 0;


function zomato_getCuisines(latitude, longitude, cityName) {

    //Get city id by latitude and longitude
    if (latitude !== "" && longitude !== "") {

        let URL = "https://developers.zomato.com/api/v2.1/geocode?lat=" + latitude + "&lon=" + longitude

        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                "user-key": "e920da7569c4f29f6b0175e74f21679f"
            },
            success: function (response) {

                z_cityId = response.location.city_id;
                zomato_getCuisines_byCityID(z_cityId);

            }
        })

        //Get cit id by name
    } else if (cityName !== "") {

        let z_cityId = 0;
        let city = "";

        //Replace spaces and commas in city name for query url
        for (var i = 0; i < cityName.length; i++) {
            if (cityName.charAt(i) === " ") {
                city = city + "%20"
            } else if (cityName.charAt(i) === ",") {
                city = city + "%2c"
            } else {
                city = city + cityName.charAt(i)
            }
        }

        let URL = "https://developers.zomato.com/api/v2.1/locations?query=" + city

        $.ajax({
            url: URL,
            method: "GET",
            headers: {
                "user-key": "e920da7569c4f29f6b0175e74f21679f"
            },
            success: function (response) {

                z_cityId = response.location_suggestions[0].city_id
                zomato_getCuisines_byCityID(z_cityId);

            }
        })
    }
}

function zomato_getCuisines_byCityID(z_cityId) {

    let URL = "https://developers.zomato.com/api/v2.1/cuisines?city_id=" + z_cityId

    $.ajax({
        url: URL,
        method: "GET",
        headers: {
            "user-key": "e920da7569c4f29f6b0175e74f21679f"
        },
        success: function (response) {

            let arrCuisines = [];

            for (var i = 0; i < response.cuisines.length; i++) {

                arrCuisines.push(new cuisine(response.cuisines[i].cuisine.cuisine_id, response.cuisines[i].cuisine.cuisine_name));

            }

            console.log(arrCuisines)

        }
    })

}

var arrRestaurants = []

function zomato_getRestaurantsList(cuisines, user_latitude,user_longitude) {

    let userLocation = user_latitude + "," + user_longitude;
    let URL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + z_cityId + "&entity_type=city&count=5&cuisines=" + cuisines;

    $.ajax({
        url: URL,
        method: "GET",
        headers: {
            "user-key": "e920da7569c4f29f6b0175e74f21679f"
        },

        success: function (response) {

            console.log(response)

            for (var i = 0; i < response.restaurants.length; i++) {
                arrRestaurants.push(new restaurant(
                    response.restaurants[i].restaurant.id,
                    response.restaurants[i].restaurant.name,
                    response.restaurants[i].restaurant.featured_image,
                    response.restaurants[i].restaurant.location.address,
                    response.restaurants[i].restaurant.location.city,
                    response.restaurants[i].restaurant.location.zipcode,
                    response.restaurants[i].restaurant.location.latitude,
                    response.restaurants[i].restaurant.location.longitude,
                    response.restaurants[i].restaurant.user_rating.aggregate_rating,
                    response.restaurants[i].restaurant.user_rating.rating_text,
                    response.restaurants[i].restaurant.average_cost_for_two,
                    response.restaurants[i].restaurant.price_range
                ));
            }

            console.log("Here come the restaurants")
            console.log(arrRestaurants);
            getDurationTime(arrRestaurants, userLocation);
        }
    })
}
function zomato_getReviews(restaurant_id){

    let URL = "https://developers.zomato.com/api/v2.1/reviews?res_id=" + restaurant_id

    $.ajax({
        url: URL,
        method: "GET",
        headers: {
            "user-key": "e920da7569c4f29f6b0175e74f21679f"
        },
        success: function (response) {
            console.log(response)
        }
    })
}
//Prototype cuisine
function cuisine(id, name) {

    this.id = id,
    this.name = name
}
//Prototype restaurant
function restaurant(id, name, photo_url, address, address_city, address_zipcode,lattitude, longitude, aggregate_rating, aggregate_rating_text, average_for2, price_range) {
    this.id = id,
    this.name = name,
    this.photo_url = photo_url,
    this.address = address,
    this.address_city = address_city,
    this.address_zipcode = address_zipcode
    this.lattitude = lattitude,
    this.longitude = longitude,
    this.aggregate_rating = aggregate_rating,
    this.aggregate_rating_text = aggregate_rating_text
    this.average_for2 = average_for2,
    this.price_range = price_range,
    this.durationTime   = "0" 
}
