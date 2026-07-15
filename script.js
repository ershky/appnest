const apps = [
  {
    name: "WhatsApp",
    category: "Communication",
    icon: "💬",
    developer: "Official store listing",
    description: "Messaging and calling app. The button opens its official Google Play page.",
    link: "https://play.google.com/store/apps/details?id=com.whatsapp"
  },
  {
    name: "Telegram",
    category: "Communication",
    icon: "✈️",
    developer: "Official store listing",
    description: "Cloud-based messaging app with channels, groups and file sharing.",
    link: "https://play.google.com/store/apps/details?id=org.telegram.messenger"
  },
  {
    name: "Google Keep",
    category: "Productivity",
    icon: "📝",
    developer: "Official store listing",
    description: "Create notes, checklists and reminders across your devices.",
    link: "https://play.google.com/store/apps/details?id=com.google.android.keep"
  },
  {
    name: "Microsoft To Do",
    category: "Productivity",
    icon: "✅",
    developer: "Official store listing",
    description: "Plan tasks, daily goals and personal reminders from one dashboard.",
    link: "https://play.google.com/store/apps/details?id=com.microsoft.todos"
  },
  {
    name: "VLC for Android",
    category: "Media",
    icon: "🎬",
    developer: "Official store listing",
    description: "Open-source media player for video and audio playback.",
    link: "https://play.google.com/store/apps/details?id=org.videolan.vlc"
  },
  {
    name: "Canva",
    category: "Design",
    icon: "🎨",
    developer: "Official store listing",
    description: "Create social posts, presentations, posters and other designs.",
    link: "https://play.google.com/store/apps/details?id=com.canva.editor"
  }
];

const appGrid = document.getElementById("appGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");
const emptyState = document.getElementById("emptyState");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

let activeCategory = "All";

function renderApps() {
  const term = searchInput.value.trim().toLowerCase();

  const filteredApps = apps.filter((app) => {
    const matchesCategory =
      activeCategory === "All" || app.category === activeCategory;

    const matchesSearch =
      app.name.toLowerCase().includes(term) ||
      app.category.toLowerCase().includes(term) ||
      app.description.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  appGrid.innerHTML = "";

  filteredApps.forEach((app) => {
    const card = document.createElement("article");
    card.className = "app-card";

    card.innerHTML = `
      <div class="app-icon">${app.icon}</div>
      <div class="app-meta">${app.category}</div>
      <h3>${app.name}</h3>
      <p>${app.description}</p>
      <div class="card-bottom">
        <a
          class="official-btn"
          href="${app.link}"
          target="_blank"
          rel="noopener noreferrer sponsored"
        >
          Official Download ↗
        </a>
      </div>
    `;

    appGrid.appendChild(card);
  });

  emptyState.style.display = filteredApps.length ? "none" : "block";
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    activeCategory = filter.dataset.category;
    renderApps();
  });
});

searchInput.addEventListener("input", renderApps);

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("formStatus").textContent =
    "Suggestion saved locally. Connect EmailJS or Formspree to receive real messages.";
  event.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();

renderApps();
