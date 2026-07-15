const apps = [
  {name:"WhatsApp",category:"Communication",icon:"💬",rating:4.3,size:"Varies",version:"Official",description:"Secure messaging, voice calls and video calls.",link:"https://play.google.com/store/apps/details?id=com.whatsapp",featured:true},
  {name:"Telegram",category:"Communication",icon:"✈️",rating:4.2,size:"Varies",version:"Official",description:"Cloud messaging with channels, groups and file sharing.",link:"https://play.google.com/store/apps/details?id=org.telegram.messenger",featured:true},
  {name:"Google Keep",category:"Productivity",icon:"📝",rating:4.1,size:"Varies",version:"Official",description:"Create notes, lists, reminders and collaborative ideas.",link:"https://play.google.com/store/apps/details?id=com.google.android.keep",featured:true},
  {name:"Microsoft To Do",category:"Productivity",icon:"✅",rating:4.5,size:"Varies",version:"Official",description:"Organize daily tasks, goals and personal reminders.",link:"https://play.google.com/store/apps/details?id=com.microsoft.todos"},
  {name:"VLC for Android",category:"Media",icon:"🎬",rating:4.3,size:"Varies",version:"Official",description:"Open-source video and music player for Android.",link:"https://play.google.com/store/apps/details?id=org.videolan.vlc"},
  {name:"Canva",category:"Design",icon:"🎨",rating:4.5,size:"Varies",version:"Official",description:"Create posters, social posts and presentations.",link:"https://play.google.com/store/apps/details?id=com.canva.editor"},
  {name:"Khan Academy",category:"Education",icon:"📚",rating:4.5,size:"Varies",version:"Official",description:"Learn mathematics, science and more with free lessons.",link:"https://play.google.com/store/apps/details?id=org.khanacademy.android"},
  {name:"Files by Google",category:"Tools",icon:"🗂️",rating:4.4,size:"Varies",version:"Official",description:"Clean storage, manage files and share documents.",link:"https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.files"},
  {name:"Google Calculator",category:"Tools",icon:"🧮",rating:4.4,size:"Varies",version:"Official",description:"A simple calculator for everyday calculations.",link:"https://play.google.com/store/apps/details?id=com.google.android.calculator"},
  {name:"YouTube",category:"Media",icon:"▶️",rating:4.1,size:"Varies",version:"Official",description:"Watch videos, creators, music and live streams.",link:"https://play.google.com/store/apps/details?id=com.google.android.youtube"}
];

const games = [
  {name:"Chess",icon:"♟️",link:"https://play.google.com/store/search?q=chess&c=apps"},
  {name:"Sudoku",icon:"🔢",link:"https://play.google.com/store/search?q=sudoku&c=apps"},
  {name:"Racing",icon:"🏎️",link:"https://play.google.com/store/search?q=racing%20game&c=apps"},
  {name:"Puzzle",icon:"🧩",link:"https://play.google.com/store/search?q=puzzle%20game&c=apps"}
];

let currentCategory = "All";
let currentSearch = "";

const featuredGrid = document.getElementById("featuredGrid");
const appList = document.getElementById("appList");
const gameStrip = document.getElementById("gameStrip");
const emptyState = document.getElementById("emptyState");
const sortSelect = document.getElementById("sortSelect");

function appMatches(app){
  const matchesCategory = currentCategory === "All" || app.category === currentCategory;
  const text = `${app.name} ${app.category} ${app.description}`.toLowerCase();
  return matchesCategory && text.includes(currentSearch.toLowerCase());
}

function renderFeatured(){
  featuredGrid.innerHTML = apps.filter(a=>a.featured).map(app=>`
    <article class="featured-card">
      <div class="featured-top">
        <div class="app-icon">${app.icon}</div>
        <div>
          <h3>${app.name}</h3>
          <div class="rating">★ ${app.rating}</div>
          <small>${app.category}</small>
        </div>
      </div>
      <p>${app.description}</p>
      <a class="small-download" href="${app.link}" target="_blank" rel="noopener noreferrer">Official Link ↗</a>
    </article>
  `).join("");
}

function renderApps(){
  let filtered = apps.filter(appMatches);

  if(sortSelect.value === "name") filtered.sort((a,b)=>a.name.localeCompare(b.name));
  if(sortSelect.value === "rating") filtered.sort((a,b)=>b.rating-a.rating);

  appList.innerHTML = filtered.map(app=>`
    <article class="app-row">
      <div class="app-icon">${app.icon}</div>
      <div class="app-row-main">
        <h3>${app.name}</h3>
        <div class="app-meta">
          <span>★ ${app.rating}</span>
          <span>${app.category}</span>
          <span>${app.size}</span>
          <span>${app.version}</span>
        </div>
        <p>${app.description}</p>
      </div>
      <a class="download-btn" href="${app.link}" target="_blank" rel="noopener noreferrer">Official Download</a>
    </article>
  `).join("");

  emptyState.style.display = filtered.length ? "none" : "block";
}

function renderGames(){
  gameStrip.innerHTML = games.map(game=>`
    <a class="game-card" href="${game.link}" target="_blank" rel="noopener noreferrer">
      <div class="app-icon">${game.icon}</div>
      <strong>${game.name}</strong>
      <p>Official store search</p>
    </a>
  `).join("");
}

document.querySelectorAll(".category-item").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".category-item").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderApps();
    document.getElementById("latest").scrollIntoView({behavior:"smooth"});
  });
});

function bindSearch(id){
  const el=document.getElementById(id);
  el.addEventListener("input",e=>{
    currentSearch=e.target.value.trim();
    const other=id==="headerSearch"?"mobileSearch":"headerSearch";
    document.getElementById(other).value=currentSearch;
    renderApps();
  });
}
bindSearch("headerSearch");
bindSearch("mobileSearch");

sortSelect.addEventListener("change",renderApps);

document.querySelectorAll("[data-scroll-target]").forEach(btn=>{
  btn.addEventListener("click",()=>document.getElementById(btn.dataset.scrollTarget).scrollIntoView({behavior:"smooth"}));
});

document.getElementById("menuBtn").addEventListener("click",()=>{
  document.getElementById("mainNav").classList.toggle("open");
});

document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>{
  document.getElementById("mainNav").classList.remove("open");
}));

document.getElementById("year").textContent=new Date().getFullYear();

renderFeatured();
renderApps();
renderGames();
