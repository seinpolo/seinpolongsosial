const WA_NUMBER = "6282191934738";
const WA_CS = ["6289515231087", "6285774226231"];

const services = [
  {name:"TikTok Followers", icon:"🎵", items:[["50 FOLL ASLI","Rp5.000"],["100 FOLL ASLI","Rp10.000"],["200 FOLL ASLI","Rp20.000"],["400 FOLL ASLI","Rp35.000"],["500 FOLL ASLI","Rp40.000"],["1000 FOLL ASLI","Rp80.000"]]},
  {name:"TikTok Like", icon:"❤️", items:[["50 LIKE","Rp3.000"],["100 LIKE","Rp5.000"],["200 LIKE","Rp10.000"],["400 LIKE","Rp17.000"],["500 LIKE","Rp25.000"],["1000 LIKE","Rp40.000"]]},
  {name:"TikTok Viewers", icon:"👁️", items:[["1000 VIEW","Rp1.000"],["2000 VIEW","Rp2.000"],["3000 VIEW","Rp3.000"],["4000 VIEW","Rp4.000"],["5000 VIEW","Rp5.000"],["10.000 VIEW","Rp9.000"],["20.000 VIEW","Rp15.000"]]},
  {name:"Instagram Followers", icon:"📸", items:[["100 FOLL ASLI","Rp5.000"],["200 FOLL ASLI","Rp10.000"],["300 FOLL ASLI","Rp15.000"],["400 FOLL ASLI","Rp20.000"],["500 FOLL ASLI","Rp25.000"],["1000 FOLL ASLI","Rp45.000"]]},
  {name:"Instagram Like", icon:"❤️", items:[["100 LIKE","Rp1.000"],["200 LIKE","Rp2.000"],["300 LIKE","Rp3.000"],["400 LIKE","Rp4.000"],["500 LIKE","Rp5.000"],["1000 LIKE","Rp10.000"]]},
  {name:"Instagram Viewers", icon:"👁️", items:[["1000 VIEW","Rp1.000"],["2000 VIEW","Rp2.000"],["3000 VIEW","Rp2.000"],["4000 VIEW","Rp4.000"],["5000 VIEW","Rp5.000"],["10.000 VIEW","Rp9.000"],["20.000 VIEW","Rp15.000"]]},
  {name:"Saluran WhatsApp", icon:"🟢", items:[["100 PENGIKUT ASLI","Rp2.000"],["200 PENGIKUT ASLI","Rp5.000"],["300 PENGIKUT ASLI","Rp7.000"],["500 PENGIKUT ASLI","Rp10.000"],["1000 PENGIKUT ASLI","Rp18.000"],["5000 PENGIKUT ASLI","Rp88.000"],["10000 PENGIKUT ASLI","Rp150.000"]]}
];

const cards = document.getElementById("cards");
const serviceSelect = document.getElementById("service");
const packageSelect = document.getElementById("package");
const totalPrice = document.getElementById("totalPrice");
const search = document.getElementById("search");

function priceNumber(value){ return Number(value.replace(/[^0-9]/g,"")); }
function formatRupiah(value){ return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(value); }

function render(filter=""){
  cards.innerHTML="";
  const q=filter.toLowerCase();
  const list=services.filter(s=>s.name.toLowerCase().includes(q)||s.items.some(i=>i.join(" ").toLowerCase().includes(q)));
  list.forEach(s=>{
    const card=document.createElement("article"); card.className="product-card";
    card.innerHTML=`<div class="product-head"><div class="product-name"><span class="product-icon">${s.icon}</span><div><h3>${s.name}</h3><span class="product-tag">SEINPOLONG SERVICE</span></div></div><span class="eyebrow">${s.items.length} PAKET</span></div>
      <div class="price-list">${s.items.map(i=>`<div class="price-row"><b>${i[0]}</b><span>${i[1]}</span></div>`).join("")}</div>
      <div class="product-foot"><span>Harga website</span><b>Pilih paket di form order ↓</b></div>`;
    cards.appendChild(card);
  });
  if(!list.length) cards.innerHTML=`<div class="product-card"><b>Produk tidak ditemukan.</b></div>`;
}

function fillServices(){
  serviceSelect.innerHTML="";
  services.forEach((s,i)=>{const o=document.createElement("option");o.value=i;o.textContent=s.name;serviceSelect.appendChild(o);});
  fillPackages();
}
function fillPackages(){
  const s=services[Number(serviceSelect.value)||0];
  packageSelect.innerHTML="";
  s.items.forEach((item,i)=>{const o=document.createElement("option");o.value=i;o.textContent=`${item[0]} — ${item[1]}`;packageSelect.appendChild(o);});
  updateTotal();
}
function updateTotal(){
  const s=services[Number(serviceSelect.value)||0];
  const item=s.items[Number(packageSelect.value)||0];
  totalPrice.textContent=item?item[1]:"-";
}

fillServices(); render();
search.addEventListener("input",e=>render(e.target.value));
serviceSelect.addEventListener("change",fillPackages);
packageSelect.addEventListener("change",updateTotal);

document.getElementById("orderForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const s=services[Number(serviceSelect.value)||0];
  const item=s.items[Number(packageSelect.value)||0];
  const link=document.getElementById("link").value.trim();
  const message=[
    "Halo Admin SEINPOLONG 👋", "",
    `Nama: ${name}`,
    `Layanan: ${s.name}`,
    `Paket: ${item[0]}`,
    `Harga: ${item[1]}`,
    `Total: ${item[1]}`,
    `Link: ${link}`,"",
    "Saya mau order layanan tersebut."
  ].join("\n");
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");
});

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".nav-link")];
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));}})},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>observer.observe(s));
