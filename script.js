import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

/* SUPABASE CONNECTION */

const supabaseUrl = "https://cfjfqkihhedavxgtgqve.supabase.co"
const supabaseKey = "sb_publishable_HApwGwt-OCWOc73IjaZq3Q_ikF4SMzE"

const supabase = createClient(supabaseUrl, supabaseKey)



/* LOAD LAPTOPS FROM DATABASE */

async function loadLaptops(){

const { data:laptops, error } = await supabase
.from("laptops")
.select("*")

if(error){
console.log(error)
return
}

const { data:images } = await supabase
.from("images")
.select("*")


const hpContainer = document.getElementById("hpContainer")
const lenovoContainer = document.getElementById("lenovoContainer")

hpContainer.innerHTML = ""
lenovoContainer.innerHTML = ""

laptops.forEach(laptop=>{

let laptopImages = images
.filter(img=>img.laptop_id === laptop.id)
.map(img=>"https://cfjfqkihhedavxgtgqve.supabase.co/storage/v1/object/public/images/"+img.image)

let slidesHTML = ""

laptopImages.forEach((img,i)=>{
slidesHTML += `<img class="slide ${i==0?'active':''}" src="${img}">`
})


const card = `
<div class="card" onclick="openProduct('${laptop.id}')">

<div class="slider">
${slidesHTML}
</div>

<h3 class="model">${laptop.brand} ${laptop.model}</h3>

<h3>Laptop ID — ${laptop.id}</h3>

<p class="price">₹${laptop.price}</p>

<div class="specs">

<p><b>Processor:</b> ${laptop.processor}</p>
<p><b>RAM:</b> ${laptop.ram}</p>
<p><b>Storage:</b> ${laptop.storage}</p>

<p><b>Laptop Condition:</b> ${laptop.condition}</p>

<p><b>Battery Health:</b> ${laptop.battery}</p>

<p><b>Keyboard:</b> ${laptop.keyboard}</p>
<p><b>Fingerprint Sensor:</b> ${laptop.fingerprint}</p>

${laptop.note ? `<p><b>Condition Note:</b> ${laptop.note}</p>` : ""}

</div>

<a class="product-link"
href="${laptop.original_link}"
target="_blank">
View Original Laptop Details
</a>

<a class="btn"
href="https://wa.me/7416906493?text=Hi I am interested in Laptop ID ${laptop.id}">
Chat on WhatsApp
</a>

</div>
`

if(laptop.brand === "HP"){
hpContainer.innerHTML += card
}

if(laptop.brand === "Lenovo"){
lenovoContainer.innerHTML += card
}

})

startSlider()

}



/* SLIDER */

function startSlider(){

setInterval(()=>{

document.querySelectorAll(".slider").forEach(slider=>{

let slides = slider.querySelectorAll(".slide")

if(slides.length < 2) return

let active = slider.querySelector(".active")

let index = [...slides].indexOf(active)

active.classList.remove("active")

slides[(index+1)%slides.length].classList.add("active")

})

},3000)

}



/* OPEN PRODUCT PAGE */

window.openProduct=function(id){
window.location.href="product.html?id="+id
}


/* LOAD DATA */

loadLaptops()