//Global variables
var userLat = 0;
var userLon = 0;

//DOM Variables
var $cuisinesList = $("#cuisine-sel");
var $submit = $("#submit-btn");
var $retaurantsTable = $("#restaurants-table");
var $restaurantUL = $("#restaurant-ul")
var $restaurantDiv = $("#restaurant-div");
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
function populate_cuisines(array) {

  for (var i = 0; i < array.length; i++) {
    let $option = $("<option>");
    $option.val(array[i].id);
    $option.text(array[i].name);
    $cuisinesList.append($option);
  }

}
$submit.on("click", function () {
  arrRestaurants = [];
  arrRestaurantsWithDistances = [];
  zomato_getRestaurantsList($cuisinesList.val(), userLat, userLon);
})
function display_restaurants(array) {

  $retaurantsTable.empty();

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
    $retaurantsTable.removeClass("display_none")

  }

  $(".js_restaurantRow").on("click", function () {
    //alert($(this).attr("id"))

    $restaurantUL.empty();
    var index = arrRestaurantsWithDistances.findIndex(i => i.id === $(this).attr("id"));
    let myRestaurant = arrRestaurants[index]

    $resultsHeader.text(myRestaurant.name)
    $newLiName = $("<li>");
    $newLiAddress = $("<li>");
    $newLiPhoto = $("<li>");
    $newImg = $("<img>");

    $newLiName.text(myRestaurant.name);
    $newImg.attr("src", myRestaurant.photo_url);
    $newImg.addClass("restImg");
    $newLiPhoto.append($newImg);
    $newLiAddress.text(myRestaurant.address_google);
    $restaurantUL.append($newLiPhoto, $newLiName, $newLiAddress)

    $modal.modal("show")

    $("#results-modal").modal("show");

    //console.log(arrRestaurantsWithDistances[index])

  })

  //console.log(arrSorted)

}