
const projects = [
  { title:"Juego Memoria",desc:"Juego interactivo con lógica de cartas.",img:"https://picsum.photos/400/200",link:"#"},
  { title:"Chat WhatsApp",desc:"Interfaz estilo WhatsApp real.",img:"https://picsum.photos/401/200",link:"#"},
  { title:"Firebase Auth",desc:"Sistema login con Firebase.",img:"https://picsum.photos/402/200",link:"#"},
  { title:"App Ionic",desc:"App mobile completa.",img:"https://picsum.photos/403/200",link:"#"}
];

const track = document.getElementById("track");
let index=0;

projects.forEach(p=>{
  const div=document.createElement("div");
  div.className="card";
  div.innerHTML=`
    <img src="${p.img}">
    <div class="card-content">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <button onclick="window.open('${p.link}')">Ver código</button>
    </div>`;
  track.appendChild(div);
});

function move(dir){
  const cards=document.querySelectorAll(".card");
  const width=cards[0].offsetWidth+20;
  const visible=Math.floor(document.querySelector(".carousel").offsetWidth/width);

  index+=dir;
  if(index<0) index=0;
  if(index>projects.length-visible) index=projects.length-visible;

  track.style.transform=`translateX(-${index*width}px)`;
}

// SWIPE
let startX=0;
track.addEventListener("touchstart",e=>startX=e.touches[0].clientX);
track.addEventListener("touchend",e=>{
  let endX=e.changedTouches[0].clientX;
  if(startX-endX>50) move(1);
  if(endX-startX>50) move(-1);
});

// THEME
function toggleTheme(){
  const body=document.body;
  const icon=document.getElementById('themeIcon');
  const current=body.getAttribute("data-theme");

  if(current==="light"){
    body.setAttribute("data-theme","dark");
    icon.textContent="🌙";
  }else{
    body.setAttribute("data-theme","light");
    icon.textContent="☀️";
  }
}

// SCROLL ANIMATION PRO
const sections=document.querySelectorAll("section");

function reveal(){
  sections.forEach(sec=>{
    const rect=sec.getBoundingClientRect();
    if(rect.top<window.innerHeight-100 && rect.bottom>100){
      sec.classList.add("visible");
    }else{
      sec.classList.remove("visible");
    }
  });
}

window.addEventListener("scroll",reveal);
window.addEventListener("load",reveal);

// PARALLAX
const hero=document.getElementById("heroBg");
document.addEventListener("mousemove",e=>{
  const x=(e.clientX/window.innerWidth-.5)*20;
  const y=(e.clientY/window.innerHeight-.5)*20;
  hero.style.transform=`translate(${x}px,${y}px) scale(1.1)`;
});

// TEXTO DINÁMICO
const texts=["Desarrollador Web","Desarrollador Mobile","Frontend","Full Stack"];
let i=0,j=0;
const dyn=document.getElementById("dynamicText");

function type(){
  if(j<texts[i].length){
    dyn.textContent+=texts[i][j++];
    setTimeout(type,50);
  }else setTimeout(erase,1500);
}

function erase(){
  if(j>0){
    dyn.textContent=texts[i].substring(0,--j);
    setTimeout(erase,30);
  }else{
    i=(i+1)%texts.length;
    setTimeout(type,300);
  }
}

type();