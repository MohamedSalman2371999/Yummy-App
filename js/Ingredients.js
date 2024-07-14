let loader = document.querySelector('.loading')
let links=document.querySelectorAll('.list-unstyled .list-of-links')
function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)

    $(".menu-bar").addClass("d-none");
    $(".menu-exit").removeClass("d-none");



    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".menu-bar").removeClass("d-none");
    $(".menu-exit").addClass("d-none");

    $(".links li").animate({
        top: 300
    }, 500)
}
closeSideNav()
$(".side-nav-menu .menu-bar").on("click",() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
$(".side-nav-menu .menu-exit").on("click",() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
async function getIngredients() {
    loader.classList.remove('d-none')
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const data = await apiResponse.json();
    const meals=data.meals.slice(0, 24)
    console.log(meals);
    displaygetIngredients(meals)
    loader.classList.add('d-none')
    document.querySelectorAll(".IngredientOfRecipes").forEach(Ingredient => {
        Ingredient.addEventListener("click",async function(){
            let IngredientsInEachMeal= Ingredient.getAttribute('id')
            let y = await getIngredientsInEachMeal(IngredientsInEachMeal)
            // console.log(y);
            document.getElementById("IngredientsInEachMeal").innerHTML = y
            $('.loader').fadeOut(2000, function(){
      
                $('body').css('overflow', 'auto')
                $('.loading').remove()
            })
            document.getElementById("IngredientsMeal").classList.add("d-none")
            document.getElementById("IngredientsInEachMeal").classList.remove("d-none")
            document.querySelectorAll(".card__container").forEach(meal => {        
            meal.addEventListener("click",function(e){
            localStorage.setItem('idMeal',JSON.stringify(meal.id))
            window.location ='./Details.html'
})
    });
})
    });

}
getIngredients()
function displaygetIngredients(meals) {
    // [{},{}]
    let mealsBox = ``;
    for (let i = 0; i < meals.length; i++) {
        mealsBox +=`
        <div class="col-md-3">
            <div id="${meals[i].strIngredient}" class="IngredientOfRecipes cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${meals[i].strIngredient}</h3>
                <p>${meals[i].strDescription.split(" ").slice(0,20).join(" ")}}</p>
            </div>
        </div>
        `
    }
 
    document.getElementById("IngredientsMeal").innerHTML = mealsBox;
 }


 async function getIngredientsInEachMeal(Ingredients) {
    loader.classList.remove('d-none')
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`);
    const data = await apiResponse.json();
    const meals=data.meals
    console.log(meals);
    let x= displayIngredientsInEachMeal(meals)
    return x

 }
 
 function displayIngredientsInEachMeal(meals) {
    let mealsBox = ``;
    for (let i = 0; i < meals.length; i++) {
        mealsBox +=`
           <div class="col-md-3">
      <div id="${meals[i].idMeal}" class="card__container card__containerOFMeals cursor-pointer">
        <article class="card__article">
           <img src="${meals[i].strMealThumb}" alt="image" class="card__img">
           <div class="card__data bg-white">
              <h2 class="card__title fs-5 text-black">${meals[i].strMeal}</h2>
           </div>
        </article>
     </div>
    </div>
        `
    }
 
    return mealsBox;
 }

links[0].addEventListener('click',function(){
    window.location ='./MealsSearch.html'
})
links[1].addEventListener('click',function(){
    window.location ='./Categories.html'
})
links[2].addEventListener('click',function(){
    window.location ='./Area.html'
})
links[4].addEventListener('click',function(){
    window.location ='./contact.html'
})
