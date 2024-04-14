/* 
Logic for the FEATURES section that:
changes the images on clicking a controller
changes the heading on clicking a controller
changes the paragraph on clicking a controller  
*/

const control = document.getElementsByClassName("control");

const image = document.getElementById("image");

const heading = document.getElementById("heading");
const paragraph = document.getElementById("paragraph");

control[0].onclick = function(){
    image.src = "images/illustration-features-tab-1.svg";
    heading.innerHTML = "Disease Prediction made easier";
    remove();
    this.classList.add("active");
    paragraph.innerHTML = "Prediction of your crops's disease through image processing helping farmers in right treatment of crops. ";
}

control[1].onclick = function(){
    image.src = "images/illustration-features-tab-2.svg";
    heading.innerHTML = "Chat Assist";
    remove();
    this.classList.add("active");
    paragraph.innerHTML = "You can chat with the AI chatbot to get the information about the plant disease and the solution for it. It will help you to get the best quality products from the farmers";
}

control[2].onclick = function(){
    image.src = "images/illustration-features-tab-3.svg";
    heading.innerHTML = "Multilingual";
    remove();
    this.classList.add("active");
    paragraph.innerHTML = "You can use your local langauge to view the information about the plant disease and the solution for it. It will help you to get the best quality products from the farmers";
}

// Removes the active class list after clicking another controller
function remove(){
    for (a of control){
        a.classList.remove("active");
    }
}



/*
Logic for the drop down menu which
toggles independently of other menus
*/

const controls = document.getElementsByClassName("text");
const dropMenu = document.getElementsByClassName("drop-down-text");


controls[0].onclick = function(){
    if(dropMenu[0].style.display == "none"){
        dropMenu[0].style.display = "block";
    }
    else{
        dropMenu[0].style.display = "none";
    }
}

controls[1].onclick = function(){
    if(dropMenu[1].style.display == "none"){
        dropMenu[1].style.display = "block";
    }
    else{
        dropMenu[1].style.display = "none";
    }
}

controls[2].onclick = function(){
    if(dropMenu[2].style.display == "none"){
        dropMenu[2].style.display = "block";
    }
    else{
        dropMenu[2].style.display = "none";
    }
}

controls[3].onclick = function(){
    if(dropMenu[3].style.display == "none"){
        dropMenu[3].style.display = "block";
    }
    else{
        dropMenu[3].style.display = "none";
    }
}


/*
Form validation to check if email 
address is wrongly formatted before 
submitting. Returns error message when not formatted correctly
*/

// function validateForm() {
//     let email = document.getElementById("email");
//     let alert = document.getElementById("alert");
//     let form = document.getElementById("formbox");
//     let error = document.getElementById("img");

//     let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;  // Email address pattern

//     if (email.value.match(pattern)){
//         form.classList.add("valid");
//         form.classList.remove("invalid");
//         email.style.borderTop = "2px solid hsl(231, 69%, 60%)";
//         email.style.borderLeft = "2px solid hsl(231, 69%, 60%)";
//         email.style.borderRight = "2px solid hsl(231, 69%, 60%)";
//         email.style.borderBottom = "25px solid hsl(231, 69%, 60%)";
//         alert.innerHTML = " "; 
//         error.style.opacity = "0";
//         document.getElementById("formbox").reset(); // Resets form - input field after successful submission
//         return true
//     }

//     else{
//         form.classList.remove("valid");
//         form.classList.add("invalid");
//         email.style.borderTop = "2px solid hsl(0, 94%, 66%)"; 
//         email.style.borderLeft = "2px solid hsl(0, 94%, 66%)";
//         email.style.borderRight = "2px solid hsl(0, 94%, 66%)";
//         email.style.borderBottom = "25px solid hsl(0, 94%, 66%)";
//         alert.innerHTML = "Whoops, make sure it's an email";
//         error.style.opacity = "1";
//         return false
//     }
// }


/* 
Mobile Navigation, navigation logo 
and hamburger menu toggle 
*/

const menu = document.getElementById("mobileNav");
const button = document.getElementById("mobileMenu");
const logo = document.getElementById("logo");

menu.style.display = "none";

button.onclick = function() {
    if (menu.style.display == "none"){
        menu.style.display = "block";
        button.src = "images/icon-close.svg";
        logo.style.filter = "invert(1) brightness(100%)";
        button.style.filter = "invert(0)";
    }
    else{
        menu.style.display = "none"
        button.src = "images/icon-hamburger.svg";
        logo.style.filter = "invert(0)";
    }
}