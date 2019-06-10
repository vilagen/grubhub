var userLat = 0;
var userLon = 0;


$("#submit-btn").on("click", function () {

  zomato_getRestaurantsList($("#style-txt").val().trim(),userLat, userLon)
  //zomato_getReviews(17149683)
  
})

getLocation()

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;

  userLat = position.coords.latitude
  userLon = position.coords.longitude

  //display_mapQuestMap();
  zomato_getCuisines(userLat, userLon, "")

}
//localStorage.clear()


var arrFavoriteCuisines = []
//




  if (localStorage.getItem("favorite_cuisines")) {

    //let storedCusisines = localStorage.getItem("favorite_cuisines")

   arrFavoriteCuisines= JSON.parse(localStorage.getItem("favorite_cuisines"))
   

    arrFavoriteCuisines.push(localStorage.getItem("favorite_cuisines"))
    for (var i = 0; i < arrFavoriteCuisines.length; i++) {
    // if($(".js_cuisine").val() == arrFavoriteCuisines[i]){
    //   debugger
    //   $(this).addClass("bg-warning")
    // }

   

    }


  }

  $(".js_cuisine").on("click", function () {

    alert(this.value)
    $(this).addClass("bg-warning")
    debugger
    arrFavoriteCuisines.push(this.value);
    
    localStorage.clear()
    localStorage.setItem("favorite_cuisines",JSON.stringify(arrFavoriteCuisines))



  })



// $("#map").attr("src","https://cors-anywhere.herokuapp.com/https://www.mapquestapi.com/staticmap/v5/map?locations=charlotte,NC||34.947,-80.837&size=@2x&key=G2dETQCW9KzzffwCEcYsSu0TMuAm3Zaw")  



// window.onload = function() {
//   //L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';
//   L.mapquest.key = 'G2dETQCW9KzzffwCEcYsSu0TMuAm3Zaw';

//   var map = L.mapquest.map('map', {
//     center: [34.947, -80.837],
//     layers: L.mapquest.tileLayer('map'),
//     zoom: 12
//   });

//   map.addControl(L.mapquest.control());
// }



//Map Quest
//G2dETQCW9KzzffwCEcYsSu0TMuAm3Zaw
//https://www.mapquestapi.com/staticmap/v5/map?key=KEY&center=37.7749,-122.4194&size=@2x
//https://www.mapquestapi.com/staticmap/v5/map?locations=Denver,CO||Boulder,CO||39.9205,-105.0867&size=@2x&key=KEY
//https://cors-anywhere.herokuapp.com/ cors
// function mapQuest_getMap(latitude,longitude){


//     let URL = "https://cors-anywhere.herokuapp.com/https://www.mapquestapi.com/staticmap/v5/map?locations=charlotte,NC||" + latitude + "," + longitude + "&size=@2x&key=G2dETQCW9KzzffwCEcYsSu0TMuAm3Zaw" 

//     $.ajax({
//         url: URL,
//         method: "GET",
//         headers: {
//             //"user-key": "e920da7569c4f29f6b0175e74f21679f"
//         },
//         success: function (response) {
//             debugger
//             console.log(response)
//         }
//     })




// }

// window.onload = function () {
//   //L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';
//   L.mapquest.key = 'G2dETQCW9KzzffwCEcYsSu0TMuAm3Zaw';

//   var map = L.mapquest.map('map', {
//     center: [userLat, userLon],

//     layers: L.mapquest.tileLayer('map'),
//     zoom: 9
//   });

//   L.marker([35.308, -80.837], {
//     icon: L.mapquest.icons.marker(".marker-end"),
//     draggable: false
//   }).bindPopup("TEST").addTo(map);

//   map.addControl(L.mapquest.control());

// }

