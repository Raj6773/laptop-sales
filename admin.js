import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient(
"https://cfjfqkihhedavxgtgqve.supabase.co",
"sb_publishable_HApwGwt-OCWOc73IjaZq3Q_ikF4SMzE"
)

loadLaptops()

async function loadLaptops(){

const { data } = await supabase
.from("laptops")
.select("*")

const list=document.getElementById("list")

list.innerHTML=""

data.forEach(laptop=>{

list.innerHTML+=`

<div class="card">

<h3>${laptop.brand} ${laptop.model}</h3>

Laptop ID: ${laptop.id}<br>
Price: ₹${laptop.price}

<br><br>

<button onclick="editLaptop('${laptop.id}')">
Edit
</button>

<button onclick="deleteLaptop('${laptop.id}')">
Delete
</button>

</div>

`

})

}


window.editLaptop = async function(id){

const { data } = await supabase
.from("laptops")
.select("*")
.eq("id",id)
.single()

document.getElementById("id").value = data.id
document.getElementById("brand").value = data.brand
document.getElementById("model").value = data.model

document.getElementById("price").value = data.price
document.getElementById("processor").value = data.processor

document.getElementById("ram").value = data.ram
document.getElementById("storage").value = data.storage

document.getElementById("condition").value = data.condition
document.getElementById("battery").value = data.battery

document.getElementById("keyboard").value = data.keyboard
document.getElementById("fingerprint").value = data.fingerprint

document.getElementById("note").value = data.note
document.getElementById("link").value = data.original_link

}





window.addLaptop = async function(){

const id=document.getElementById("id").value

const laptop={ id:id }

function addField(name,id){
let v=document.getElementById(id).value
if(v) laptop[name]=v
}

addField("brand","brand")
addField("model","model")
addField("price","price")
addField("processor","processor")
addField("ram","ram")
addField("storage","storage")
addField("condition","condition")
addField("battery","battery")
addField("keyboard","keyboard")
addField("fingerprint","fingerprint")
addField("note","note")
addField("original_link","link")

const {data} = await supabase
.from("laptops")
.select("id")
.eq("id",id)

if(data.length === 0){

await supabase
.from("laptops")
.insert(laptop)

}else{

await supabase
.from("laptops")
.update(laptop)
.eq("id",id)

}

const files=document.getElementById("images").files

for(let file of files){

await supabase.storage
.from("images")
.upload(id+"/"+file.name,file)

await supabase
.from("images")
.insert({
laptop_id:id,
image:id+"/"+file.name
})

}

alert("Laptop Added")

loadLaptops()

}

window.deleteLaptop = async function(id){

await supabase
.from("laptops")
.delete()
.eq("id",id)

await supabase
.from("images")
.delete()
.eq("laptop_id",id)

loadLaptops()

}



document.getElementById("images").addEventListener("change",function(){

const preview=document.getElementById("preview")

preview.innerHTML=""

for(let file of this.files){

let img=document.createElement("img")

img.src=URL.createObjectURL(file)

preview.appendChild(img)

}

})