import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabaseUrl = "https://cfjfqkihhedavxgtgqve.supabase.co"
const supabaseKey = "sb_publishable_HApwGwt-OCWOc73IjaZq3Q_ikF4SMzE"

const supabase = createClient(supabaseUrl, supabaseKey)


const params = new URLSearchParams(window.location.search)
const id = params.get("id")

loadProduct()

async function loadProduct(){

const { data:laptop } = await supabase
.from("laptops")
.select("*")
.eq("id",id)
.single()

const { data:images } = await supabase
.from("images")
.select("*")
.eq("laptop_id",id)

document.getElementById("productInfo").innerHTML = `

<h2>${laptop.brand} ${laptop.model}</h2>
<h3>Laptop ID — ${laptop.id}</h3>

<p class="price">₹${laptop.price}</p>

<p><b>Processor:</b> ${laptop.processor}</p>
<p><b>RAM:</b> ${laptop.ram}</p>
<p><b>Storage:</b> ${laptop.storage}</p>

<p><b>Laptop Condition:</b> ${laptop.condition}</p>
<p><b>Battery Health:</b> ${laptop.battery}</p>

<p><b>Keyboard:</b> ${laptop.keyboard}</p>
<p><b>Fingerprint Sensor:</b> ${laptop.fingerprint}</p>

${laptop.note ? `<p><b>Condition Note:</b> ${laptop.note}</p>` : ""}

<a class="product-link"
href="https://www.flipkart.com/hp-340s-g7-core-i5-10th-gen-8-gb-512-gb-ssd-windows-10-pro-laptop/p/itm7d97dbba2a8ec"
target="_blank">
View Original Laptop Details
</a>

<a class="btn"
href="https://wa.me/7416906493?text=Hi I am interested in Laptop ID ${laptop.id}">
Chat on WhatsApp
</a>
`

const mainImage = document.getElementById("mainImage")
const thumbs = document.getElementById("thumbs")

mainImage.src = "images/"+images[0].image

images.forEach(img=>{

let i = document.createElement("img")

i.src = "images/"+img.image

i.onclick = ()=> mainImage.src=i.src

thumbs.appendChild(i)

})

}