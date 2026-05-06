const menuBtn=document.getElementById('menuBtn');const navMenu=document.getElementById('navMenu');menuBtn?.addEventListener('click',()=>navMenu.classList.toggle('open'));document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>navMenu.classList.remove('open')));const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.15});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));


// Efeito do header ao rolar a página
const topbar = document.querySelector('.topbar');
const updateHeader = () => {
  if (!topbar) return;
  topbar.classList.toggle('scrolled', window.scrollY > 12);
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// Lógica para abrir/fechar o Chat Suporte (Widget)
const chatWidgetBtn = document.getElementById('chatWidgetBtn');
const chatWidgetContainer = document.getElementById('chatWidgetContainer');

if (chatWidgetBtn && chatWidgetContainer) {
  // Verifica no cache se o widget foi deixado aberto na página anterior
  if (localStorage.getItem('chatWidgetOpen') === 'true') {
    chatWidgetContainer.classList.add('open');
  }

  chatWidgetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    chatWidgetContainer.classList.toggle('open');
    
    // Salva o estado atual no cache para as próximas páginas
    localStorage.setItem('chatWidgetOpen', chatWidgetContainer.classList.contains('open'));
  });
}
