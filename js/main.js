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
