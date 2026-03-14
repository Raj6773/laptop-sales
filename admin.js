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

const laptop={

id:id,
brand:document.getElementById("brand").value,
model:document.getElementById("model").value,

price:document.getElementById("price").value,
processor:document.getElementById("processor").value,

ram:document.getElementById("ram").value,
storage:document.getElementById("storage").value,

condition:document.getElementById("condition").value,
battery:document.getElementById("battery").value,

keyboard:document.getElementById("keyboard").value,
fingerprint:document.getElementById("fingerprint").value,

note:document.getElementById("note").value,
original_link:document.getElementById("link").value

}

await supabase
.from("laptops")
.upsert(laptop)

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