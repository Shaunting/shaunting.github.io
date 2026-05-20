// main.js — portfolio interactions
// Populated across subsequent tasks

// ── Nav scroll class
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Theme toggle
function toggleTheme() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
  document.getElementById('themeBtn').textContent = dark ? '🌙' : '☀️';
}
document.getElementById('themeBtn').addEventListener('click', toggleTheme);

// ── Typewriter
const words = ['AI Engineer', 'Data Scientist', 'ML Builder', 'Backend Engineer'];
let wi = 0, ci = 0, deleting = false;
const twEl = document.getElementById('tw');

function type() {
  const word = words[wi];
  if (deleting) {
    twEl.textContent = word.slice(0, ci--);
    if (ci < 0) {
      deleting = false;
      ci = 0;
      wi = (wi + 1) % words.length;
      setTimeout(type, 500);
      return;
    }
  } else {
    twEl.textContent = word.slice(0, ci++);
    if (ci > word.length) {
      deleting = true;
      setTimeout(type, 2400);
      return;
    }
  }
  setTimeout(type, deleting ? 38 : 78);
}
type();

// ── Hero mouse parallax
const heroEl = document.querySelector('.hero');
const heroInner = document.getElementById('heroInner');
const blobDefs = [
  { el: document.getElementById('b1'), factor: 0.022 },
  { el: document.getElementById('b2'), factor: -0.016 },
  { el: document.getElementById('b3'), factor: 0.012 },
  { el: document.getElementById('b4'), factor: -0.028 },
];
let mouseX = 0, mouseY = 0, curX = 0, curY = 0, rafId = null;

heroEl.addEventListener('mousemove', e => {
  const r = heroEl.getBoundingClientRect();
  mouseX = e.clientX - r.left - r.width / 2;
  mouseY = e.clientY - r.top - r.height / 2;
  if (!rafId) rafId = requestAnimationFrame(parallaxTick);
}, { passive: true });

heroEl.addEventListener('mouseleave', () => { mouseX = 0; mouseY = 0; });

function parallaxTick() {
  curX += (mouseX - curX) * 0.06;
  curY += (mouseY - curY) * 0.06;
  blobDefs.forEach(b => {
    b.el.style.transform = `translate(${curX * b.factor}px, ${curY * b.factor}px)`;
  });
  heroInner.style.transform = `translate(${curX * 0.004}px, ${curY * 0.004}px)`;
  rafId = requestAnimationFrame(parallaxTick);
}

// ── Drag-to-scroll recommendations
const recsScroll = document.getElementById('recsScroll');
let isDragging = false, dragStartX, dragScrollLeft;

recsScroll.addEventListener('mousedown', e => {
  e.preventDefault();
  isDragging = true;
  dragStartX = e.pageX - recsScroll.offsetLeft;
  dragScrollLeft = recsScroll.scrollLeft;
});
recsScroll.addEventListener('mouseleave', () => { isDragging = false; });
recsScroll.addEventListener('mouseup', () => { isDragging = false; });
recsScroll.addEventListener('mousemove', e => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - recsScroll.offsetLeft;
  recsScroll.scrollLeft = dragScrollLeft - (x - dragStartX) * 1.4;
});
