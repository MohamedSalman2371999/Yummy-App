let loader = document.querySelector('.loading')
let links=document.querySelectorAll('.list-unstyled .list-of-links')
let flags=[
    "https://www.themealdb.com/images/icons/flags/big/64/us.png",
    "https://www.themealdb.com/images/icons/flags/big/64/gb.png",
    'https://www.themealdb.com/images/icons/flags/big/64/ca.png',
    'https://www.themealdb.com/images/icons/flags/big/64/cn.png',
    'https://www.themealdb.com/images/icons/flags/big/64/hr.png',
    'https://www.themealdb.com/images/icons/flags/big/64/nl.png',
    'https://www.themealdb.com/images/icons/flags/big/64/eg.png',
    'https://flagsapi.com/PH/flat/64.png',
    'https://www.themealdb.com/images/icons/flags/big/64/fr.png',
    'https://www.themealdb.com/images/icons/flags/big/64/gr.png',
    'https://www.themealdb.com/images/icons/flags/big/64/in.png',
    'https://www.themealdb.com/images/icons/flags/big/64/ie.png',
    'https://www.themealdb.com/images/icons/flags/big/64/it.png',
    'https://www.themealdb.com/images/icons/flags/big/64/jm.png',
    'https://www.themealdb.com/images/icons/flags/big/64/jp.png',
    'https://www.themealdb.com/images/icons/flags/big/64/kn.png',
    'https://www.themealdb.com/images/icons/flags/big/64/my.png',
    'https://www.themealdb.com/images/icons/flags/big/64/mx.png',
    'https://www.themealdb.com/images/icons/flags/big/64/ma.png',
    'https://www.themealdb.com/images/icons/flags/big/64/pl.png',
    'https://www.themealdb.com/images/icons/flags/big/64/pt.png',
    'https://www.themealdb.com/images/icons/flags/big/64/ru.png',
    'https://www.themealdb.com/images/icons/flags/big/64/es.png',
    'https://www.themealdb.com/images/icons/flags/big/64/th.png',
    'https://www.themealdb.com/images/icons/flags/big/64/tn.png',
    'https://www.themealdb.com/images/icons/flags/big/64/tr.png',
    'https://www.themealdb.com/images/icons/flags/big/64/sy.png',
    'https://www.themealdb.com/images/icons/flags/big/64/dz.png',
    'https://www.themealdb.com/images/icons/flags/big/64/vn.png',
]
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

async function getAreas() {
    loader.classList.remove('d-none')
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const data = await apiResponse.json();
    const meals=data.meals
    console.log(meals);
    displaygetAreas(meals)
    loader.classList.add('d-none')
    document.querySelectorAll(".AreasOfRecipes").forEach(area => {
        area.addEventListener("click",async function(){
            let AreasName= area.getAttribute('id')
            let y = await getmealsInEachArea(AreasName)
            document.getElementById("mealsInEachArea").innerHTML = y
            $('.loader').fadeOut(2000, function(){
      
                $('body').css('overflow', 'auto')
                $('.loading').remove()
            })
            document.getElementById("mealsArea").classList.add("d-none")
            document.getElementById("mealsInEachArea").classList.remove("d-none")
            document.querySelectorAll(".card__container").forEach(meal => {        
            meal.addEventListener("click",function(e){
            localStorage.setItem('idMeal',JSON.stringify(meal.id))
           window.location ='./Details.html'
})
    });
})
    });

}
getAreas()
function displaygetAreas(meals) {
    // [{},{}]
    let mealsBox = ``;
    for (let i = 0; i < meals.length; i++) {
        mealsBox +=`
    <div class="col-md-3">
          <div id="${meals[i].strArea}" class="AreasOfRecipes cursor-pointer">
                     <img src="${flags[i]}" alt="">
                <h3 class="text-white">${meals[i].strArea}</h3>
          </div>
    </div>
        `
    }
 
    document.getElementById("mealsArea").innerHTML = mealsBox;
 }


 async function getmealsInEachArea(AreasName) {
    loader.classList.remove('d-none')
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreasName}`);
    const data = await apiResponse.json();
    const meals=data.meals
    console.log(meals);
    let x= displaygetmealsInEachArea(meals)
    return x

 }
 
 function displaygetmealsInEachArea(meals) {
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
links[3].addEventListener('click',function(){
     window.location ='./Ingredients.html'
})
links[4].addEventListener('click',function(){
     window.location ='./contact.html'
})
