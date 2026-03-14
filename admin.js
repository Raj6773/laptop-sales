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

<button onclick="deleteLaptop('${laptop.id}')">
Delete
</button>

</div>

`

})

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
.insert(laptop)

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