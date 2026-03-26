/* ═══════════════════════════════════════════════════════════
   SHIVAM ANAND PORTFOLIO — Immersive JS
   ═══════════════════════════════════════════════════════════ */

// ── 1. SCROLL PROGRESS ──────────────────────────────────────
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ── 2. CUSTOM CURSOR ────────────────────────────────────────
const dot   = document.getElementById('cursorDot');
const ring  = document.getElementById('cursorRing');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, rx = 0, ry = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });

(function animCursor() {
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  rx += (mx - rx) * .14; ry += (my - ry) * .14;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  tx += (mx - tx) * .06; ty += (my - ty) * .06;
  trail.style.left = tx + 'px'; trail.style.top = ty + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a,button,.project-card,.skill-card,.cert-row,.soft-chip,.ach-card,.edu-card,.orbit-dot').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ── 3. SPOTLIGHT ─────────────────────────────────────────────
const spotlight = document.getElementById('spotlight');
document.addEventListener('mousemove', e => {
  spotlight.style.left = e.clientX + 'px';
  spotlight.style.top  = e.clientY + 'px';
});

// ── 4. PARTICLE NETWORK ──────────────────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);

const N = 100;
const pts = Array.from({ length: N }, () => ({
  x: Math.random() * W, y: Math.random() * H,
  vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
  r: Math.random() * 1.5 + .4,
  a: Math.random() * .45 + .1,
  c: Math.random() > .5 ? '124,58,237' : '6,182,212'
}));

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < N; i++) {
    const p = pts[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.c},${p.a})`; ctx.fill();
    for (let j = i + 1; j < N; j++) {
      const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy);
      if (d < 130) {
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(124,58,237,${(1 - d / 130) * .12})`;
        ctx.lineWidth = .6; ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── 5. NAVBAR SCROLL & ACTIVE ────────────────────────────────
const navbar = document.getElementById('navbar');
function updateNav() {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  const sy = window.scrollY + window.innerHeight * .35;
  document.querySelectorAll('section[id]').forEach(sec => {
    const link = document.querySelector(`.nav-link[data-section="${sec.id}"]`);
    if (link) link.classList.toggle('active', sy >= sec.offsetTop && sy < sec.offsetTop + sec.offsetHeight);
  });
}
window.addEventListener('scroll', updateNav, { passive: true });

// ── 6. HAMBURGER ─────────────────────────────────────────────
const ham = document.getElementById('hamburger');
const nll = document.getElementById('navLinks');
ham.addEventListener('click', () => nll.classList.toggle('open'));
nll.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nll.classList.remove('open')));

// ── 7. TYPEWRITER ─────────────────────────────────────────────
const PHRASES = ['Full-Stack Developer','C++ Problem Solver','React.js Engineer','API Integration Expert','DSA Enthusiast 🏆'];
let pi = 0, ci = 0, del = false;
const twEl = document.getElementById('typewriter');
function typeWrite() {
  const ph = PHRASES[pi];
  if (!del) {
    twEl.textContent = ph.slice(0, ++ci);
    if (ci === ph.length) { del = true; setTimeout(typeWrite, 2000); return; }
    setTimeout(typeWrite, 80);
  } else {
    twEl.textContent = ph.slice(0, --ci);
    if (ci === 0) { del = false; pi = (pi + 1) % PHRASES.length; setTimeout(typeWrite, 350); return; }
    setTimeout(typeWrite, 42);
  }
}
typeWrite();

// ── 8. SCROLL REVEAL ──────────────────────────────────────────
const srObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); srObs.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.sr,.reveal-left,.reveal-right').forEach(el => srObs.observe(el));

// ── 9. COUNTER ────────────────────────────────────────────────
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.target;
    let cur = 0; const step = target / 50;
    const t = setInterval(() => { cur += step; if (cur >= target) { el.textContent = target; clearInterval(t); } else el.textContent = Math.floor(cur); }, 30);
    countObs.unobserve(el);
  });
}, { threshold: .5 });
document.querySelectorAll('.count').forEach(el => countObs.observe(el));

// ── 10. SKILL BAR ANIMATION ───────────────────────────────────
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const fill = e.target.querySelector('.sk-fill');
    if (fill) fill.style.width = e.target.dataset.pct + '%';
    skillObs.unobserve(e.target);
  });
}, { threshold: .2 });
document.querySelectorAll('.skill-card').forEach(c => skillObs.observe(c));

// ── 11. SKILL TABS ────────────────────────────────────────────
document.querySelectorAll('.stab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.stab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const content = document.getElementById('tab-' + tab.dataset.tab);
    if (content) {
      content.classList.add('active');
      // animate bars in newly shown tab
      content.querySelectorAll('.skill-card').forEach(c => {
        const fill = c.querySelector('.sk-fill');
        if (fill) { fill.style.width = '0'; setTimeout(() => fill.style.width = c.dataset.pct + '%', 60); }
        // re-observe for sr
        c.classList.remove('visible');
        setTimeout(() => c.classList.add('visible'), 20);
      });
    }
  });
});
// init first tab bars on load
window.addEventListener('load', () => {
  document.querySelectorAll('#tab-languages .skill-card').forEach(c => {
    const fill = c.querySelector('.sk-fill');
    if (fill) fill.style.width = c.dataset.pct + '%';
  });
});

