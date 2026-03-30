
const projects = [
  {
    title: "Sala de juegos",
    desc: "Sistema login con la posibilidad de jugar algunos juegos",
    img: "./media/proyects/gameProyect.jpeg",
    link: "https://github.com/ivan2899/tp.salaDeJuegos",
    web: "#"
  },
  {
    title: "Security tech",
    desc: "Web informativa sobre seguridad informatica",
    img: "./media/proyects/securityProyect.png", link: "https://github.com/ivan2899/security-tech.git", web: "https://ivan2899.github.io/security-tech/"
  },
  {
    title: "Inclusion",
    desc: "Web para facilitar el acceso a las personas con discapacidad a la informacion.",
    img: "./media/proyects/inclusionProyect.png",
    link: "https://github.com/ivan2899/inclusion.git",
    web: "https://ivan2899.github.io/inclusion/"
  },
  {
    title: "Coffee House",
    desc: "Desarrollo grupal simulando una web de venta de café",
    img: "./media/proyects/coffeeProyect.png",
    link: "https://github.com/ivan2899/A332-1-grupo2-coffee-house",
    web: "https://ivan2899.github.io/A332-1-grupo2-coffee-house/"
  },
  {
    title: "Comanda",
    desc: "App mobile completa.",
    img: "https://picsum.photos/403/200",
    link: "https://github.com/ivan2899/LosSaboresDelCodigo-2025.git",
    web: "https://github.com/ivan2899/LosSaboresDelCodigo-2025.git"
  }
];

const track = document.getElementById("track");
let index = 0;

projects.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <div class="img-wrapper">
      <img class="img-content" src="${p.img}">
      <a href="${p.web}" target="_blank" class="overlay">
        Ver Proyecto
      </a>
    </div>
    <div class="card-content">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <button onclick="window.open('${p.link}')">Ver código</button>
    </div>`;
  track.appendChild(div);
});

function move(dir) {
  const cards = document.querySelectorAll(".card");
  const width = cards[0].offsetWidth + 20;
  const visible = Math.floor(document.querySelector(".carousel").offsetWidth / width);

  index += dir;
  if (index < 0) index = 0;
  if (index > projects.length - visible) index = projects.length - visible;

  track.style.transform = `translateX(-${index * width}px)`;
}

// SWIPE
let startX = 0;
track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
track.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) move(1);
  if (endX - startX > 50) move(-1);
});

// THEME
function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById('themeIcon');
  const current = body.getAttribute("data-theme");

  if (current === "light") {
    body.setAttribute("data-theme", "dark");
    icon.textContent = "🌙";
  } else {
    body.setAttribute("data-theme", "light");
    icon.textContent = "☀️";
  }
}

// SCROLL ANIMATION PRO
const sections = document.querySelectorAll("section");

function reveal() {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
      sec.classList.add("visible");
    } else {
      sec.classList.remove("visible");
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// PARALLAX
const hero = document.getElementById("heroBg");
document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - .5) * 50;
  const y = (e.clientY / window.innerHeight - .5) * 50;
  hero.style.transform = `translate(${x}px,${y}px) scale(1.1)`;
});

// TEXTO DINÁMICO
let texts = ["Desarrollador Web", "Desarrollador Mobile", "Frontend", "Full Stack"]

let i = 0, j = 0;
const dyn = document.getElementById("dynamicText");

function type() {
  if (j < texts[i].length) {
    dyn.textContent += texts[i][j++];
    setTimeout(type, 50);
  } else setTimeout(erase, 1500);
}

function erase() {
  if (j > 0) {
    dyn.textContent = texts[i].substring(0, --j);
    setTimeout(erase, 30);
  } else {
    i = (i + 1) % texts.length;
    setTimeout(type, 300);
  }
}

/* ===== CAMBIO DE IDIOMA ===== */
let currentLang = "es";
let translations = {};

/* CARGAR JSON */
async function loadTranslations(lang) {
  const res = await fetch(`./media/assets/i18n/${lang}.json`);
  translations = await res.json();
  applyTranslations();
}

/* APLICAR */
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translations[key];
  });
}

/* TOGGLE */
function toggleLang() {
  currentLang = currentLang === "es" ? "en" : "es";

  document.getElementById("langBtn").textContent =
    currentLang === "es" ? "EN" : "ES";

  loadTranslations(currentLang);
}

/* ===== SCROLL SPY (SECCIÓN ACTIVA) ===== */
const sectionss = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  const scrollPosition = window.scrollY + 150;

  document.querySelectorAll("section").forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;

    if (scrollPosition >= top && scrollPosition < top + height) {
      current = sec.id;
    }
  });

  // 👇 FIX para HOME
  if (window.scrollY < 200) {
    current = "home";
  }

  document.querySelectorAll(".nav-links a").forEach(a => {
    a.classList.remove("active");

    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});

loadTranslations(currentLang);
type();