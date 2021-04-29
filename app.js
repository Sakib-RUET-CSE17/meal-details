function handleSearchBtn() {
    document.getElementById('selectedMeal').style.display = 'none'

    const mealName = document.getElementById('mealName').value
        // console.log(mealName)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(res => res.json())
        .then(data => showMeals(data.meals))
        .catch(error => alert(error))
}

const showMeals = meals => {
    // console.log(meals)
    const searchResultsDiv = document.getElementById('searchResultsDiv')
    searchResultsDiv.innerHTML = ''
    if (meals !== null) {
        meals.forEach(meal => {
            const mealDiv = document.createElement('div')
            mealDiv.className = 'col'
            const mealInfo = `<a href="#selectedMeal">
            <div onclick="showDetails(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                </div>
            </div>
            </a>
            `
            mealDiv.innerHTML = mealInfo

            searchResultsDiv.appendChild(mealDiv)
        });

    } else {
        alert('No Meal Found')
    }
}

const showDetails = mealId => {
    document.getElementById('selectedMeal').style.display = 'flex'
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => renderMealInfo(data.meals[0]))
        .catch(error => alert(error))
}

const renderMealInfo = meal => {
    const mealImg = document.getElementById('mealImg')
    mealImg.src = meal.strMealThumb
    const mealName = document.getElementById('mealNameHead')
    mealName.innerText = meal.strMeal
    const ul = document.getElementById('ingredients')
    let ingredientsTag = ``
        // console.log(meal)
    for (let i = 1; i <= 20; i++) {
        const ingredient = `strIngredient${i}`
            // console.log(meal[ingredient], ingredient)
        if (meal[ingredient] === "")
            break
        const ingredientMeasure = `strMeasure${i}`
        ingredientsTag += `<li>${meal[ingredientMeasure]} of ${meal[ingredient]}</li>`
    }
    ul.innerHTML = ingredientsTag
}