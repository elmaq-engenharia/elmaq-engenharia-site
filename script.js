const mobileCss=document.createElement('link');mobileCss.rel='stylesheet';mobileCss.href='mobile.css?v=4';document.head.appendChild(mobileCss);
const teamCss=document.createElement('link');teamCss.rel='stylesheet';teamCss.href='team.css?v=4';document.head.appendChild(teamCss);

const anchors=[...document.querySelectorAll('a[href^="#"]')];
anchors.forEach(link=>link.addEventListener('click',e=>{const target=document.querySelector(link.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}}));

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const menuToggle=document.querySelector('.menu-toggle');
const mainMenu=document.querySelector('.main-menu');
const closeMobileMenu=()=>{if(!menuToggle||!mainMenu)return;menuToggle.classList.remove('active');mainMenu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');};
const openMobileMenu=()=>{if(!menuToggle||!mainMenu)return;menuToggle.classList.add('active');mainMenu.classList.add('open');menuToggle.setAttribute('aria-expanded','true');menuToggle.setAttribute('aria-label','Fechar menu');};
if(menuToggle&&mainMenu){menuToggle.addEventListener('click',()=>{mainMenu.classList.contains('open')?closeMobileMenu():openMobileMenu();});mainMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMobileMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu();});window.addEventListener('resize',()=>{if(window.innerWidth>980)closeMobileMenu();});}

// Logo oficial ELMAQ com fallback seguro
const officialLogo='assets/logo-elmaq-oficial.jpg?v=4';
const fallbackLogo='assets/logo-elmaq-site.jpg?v=4';
document.querySelectorAll('.brand-image img,.section-logo,.footer-logo').forEach(img=>{
  img.src=officialLogo;
  img.classList.add('elmaq-logo-official');
  img.onerror=()=>{if(!img.dataset.fallback){img.dataset.fallback='1';img.src=fallbackLogo;}};
});

// Remove elementos decorativos de braços robóticos, se existirem
['.robot-arm','.bg-robot','.robotic-arm','.robot-background'].forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.remove()));

// Seção institucional fixa por setores
if(!document.querySelector('#equipe-elmaq')){
  const hero=document.querySelector('#inicio');
  const team=document.createElement('section');
  team.id='equipe-elmaq';
  team.className='elmaq-team tracked-section';
  team.innerHTML=`<div class="wrap"><div class="elmaq-team-head reveal"><p class="eyebrow">Nossa liderança</p><h2>Liderança que movimenta ideias e transforma resultados.</h2><p>Cada área da ELMAQ atua com foco em relacionamento, excelência operacional e visão estratégica para transformar necessidades industriais em soluções de alto desempenho.</p></div><div class="elmaq-team-grid reveal"><article class="elmaq-person"><img src="assets/edson-costa.jpg?v=4" alt="Edson Costa - Engenharia Comercial" loading="eager"><div class="elmaq-person-content"><span class="elmaq-sector">Setor Comercial</span><h3>Edson Costa</h3><span class="elmaq-role">Engenharia Comercial</span><p>Relacionamento consultivo, análise de necessidade e soluções personalizadas para gerar valor, confiança e resultados consistentes.</p><a class="elmaq-contact" href="tel:+5531999191998">☎ (31) 99919-1998</a></div></article><article class="elmaq-person"><img src="assets/rafael-augusto.jpg?v=4" alt="Rafael Augusto - Gerente de Produção" loading="eager"><div class="elmaq-person-content"><span class="elmaq-sector">Setor de Produção</span><h3>Rafael Augusto</h3><span class="elmaq-role">Gerente de Produção</span><p>Planejamento, controle de produção, qualidade e eficiência operacional para assegurar desempenho e excelência em cada entrega.</p><a class="elmaq-contact" href="tel:+5531985980441">☎ (31) 98598-0441</a></div></article><article class="elmaq-person"><img src="assets/luis-felipe.jpg?v=4" alt="Luis Felipe - CEO da ELMAQ Engenharia" loading="eager"><div class="elmaq-person-content"><span class="elmaq-sector">Diretoria</span><h3>Luis Felipe</h3><span class="elmaq-role">CEO</span><p>Visão estratégica, liderança e inovação orientadas ao crescimento sustentável, à evolução tecnológica e ao futuro da ELMAQ Engenharia.</p></div></article></div><div class="elmaq-values reveal"><div class="elmaq-value"><strong>Experiência</strong><span>Atuação focada no mercado industrial.</span></div><div class="elmaq-value"><strong>Inovação</strong><span>Tecnologia aplicada a soluções reais.</span></div><div class="elmaq-value"><strong>Qualidade</strong><span>Padrões elevados em projeto e entrega.</span></div><div class="elmaq-value"><strong>Compromisso</strong><span>Resultados que constroem confiança.</span></div></div></div>`;
  if(hero)hero.insertAdjacentElement('afterend',team);
  team.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
}

// Barra de rolagem vertical + navegação ativa
const progress=document.querySelector('.scroll-progress span');
const navLinks=[...document.querySelectorAll('.scroll-nav a')];
const trackedSections=[...document.querySelectorAll('.tracked-section')];
const updateScrollUi=()=>{
  const h=document.documentElement;
  const max=h.scrollHeight-h.clientHeight;
  const pct=max>0?(h.scrollTop/max)*100:0;
  if(progress)progress.style.height=`${pct}%`;
  let current='inicio';
  trackedSections.forEach(section=>{const top=section.offsetTop-180;const bottom=top+section.offsetHeight;if(window.scrollY>=top&&window.scrollY<bottom)current=section.id;});
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`));
};
window.addEventListener('scroll',updateScrollUi,{passive:true});
window.addEventListener('resize',updateScrollUi);
window.addEventListener('load',updateScrollUi);
updateScrollUi();
