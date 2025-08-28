(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // The sticky header wrapper you added in Builder
    const header = document.querySelector('.header-bar');
    if (!header) {
      console.warn('[headerShadow] .header-bar not found');
      return;
    }

    // Pixels scrolled before shadow appears
    const THRESHOLD = 8;

    // Apply the correct state (on load, on scroll, on resize/orientation)
    const apply = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      header.classList.toggle('header-is-scrolled', y > THRESHOLD);
    };

    // Initial state (covers page loads with anchor offsets, etc.)
    apply();

    // Scroll listener (passive for perf)
    window.addEventListener('scroll', apply, { passive: true });

    // Re-evaluate on resize/orientation changes
    window.addEventListener('resize', apply, { passive: true });
    window.addEventListener('orientationchange', apply, { passive: true });
  });
})();
