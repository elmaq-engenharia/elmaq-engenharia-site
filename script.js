const anchors=[...document.querySelectorAll('a[href^="#"]')];
anchors.forEach(link=>link.addEventListener('click',e=>{const selector=link.getAttribute('href');if(!selector||selector==='#')return;const target=document.querySelector(selector);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}}));

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const menuToggle=document.querySelector('.menu-toggle');
const mainMenu=document.querySelector('.main-menu');
const closeMobileMenu=()=>{if(!menuToggle||!mainMenu)return;menuToggle.classList.remove('active');mainMenu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');};
const openMobileMenu=()=>{if(!menuToggle||!mainMenu)return;menuToggle.classList.add('active');mainMenu.classList.add('open');menuToggle.setAttribute('aria-expanded','true');menuToggle.setAttribute('aria-label','Fechar menu');};
if(menuToggle&&mainMenu){menuToggle.addEventListener('click',()=>mainMenu.classList.contains('open')?closeMobileMenu():openMobileMenu());mainMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMobileMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu();});window.addEventListener('resize',()=>{if(window.innerWidth>980)closeMobileMenu();});}

const progressBar=document.querySelector('.scroll-progress span');
const trackedSections=[...document.querySelectorAll('.tracked-section')];
const navDots=[...document.querySelectorAll('.scroll-nav a')];
function updateScrollUI(){const scrollTop=window.scrollY||document.documentElement.scrollTop;const docHeight=document.documentElement.scrollHeight-window.innerHeight;const pct=docHeight>0?Math.min(100,Math.max(0,(scrollTop/docHeight)*100)):0;if(progressBar)progressBar.style.height=pct+'%';let current='';for(const section of trackedSections){const top=section.offsetTop-180;const bottom=top+section.offsetHeight;if(scrollTop>=top&&scrollTop<bottom){current=section.id;break;}}navDots.forEach(dot=>dot.classList.toggle('active',dot.getAttribute('href')==='#'+current));}
window.addEventListener('scroll',updateScrollUI,{passive:true});window.addEventListener('load',updateScrollUI);window.addEventListener('resize',updateScrollUI);updateScrollUI();

// segurança visual: nenhum fundo/elemento decorativo de braço robótico
['.robot-arm','.bg-robot','.robotic-arm','.robot-background'].forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.remove()));