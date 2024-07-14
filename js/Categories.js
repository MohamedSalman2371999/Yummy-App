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

async function getCategories() {
    loader.classList.remove('d-none')
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const data = await apiResponse.json();
    const meals=data.categories
    console.log(meals);
    displaygetCategories(meals)
    loader.classList.add('d-none')
    document.querySelectorAll(".card__container").forEach(meal => {        
    meal.addEventListener("click",async function(e){
        loader.classList.remove('d-none')
        $('.loader').fadeOut(2000, function(){
    
            $('body').css('overflow', 'auto')
            $('.loading').remove()
            })
    let CategoriesName= meal.getAttribute('data-CategoriesName')
    let y = await getMealsCategories(CategoriesName)
    document.getElementById("mealsCategoriesRecipes").innerHTML = y
    document.getElementById("mealsCategories").classList.add("d-none")
    document.getElementById("mealsCategoriesRecipes").classList.remove("d-none")
    document.querySelectorAll(".card__container").forEach(meal => {        
    meal.addEventListener("click",function(e){
    localStorage.setItem('idMeal',JSON.stringify(meal.id))
    window.location ='./Details.html'
        })
    });
})
});

}
 
 async function getMealsCategories(CategoriesName) {
 
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${CategoriesName}`);
    const data = await apiResponse.json();
    const meals=data.meals
    console.log(meals);
    let x= displaygetMealsCategories(meals)
    return x

 }
 
 function displaygetMealsCategories(meals) {
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
 
 getCategories()
 function displaygetCategories(meals) {
    // [{},{}]
    let mealsBox = ``;
    for (let i = 0; i < meals.length; i++) {
        mealsBox +=`
 <div class="col-md-3">
        <div data-CategoriesName="${meals[i].strCategory}" class="card__container cursor-pointer">
          <article class="card__article">
             <img src="${meals[i].strCategoryThumb}" alt="image" class="card__img">
             <div class="card__data_categories bg-white">
                <h2 class="card__title fs-4">${meals[i].strCategory}</h2>
                <p class="card__title_p">${meals[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
             </div>
          </article>
       </div>
      </div>
        `
    }
 
    document.getElementById("mealsCategories").innerHTML = mealsBox;
 }

links[0].addEventListener('click',function(){
    window.location ='./MealsSearch.html'
})
links[2].addEventListener('click',function(){
    window.location ='./Area.html'
})
links[3].addEventListener('click',function(){
   window.location ='./Ingredients.html'
})
links[4].addEventListener('click',function(){
     window.location ='./contact.html'
})
