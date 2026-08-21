(() => {
  'use strict';

  const topbar = document.querySelector('.topbar');
  const mainMenu = document.querySelector('.main-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const progressBar = document.querySelector('.scroll-progress span');
  const sections = [...document.querySelectorAll('.tracked-section')];
  const navDots = [...document.querySelectorAll('.scroll-nav a')];
  const menuLinks = [...document.querySelectorAll('.main-menu a[href^="#"]')];

  const closeMobileMenu = () => {
    if (!menuToggle || !mainMenu) return;
    menuToggle.classList.remove('active');
    mainMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  };

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
      const open = mainMenu.classList.toggle('open');
      menuToggle.classList.toggle('active', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });

    document.addEventListener('click', event => {
      if (window.innerWidth <= 780 && mainMenu.classList.contains('open') && !mainMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMobileMenu();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMobileMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 780) closeMobileMenu();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const selector = link.getAttribute('href');
      if (!selector || selector === '#') return;
      const target = document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  let ticking = false;

  const updateUi = () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const total = Math.max(1, doc.scrollHeight - window.innerHeight);
    const percent = Math.min(100, Math.max(0, scrollTop / total * 100));

    if (progressBar) progressBar.style.height = percent + '%';
    if (topbar) topbar.classList.toggle('scrolled', scrollTop > 24);

    const marker = scrollTop + Math.min(window.innerHeight * 0.36, 260);
    let currentId = sections[0]?.id || 'inicio';
    sections.forEach(section => {
      if (section.offsetTop <= marker) currentId = section.id;
    });

    navDots.forEach(dot => {
      const active = dot.getAttribute('href') === '#' + currentId;
      dot.classList.toggle('active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });

    menuLinks.forEach(link => {
      const active = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateUi);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('load', requestUpdate);
  requestUpdate();
})();