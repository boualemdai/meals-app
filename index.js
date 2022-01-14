const form = document.querySelector("form");
const result = document.getElementById("result");
const input = document.querySelector("input");
let meals = [];

async function fetchMeals(search) {
  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));
  console.log(meals);
}

function displayMeals() {
  if (meals === null) {
    result.innerHTML = "<h3>Aucun resultat</h3>";
  } else {
    meals.length = 20;
    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];
        for (let i = 0; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = (meal[`strIngredient${i}`]);
            let measure = (meal[`strMeasure${i}`])
            ingredients.push(`<li>${ingredient}--${measure}</li> `);
            
            console.log(ingredients);
          }
        }

        return `
    <div class="card">
    <h3>${meal.strMeal}</h3>
    <h5>${meal.strArea}</h5>
    <img src=${meal.strMealThumb} width= 80% >
    <span>
    <li>${ingredients.join("")}</li>
    </span>
    
    
    
    </div>
    
    `
      })
      .join("");
  }
}

input.addEventListener("input", (e) => {
  fetchMeals(e.target.value);
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  displayMeals();
});

