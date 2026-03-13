setInterval(function(){

document.querySelectorAll(".slider").forEach(slider=>{

let slides=slider.querySelectorAll(".slide")

let active=slider.querySelector(".active")

let index=[...slides].indexOf(active)

active.classList.remove("active")

slides[(index+1)%slides.length].classList.add("active")

})

},3000)



function openProduct(id){
window.location.href="product.html?id="+id
}