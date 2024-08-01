const courses = document.getElementById('courses')
const subNav = document.querySelector('.sub-nav')
const popup = document.querySelector('.popup')
const signUpButton = document.querySelector('.header-button-link')
const closePopup = document.querySelector('.fa-times')
const overlay = document.querySelector('.overlay')
const form = document.getElementById('form')
const username = document.getElementById('username')
const password = document.getElementById('password')
const recaptha = document.getElementById('recaptha-box')
const menuIcon = document.getElementById('openMenu')
const closeHamergurMenu = document.getElementById('closeMenu')
const hambergerMenu = document.getElementById('nav')
const globalHeader = document.querySelector('.global-header')
const topBar = document.querySelector('.top-bar')
const container = document.querySelector('.container')
const mobileItemChildren = document.querySelector('.menu-item-has-children')
const userIcon = document.querySelector('.fa-user-circle')
const toggleSearch = document.getElementById('toggleSearch')
const headerRow = document.querySelector('.header-row')
const searchRow = document.querySelector('.search-row')
const searchInput = document.querySelector('.search-input')
const featuredCourse = document.querySelector('.featured-course')
const backToTop = document.querySelector('.back-to-top')
//event listener
courses.addEventListener('mouseover',function(){
    subNav.style.display = 'flex'
})
subNav.addEventListener('mouseleave',function(){
    this.style.display = 'none'
})
userIcon.addEventListener('click',showModal)
signUpButton.addEventListener('click',showModal)
closePopup.addEventListener('click',closeModal)
overlay.addEventListener('click',closeModal)
form.addEventListener('submit',function(e){
    e.preventDefault();
    checkInputs()
})
menuIcon.addEventListener('click',openHambergerMenu)
closeHamergurMenu.addEventListener('click',closeHambergerMenu)
mobileItemChildren.addEventListener('click',toggleDropDownMenuMobile)
toggleSearch.addEventListener('click',toggleSearchHandler)
backToTop.addEventListener('click',goToTopPage)
//Function

function showModal(){
    const span = signUpButton.querySelector('span')
    if(span.innerText==='ورود و ثبت نام'){
        popup.classList.add('active')
        overlay.classList.add('active')
        document.body.style.overflow = 'hidden'
    }
   
}

function closeModal(){
    popup.classList.remove('active')
    overlay.classList.remove('active')
    document.body.style.overflow = 'visible'
}

function checkInputs(){
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    if(usernameValue===''){
        setErrorFor(username,'نام کاربری باید حتما وارد شود')
    }
    else if(!validateEmail(usernameValue)){
        setErrorFor(username,'ایمیل باید با فرمت صحیح وارد شود')
    }
    else{
        setSuccessFor(username)
    }
    if(passwordValue===''){
        setErrorFor(password,'رمز عبور باید حتما وارد شود')
    }
    if(passwordValue.length<6){
        setErrorFor(password,'رمز عبور باید حداقل 6 کاراکتر باشد ')
    }
    else{
        setSuccessFor(password)
    }
    checkRecaptcha()
}
function setErrorFor(input,message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error'
    return false
}
function setSuccessFor(input){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.style.visibilty = 'visible';
    formControl.className = 'form-control success'
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}
function checkRecaptcha(){
    const response = grecaptcha.getResponse();
    if(response.length===0){
        setErrorFor(recaptha,'من ربات نیستم را تیک بزنید')
    }else{
        closeModal();
        const span = signUpButton.querySelector('span')
        span.innerText = 'حساب کاربری'
    }
}

