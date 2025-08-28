(function () {
  'use strict';
  const ready = (fn) =>
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn)
      : fn();

  ready(() => {
    const header = document.querySelector('.header-bar');
    if (!header) {
      console.warn('[headerShadow] .header-bar not found');
      return;
    }

    const THRESHOLD = 8;

    const apply = () => {
      header.classList.toggle('header-is-scrolled', (window.scrollY || 0) > THRESHOLD);
    };

    apply();

    window.addEventListener('scroll', apply, { passive: true });
    window.addEventListener('resize', apply, { passive: true });
    window.addEventListener('orientationchange', apply, { passive: true });
  });
})();
