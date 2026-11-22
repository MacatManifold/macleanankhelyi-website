// =========================
// Maclean Ankhelyi — Personal Site
// =========================

(function () {
  'use strict';

  // ---- Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Time in current role, counted from its start month (data-since="YYYY-MM")
  document.querySelectorAll('[data-since]').forEach((el) => {
    const m = /^(\d{4})-(\d{2})$/.exec(el.getAttribute('data-since'));
    if (!m) return;
    const now = new Date();
    const total = (now.getFullYear() - m[1]) * 12 + (now.getMonth() + 1 - m[2]);
    if (total < 1) return;
    const yrs = Math.floor(total / 12), mo = total % 12;
    const parts = [];
    if (yrs) parts.push(yrs + (yrs === 1 ? ' yr' : ' yrs'));
    if (mo) parts.push(mo + ' mo');
    el.textContent = parts.join(' ');
  });

  // ---- Hero word rotator ("Ankhelyi." / "builds." / "ships." / "listens.")
  const rotator = document.querySelector('.hero__title-rotator');
  if (rotator) {
    const words = Array.from(rotator.children);
    let idx = 0;
    const setActive = (i) => {
      words.forEach((w, n) => w.classList.toggle('is-active', n === i));
    };
    setActive(0);
    setInterval(() => {
      idx = (idx + 1) % words.length;
      setActive(idx);
    }, 2400);
  }

  // ---- Scroll-reveal: tag every section + timeline item, then watch them
  const revealTargets = [
    ...document.querySelectorAll('.section'),
    ...document.querySelectorAll('.timeline__item'),
    ...document.querySelectorAll('.edu-card'),
  ];
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i * 40, 240)}ms`;
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  // ---- Smooth-scroll for nav (respect reduced motion)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  });
})();
