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