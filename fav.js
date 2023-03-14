console.log("on fav");

//fetching the favourite item ids from local storage and converting it into an array
let item = window.localStorage.getItem("meal-favourites").split(/(\s+)/);
item.filter(function (e) {
  return e.trim().length > 0;
});
//fetching all the favourite meals from ids stored in local storage
for (let id of item) {
  getMeal(id);
}
console.log(typeof item);

//this function fetches a meal with a specific id
function getMeal(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        createFavItem(data);
      }
    });
}

function createFavItem(res) {
  for (res of res.meals) {
    // HTML code for the individual search result/food item
    var foodItem = `<div class = "meal-item" data-id = "${res.idMeal}">
    <div class = "meal-img">
        <img src = "${res.strMealThumb}" alt = "food">
    </div>
    <div class = "meal-name">
        <h3>${res.strMeal}</h3>
        <div class="btns">
       
        <button type="submit" class="btnrem "><a href = "info.html?id=${res.idMeal}" value="${res.idMeal}" class = "recipe-btn">Get Recipe</a></button>
        
      
         <button type="submit" class="btnrem recipe-btn favorite-button" id="(${res.idMeal})">Remove</button>
         
      </div>
</div>
    </div>
</div>`;
    // appending the result to the root 'recipie-list' div
    let mealList = document.getElementById("meal");
    mealList.innerHTML = foodItem + mealList.innerHTML;
  }
}

//handling click event on the 'favourite-button' to unmark an item as favourite

document.body.addEventListener("click", function (event) {
  //if the targeted div is 'favourite-button'
  console.log("click");

  if (event.target.getAttribute("class").includes("favorite-button")) {
    //finding the id of the current food item

    let id = event.target.getAttribute("id");
    //finding it's index in the item array
    let index = item.indexOf(id);

    //removing item from the array
    item.splice(index, 1);

    //creating the updated list of favourite items in a space sperated string
    let items = "";
    for (let i of item) {
      items = items + " " + i;
    }
    //storing the updated string in local storage
    window.localStorage.setItem("meal-favourites", items);

    //refreshing the page
    location.reload();
  }
});
