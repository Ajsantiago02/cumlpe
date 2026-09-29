/* ====== PERSONALIZA AQUÍ ====== */
const NOMBRE = "Mamá"; // Cámbialo por su nombre o cómo le dices de cariño
const CANCION = "cancion.mp3"; // Tu canción: ponla en la misma carpeta con este nombre (o cambia el nombre aquí). Con "" suena la melodía de vals.

const MENSAJES = [
  { 
    e: "💐", 
    c: "#e4007c", 
    t: "Gracias por estar siempre para mí, por tu paciencia infinita y por quererme tanto. Si de algo estoy seguro es que no podría pedir a una mejor mamá. ¡Feliz cumpleaños, ma!" 
  },
  { 
    e: "🌟", 
    c: "#12a06a", 
    t: "Tengo un buen ejemplo contigo: ver cómo le echas ganas a todo y cómo cuidas a la familia me enseña un buen todos los días. Qué orgullo ser tu hijo, ma." 
  },
  { 
    e: "🤗", 
    c: "#d98a00", 
    t: "Sé que a veces no soy el hijo perfecto ni el más expresivo, pero te amo con todo mi corazón. Gracias por no soltarme nunca y por ser mi pilar." 
  },
  { 
    e: "🥘", 
    c: "#e03a4b", 
    t: "Ningún lugar se siente tan bonito como la casa cuando estás tú. Gracias por tus abrazos que lo curan todo y por consentirnos tanto siempre." 
  },
  { 
    e: "🎁", 
    c: "#7a4ee0", 
    t: "Te deseo mucha salud, paz, risas y mañanas tranquilas para disfrutar tu café favorito. Que la vida te regrese multiplicado todo el amor que nos das." 
  },
  { 
    e: "💖", 
    c: "#0b86b3", 
    t: "Hoy se celebra a la reina de la casa. Gracias por ser mi mamá, mi ejemplo y mi apoyo incondicional. ¡Te amo muchísimo, que tengas un día hermoso!" 
  }
];

const DILEMA = {
  mananitas: [
    "🎶 «Estas son las mañanitas que cantaba el Rey David...» Prepárate, ma, porque te las vamos a cantar con todo el corazón (y un poquito desafinados).",
    "🎂 Cantamos a todo pulmón, se nos fue el aire, pero la intención y el amor valieron cada segundo. ¡Feliz cumple!"
  ],
  viva: [
    "🇲🇽 ¡Viva la cumpleañera! ¡Viva la reina de la casa! Hoy se celebra en grande porque te lo mereces todo, Maaaaaaaaaa.",
  ],
  alerta: [
    "🔔 ¡Alerta sísmica! ¡1, 2, 3, a correr!... ah no, falsa alarma, ¡a correr pero por el pastel antes de que se lo acaben! 😂",
  ]
};
/* ================================ */

document.getElementById("nombre").textContent = NOMBRE;
document.getElementById("nombreSobre").textContent = NOMBRE;

/* ---------- Confeti ---------- */
const cv = document.getElementById("confetti"), cx = cv.getContext("2d");
let W, H, parts = [], running = false;
const COLORS = ["#e4007c", "#12a06a", "#e03a4b", "#f7a92b", "#fff6e5", "#7a4ee0", "#2bb3e6"];
function resize() {
  const d = window.devicePixelRatio || 1;
  W = cv.width = innerWidth * d; H = cv.height = innerHeight * d;
  cx.setTransform(d, 0, 0, d, 0, 0);
}
addEventListener("resize", resize); resize();

function confetti(x = innerWidth / 2, y = innerHeight / 3, n = 70) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, s = 3 + Math.random() * 7;
    parts.push({
      x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4,
      w: 6 + Math.random() * 6, h: 4 + Math.random() * 5,
      r: Math.random() * 6, vr: (Math.random() - .5) * .4,
      c: COLORS[(Math.random() * COLORS.length) | 0], life: 110 + Math.random() * 50
    });
  }
  if (!running) { running = true; requestAnimationFrame(tick); }
}
function tick() {
  cx.clearRect(0, 0, innerWidth, innerHeight);
  parts = parts.filter(p => p.life > 0 && p.y < innerHeight + 20);
  for (const p of parts) {
    p.vy += .25; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life--;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
    cx.globalAlpha = Math.min(1, p.life / 30);
    cx.fillStyle = p.c; cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cx.restore();
  }
  if (parts.length) requestAnimationFrame(tick); else running = false;
}
const rain = () => { for (let i = 0; i < 8; i++) setTimeout(() => confetti(Math.random() * innerWidth, -10, 25), i * 180); };

/* ---------- Audio (todo sintetizado, sin archivos externos) ---------- */
let ac, master, musicOn = false, timer = null, step = 0;
function audio() {
  if (!ac) {
    ac = new (window.AudioContext || window.webkitAudioContext)();
    master = ac.createGain(); master.gain.value = .25; master.connect(ac.destination);
  }
  if (ac.state === "suspended") ac.resume();
}
function note(freq, t, dur, type = "triangle", vol = .5) {
  const o = ac.createOscillator(), g = ac.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + .02);
  g.gain.exponentialRampToValueAtTime(.001, t + dur);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + .05);
}
const N = { C4: 261.6, D4: 293.7, E4: 329.6, F4: 349.2, G4: 392, A4: 440, B4: 493.9, C5: 523.3, D5: 587.3, E5: 659.3, G5: 784 };
// Melodía alegre en compás de 3/4 (vals ranchero): [nota, pulsos]
const MELODIA = [["G4",1],["C5",1],["C5",1],["B4",1],["A4",1],["B4",1],["C5",2],["E5",1],["D5",1],["C5",1],["B4",1],["C5",1],["D5",1],["E5",3],
  ["E5",1],["G5",1],["E5",1],["D5",1],["C5",1],["D5",1],["C5",2],["G4",1],["A4",1],["B4",1],["C5",1],["D5",1],["B4",1],["C5",3]];
