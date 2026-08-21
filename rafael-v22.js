(() => {
  'use strict';
  const $ = (s, c=document) => c.querySelector(s);

  if (!document.querySelector('link[data-elmaq-rafael-v22]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'rafael-v22.css?v=22';
    css.dataset.elmaqRafaelV22 = 'true';
    document.head.appendChild(css);
  }

  const ceoSection = $('#diretoria');
  const hero = $('#inicio');
  if (!$('#diretoria-tecnica') && (ceoSection || hero)) {
    const section = document.createElement('section');
    section.id = 'diretoria-tecnica';
    section.className = 'section technical-director-section tracked-section';
    section.innerHTML = `
      <div class="wrap technical-director-wrap reveal visible">
        <div class="technical-director-photo">
          <img src="assets/rafael-augusto-diretor-tecnico-producao.png?v=22" alt="Rafael Augusto, Diretor Técnico de Produção da ELMAQ Engenharia" loading="eager" decoding="async">
        </div>
        <div class="technical-director-data">
          <span class="technical-director-kicker">Direção Técnica</span>
          <h2>Rafael Augusto</h2>
          <p class="technical-director-role">Diretor Técnico de Produção</p>
          <div class="technical-director-contact">
            <span>Telefone</span>
            <a href="tel:+5531985980441">(31) 98598-0441</a>
          </div>
          <div class="technical-director-actions">
            <a class="btn" href="https://wa.me/5531985980441" target="_blank" rel="noopener">Falar com Rafael no WhatsApp ↗</a>
          </div>
        </div>
      </div>`;
    (ceoSection || hero).insertAdjacentElement('afterend', section);
  }

  const scrollNav = $('.scroll-nav');
  if (scrollNav && !scrollNav.querySelector('a[href="#diretoria-tecnica"]')) {
    const dot = document.createElement('a');
    dot.href = '#diretoria-tecnica';
    dot.dataset.label = 'Diretor Técnico';
    const ceoDot = scrollNav.querySelector('a[href="#diretoria"]');
    ceoDot ? ceoDot.insertAdjacentElement('afterend', dot) : scrollNav.appendChild(dot);
  }

  const desktopNav = $('.desktop-nav');
  if (desktopNav && !desktopNav.querySelector('a[href="#diretoria-tecnica"]')) {
    const link = document.createElement('a');
    link.href = '#diretoria-tecnica';
    link.textContent = 'Produção';
    const ceoLink = desktopNav.querySelector('a[href="#diretoria"]');
    ceoLink ? ceoLink.insertAdjacentElement('afterend', link) : desktopNav.prepend(link);
  }

  const megaGrid = $('.mega-grid');
  if (megaGrid && !megaGrid.querySelector('a[href="#diretoria-tecnica"]')) {
    const link = document.createElement('a');
    link.href = '#diretoria-tecnica';
    link.innerHTML = '<b>TÉCNICO</b><strong>Rafael Augusto</strong><span>Diretor Técnico de Produção · (31) 98598-0441</span>';
    const ceoLink = megaGrid.querySelector('a[href="#diretoria"]');
    ceoLink ? ceoLink.insertAdjacentElement('afterend', link) : megaGrid.prepend(link);
  }

  document.querySelectorAll('a[href="#diretoria-tecnica"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = $('#diretoria-tecnica');
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
})();