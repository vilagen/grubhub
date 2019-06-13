//Global variables
var userLat = 0;
var userLon = 0;

//DOM Variables
var $cuisinesList = $("#cuisine-sel");
var $submit = $("#submit-btn");
var $retaurantsTable = $("#restaurants-table");
var $restaurantUL = $("#restaurant-ul")
var $restaurantDiv = $("#restaurant-div");
var $restaurantsDiv = $("#restaurants-div");
var $modal = $("#results-modal");
var $resultsHeader = $("#results-h");

getLocation()

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {

  userLat = position.coords.latitude
  userLon = position.coords.longitude

  console.log(userLat + " " + userLon)
  zomato_getCuisines(userLat, userLon, "")
}
function getMapIcons(lat, long, restName) {
  L.mapquest.key = '31FQyuhib3kxEon57rVHB1EnSyB5wogU';

  var map = L.mapquest.map('map', {
    center: [lat, long],
    layers: L.mapquest.tileLayer('map'),
    zoom: 15
  });

  L.marker([userLat, userLon], {
    icon: L.mapquest.icons.marker(),
    draggable: false
  }).bindPopup(userLat + '' + userLon).addTo(map);

  L.marker([lat, long], {
    icon: L.mapquest.icons.marker(),
    draggable: false
  }).bindPopup(restName).addTo(map);
  
}

function populate_cuisines(array) {

  for (var i = 0; i < array.length; i++) {
    let $option = $("<option>");
    $option.val(array[i].id);
    $option.text(array[i].name);
    $cuisinesList.append($option);
  }

  $("#cuisine-sel option[value='-']").remove();
  
}
$submit.on("click", function () {
  arrRestaurants = [];
  arrRestaurantsWithDistances = [];
  zomato_getRestaurantsList($cuisinesList.val(), userLat, userLon);
})
function display_restaurants(array) {

  $retaurantsTable.empty();
debugger
  //console.log("Sorting Now")   
  var arrSorted = array.sort((a, b) => (a.kilometers > b.kilometers) ? 1 : -1)

  $newHeader = $("<tr>");
  $newHeader.addClass("bg-secondary text-light");
  $newThName = $("<th>");
  $newThName.text("RESTAURANT");
  $newThAddress = $("<th>");
  $newThAddress.text("ADDRESS");
  $newThTime = $("<th>");
  $newThTime.text("TIME TO DEST");
  $newThRating = $("<th>");
  $newThRating.text("AVG RATING")
  $newHeader.append($newThName, $newThAddress, $newThTime, $newThRating)
  $retaurantsTable.append($newHeader)

  for (var i = 0; i < array.length; i++) {
    $newRow = $("<tr>");
    $newTdName = $("<td>");
    $newTdAddress = $("<td>");
    $newTdDuration = $("<td>");
    $newTdRating = $("<td>");

    $newRow.addClass("js_restaurantRow");
    $newRow.attr("id", array[i].id)
    $newTdName.text(array[i].name);
    $newTdAddress.text(array[i].address_google);
    $newTdDuration.text(array[i].durationTime);
    $newTdRating.text(array[i].aggregate_rating);

    $newRow.append($newTdName, $newTdAddress, $newTdDuration, $newTdRating);
    $retaurantsTable.append($newRow)
    $restaurantsDiv.removeClass("display_none")

  }

  $(".js_restaurantRow").on("click", function () {
    $restaurantUL.empty();
    console.log( $(this).attr("id"))
    debugger
    var index = arrRestaurantsWithDistances.findIndex(i => i.id === $(this).attr("id"));
    let myRestaurant = arrRestaurantsWithDistances[index]

    $resultsHeader.text(myRestaurant.name)
    $newLiRating = $("<li>");
    $newLiAddress = $("<li>");
    $newLiPhoto = $("<li>");
    $newImg = $("<img>");   
    //$newLiMap = $("<li>")
    $newMap =$("<div id = 'map'>")
    $newMap.css("height:150px;width:auto;")
 
    $newLiRating.text("Average Rating: " + myRestaurant.aggregate_rating);
    $newImg.attr("src", myRestaurant.photo_url);
    $newImg.addClass("restImg");
    $newLiPhoto.append($newImg, $newMap);
    $newLiAddress.text(myRestaurant.address_google);    
    //$newLiMap.append($newMap)
    myRestLat = myRestaurant.lattitude;
    myRestLong = myRestaurant.longitude; 
    $restaurantUL.append($newLiPhoto, $newLiRating, $newLiAddress);
    //getMapIcons(myRestLat, myRestLong, myRestaurant.address_google)

    $modal.modal("show");
    
    setInterval( function() { getMapIcons(myRestLat, myRestLong, myRestaurant.address_google); }, 500 );
  })
}