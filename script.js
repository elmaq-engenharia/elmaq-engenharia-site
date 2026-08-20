// ELMAQ v6 — correções gerais de navegação, logo, equipe e barra interativa
const loadCss=(href,id)=>{if(document.getElementById(id))return;const link=document.createElement('link');link.id=id;link.rel='stylesheet';link.href=href;document.head.appendChild(link);};
loadCss('mobile.css?v=6','elmaq-mobile-css');
loadCss('team.css?v=6','elmaq-team-css');
loadCss('site-fixes.css?v=6','elmaq-fixes-css');

// Logo oficial visível em todo o site usando o arquivo já validado no projeto.
const logoPath='assets/logo-elmaq-site.jpg?v=6';
document.querySelectorAll('.brand-image img,.section-logo,.footer-logo').forEach(img=>{
  img.src=logoPath;
  img.classList.add('elmaq-logo-active');
});

// Remove apenas fundos/elementos decorativos antigos de braços robóticos.
['.robot-arm','.bg-robot','.robotic-arm','.robot-background'].forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.remove()));

const setupEdsonFallback=img=>{
  if(!img||img.dataset.fallbackReady)return;
  img.dataset.fallbackReady='1';
  const useFallback=async()=>{
    if(img.dataset.fallbackUsed)return;
    img.dataset.fallbackUsed='1';
    try{
      const res=await fetch('assets/edson-costa-v6.b64.txt?v=6',{cache:'no-store'});
      if(!res.ok)throw new Error('fallback indisponível');
      const b64=(await res.text()).trim();
      img.src='data:image/jpeg;base64,'+b64;
    }catch(err){console.warn('Não foi possível carregar a foto de Edson Costa.',err);}
  };
  img.addEventListener('error',useFallback,{once:true});
  if(img.complete&&img.naturalWidth===0)useFallback();
};

// Seção institucional por setores.
if(!document.querySelector('#equipe-elmaq')){
  const hero=document.querySelector('#inicio');
  const team=document.createElement('section');
  team.id='equipe-elmaq';
  team.className='elmaq-team tracked-section';
  team.innerHTML=`
    <div class="wrap">
      <div class="elmaq-team-head reveal">
        <p class="eyebrow">Nossa liderança</p>
        <h2>Liderança que movimenta ideias e transforma resultados.</h2>
        <p>Áreas estratégicas conectadas para entregar atendimento consultivo, excelência operacional e visão de futuro.</p>
      </div>
      <div class="elmaq-team-grid reveal">
        <article class="elmaq-person">
          <img class="edson-photo" src="assets/edson-costa.jpg?v=6" alt="Edson Costa - Engenharia Comercial" loading="eager">
          <div class="elmaq-person-content">
            <span class="elmaq-sector">Setor Comercial</span>
            <h3>Edson Costa</h3>
            <span class="elmaq-role">Engenharia Comercial</span>
            <p>Relacionamento consultivo, análise de necessidade e soluções personalizadas para gerar valor, confiança e resultados consistentes.</p>
            <a class="elmaq-contact" href="tel:+5531999191998">☎ (31) 99919-1998</a>
          </div>
        </article>
        <article class="elmaq-person">
          <img src="assets/rafael-augusto.jpg?v=6" alt="Rafael Augusto - Gerente de Produção" loading="eager">
          <div class="elmaq-person-content">
            <span class="elmaq-sector">Setor de Produção</span>
            <h3>Rafael Augusto</h3>
            <span class="elmaq-role">Gerente de Produção</span>
            <p>Planejamento, controle de produção, qualidade e eficiência operacional para assegurar desempenho e excelência em cada entrega.</p>
            <a class="elmaq-contact" href="tel:+5531985980441">☎ (31) 98598-0441</a>
          </div>
        </article>
        <article class="elmaq-person">
          <img src="assets/luis-felipe.jpg?v=6" alt="Luis Felipe - CEO da ELMAQ Engenharia" loading="eager">
          <div class="elmaq-person-content">
            <span class="elmaq-sector">Diretoria</span>
            <h3>Luis Felipe</h3>
            <span class="elmaq-role">CEO</span>
            <p>Visão estratégica, liderança e inovação orientadas ao crescimento sustentável, à evolução tecnológica e ao futuro da ELMAQ Engenharia.</p>
          </div>
        </article>
      </div>
      <div class="elmaq-values reveal">
        <div class="elmaq-value"><strong>Experiência</strong><span>Atuação focada no mercado industrial.</span></div>
        <div class="elmaq-value"><strong>Inovação</strong><span>Tecnologia aplicada a soluções reais.</span></div>
        <div class="elmaq-value"><strong>Qualidade</strong><span>Padrões elevados em projeto e entrega.</span></div>
        <div class="elmaq-value"><strong>Compromisso</strong><span>Resultados que constroem confiança.</span></div>
      </div>
    </div>`;
  if(hero)hero.insertAdjacentElement('afterend',team);
  setupEdsonFallback(team.querySelector('.edson-photo'));
}

