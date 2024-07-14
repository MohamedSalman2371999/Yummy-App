let idMeal = JSON.parse(localStorage.getItem('idMeal'))
console.log(idMeal);
let loader = document.querySelector('.loading')
let links=document.querySelectorAll('.list-unstyled .list-of-links')
let arrStrIngredient_Measure=[]
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
async function getDetails() {
    const apitDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    const data = await apitDetails.json();
    const meals=data.meals[0]
    console.log(meals);
    let tagsContainer=''
    let tags 
    if(meals.strTags!=null){
         tags = meals.strTags.split(",")
        for (let i = 0; i < tags.length; i++) {
            tagsContainer+=`
                <p class="alert alert-danger my-2 me-2 p-1">${tags[i]}</p>
            `
            
        }
    }else{
        tagsContainer=``
    }
    let strMeasure = getstrMeasure(meals)
    let strIngredient =getstrIngredient(meals)
    let StrMeasureMergeIngredient=MergeStrMeasure_Ingredient(strMeasure,strIngredient)
    arrStrIngredient_Measure = displaStrMeasure_Ingredient(StrMeasureMergeIngredient)
    displayDetailsMeals(meals,tagsContainer,arrStrIngredient_Measure)
    loader.classList.add('d-none')
    document.querySelector('.fa-times').addEventListener('click',function(){
       window.location ='./index.html'
    })

 }
 getDetails()
 function getstrIngredient(meals){
    let arrstrIngredient= []
    for (const [key, value] of Object.entries(meals)) {
        if(key.match("strIngredient")&&value!=' '){
            if(key.match("strIngredient")&&value!=''){
           arrstrIngredient.push(value)
            }
        }
    }
   return arrstrIngredient;
 }
 function getstrMeasure(meals){
    let arrStrMeasure= []
    for (const [key, value] of Object.entries(meals)) {
        if(key.match("strMeasure")&&value!=' '){
            if(key.match("strMeasure")&&value!=''){
           arrStrMeasure.push(value)
            }
            // strMeasureContainer+=`<p class="alert alert-info m-2 p-1">${value} ${meals.strIngredient1}</p>
            // `;

        }
    }
   return arrStrMeasure
 }
 function MergeStrMeasure_Ingredient(arr1,arr2){
    let arrMergegStr= []
    for (let i = 0; i < arr1.length; i++) {
        
        arrMergegStr[i]=arr1[i]+arr2[i]
    }
   return arrMergegStr
 }
function displaStrMeasure_Ingredient(arr){
    let cartona=''
    arr.forEach(element => {
        cartona+=`<p class="alert alert-info m-2 p-1">${element}</p>`
    });
    return cartona
}
 getDetails()

function displayDetailsMeals(meals,tagsContainer,arrStrIngredient_Measure) {
    let mealsBox = ``;
        mealsBox +=`
            <div class="col-md-4">
                <div class="leftSideContainer animate__animated animate__fadeInLeft">
                    <figure class="img-container">
                        <img src="${meals.strMealThumb}" class="w-100 rounded-3" alt="">
                        <figcaption><p class="fs-2 fw-bold text-white">${meals.strMeal}</p></figcaption>
                    </figure>
                </div>
            </div>
            <div class="col-md-8">
                <div class="RightSideContainer animate__animated animate__fadeInRight">
                <i class="fa fa-times text-white fa-3x" aria-hidden="true"></i>
                    <h2 class="fw-bold text-white">Instructions</h2>
                    <p class="text-white">${meals.strInstructions}</p>
                    <p class="text-white"><span class="fs-2 fw-bold">Area</span> : <span class="fs-4">${meals.strArea}</span></p>
                    <p class="text-white"><span class="fs-2 fw-bold">Category </span> : <span class="fs-4">${meals.strCategory}</span></p>
                    <p class="text-white fs-2 fw-bold">Recipes :</p>
                    <div class="list-of-recipes d-flex g-3 flex-wrap">
                        ${arrStrIngredient_Measure}
                    </div>
                    <p class="text-white fs-2 fw-bold">Tags :</p>
                    <div class="list-of-Tags d-flex g-3 flex-wrap">
                        ${tagsContainer}
                    </div>
                    <div class="list-of-links mt-2">
                        <button class="btn btn-success me-2"><a href="${meals.strSource}" target="_blank" class="text-decoration-none text-white">Source</a></button>
                        <button class="btn btn-danger"><a href="${meals.strYoutube}"" target="_blank" class="text-decoration-none text-white">Youtube</a></button>
                </div>
            </div>
        </div>
        ` 
    document.getElementById("mealsDetails").innerHTML = mealsBox;
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
