const menuBtn = document.getElementById('menuBtn'); const navMenu = document.getElementById('navMenu'); menuBtn?.addEventListener('click', () => navMenu.classList.toggle('open')); document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open'))); const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) } }) }, { threshold: .15 }); document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


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

/* =========================================================
   GERADOR DINÂMICO DA ÓRBITA (ECOSSISTEMA)
   ========================================================= */
const orbitContainer = document.getElementById('orbitContainer');

if (orbitContainer) {
  // Lista de todas as integrações e parceiros
  // Para adicionar um novo, basta incluir uma nova linha aqui!
  const orbitItems = [
    { link: "#integracoes", img: "IMAGENS/integracoes/avantfiscal.png", nome: "Avantfiscal" },
    { link: "#integracoes", img: "IMAGENS/integracoes/cloudeficaz.png", nome: "CloudEficaz" },
    { link: "#integracoes", img: "IMAGENS/integracoes/closeup.png", nome: "Close-UP" },
    { link: "#integracoes", img: "IMAGENS/integracoes/imendes.png", nome: "iMendes" },
    { link: "#integracoes", img: "IMAGENS/integracoes/iqvia.png", nome: "IQvia" },
    { link: "#integracoes", img: "IMAGENS/integracoes/napp.png", nome: "NAPP" },
    { link: "#integracoes", img: "IMAGENS/integracoes/proffer.png", nome: "Proffer" },
    { link: "#integracoes", img: "IMAGENS/integracoes/scanntech.png", nome: "Scanntech" },
    { link: "#integracoes", img: "IMAGENS/integracoes/smartped.png", nome: "SmartPed" },
    { link: "#parceiros", img: "IMAGENS/parceiros/grupo-amr.png", nome: "Grupo Americana" },
    { link: "#parceiros", img: "IMAGENS/parceiros/drogarias-bem-brasil.png", nome: "Bem Brasil" },
    { link: "#parceiros", img: "IMAGENS/parceiros/grupo-farma.png", nome: "Grupo Farma" },
    { link: "#parceiros", img: "IMAGENS/parceiros/hiper-saude.png", nome: "Hiper Saúde" },
    { link: "#parceiros", img: "IMAGENS/parceiros/minas-master.png", nome: "Master Brasil" }
  ];

  const totalItems = orbitItems.length;
  const angleStep = 360 / totalItems; // Calcula o grau exato para cada item

  orbitItems.forEach((item, index) => {
    const angle = index * angleStep;

    // Cria a div principal do item na órbita
    const orbitItemDiv = document.createElement('div');
    orbitItemDiv.className = 'orbit-item';
    orbitItemDiv.style.transform = `rotate(${angle}deg)`;

    // Cria a div de contra-giro
    const counterSpinDiv = document.createElement('div');
    counterSpinDiv.className = 'orbit-counter-spin';

    // Cria o link (âncora) com acessibilidade
    const anchor = document.createElement('a');
    anchor.href = item.link;
    anchor.className = 'icon-upright';
    anchor.style.transform = `rotate(-${angle}deg)`;
    anchor.setAttribute('aria-label', `Conhecer integração com ${item.nome}`);

    // Cria a imagem
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.nome;
    img.title = item.nome;

    // Monta a estrutura (um dentro do outro)
    anchor.appendChild(img);
    counterSpinDiv.appendChild(anchor);
    orbitItemDiv.appendChild(counterSpinDiv);

    // Insere no container final
    orbitContainer.appendChild(orbitItemDiv);
  });
}

/* =========================================================
   LÓGICA DO VÍDEO DE ABERTURA
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const videoContainer = document.getElementById('intro-video-container');
  const video = document.getElementById('intro-video');

  if (videoContainer && video) {
    // Adicione esta linha para acelerar o vídeo
    // 1.5 = 50% mais rápido | 2.0 = dobro da velocidade
    video.playbackRate = 2.5;

    // Quando o vídeo terminar de tocar, ele esconde a tela devagar
    video.addEventListener('ended', () => {
      videoContainer.classList.add('hidden');

      // Remove o elemento do HTML após a transição de CSS terminar (limpeza)
      setTimeout(() => {
        videoContainer.remove();
      }, 1500);
    });

    // Fallback: se houver erro ao carregar o arquivo, mostra o site imediatamente
    video.addEventListener('error', () => {
      videoContainer.classList.add('hidden');
    });

    // Fallback de segurança (Backup)
    setTimeout(() => {
      if (!videoContainer.classList.contains('hidden')) {
        videoContainer.classList.add('hidden');
      }
    }, 5000); // <- DICA: Considere reduzir este tempo também
  }
});