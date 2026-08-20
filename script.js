const mobileCss=document.createElement('link');mobileCss.rel='stylesheet';mobileCss.href='mobile.css?v=5';document.head.appendChild(mobileCss);
const teamCss=document.createElement('link');teamCss.rel='stylesheet';teamCss.href='team.css?v=5';document.head.appendChild(teamCss);

const fixStyle=document.createElement('style');
fixStyle.textContent=`
.scroll-progress{position:fixed!important;top:0!important;right:0!important;left:auto!important;width:5px!important;height:100vh!important;z-index:100!important;background:rgba(255,255,255,.08)!important}
.scroll-progress span{display:block!important;width:100%!important;height:0;background:linear-gradient(180deg,#28b8ff,#0067b7)!important;box-shadow:0 0 18px rgba(40,184,255,.65)!important;border-radius:999px!important;transition:height .12s linear!important}
.scroll-nav a{width:12px!important;height:12px!important;background:#203b4c!important;border:1px solid #4f819f!important;transition:.25s!important}
.scroll-nav a.active,.scroll-nav a:hover{background:#28b8ff!important;transform:scale(1.3)!important;box-shadow:0 0 0 5px rgba(40,184,255,.12),0 0 16px rgba(40,184,255,.45)!important}
.brand-image img{width:170px!important;height:62px!important;object-fit:contain!important;background:#fff!important;padding:4px!important;border-radius:6px!important}
.section-logo{object-fit:contain!important;background:#fff!important;padding:4px!important;opacity:.96!important}
.footer-logo{object-fit:contain!important;background:#fff!important;padding:4px!important}
.robot-arm,.bg-robot,.robotic-arm,.robot-background{display:none!important;background-image:none!important}
@media(max-width:650px){.brand-image img{width:130px!important;height:50px!important}.scroll-progress{width:4px!important}}
`;
document.head.appendChild(fixStyle);

const anchors=[...document.querySelectorAll('a[href^="#"]')];
anchors.forEach(link=>link.addEventListener('click',e=>{const target=document.querySelector(link.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}}));

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const menuToggle=document.querySelector('.menu-toggle');
const mainMenu=document.querySelector('.main-menu');
const closeMobileMenu=()=>{if(!menuToggle||!mainMenu)return;menuToggle.classList.remove('active');mainMenu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');};
const openMobileMenu=()=>{if(!menuToggle||!mainMenu)return;menuToggle.classList.add('active');mainMenu.classList.add('open');menuToggle.setAttribute('aria-expanded','true');menuToggle.setAttribute('aria-label','Fechar menu');};
if(menuToggle&&mainMenu){menuToggle.addEventListener('click',()=>{mainMenu.classList.contains('open')?closeMobileMenu():openMobileMenu();});mainMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMobileMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu();});window.addEventListener('resize',()=>{if(window.innerWidth>980)closeMobileMenu();});}

const officialLogo='assets/logo-elmaq-oficial.jpg?v=5';
const fallbackLogo='assets/logo-elmaq-site.jpg?v=5';
document.querySelectorAll('.brand-image img,.section-logo,.footer-logo').forEach(img=>{
  img.src=officialLogo;
  img.classList.add('elmaq-logo-official');
  img.onerror=()=>{if(!img.dataset.fallback){img.dataset.fallback='1';img.src=fallbackLogo;}};
});

['.robot-arm','.bg-robot','.robotic-arm','.robot-background'].forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.remove()));

if(!document.querySelector('#equipe-elmaq')){
  const hero=document.querySelector('#inicio');
  const team=document.createElement('section');
  team.id='equipe-elmaq';team.className='elmaq-team tracked-section';
  team.innerHTML=`<div class="wrap"><div class="elmaq-team-head reveal"><p class="eyebrow">Nossa liderança</p><h2>Liderança que movimenta ideias e transforma resultados.</h2><p>Cada área da ELMAQ atua com foco em relacionamento, excelência operacional e visão estratégica para transformar necessidades industriais em soluções de alto desempenho.</p></div><div class="elmaq-team-grid reveal"><article class="elmaq-person"><img src="assets/edson-costa.jpg?v=5" alt="Edson Costa - Engenharia Comercial" loading="eager"><div class="elmaq-person-content"><span class="elmaq-sector">Setor Comercial</span><h3>Edson Costa</h3><span class="elmaq-role">Engenharia Comercial</span><p>Relacionamento consultivo, análise de necessidade e soluções personalizadas para gerar valor, confiança e resultados consistentes.</p><a class="elmaq-contact" href="tel:+5531999191998">☎ (31) 99919-1998</a></div></article><article class="elmaq-person"><img src="assets/rafael-augusto.jpg?v=5" alt="Rafael Augusto - Gerente de Produção" loading="eager"><div class="elmaq-person-content"><span class="elmaq-sector">Setor de Produção</span><h3>Rafael Augusto</h3><span class="elmaq-role">Gerente de Produção</span><p>Planejamento, controle de produção, qualidade e eficiência operacional para assegurar desempenho e excelência em cada entrega.</p><a class="elmaq-contact" href="tel:+5531985980441">☎ (31) 98598-0441</a></div></article><article class="elmaq-person"><img src="assets/luis-felipe.jpg?v=5" alt="Luis Felipe - CEO da ELMAQ Engenharia" loading="eager"><div class="elmaq-person-content"><span class="elmaq-sector">Diretoria</span><h3>Luis Felipe</h3><span class="elmaq-role">CEO</span><p>Visão estratégica, liderança e inovação orientadas ao crescimento sustentável, à evolução tecnológica e ao futuro da ELMAQ Engenharia.</p></div></article></div><div class="elmaq-values reveal"><div class="elmaq-value"><strong>Experiência</strong><span>Atuação focada no mercado industrial.</span></div><div class="elmaq-value"><strong>Inovação</strong><span>Tecnologia aplicada a soluções reais.</span></div><div class="elmaq-value"><strong>Qualidade</strong><span>Padrões elevados em projeto e entrega.</span></div><div class="elmaq-value"><strong>Compromisso</strong><span>Resultados que constroem confiança.</span></div></div></div>`;
  if(hero)hero.insertAdjacentElement('afterend',team);
  team.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
}

const progress=document.querySelector('.scroll-progress span');
const navLinks=[...document.querySelectorAll('.scroll-nav a')];
const trackedSections=[...document.querySelectorAll('.tracked-section')];
const updateScrollUi=()=>{
  const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;const pct=max>0?(h.scrollTop/max)*100:0;
  if(progress)progress.style.height=`${pct}%`;
  let current='inicio';trackedSections.forEach(section=>{const top=section.offsetTop-180;const bottom=top+section.offsetHeight;if(window.scrollY>=top&&window.scrollY<bottom)current=section.id;});
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`));
};
window.addEventListener('scroll',updateScrollUi,{passive:true});window.addEventListener('resize',updateScrollUi);window.addEventListener('load',updateScrollUi);updateScrollUi();
