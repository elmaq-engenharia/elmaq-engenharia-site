(() => {
  'use strict';
  const $ = (s,c=document) => c.querySelector(s);

  if (!document.querySelector('link[data-elmaq-edson-v27]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'edson-v27.css?v=27';
    css.dataset.elmaqEdsonV27 = 'true';
    document.head.appendChild(css);
  }

  const rafaelSection = $('#diretoria-tecnica');
  const ceoSection = $('#diretoria');
  const hero = $('#inicio');

  if (!$('#engenharia-comercial') && (rafaelSection || ceoSection || hero)) {
    const section = document.createElement('section');
    section.id = 'engenharia-comercial';
    section.className = 'section commercial-director-section tracked-section';
    section.innerHTML = `
      <div class="wrap commercial-director-wrap reveal visible">
        <div class="commercial-director-data">
          <span class="commercial-director-kicker">Engenharia Comercial</span>
          <h2>Edson Costa</h2>
          <p class="commercial-director-role">Engenharia Comercial</p>
          <p class="commercial-director-pitch">Relacionamento técnico, leitura de necessidade e construção de soluções sob medida para transformar investimento industrial em produtividade, segurança e resultado. Da primeira conversa à definição da melhor configuração, o foco é orientar cada decisão com clareza e visão de negócio.</p>
          <div class="commercial-director-contact">
            <span>Contato comercial</span>
            <a href="tel:+5531999191998">(31) 99919-1998</a>
          </div>
          <div class="commercial-director-actions">
            <a class="btn" href="https://wa.me/5531999191998" target="_blank" rel="noopener">Falar com Edson no WhatsApp ↗</a>
          </div>
        </div>
        <div class="commercial-director-photo" aria-label="Edson Costa, Engenharia Comercial da ELMAQ Engenharia">
          <img id="edson-commercial-photo" alt="Edson Costa, Engenharia Comercial da ELMAQ Engenharia" loading="eager" decoding="async" fetchpriority="high">
          <div class="commercial-director-signature"><strong>Edson Costa</strong><span>Engenharia Comercial</span></div>
        </div>
      </div>`;
    (rafaelSection || ceoSection || hero).insertAdjacentElement('afterend', section);
  }

  const photo = $('#edson-commercial-photo');
  if (photo && !photo.src) {
    fetch('assets/edson-costa-v27.b64.txt?v=27', {cache:'no-store'})
      .then(r => { if (!r.ok) throw new Error('foto'); return r.text(); })
      .then(data => {
        const clean = data.replace(/\s+/g,'');
        photo.src = 'data:image/jpeg;base64,' + clean;
      })
      .catch(() => {
        photo.src = 'assets/edson-costa.jpg?v=27';
      });
  }

  const desktopNav = $('.desktop-nav');
  if (desktopNav && !desktopNav.querySelector('a[href="#engenharia-comercial"]')) {
    const link = document.createElement('a');
    link.href = '#engenharia-comercial';
    link.textContent = 'Comercial';
    const production = desktopNav.querySelector('a[href="#diretoria-tecnica"]');
    production ? production.insertAdjacentElement('afterend', link) : desktopNav.prepend(link);
  }

  const megaGrid = $('.mega-grid');
  if (megaGrid && !megaGrid.querySelector('a[href="#engenharia-comercial"]')) {
    const link = document.createElement('a');
    link.href = '#engenharia-comercial';
    link.innerHTML = '<b>COMERCIAL</b><strong>Edson Costa</strong><span>Engenharia Comercial · (31) 99919-1998</span>';
    const production = megaGrid.querySelector('a[href="#diretoria-tecnica"]');
    production ? production.insertAdjacentElement('afterend', link) : megaGrid.prepend(link);
  }

  const scrollNav = $('.scroll-nav');
  if (scrollNav && !scrollNav.querySelector('a[href="#engenharia-comercial"]')) {
    const dot = document.createElement('a');
    dot.href = '#engenharia-comercial';
    dot.dataset.label = 'Engenharia Comercial';
    const production = scrollNav.querySelector('a[href="#diretoria-tecnica"]');
    production ? production.insertAdjacentElement('afterend', dot) : scrollNav.appendChild(dot);
  }

  document.querySelectorAll('a[href="#engenharia-comercial"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = $('#engenharia-comercial');
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
})();