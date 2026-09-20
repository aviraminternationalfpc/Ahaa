const products = [
  {name:"Frozen Green Peas", category:"vegetables", icon:"🫛", text:"Reliable quality green peas for exceptional taste."},
  {name:"Frozen Sweetcorn", category:"vegetables", icon:"🌽", text:"Naturally sweet corn delivering freshness and quality."},
  {name:"Frozen Mix Veg", category:"vegetables", icon:"🥕", text:"Clean, fresh and ready-to-cook mixed vegetables."},
  {name:"Frozen Hara Chana", category:"vegetables", icon:"🌱", text:"Quality green chana for delicious recipes across every season."},
  {name:"Frozen Peeled Garlic", category:"vegetables", icon:"🧄", text:"Fresh garlic delivering rich aroma and consistent cooking results."},
  {name:"Frozen Broccoli", category:"vegetables", icon:"🥦", text:"Green, fresh and nutritious frozen broccoli."},
  {name:"Frozen Custard Apple Pulp", category:"fruits", icon:"🍈", text:"Premium natural custard apple pulp with zero added sugar."},
  {name:"Frozen Jamun Pulp", category:"fruits", icon:"🫐", text:"Ready-to-use jamun pulp for smoothies, drinks and culinary creations."},
  {name:"Frozen Mango Pulp", category:"fruits", icon:"🥭", text:"Pure mango pulp capturing real fruit goodness and natural sweetness."},
  {name:"Frozen Mango Slice", category:"fruits", icon:"🥭", text:"Ready-to-use mango slices for smoothies, desserts and culinary creations."},
  {name:"Frozen Strawberry", category:"fruits", icon:"🍓", text:"Naturally sweet strawberries for gourmet desserts and beverages."},
  {name:"Frozen Chikoo Slice", category:"fruits", icon:"🍐", text:"Delicious chikoo slices for desserts, beverages and culinary excellence."}
];

/*
  YOUTUBE GALLERY:
  Replace the empty "id" values below with your own YouTube video IDs.
  Example: https://www.youtube.com/watch?v=ABC123XYZ  -> id: "ABC123XYZ"
*/
const videos = [
  { id:"", title:"Ahaa! Product Story", note:"Add your YouTube video ID"},
  {id:"", title:"From Farm to Food", note:"Add your YouTube video ID"},
  {id:"", title:"The Nature Food Ahaa!", note:"Add your YouTube video ID"}
];

const productGrid = document.getElementById("productGrid");
const filters = document.querySelectorAll(".filter");

function renderProducts(filter="all"){
  const visible = filter === "all" ? products : products.filter(p => p.category === filter);
  productGrid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-icon">${p.icon}</div>
      <h3>${p.name}</h3>
      <p>${p.text}</p>
      <span class="product-tag">${p.category === "fruits" ? "Fruits & Pulps" : "Vegetables & Essentials"}</span>
    </article>
  `).join("");
}

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

const videoGrid = document.getElementById("videoGrid");
function renderVideos(){
  const ready = videos.filter(v => v.id.trim());
  if(!ready.length){
    videoGrid.innerHTML = `
      <div class="video-empty">
        <strong>Stay Connected</strong>
        <p style="margin-top:7px">youtube video will soon</p>
      </div>`;
    return;
  }
  videoGrid.innerHTML = ready.map(v => `
    <article class="video-card">
      <iframe src="https://www.youtube.com/embed/${encodeURIComponent(v.id)}"
        title="${v.title}" loading="lazy" allowfullscreen></iframe>
      <div class="video-info"><b>${v.title}</b><small>${v.note}</small></div>
    </article>
  `).join("");
}

renderProducts();
renderVideos();

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
