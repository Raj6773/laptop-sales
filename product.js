const laptops={

"010HA":{
images:["hp1-1.jpg","hp1-2.jpg","hp1-3.jpg","hp1-4.jpg","hp1-5.jpg","hp1-6.jpg"],
html:`

<h3>Laptop ID — 010HA</h3>
<p class="price">₹25000</p>

<p><b>Processor:</b> Intel Core i5 10th Gen</p>
<p><b>RAM:</b> 8GB</p>
<p><b>Storage:</b> 512GB SSD</p>

<p><b>Laptop Condition:</b> Excellent</p>

<p><b>Battery Health:</b> Excellent  
<span class="note">(Battery replacement can be arranged using another compatible unit from the available HP stock if required. Additional charge will be applied.)</span></p>

<p><b>Keyboard:</b> Backlit Keyboard</p>
<p><b>Fingerprint Sensor:</b> Yes</p>

<a class="product-link" href="https://www.flipkart.com/hp-340s-g7-core-i5-10th-gen-8-gb-512-gb-ssd-windows-10-pro-laptop/p/itm7d97dbba2a8ec" target="_blank">View Original Laptop Details</a>

<a class="btn" href="https://wa.me/7416906493?text=Hi I am interested in Laptop ID 010HA">Chat on WhatsApp</a>
`
},

"040HD":{
images:["hp4-1.jpg","hp4-2.jpg","hp4-3.jpg","hp4-4.jpg","hp4-5.jpg","hp4-6.jpg"],
html:`

<h3>Laptop ID — 040HD</h3>

<p class="price">₹15000</p>

<p><b>Processor:</b> Intel Core i5 10th Gen</p>
<p><b>RAM:</b> 8GB</p>
<p><b>Storage:</b> 512GB SSD</p>

<p><b>Laptop Condition:</b> Display Issue</p>

<p><b>Battery Health:</b> Fair  
<span class="note">(Battery replacement can be arranged using another compatible unit from the available HP stock if required. Additional charge will be applied.)</span></p>

<p><b>Keyboard:</b> Standard Keyboard</p>
<p><b>Fingerprint Sensor:</b> No</p>

<p><b>Condition Note:</b> Display has a small dark mark at the bottom-left corner of the screen.</p>

<a class="product-link" href="https://www.flipkart.com/hp-340s-g7-core-i5-10th-gen-8-gb-512-gb-ssd-windows-10-pro-laptop/p/itm7d97dbba2a8ec" target="_blank">View Original Laptop Details</a>

<a class="btn" href="https://wa.me/7416906493?text=Hi I am interested in Laptop ID 040HD">Chat on WhatsApp</a>
`
}

}

const params=new URLSearchParams(window.location.search)
const id=params.get("id")

const laptop=laptops[id]

document.getElementById("productInfo").innerHTML=laptop.html

const mainImage=document.getElementById("mainImage")
mainImage.src="images/"+laptop.images[0]

const thumbs=document.getElementById("thumbs")

laptop.images.forEach(img=>{

let i=document.createElement("img")

i.src="images/"+img

i.onclick=()=>mainImage.src=i.src

thumbs.appendChild(i)

})
