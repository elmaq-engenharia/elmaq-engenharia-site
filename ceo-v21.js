(() => {
  'use strict';

  const $ = (s, c=document) => c.querySelector(s);

  if (!document.querySelector('link[data-elmaq-ceo-v21]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'ceo-v21.css?v=21';
    css.dataset.elmaqCeoV21 = 'true';
    document.head.appendChild(css);
  }

  const hero = $('#inicio');
  if (hero && !$('#diretoria')) {
    const section = document.createElement('section');
    section.id = 'diretoria';
    section.className = 'section ceo-section tracked-section';
    section.innerHTML = `
      <div class="wrap ceo-wrap reveal visible">
        <div class="ceo-photo">
          <img src="assets/luis-ceo-elmaq.webp?v=21" alt="Luis, CEO da ELMAQ Engenharia" loading="lazy" decoding="async">
        </div>
        <div class="ceo-copy">
          <span class="ceo-kicker">Direção executiva</span>
          <h2>Luis</h2>
          <p class="ceo-role">CEO da ELMAQ Engenharia</p>
          <p class="ceo-lead">Visão estratégica, proximidade com o cliente e decisões orientadas a resultado. Na ELMAQ, cada projeto é conduzido para transformar necessidade industrial em produtividade, confiabilidade e crescimento sustentável.</p>
          <div class="ceo-proof" aria-label="Diferenciais da diretoria">
            <span>Decisão estratégica</span>
            <span>Foco em resultado</span>
            <span>Atendimento próximo</span>
          </div>
          <div class="ceo-actions">
            <a class="btn" href="https://wa.me/5531987537386" target="_blank" rel="noopener">Falar com Luis no WhatsApp ↗</a>
            <a class="ceo-phone" href="tel:+5531987537386">(31) 98753-7386</a>
          </div>
        </div>
      </div>`;
    hero.insertAdjacentElement('afterend', section);
  }

  const scrollNav = $('.scroll-nav');
  if (scrollNav && !scrollNav.querySelector('a[href="#diretoria"]')) {
    const dot = document.createElement('a');
    dot.href = '#diretoria';
    dot.dataset.label = 'Diretoria';
    const first = scrollNav.querySelector('a');
    first ? first.insertAdjacentElement('afterend', dot) : scrollNav.appendChild(dot);
  }

  const desktopNav = $('.desktop-nav');
  if (desktopNav && !desktopNav.querySelector('a[href="#diretoria"]')) {
    const link = document.createElement('a');
    link.href = '#diretoria';
    link.textContent = 'Diretoria';
    desktopNav.prepend(link);
  }

  const megaGrid = $('.mega-grid');
  if (megaGrid && !megaGrid.querySelector('a[href="#diretoria"]')) {
    const link = document.createElement('a');
    link.href = '#diretoria';
    link.innerHTML = '<b>CEO</b><strong>Diretoria</strong><span>Fale diretamente com a liderança da ELMAQ.</span>';
    megaGrid.prepend(link);
  }

  document.querySelectorAll('a[href="#diretoria"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = $('#diretoria');
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
})();
