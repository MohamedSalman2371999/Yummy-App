let loader = document.querySelector('.loading')
let links=document.querySelectorAll('.list-unstyled .list-of-links')
let submit=document.querySelector('#submit')
let inputs=document.querySelectorAll('.inputs')
let inputRepassword=document.getElementById('inputRepassword')

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

document.getElementById("contactForm").addEventListener('click',function(e){
e.preventDefault()
})
inputs.forEach(element => {
    element.addEventListener('keyup',function(e){
        validationInputs(element)
        if(inputs[0].value!=''&&inputs[1].value!=''&&inputs[2].value!=''&&inputs[3].value!=''&&inputs[4].value!=''){
            if(validationInputs(inputs[0])&&validationInputs(inputs[1])&&validationInputs(inputs[2])&&validationInputs(inputs[3])&&validationInputs(inputs[4])){
                submit.removeAttribute('disabled')
             }
        }

    })
});

inputRepassword.addEventListener("keyup",function(){
    if(inputRepassword.value!=''&&inputRepassword.value==inputs[4].value)
        {
            inputRepassword.classList.add("is-valid")
            inputRepassword.classList.remove("is-invalid")
        }else{
            inputRepassword.classList.add("is-invalid")
            inputRepassword.classList.remove("is-valid")
        }
})

function validationInputs(elemnt){
   let text=elemnt.value
    regx={
        inputName: /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
        inputEmail: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        inputPhone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        inputAge: /^([1-7][0-9]|80)$/,
        inputPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    };
    if(regx[elemnt.id].test(text)){
      elemnt.classList.add("is-valid")
      elemnt.classList.remove("is-invalid")
      return true
    }else{
      elemnt.classList.add("is-invalid")
      elemnt.classList.remove("is-valid")
      return false
    }
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

