(() => {
  'use strict';

  if (document.getElementById('elmaq-mascot')) return;

  if (!document.querySelector('link[data-elmaq-mascot-v30]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'mascote-v30.css?v=30';
    css.dataset.elmaqMascotV30 = 'true';
    document.head.appendChild(css);
  }

  const whatsappMessage = encodeURIComponent('Olá, ELMAQ! Vi as soluções no site e gostaria de receber uma análise para minha fábrica.');
  const root = document.createElement('aside');
  root.id = 'elmaq-mascot';
  root.className = 'elmaq-mascot';
  root.setAttribute('aria-label', 'Atendimento comercial ELMAQ');
  root.innerHTML = `
    <div class="elmaq-mascot-panel" id="elmaq-mascot-panel" aria-hidden="true" aria-live="polite">
      <button class="elmaq-mascot-close" type="button" aria-label="Fechar atendimento">×</button>
      <span class="elmaq-mascot-kicker">Atendimento ELMAQ</span>
      <strong>Quer produzir mais com precisão?</strong>
      <p>Conte sua meta. Nossa equipe ajuda a dimensionar a máquina, a automação e o layout ideal para sua fábrica.</p>
      <div class="elmaq-mascot-actions">
        <a class="elmaq-mascot-primary" href="https://wa.me/5531999191998?text=${whatsappMessage}" target="_blank" rel="noopener">Solicitar análise <span>↗</span></a>
        <a class="elmaq-mascot-lines" href="#linhas">Conhecer as linhas <span>↓</span></a>
      </div>
    </div>
    <button class="elmaq-mascot-trigger" type="button" aria-expanded="false" aria-controls="elmaq-mascot-panel" aria-label="Abrir atendimento comercial ELMAQ">
      <img src="/assets/mascote-elmaq-v30.webp?v=30" alt="" aria-hidden="true" loading="eager" decoding="async">
      <span class="elmaq-mascot-pulse" aria-hidden="true"></span>
      <span class="elmaq-mascot-label">Posso ajudar?</span>
    </button>`;
  document.body.appendChild(root);

  const trigger = root.querySelector('.elmaq-mascot-trigger');
  const panel = root.querySelector('.elmaq-mascot-panel');
  const close = root.querySelector('.elmaq-mascot-close');
  const lines = root.querySelector('.elmaq-mascot-lines');

  const setOpen = (open, remember = false) => {
    root.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    panel.setAttribute('aria-hidden', String(!open));
    if (remember && !open) {
      try { sessionStorage.setItem('elmaq-mascot-closed', '1'); } catch (_) {}
    }
  };

  trigger.addEventListener('click', () => setOpen(!root.classList.contains('is-open')));
  close.addEventListener('click', () => setOpen(false, true));
  lines.addEventListener('click', event => {
    const target = document.getElementById('linhas');
    if (!target) return;
    event.preventDefault();
    setOpen(false, true);
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && root.classList.contains('is-open')) setOpen(false, true);
  });
  document.addEventListener('click', event => {
    if (root.classList.contains('is-open') && !root.contains(event.target)) setOpen(false);
  });

  requestAnimationFrame(() => root.classList.add('is-ready'));
  let wasClosed = false;
  try { wasClosed = sessionStorage.getItem('elmaq-mascot-closed') === '1'; } catch (_) {}
  if (!wasClosed) window.setTimeout(() => setOpen(true), 4500);
})();
