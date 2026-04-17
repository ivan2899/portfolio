
const projects = [
  {
    title: "project1.title",
    desc: "project1.desc",
    img: "./media/proyects/gameProyect.jpeg",
    link: "https://github.com/ivan2899/tp.salaDeJuegos",
    web: "https://tpsaladejuegos-7f33d.web.app"
  },
  {
    title: "project2.title",
    desc: "project2.desc",
    img: "./media/proyects/clinicaProyect.png",
    link: "https://github.com/ivan2899/clinicaOnline.git",
    web: "https://clinicaonline-2a62f.web.app"
  },
  {
    title: "project3.title",
    desc: "project3.desc",
    img: "./media/proyects/securityProyect.png",
    link: "https://github.com/ivan2899/security-tech.git",
    web: "https://ivan2899.github.io/security-tech/"
  },
  {
    title: "project4.title",
    desc: "project4.desc",
    img: "./media/proyects/inclusionProyect.png",
    link: "https://github.com/ivan2899/inclusion.git",
    web: "https://ivan2899.github.io/inclusion/"
  },
  {
    title: "project5.title",
    desc: "project5.desc",
    img: "./media/proyects/coffeeProyect.png",
    link: "https://github.com/ivan2899/A332-1-grupo2-coffee-house",
    web: "https://ivan2899.github.io/A332-1-grupo2-coffee-house/"
  }
];

const track = document.getElementById("track");
let index = 0;

projects.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
  <div class="card-inner">
    <div class="img-wrapper">
      <img class="img-content" src="${p.img}">
      <a href="${p.web}" target="_blank" class="overlay" data-i18n="viewProyect">
      </a>
    </div>
    <div class="card-content">
      <h3 data-i18n="${p.title}"></h3>
      <p data-i18n="${p.desc}"></p>
      <button data-i18n="viewCode" onclick="window.open('${p.link}')"></button>
    </div>
  </div>
`;
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
let texts = [];

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
  const elements = document.querySelectorAll("[data-i18n]");

  // FADE OUT (con blur)
  elements.forEach(el => {
    el.classList.add("fade-out");
    el.classList.remove("fade-in");
  });

  setTimeout(() => {

    // CAMBIO DE TEXTO
    elements.forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = translations[key] || "";
    });

    // FADE IN
    elements.forEach(el => {
      el.classList.remove("fade-out");
      el.classList.add("fade-in");
    });

    // TEXTO DINÁMICO RESET
    if (translations.dynamicText) {
      texts = translations.dynamicText;
      i = 0;
      j = 0;
      dyn.textContent = "";
      type();
    }

  }, 250);
}

/* TOGGLE */
function toggleLang() {
  currentLang = currentLang === "es" ? "en" : "es";

  const text = document.getElementById("langText");
  const img = document.getElementById("langImg");

  if (currentLang === "es") {
    text.textContent = "EN";
    img.src = "./media/proyects/imgBanderaEEUU.png";
  } else {
    text.textContent = "ES";
    img.src = "./media/proyects/imgBanderaEspania.png";
  }

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

function copyMail(el) {
  const email = "ivan.cordoba2002@gmail.com";

  navigator.clipboard.writeText(email);

  el.classList.add("copied");

  setTimeout(() => {
    el.classList.remove("copied");
  }, 1500);
}

function toggleMenu() {
  const menu = document.querySelector(".nav-links");
  const burger = document.querySelector(".hamburger");

  menu.classList.toggle("open");
  burger.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {

  const links = document.querySelectorAll(".nav-links a");
  const menu = document.querySelector(".nav-links");
  const burger = document.querySelector(".hamburger");

  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      burger.classList.remove("active");
    });
  });

});

loadTranslations(currentLang);
type();