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