const BAJO = [130.8, 196, 196]; // acompañamiento tipo "pum-cha-cha"
const BPM = 150, beat = 60 / BPM;
function loopMusic() {
  if (!musicOn) return;
  let t = ac.currentTime + .05, b = 0;
  for (const [n, d] of MELODIA) {
    note(N[n], t, d * beat * .95, "triangle", .55);
    for (let k = 0; k < d; k++, b++) note(BAJO[b % 3], t + k * beat, beat * .5, "square", b % 3 ? .12 : .22);
    t += d * beat;
  }
  timer = setTimeout(loopMusic, (t - ac.currentTime - .3) * 1000);
}
const song = CANCION ? new Audio(CANCION) : null;
let songOk = !!song;
if (song) { song.loop = true; song.volume = .85; song.addEventListener("error", () => { songOk = false; }); }
const musicBtn = document.getElementById("musicBtn");
musicBtn.addEventListener("click", () => {
  audio(); musicOn = !musicOn;
  musicBtn.setAttribute("aria-pressed", musicOn);
  musicBtn.setAttribute("aria-label", musicOn ? "Silenciar música" : "Activar música");
  musicBtn.querySelector(".music-text").textContent = musicOn ? "Sonando" : "Música";
  clearTimeout(timer);
  if (songOk) {
    if (musicOn) song.play().catch(() => { songOk = false; if (musicOn) loopMusic(); });
    else song.pause();
  } else if (musicOn) loopMusic();
  if (musicOn) confetti(innerWidth - 50, 50, 25);
});

function alertaSismica() {
  audio();
  const t = ac.currentTime;
  for (let i = 0; i < 8; i++) note(i % 2 ? 660 : 990, t + i * .35, .3, "sawtooth", .35);
  if (navigator.vibrate) navigator.vibrate([250, 100, 250, 100, 250, 100, 250]);
  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 1800);
}

/* ---------- Pastel ---------- */
const cake = document.getElementById("cake"), flame = cake.querySelector(".flame");
cake.addEventListener("click", e => {
  const r = cake.getBoundingClientRect();
  cake.classList.remove("wiggle"); void cake.offsetWidth; cake.classList.add("wiggle");
  flame.classList.toggle("out");
  confetti(r.left + r.width / 2, r.top + r.height / 2, 90);
  if (flame.classList.contains("out")) { audio(); [523, 659, 784, 1046].forEach((f, i) => note(f, ac.currentTime + i * .1, .4)); }
});

/* ---------- Tarjetas ---------- */
const track = document.getElementById("track"), countEl = document.getElementById("count");
let opened = 0;
MENSAJES.forEach(m => {
  const b = document.createElement("button");
  b.className = "card"; b.style.setProperty("--c", m.c);
  b.setAttribute("aria-label", "Tarjeta de mensaje, toca para leer");
  b.innerHTML = `<div class="inner">
    <div class="face front"><span class="big">${m.e}</span><span class="tap">Toca para abrir</span></div>
    <div class="face back"><span class="em">${m.e}</span><p>${m.t}</p></div></div>`;
  b.addEventListener("click", e => {
    const first = !b.classList.contains("open");
    b.classList.toggle("open");
    if (first && !b.dataset.seen) {
      b.dataset.seen = 1; opened++; countEl.textContent = opened;
      const r = b.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top + r.height / 2, 60);
      if (opened === MENSAJES.length) {
        document.getElementById("finale").hidden = false; rain();
      }
    }
  });
  track.appendChild(b);
});

/* ---------- Dilema septembrino ---------- */
const result = document.getElementById("result");
document.querySelectorAll(".opt").forEach(o => o.addEventListener("click", e => {
  const opts = DILEMA[o.dataset.k];
  result.textContent = opts[(Math.random() * opts.length) | 0];
  result.classList.remove("pulse"); void result.offsetWidth; result.classList.add("pulse");
  if (o.dataset.k === "alerta") alertaSismica();
  else if (o.dataset.k === "viva") { rain(); audio(); [392, 523, 659, 784].forEach((f, i) => note(f, ac.currentTime + i * .12, .35)); }
  else confetti(e.clientX, e.clientY, 80);
}));

/* ---------- Sobre de inicio ---------- */
const sobreWrap = document.getElementById("sobre"), sobreBtn = document.getElementById("sobreBtn");
sobreBtn.addEventListener("click", () => {
  if (sobreBtn.classList.contains("abierto")) return;
  sobreBtn.classList.add("abierto"); sobreWrap.classList.add("abriendo");
  confetti(innerWidth / 2, innerHeight / 2, 110);
  if (!musicOn) musicBtn.click();
  setTimeout(() => confetti(innerWidth / 2, innerHeight / 2, 80), 700);
  setTimeout(() => {
    sobreWrap.classList.add("fuera");
    document.body.classList.remove("locked");
    scrollTo(0, 0); rain();
    setTimeout(() => sobreWrap.remove(), 800);
  }, 1900);
});