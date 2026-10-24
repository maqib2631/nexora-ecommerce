const products = [
  {id:1,name:"Pebble Ceramic Vase",category:"Home",price:799,oldPrice:999,badge:"BESTSELLER",rating:"4.8",image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=85",description:"A simple shape for your favourite stems."},
  {id:2,name:"Studio Wireless Headphones",category:"Tech",price:2499,oldPrice:2999,badge:"POPULAR",rating:"4.7",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",description:"Comfortable sound for everyday listening."},
  {id:3,name:"Everyday Canvas Tote",category:"Style",price:549,oldPrice:null,badge:"EASY PICK",rating:"4.6",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=85",description:"A roomy carry-all for busy days."},
  {id:4,name:"Soft Glow Table Lamp",category:"Home",price:1899,oldPrice:2299,badge:"NEW",rating:"4.9",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85",description:"Warm light for a slower evening."},
  {id:5,name:"Minimal Desk Clock",category:"Home",price:999,oldPrice:null,badge:"",rating:"4.5",image:"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=700&q=85",description:"A quiet reminder to take your time."},
  {id:6,name:"Compact Bluetooth Speaker",category:"Tech",price:1599,oldPrice:1899,badge:"GOOD FIND",rating:"4.7",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=85",description:"Bring a little soundtrack wherever you go."},
  {id:7,name:"Classic Everyday Sneakers",category:"Style",price:2199,oldPrice:2599,badge:"FAVOURITE",rating:"4.8",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",description:"An easy pair for everyday plans."},
  {id:8,name:"Insulated Travel Bottle",category:"Tech",price:699,oldPrice:null,badge:"UNDER ₹700",rating:"4.6",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85",description:"Keep your favourite drink close by."}
];
const $ = (selector) => document.querySelector(selector);
const productGrid = $("#productGrid");
const searchInput = $("#searchInput");
const filterTabs = $("#filterTabs");
const sortSelect = $("#sortSelect");
const cartDrawer = $("#cartDrawer");
const overlay = $("#overlay");
const toast = $("#toast");
let activeCategory = "All";
let cart = JSON.parse(localStorage.getItem("nexora-cart") || "[]");
let toastTimer;

const money = value => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
function renderProducts(){
  const term = searchInput.value.trim().toLowerCase();
  let shown = products.filter(p => (activeCategory==="All" || p.category===activeCategory) &&
    (p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)));
  if(sortSelect.value==="low") shown.sort((a,b)=>a.price-b.price);
  if(sortSelect.value==="high") shown.sort((a,b)=>b.price-a.price);
  productGrid.innerHTML = shown.map(p=>`<article class="product-card">
    <div class="product-image-wrap"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/600x700/e9e8e0/344c3c?text=NEXORA'">
    ${p.badge?`<span class="product-badge">${p.badge}</span>`:""}
    <button class="quick-add" data-add="${p.id}">Add to bag <span>＋</span></button></div>
    <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><div class="product-bottom"><div class="price">${money(p.price)} ${p.oldPrice?`<span class="old-price">${money(p.oldPrice)}</span>`:""}</div><span class="rating">★ ${p.rating}</span></div></div></article>`).join("");
  $("#emptyState").hidden = shown.length!==0;
  $("#resultLine").textContent = `${shown.length} ${shown.length===1?"item":"items"} to explore`;
}
function saveCart(){localStorage.setItem("nexora-cart",JSON.stringify(cart));renderCart();}
function addToCart(id){
  const found=cart.find(item=>item.id===id);
  if(found) found.qty+=1; else cart.push({id,qty:1});
  saveCart();showToast(`${products.find(p=>p.id===id).name} added to your bag`);
}
function changeQty(id,delta){
  const item=cart.find(x=>x.id===id);if(!item)return;
  item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);
  saveCart();
}
function renderCart(){
  const count=cart.reduce((sum,item)=>sum+item.qty,0);
  const subtotal=cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.qty,0);
  $("#cartCount").textContent=count;$("#drawerCount").textContent=`(${count})`;$("#subtotal").textContent=money(subtotal);$("#checkoutTotal").textContent=money(subtotal);
  $("#cartItems").innerHTML=cart.map(item=>{const p=products.find(x=>x.id===item.id);return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><span class="item-category">${p.category}</span><h3>${p.name}</h3><span class="item-price">${money(p.price)}</span><div class="quantity-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">＋</button></div></div><button class="remove-item" data-remove="${p.id}">Remove</button></div>`}).join("");
  $("#cartEmpty").style.display=count?"none":"block";$("#cartFooter").style.display=count?"block":"none";
}
function openCart(){cartDrawer.classList.add("open");overlay.classList.add("open");cartDrawer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeCart(){cartDrawer.classList.remove("open");overlay.classList.remove("open");cartDrawer.setAttribute("aria-hidden","true");document.body.style.overflow="";}
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2300);}
productGrid.addEventListener("click",e=>{const button=e.target.closest("[data-add]");if(button)addToCart(Number(button.dataset.add));});
filterTabs.addEventListener("click",e=>{const button=e.target.closest("[data-category]");if(!button)return;activeCategory=button.dataset.category;filterTabs.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b===button));renderProducts();});
document.querySelectorAll(".category-card").forEach(button=>button.addEventListener("click",()=>{activeCategory=button.dataset.category;filterTabs.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.category===activeCategory));renderProducts();$("#products").scrollIntoView({behavior:"smooth"});}));
searchInput.addEventListener("input",renderProducts);sortSelect.addEventListener("change",renderProducts);
$("#openCart").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#continueShopping").addEventListener("click",closeCart);overlay.addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
$("#cartItems").addEventListener("click",e=>{const qty=e.target.closest("[data-qty]");const remove=e.target.closest("[data-remove]");if(qty)changeQty(Number(qty.dataset.qty),Number(qty.dataset.delta));if(remove){cart=cart.filter(x=>x.id!==Number(remove.dataset.remove));saveCart();}});
$("#checkoutButton").addEventListener("click",()=>{if(!cart.length)return;closeCart();$("#checkoutDialog").showModal();});
$("#closeCheckout").addEventListener("click",()=>$("#checkoutDialog").close());
$("#checkoutForm").addEventListener("submit",e=>{e.preventDefault();const data=new FormData(e.currentTarget);const orderNo="NX"+Math.random().toString(36).slice(2,8).toUpperCase();$("#checkoutDialog").close();cart=[];saveCart();e.currentTarget.reset();showToast(`Demo order ${orderNo} placed. Thank you, ${data.get("fullName")}!`);});
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("#newsletterMessage").textContent="Thanks for joining us — this demo form is working locally.";e.currentTarget.reset();});
$("#year").textContent=new Date().getFullYear();
renderProducts();renderCart();