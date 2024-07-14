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
document.getElementById("searchByName").addEventListener('input',function(){
    console.log(this.value);
    getMealsByName(this.value)
})
document.getElementById("searchByFirstletter").addEventListener('input',function(){
    console.log(this.value);
    if(this.value!=''){
        getMealsByFirstLetter(this.value)
    }else{
        
        getMealsByFirstLetter('m')
    }
})
loader.classList.remove('d-none')
getMealsByName("")
async function getMealsByName(N_Meals) {
    loader.classList.remove('d-none')
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${N_Meals}`);
    const data = await apiResponse.json();
    const meals=data.meals
    console.log(meals[0]);
    displayMeals(meals)
    loader.classList.add('d-none')
    document.querySelectorAll(".card__container").forEach(meal => {        
        meal.addEventListener("click",function(e){
            localStorage.setItem('idMeal',JSON.stringify(meal.id))
           window.location ='./Details.html'
        })
     });

 }
 async function getMealsByFirstLetter(L_of_Meals) {
    loader.classList.remove('d-none')
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${L_of_Meals}`);
    const data = await apiResponse.json();
    const meals=data.meals
    // console.log(meals[0]);
    displayMeals(meals)
    loader.classList.add('d-none')
    document.querySelectorAll(".card__container").forEach(meal => {        
        meal.addEventListener("click",function(e){
            localStorage.setItem('idMeal',JSON.stringify(meal.id))
            window.location ='./Details.html'
        })
     });

 }
 
 function displayMeals(meals) {
    let mealsBox = ``;
    for (let i = 0; i < meals.length; i++) {
        mealsBox +=`
           <div class="col-md-3">
      <div id="${meals[i].idMeal}" class="card__container cursor-pointer">
        <article class="card__article">
           <img src="${meals[i].strMealThumb}" alt="image" class="card__img">
           <div class="card__data bg-white">
              <h2 class="card__title text-black">${meals[i].strMeal}</h2>
           </div>
        </article>
     </div>
    </div>
        `
    }
 
    document.getElementById("mealsFromSearch").innerHTML = mealsBox;
 }
 links[1].addEventListener('click',function(){
    window.location ='./Categories.html'
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
