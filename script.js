(() => {
  'use strict';

  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];

  // Logo oficial ELMAQ em toda a estrutura visual do site.
  const officialLogo = 'assets/logo-elmaq-oficial.jpg?v=16';
  $$('img').forEach(img => {
    const src = img.getAttribute('src') || '';
    const cls = img.className || '';
    if (src.includes('logo-elmaq') || cls.includes('footer-logo') || img.closest('.brand')) {
      img.src = officialLogo;
      img.alt = 'ELMAQ Engenharia e Máquinas para Artefatos de Concreto';
      img.decoding = 'async';
    }
  });
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.type = 'image/jpeg';
    favicon.href = officialLogo;
  }
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.content = 'https://elmaq-engenharia-site.vercel.app/assets/logo-elmaq-oficial.jpg?v=16';

  const menuBtn = $('.menu-button');
  const mega = $('#mega-menu');
  const megaClose = $('.mega-close');
  const setMenu = open => {
    if (!mega || !menuBtn) return;
    mega.classList.toggle('open', open);
    mega.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  };
  menuBtn?.addEventListener('click', () => setMenu(!mega.classList.contains('open')));
  megaClose?.addEventListener('click', () => setMenu(false));
  mega?.addEventListener('click', e => { if (e.target === mega) setMenu(false); });
  $$('#mega-menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); closeGallery(); } });

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  const reveal = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); ro.unobserve(entry.target); }
    }), {threshold:.08});
    reveal.forEach(el => ro.observe(el));
  } else reveal.forEach(el => el.classList.add('visible'));

  const progress = $('.scroll-progress span');
  const sections = $$('.tracked-section');
  const dots = $$('.scroll-nav a');
  const topLinks = $$('.desktop-nav a');
  const backTop = $('.back-top');
  let ticking = false;

  function updateScroll(){
    const doc = document.documentElement;
    const y = window.scrollY || doc.scrollTop;
    const max = Math.max(1, doc.scrollHeight - innerHeight);
    if (progress) progress.style.height = Math.min(100, (y/max)*100) + '%';
    backTop?.classList.toggle('show', y > 650);
    const marker = y + Math.min(innerHeight*.38, 280);
    let current = sections[0]?.id || 'inicio';
    sections.forEach(s => { if (s.offsetTop <= marker) current = s.id; });
    dots.forEach(d => d.classList.toggle('active', d.getAttribute('href') === '#'+current));
    topLinks.forEach(a => {
      const target = a.getAttribute('href')?.slice(1);
      const active = target === current || (target === 'linhas' && ['e4000','e5000','e6000'].includes(current));
      a.classList.toggle('active', active);
    });
    ticking = false;
  }
  function requestScroll(){ if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); } }
  addEventListener('scroll', requestScroll, {passive:true});
  addEventListener('resize', requestScroll);
  addEventListener('load', requestScroll);
  requestScroll();
  backTop?.addEventListener('click', () => scrollTo({top:0,behavior:'smooth'}));

  const filterButtons = $$('.gallery-filters button');
  const items = $$('.gallery-item');
  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    items.forEach(item => item.classList.toggle('hidden', f !== 'all' && item.dataset.category !== f));
  }));

  const modal = $('.gallery-modal');
  const modalImg = $('.gallery-modal img');
  const modalCaption = $('.gallery-modal figcaption');
  let visibleItems = items;
  let currentIndex = 0;
  const refreshVisible = () => visibleItems = items.filter(i => !i.classList.contains('hidden'));
  function showGallery(item){
    refreshVisible();
    currentIndex = Math.max(0, visibleItems.indexOf(item));
    const active = visibleItems[currentIndex];
    if (!modal || !active) return;
    modalImg.src = active.dataset.src;
    modalImg.alt = active.dataset.title || '';
    modalCaption.textContent = active.dataset.title || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('menu-open');
  }
  function closeGallery(){
    if (!modal?.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('menu-open');
  }
  function moveGallery(dir){
    refreshVisible();
    if (!visibleItems.length) return;
    currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
    showGallery(visibleItems[currentIndex]);
  }
  items.forEach(i => i.addEventListener('click', () => showGallery(i)));
  $('.modal-close')?.addEventListener('click', closeGallery);
  $('.modal-prev')?.addEventListener('click', () => moveGallery(-1));
  $('.modal-next')?.addEventListener('click', () => moveGallery(1));
  modal?.addEventListener('click', e => { if (e.target === modal) closeGallery(); });
  document.addEventListener('keydown', e => {
    if (!modal?.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') moveGallery(-1);
    if (e.key === 'ArrowRight') moveGallery(1);
  });
})();