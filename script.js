const mobileCss=document.createElement('link');mobileCss.rel='stylesheet';mobileCss.href='mobile.css';document.head.appendChild(mobileCss);
const teamCss=document.createElement('link');teamCss.rel='stylesheet';teamCss.href='team.css';document.head.appendChild(teamCss);

const anchors=[...document.querySelectorAll('a[href^="#"]')];
anchors.forEach(link=>link.addEventListener('click',e=>{const target=document.querySelector(link.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}}));

const progress=document.querySelector('.scroll-progress span');
const updateProgress=()=>{const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;const pct=max>0?(h.scrollTop/max)*100:0;if(progress)progress.style.width=`${pct}%`;};
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const navLinks=[...document.querySelectorAll('.scroll-nav a')];
const sections=[...document.querySelectorAll('.tracked-section')];
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));}});},{rootMargin:'-40% 0px -50% 0px',threshold:0});
sections.forEach(s=>sectionObserver.observe(s));

const menuToggle=document.querySelector('.menu-toggle');
const mainMenu=document.querySelector('.main-menu');
const closeMobileMenu=()=>{if(!menuToggle||!mainMenu)return;menuToggle.classList.remove('active');mainMenu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');};
const openMobileMenu=()=>{if(!menuToggle||!mainMenu)return;menuToggle.classList.add('active');mainMenu.classList.add('open');menuToggle.setAttribute('aria-expanded','true');menuToggle.setAttribute('aria-label','Fechar menu');};
if(menuToggle&&mainMenu){menuToggle.addEventListener('click',()=>{mainMenu.classList.contains('open')?closeMobileMenu():openMobileMenu();});mainMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMobileMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu();});window.addEventListener('resize',()=>{if(window.innerWidth>980)closeMobileMenu();});}

// Identidade oficial ELMAQ em todo o site
const officialLogo='assets/logo-elmaq-oficial.jpg';
document.querySelectorAll('.brand-image img,.section-logo,.footer-logo').forEach(img=>{img.src=officialLogo;img.classList.add('elmaq-logo-official');});

// Remove qualquer elemento decorativo de braço robótico, se existir
['.robot-arm','.bg-robot','.robotic-arm','.robot-background'].forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.remove()));

// Secao institucional com as fotos corretas, separada por setores
if(!document.querySelector('#equipe-elmaq')){
  const hero=document.querySelector('#inicio');
  const team=document.createElement('section');
  team.id='equipe-elmaq';
  team.className='elmaq-team tracked-section';
  team.innerHTML=`<div class="wrap"><div class="elmaq-team-head reveal"><p class="eyebrow">Nossa liderança</p><h2>Liderança que movimenta ideias e transforma resultados.</h2><p>Cada área da ELMAQ atua com foco em relacionamento, excelência operacional e visão estratégica para transformar necessidades industriais em soluções de alto desempenho.</p></div><div class="elmaq-team-grid reveal"><article class="elmaq-person"><img src="assets/edson-costa.jpg" alt="Edson Costa - Engenharia Comercial"><div class="elmaq-person-content"><span class="elmaq-sector">Setor Comercial</span><h3>Edson Costa</h3><span class="elmaq-role">Engenharia Comercial</span><p>Relacionamento consultivo, análise de necessidade e soluções personalizadas para gerar valor, confiança e resultados consistentes.</p><a class="elmaq-contact" href="tel:+5531999191998">☎ (31) 99919-1998</a></div></article><article class="elmaq-person"><img src="assets/rafael-augusto.jpg" alt="Rafael Augusto - Gerente de Produção"><div class="elmaq-person-content"><span class="elmaq-sector">Setor de Produção</span><h3>Rafael Augusto</h3><span class="elmaq-role">Gerente de Produção</span><p>Planejamento, controle de produção, qualidade e eficiência operacional para assegurar desempenho e excelência em cada entrega.</p><a class="elmaq-contact" href="tel:+5531985980441">☎ (31) 98598-0441</a></div></article><article class="elmaq-person"><img src="assets/luis-felipe.jpg" alt="Luis Felipe - CEO da ELMAQ Engenharia"><div class="elmaq-person-content"><span class="elmaq-sector">Diretoria</span><h3>Luis Felipe</h3><span class="elmaq-role">CEO</span><p>Visão estratégica, liderança e inovação orientadas ao crescimento sustentável, à evolução tecnológica e ao futuro da ELMAQ Engenharia.</p></div></article></div><div class="elmaq-values reveal"><div class="elmaq-value"><strong>Experiência</strong><span>Atuação focada no mercado industrial.</span></div><div class="elmaq-value"><strong>Inovação</strong><span>Tecnologia aplicada a soluções reais.</span></div><div class="elmaq-value"><strong>Qualidade</strong><span>Padrões elevados em projeto e entrega.</span></div><div class="elmaq-value"><strong>Compromisso</strong><span>Resultados que constroem confiança.</span></div></div></div>`;
  if(hero)hero.insertAdjacentElement('afterend',team);
  team.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
}