// Adiciona "Equipe" ao menu e à navegação lateral se ainda não existir.
const mainMenu=document.querySelector('.main-menu');
if(mainMenu&&!mainMenu.querySelector('a[href="#equipe-elmaq"]')){
  const first=mainMenu.querySelector('a');
  const link=document.createElement('a');link.href='#equipe-elmaq';link.textContent='Equipe';
  first?first.insertAdjacentElement('afterend',link):mainMenu.appendChild(link);
}
const scrollNav=document.querySelector('.scroll-nav');
if(scrollNav&&!scrollNav.querySelector('a[href="#equipe-elmaq"]')){
  const first=scrollNav.querySelector('a');
  const dot=document.createElement('a');dot.href='#equipe-elmaq';dot.dataset.label='Equipe';
  first?first.insertAdjacentElement('afterend',dot):scrollNav.appendChild(dot);
}

// Navegação suave.
const anchors=[...document.querySelectorAll('a[href^="#"]')];
anchors.forEach(link=>link.addEventListener('click',e=>{
  const selector=link.getAttribute('href');
  if(!selector||selector==='#')return;
  const target=document.querySelector(selector);
  if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
}));

// Revelação suave dos blocos ao entrar na tela.
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

// Menu hamburger funcional.
const menuToggle=document.querySelector('.menu-toggle');
const closeMobileMenu=()=>{if(!menuToggle||!mainMenu)return;menuToggle.classList.remove('active');mainMenu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');};
const openMobileMenu=()=>{if(!menuToggle||!mainMenu)return;menuToggle.classList.add('active');mainMenu.classList.add('open');menuToggle.setAttribute('aria-expanded','true');menuToggle.setAttribute('aria-label','Fechar menu');};
if(menuToggle&&mainMenu){
  menuToggle.addEventListener('click',()=>mainMenu.classList.contains('open')?closeMobileMenu():openMobileMenu());
  mainMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMobileMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu();});
  document.addEventListener('click',e=>{if(window.innerWidth<=980&&mainMenu.classList.contains('open')&&!mainMenu.contains(e.target)&&!menuToggle.contains(e.target))closeMobileMenu();});
  window.addEventListener('resize',()=>{if(window.innerWidth>980)closeMobileMenu();});
}

// Barra vertical de progresso + pontos interativos sincronizados com a seção atual.
const progressBar=document.querySelector('.scroll-progress span');
let ticking=false;
const updateScrollUI=()=>{
  const doc=document.documentElement;
  const scrollTop=window.scrollY||doc.scrollTop;
  const docHeight=Math.max(1,doc.scrollHeight-window.innerHeight);
  const pct=Math.min(100,Math.max(0,(scrollTop/docHeight)*100));
  if(progressBar)progressBar.style.height=pct+'%';
  const sections=[...document.querySelectorAll('.tracked-section')];
  const navDots=[...document.querySelectorAll('.scroll-nav a')];
  const marker=scrollTop+Math.min(window.innerHeight*.38,260);
  let current=sections[0]?.id||'inicio';
  for(const section of sections){if(section.offsetTop<=marker)current=section.id;else break;}
  navDots.forEach(dot=>dot.classList.toggle('active',dot.getAttribute('href')==='#'+current));
  ticking=false;
};
const requestScrollUpdate=()=>{if(!ticking){requestAnimationFrame(updateScrollUI);ticking=true;}};
window.addEventListener('scroll',requestScrollUpdate,{passive:true});
window.addEventListener('load',requestScrollUpdate);
window.addEventListener('resize',requestScrollUpdate);
requestScrollUpdate();
