const menuBtn=document.getElementById('menuBtn');const navMenu=document.getElementById('navMenu');menuBtn?.addEventListener('click',()=>navMenu.classList.toggle('open'));document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>navMenu.classList.remove('open')));const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.15});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));


// Efeito do header ao rolar a página
const topbar = document.querySelector('.topbar');
const updateHeader = () => {
  if (!topbar) return;
  topbar.classList.toggle('scrolled', window.scrollY > 12);
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