function openHambergerMenu(){
    hambergerMenu.classList.add('active');
    const width = window.getComputedStyle(hambergerMenu).getPropertyValue('width');
    globalHeader.style.transform = `translate(${width},0)`
    container.style.transform = `translate(${width},0)`
    topBar.style.transform = `translate(${width},0)`
    document.body.style.overflow = 'hidden';
    closeHamergurMenu.style.display = 'block';
    this.style.display = 'none'
}
function closeHambergerMenu(){
    hambergerMenu.classList.remove('active');
   
    globalHeader.style.transform = `translate(0,0)`
    container.style.transform = `translate(0,0)`
    topBar.style.transform = `translate(0,0)`
    document.body.style.overflow = 'visible';
    menuIcon.style.display = 'block';
    this.style.display = 'none'
}
function toggleDropDownMenuMobile(){
    const iElement = this.querySelector('i')
    if(iElement.className==="fa fa-angle-left"){
        this.querySelector('i').className = "fa fa-angle-down"
    }else{
        this.querySelector('i').className = "fa fa-angle-left"
    }
    const ulElement = this.querySelector('ul');
    ulElement.classList.toggle('active')
    iElement.setAttribute('style','position:absolute;left:0')
    this.classList.toggle('active')
}
function toggleSearchHandler(){
    if(this.className==="fa fa-search"){
        headerRow.classList.add('disabled')
        searchRow.classList.add('active')
        this.className = "fa fa-times"
       addSeachRecoginition()
    }else{
        headerRow.classList.remove('disabled')
        searchRow.classList.remove('active')
        this.className = "fa fa-search"
    }
    
}
function addSeachRecoginition(){
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition();
    recognition.lang = 'fa-IR';
    recognition.interimResults = true;
    recognition.addEventListener('result',e=>{
        //console.log(e.results)
        const transcript = Array.from(e.results)
        .map(result=>result[0])
        .map(result=>result.transcript)
        .join("")
        console.log(transcript)
        if(e.results[0].isFinal){
            searchInput.value = transcript
        }
    })
    recognition.addEventListener('end',recognition.start)
    recognition.start()
}

function goToTopPage(){
    window.scrollTo({top:0,behavior:`smooth`})
}
/* animation border menu item */
const menuItems  = document.querySelectorAll('.nav-menu li')
const span = document.createElement('span')
span.classList.add('highlight')
document.body.appendChild(span)
menuItems.forEach((item)=>{
    item.addEventListener('mouseenter',highlight)
})
function highlight(){
    const itemCoordinates = this.getBoundingClientRect();
    const {left,width,bottom} = itemCoordinates;
    span.style.width = `${width}px`;
    span.style.transform = `translate(${left}px,${bottom}px)`
}

/* animation border menu item */

/* stick nav */
window.addEventListener('scroll',function(){
    if(window.scrollY>=globalHeader.offsetHeight){
        globalHeader.style.position = 'fixed'
    }else{
        globalHeader.style.position = 'relative'
    }


   const opacity = window.getComputedStyle(featuredCourse).getPropertyValue('opacity')
   let height = window.getComputedStyle(featuredCourse).getPropertyValue('height')
   height = Number(height.match(/\d+/))
   let slideAt = window.scrollY+window.innerHeight -(height/2)
   const rect = featuredCourse.getBoundingClientRect();
   console.log(rect.top,slideAt)
   if(slideAt>rect.top){
      if(opacity<1){
          console.log('as')
        featuredCourse.classList.add('active')
      }
     
   }
  


    const opacityBackToTop = window.getComputedStyle(backToTop).getPropertyValue('opacity')
    if(window.scrollY>100){
        if(opacityBackToTop<1)
        backToTop.classList.add('active')
    }
    else{
        backToTop.classList.remove('active')
    }

})
/* stick nav */

/* countdown*/
const daysElement = document.getElementById('days')
const hoursElement = document.getElementById('hours')
const minutesElement = document.getElementById('minutes')
const secondsElemet = document.getElementById('seconds')
const publishDate = '20 Feb 2021';
function countDown(){
    const newPublishDate = new Date(publishDate);
    const currentDate = new Date()
    const totalSeconds = (newPublishDate - currentDate)/1000
    const days = Math.floor(totalSeconds/3600/24)
    const hours =  Math.floor(totalSeconds/3600)%24;
    const minutes = Math.floor(totalSeconds/60)%60;
    const seconds = Math.floor(totalSeconds%60)
    daysElement.innerText = days;
    hoursElement.innerText = hours;
    minutesElement.innerText = minutes;
    secondsElemet.innerText = seconds
    
}
countDown()
setInterval(countDown,1000)
/* countdown*/



/*shopping cart */
const shoppingCartIcon = document.querySelector('.fa-shopping-bag')
const shoppingCartBox = document.querySelector('.shopping-cart-box')

const shoppingCartItems = document.querySelector('.shopping-cart-items')
// show and hide shopping box
shoppingCartIcon.addEventListener('click',toggleShoppingCartBox)
function toggleShoppingCartBox(){
    shoppingCartBox.classList.toggle('active')
}

