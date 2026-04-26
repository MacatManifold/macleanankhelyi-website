// =========================
// Maclean Ankhelyi — Personal Site
// =========================

(function () {
  'use strict';

  // ---- Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
