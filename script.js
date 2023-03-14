const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
// const mealDetailsContent = document.querySelector('.meal-details-content');
// const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener("click", getMealList);
// mealList.addEventListener('click', getMealRecipe);
// recipeCloseBtn.addEventListener('click', () => {
//     mealDetailsContent.parentElement.classList.remove('showRecipe');
// });

// get meal list that matches with the ingredients
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <div class="btns">
                            <button type="submit" class="btnrem "><a href = "info.html?id=${meal.idMeal}" value="${meal.idMeal}" class = "recipe-btn">Get Recipe</a></button>
                             <button type="submit" class="btnrem recipe-btn" onclick="functionToExecute(${meal.idMeal})"> Fav</button>
                          </div>
                </div>
                        </div>
                    </div>
                `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;
    });
}

function fetchDefault() {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((Response) => Response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class = "meal-item" data-id = "${meal.idMeal}">
                <div class = "meal-img">
                    <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                    <h3>${meal.strMeal}</h3>
                    <div class="btns">
                    <button type="submit" class="btnrem "><a href = "info.html?id=${meal.idMeal}" value="${meal.idMeal}" class = "recipe-btn">Get Recipe</a></button>
                     <button 
                      type="submit"
                      class="btnrem recipe-btn"
                      onclick="functionToExecute(${meal.idMeal})"
                       > Fav</button>
                  </div>
                </div>
            </div>
        `;
        });
        mealList.innerHTML = html;
      }
    });
}
fetchDefault();

//to add id to local storage
let fav = window.localStorage.getItem("meal-favourites");
if (!fav) {
  window.localStorage.setItem("meal-favourites", "");
}
function functionToExecute(id) {
  let items = window.localStorage.getItem("meal-favourites");

  //if id already present in local storage we do not add and return
  if (items.includes(id)) {
    window.alert("Already added to favourites!");
    return;
  }
  //appending the new id to the string
  items = items + " " + id;
  //updating the local storage
  window.localStorage.setItem("meal-favourites", items);
  window.alert("Item added to favourites");
}