//calcute sum of items in shopping cart
function calculateSumShoppingCartItems()
{
    const coursesPrice = shoppingCartBox.querySelectorAll('.item-price')
    const reactappCartNumber = topBar.querySelector('.reactapp-cart-number')
    const topBarCartNumber = topBar.querySelector('.top-bar-items-mobile .reactapp-cart-number')
    const navCartNumber = hambergerMenu.querySelector('.studiare-cart-number')
    
    reactappCartNumber.innerText = coursesPrice.length
    topBarCartNumber.innerText = coursesPrice.length
    navCartNumber.innerText = coursesPrice.length
    let sum = 0;
    coursesPrice.forEach((course)=>{
        sum+=Number(course.innerText.match(/\d+/))
    })
    const totoalShoppingCart = shoppingCartBox.querySelector('.shopping-cart-total')
    totoalShoppingCart.innerText = `${sum} تومان`
}

calculateSumShoppingCartItems()

//delete shopping cart item
shoppingCartItems.addEventListener('click',deleteCartItem)
function deleteCartItem(e){
    const item = e.target;
    if(item.className==="fas fa-times"){
        const cartItem = item.parentElement;
        cartItem.remove()
        calculateSumShoppingCartItems()
    }
}

//add item to shopping cart

const products = document.querySelectorAll('.featured-course-container .add-to-cart')
products.forEach((item)=>{
    item.addEventListener('click',addToBascket)
})
function addToBascket(e){
    e.preventDefault();
    const course = (e.target.parentElement.parentElement.parentElement)
    const imageCoourse = course.querySelector('img').src;
    const courseTitle = course.querySelector('.course-title a').innerText
    let coursePrice = course.querySelector('.course-price .price .amount').innerText
    // console.log(imageCoourse,courseTitle,coursePrice)
    if(coursePrice==='رایگان!'){
        coursePrice = 0;
    }else{
        coursePrice = Number(coursePrice)
    }
    createItem(imageCoourse,courseTitle,coursePrice)
}

function createItem(imageCoourse,courseTitle,coursePrice){
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'shopping-cart-item'
    cartItemElement.innerHTML = `
    <i class="fas fa-times"></i>
    <img src="${imageCoourse}" alt="${courseTitle}" />
    <div class="cart-item-content">
        <span class="item-name">${courseTitle}</span>
        <span class="item-price">${coursePrice}  تومان</span>
    </div>
    `
    shoppingCartItems.appendChild(cartItemElement)
    calculateSumShoppingCartItems()
}

/*shopping cart */
const slider = document.querySelector('.course-container');
const carousel = document.querySelector('.newest-course');
const next = document.querySelector('.newest-course-container .fa-angle-right')
const prev = document.querySelector('.newest-course-container .fa-angle-left')
const courseItems = document.querySelectorAll('.course-container .course')
const width = window.getComputedStyle(courseItems[0]).getPropertyValue('width')
let direction;
next.addEventListener('click',function(){
    direction = -1;
    carousel.style.justifyContent = 'flex-start';
    slider.style.transform = `translate(-${width})`
})
prev.addEventListener('click',function(){
    if(direction===-1){
        direction = 1;
        slider.appendChild(slider.firstElementChild)
    }
    carousel.style.justifyContent = 'flex-end';
    slider.style.transform = `translate(${width})`
})
slider.addEventListener('transitionend',function(){
    if(direction===1){
        slider.prepend(slider.lastElementChild)
    }else{
        slider.appendChild(slider.firstElementChild)
    }
    slider.style.transition = 'none';
    slider.style.transform = 'translate(0)';
    setTimeout(()=>{
        slider.style.transition = 'all 300ms';
    })
},false)


/*user comments */
const comments = document.querySelectorAll('.comments-container .comment')
const dotsContainer = document.querySelector('.dots-container')
const commentsContainer = document.querySelector('.comments-container')
comments.forEach((item,index)=>{
    const span = document.createElement('span');
    span.classList.add('dots')
    span.setAttribute('position',index);
    span.addEventListener('click',slideComment)
    dotsContainer.appendChild(span)
})
let commentWidth = window.getComputedStyle(comments[0]).getPropertyValue('width')
commentWidth = Number(commentWidth.match(/\d+/))

function slideComment(e){
    //console.log(e.target)
    const position = e.target.getAttribute('position')
    console.log(position)
    commentsContainer.style.transform = `translateX(-${commentWidth*position}px)`;
    dotsContainer.querySelectorAll('.dots').forEach(item=>item.style.opacity='0.5')
    e.target.style.opacity = '1'
}
/*user comments */