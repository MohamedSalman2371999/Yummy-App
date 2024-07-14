///<reference types="../@types/jquery"/>
const mealsData = document.getElementById("mealsData")
const DetailsOfMeals = document.getElementById("DetailsOfMeals")
let links=document.querySelectorAll('.list-unstyled .list-of-links')
let G_mealsBox;
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
$(function(){
    $('.loader').fadeOut(2000, function(){
      
            $('body').css('overflow', 'auto')
            $('.loading').remove()
            document.querySelectorAll('card__container').forEach(element => {
                console.log(element);
            });
            
    })

})

async function getMeals() {
 
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
    const data = await apiResponse.json();
    const meals=data.meals
    console.log(meals[0]);
     displayMeals(meals)
     document.querySelectorAll(".card__container").forEach(meal => {        
        meal.addEventListener("click",function(e){
            localStorage.setItem('idMeal',JSON.stringify(meal.id))
             window.location ='./Details.html'
        })
     });
 }
 
 getMeals()

 function displayMeals(meals) {
    // [{},{}]
    let mealsBox = ``;
    for (let i = 0; i < meals.length; i++) {
        mealsBox +=`
           <div class="col-md-3">
      <div id="${meals[i].idMeal}" class="card__container cursor-pointer animate__animated animate__fadeInLeft">
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
 
    document.getElementById("mealsData").innerHTML = mealsBox;
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
links[3].addEventListener('click',function(){
    window.location ='./Ingredients.html'
})
links[4].addEventListener('click',function(){
   window.location ='./contact.html'
})
