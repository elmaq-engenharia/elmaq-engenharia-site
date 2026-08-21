// ELMAQ v8 — navegação, animações e barra interativa
(() => {
  'use strict';

  // Remove somente elementos decorativos antigos de braços robóticos, caso existam.
  ['.robot-arm','.bg-robot','.robotic-arm','.robot-background'].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.remove());
  });

  const mainMenu = document.querySelector('.main-menu');
  const menuToggle = document.querySelector('.menu-toggle');

  const closeMobileMenu = () => {
    if (!menuToggle || !mainMenu) return;
    menuToggle.classList.remove('active');
    mainMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded','false');
    menuToggle.setAttribute('aria-label','Abrir menu');
  };

  const openMobileMenu = () => {
    if (!menuToggle || !mainMenu) return;
    menuToggle.classList.add('active');
    mainMenu.classList.add('open');
    menuToggle.setAttribute('aria-expanded','true');
    menuToggle.setAttribute('aria-label','Fechar menu');
  };

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
      mainMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
    });
    mainMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMobileMenu();
    });
    document.addEventListener('click', e => {
      if (window.innerWidth <= 980 && mainMenu.classList.contains('open') && !mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMobileMenu();
    });
  }

  // Rolagem suave para âncoras internas.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const selector = link.getAttribute('href');
      if (!selector || selector === '#') return;
      const target = document.querySelector(selector);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Revelação dos blocos ao entrar na tela.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    revealItems.forEach(el => revealObserver.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('visible'));
  }

  // Barra vertical de progresso e pontos sincronizados com a seção atual.
  const progressBar = document.querySelector('.scroll-progress span');
  const sections = [...document.querySelectorAll('.tracked-section')];
  const navDots = [...document.querySelectorAll('.scroll-nav a')];
  let ticking = false;

  const updateScrollUI = () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const docHeight = Math.max(1, doc.scrollHeight - window.innerHeight);
    const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
    if (progressBar) progressBar.style.height = pct + '%';

    const marker = scrollTop + Math.min(window.innerHeight * .38, 260);
    let current = sections.length ? sections[0].id : 'inicio';
    for (const section of sections) {
      if (section.offsetTop <= marker) current = section.id;
      else break;
    }
    navDots.forEach(dot => {
      dot.classList.toggle('active', dot.getAttribute('href') === '#' + current);
    });
    ticking = false;
  };

  const requestScrollUpdate = () => {
    if (ticking) return;
    requestAnimationFrame(updateScrollUI);
    ticking = true;
  };

  window.addEventListener('scroll', requestScrollUpdate, {passive:true});
  window.addEventListener('resize', requestScrollUpdate);
  window.addEventListener('load', requestScrollUpdate);
  requestScrollUpdate();
})();