// ── 12. 3D TILT EFFECT ───────────────────────────────────────
function tiltEffect(el) {
  el.addEventListener('mousemove', e => {
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width  / 2) / (width  / 2);
    const y = (e.clientY - top  - height / 2) / (height / 2);
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px) translateY(${el.classList.contains('project-card') ? '-8px' : '-4px'})`;
    el.style.transition = 'transform .1s ease';
    // Move inner glow
    const glow = el.querySelector('.pc-glow, .core-halo');
    if (glow) { glow.style.background = `radial-gradient(circle at ${50 + x * 30}% ${50 + y * 30}%, rgba(124,58,237,.25), transparent 60%)`; }
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.transition = 'transform .5s ease';
  });
}
document.querySelectorAll('.tilt').forEach(tiltEffect);

// ── 13. MAGNETIC BUTTONS ─────────────────────────────────────
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = (e.clientX - left - width  / 2) * .2;
    const y = (e.clientY - top  - height / 2) * .2;
    btn.style.transform = `translate(${x}px, ${y}px)`;
    btn.style.transition = 'transform .15s ease';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1)';
  });
});

// ── 14. RIPPLE ON CLICK ───────────────────────────────────────
document.querySelectorAll('.btn-primary, .btn-hire, #formSubmit').forEach(btn => {
  btn.classList.add('ripple-btn');
  btn.addEventListener('click', function(e) {
    const { left, top } = this.getBoundingClientRect();
    const wave = document.createElement('span');
    wave.className = 'ripple-wave';
    wave.style.left = (e.clientX - left) + 'px';
    wave.style.top  = (e.clientY - top)  + 'px';
    this.appendChild(wave);
    setTimeout(() => wave.remove(), 700);
  });
});

// ── 15. HERO PARALLAX ────────────────────────────────────────
window.addEventListener('mousemove', e => {
  const cx = window.innerWidth  / 2, cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
  const orbit = document.querySelector('.orbit-scene');
  if (orbit) orbit.style.transform = `translate(${dx * 12}px, ${dy * 12}px)`;
  const hi = document.querySelector('.hero-hi');
  if (hi) hi.style.transform = `translate(${dx * -8}px, ${dy * -5}px)`;
  const cfs = document.querySelectorAll('.cf');
  cfs.forEach((cf, i) => { cf.style.transform = `translateY(${dy * (8 + i * 4)}px) translateX(${dx * (4 + i * 2)}px)`; });
});

// ── 16. TERMINAL ANIMATION ───────────────────────────────────
function typeInTerminal(el, text, delay, cb) {
  let i = 0;
  const t = setInterval(() => {
    el.textContent += text[i++];
    if (i === text.length) { clearInterval(t); if (cb) setTimeout(cb, 400); }
  }, delay);
}
const termObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    termObs.unobserve(e.target);
    const t1 = document.getElementById('t1');
    const t2 = document.getElementById('t2');
    const t3 = document.getElementById('t3');
    setTimeout(() => {
      typeInTerminal(t1, 'Shivam Anand — Full-Stack Developer', 30, () => {
        typeInTerminal(t2, 'C++, JS, React, Node, MySQL, MongoDB...', 25, () => {
          typeInTerminal(t3, '● Open to opportunities 🚀', 40);
        });
      });
    }, 500);
  });
}, { threshold: .5 });
const termBox = document.querySelector('.terminal-box');
if (termBox) termObs.observe(termBox);

// ── 17. CONTACT FORM ─────────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('#formSubmit');
    const original = btn.innerHTML;
    btn.innerHTML = '✅ Sent!'; btn.classList.add('sent'); btn.disabled = true;
    setTimeout(() => { btn.innerHTML = original; btn.classList.remove('sent'); btn.disabled = false; form.reset(); }, 3500);
  });
}

// ── 18. ORBIT HOVER PAUSE ────────────────────────────────────
const orbitScene = document.getElementById('orbitScene');
if (orbitScene) {
  orbitScene.addEventListener('mouseenter', () => {
    orbitScene.querySelectorAll('.orbit-ring,.orbit-dot,.orbit-dot span').forEach(el => el.style.animationPlayState = 'paused');
  });
  orbitScene.addEventListener('mouseleave', () => {
    orbitScene.querySelectorAll('.orbit-ring,.orbit-dot,.orbit-dot span').forEach(el => el.style.animationPlayState = 'running');
  });
}

// ── 19. SECTION ENTRANCE COLORS ──────────────────────────────
// Change aurora tint on each section
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id;
    const a1 = document.querySelector('.aurora.a1');
    const a2 = document.querySelector('.aurora.a2');
    if (!a1 || !a2) return;
    if (id === 'projects') { a1.style.background = 'rgba(6,182,212,.13)'; a2.style.background = 'rgba(124,58,237,.1)'; }
    else if (id === 'training') { a1.style.background = 'rgba(16,185,129,.1)'; a2.style.background = 'rgba(124,58,237,.12)'; }
    else if (id === 'contact') { a1.style.background = 'rgba(245,158,11,.09)'; a2.style.background = 'rgba(6,182,212,.1)'; }
    else { a1.style.background = 'rgba(124,58,237,.12)'; a2.style.background = 'rgba(6,182,212,.1)'; }
    a1.style.transition = 'background 2s ease'; a2.style.transition = 'background 2s ease';
  });
}, { threshold: .3 });
document.querySelectorAll('section[id]').forEach(s => sectionObs.observe(s));
