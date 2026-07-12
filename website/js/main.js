// Ongera Ubeho — shared behaviour

// Mobile nav
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// Highlight current page in nav
(() => {
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const target = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
    if (target === here) a.setAttribute('aria-current', 'page');
  });
})();

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll reveal + counters + bars
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('.bar-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });
    const num = e.target.querySelector('.i-num');
    if (num && !num.dataset.done) {
      num.dataset.done = '1';
      const target = +num.dataset.count;
      if (reduced) { num.textContent = target; }
      else {
        const t0 = performance.now(), dur = 1100;
        const tick = now => {
          const p = Math.min((now - t0) / dur, 1);
          num.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }
    io.unobserve(e.target);
  });
}, { threshold: 0.18 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
