document.addEventListener("DOMContentLoaded", function () {
    // Pré-carrega a página e armazena em um Blob
    fetch('http://farmacia.sortee.com.br/versao_f.htm')
        .then(response => response.text())
        .then(data => {
            // Cria um Blob com o conteúdo da página
            const blob = new Blob([data], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            // Carrega o link inicial no iframe usando o Blob
            const contentFrame = document.getElementById('content-frame');
            contentFrame.src = url;

            // Armazena o URL do Blob para reutilizar no clique da logo
            window.cachedPageUrl = url;
        })
        .catch(error => {
            console.log('Erro ao pré-carregar a página:', error);

            // Em caso de erro no pré-carregamento, carrega o link diretamente no iframe
            document.getElementById('content-frame').src = 'http://farmacia.sortee.com.br/versao_f.htm';
        });

    // Toggle do menu responsivo mobile
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => navMenu.classList.toggle('open'));
    }

    // Função para alternar a visibilidade dos submenus
function toggleMenu(event) {
    const target = event.target.closest('.menu-pai');
    if (!target) return; // Verifica se o clique foi dentro de um menu-pai

    const subMenu = target.nextElementSibling;

    if (subMenu && subMenu.classList.contains('menufilho')) {
        // Fechar todos os outros submenus dentro do mesmo menu-principal
        if (target.classList.contains('menu-principal')) {
            document.querySelectorAll('.menu-principal + .menufilho').forEach(menu => {
                if (menu !== subMenu) {
                    menu.classList.remove('expanded');
                }
            });
        } else {
            // Fechar apenas submenus irmãos
            target.parentElement.querySelectorAll('.menufilho').forEach(menu => {
                if (menu !== subMenu) {
                    menu.classList.remove('expanded');
                }
            });
        }

        // Alternar a visibilidade do submenu clicado
        subMenu.classList.toggle('expanded');
    } else {
        // Fechar todos os submenus no mesmo nível do menu-pai clicado
        const parentMenu = target.closest('.menu-pai');
        if (parentMenu) {
            const parentElement = parentMenu.parentElement;
            if (parentElement) {
                parentElement.querySelectorAll('.menufilho').forEach(menu => {
                    menu.classList.remove('expanded');
                });
            }
        }

        // Carregar o conteúdo diretamente
        loadContent(event);
    }
}
    // Função para carregar o conteúdo no iframe
    function loadContent(event) {
        let linkElement = event.target.closest('a[data-link]');
        if (!linkElement) {
            const target = event.target.closest('.menu-pai');
            if (target && target.hasAttribute('data-link')) {
                linkElement = target;
            }
        }

        if (linkElement) {
            const link = linkElement.getAttribute('data-link');
            if (link) {
                document.getElementById('content-frame').src = link;
            }
        }
    }

    // Adiciona event listeners aos menus-pai
    document.querySelectorAll('.menu-pai').forEach(menu => {
        menu.addEventListener('click', function (event) {
            // Alternar submenus ou carregar conteúdo
            toggleMenu(event);

            // Prevenir a propagação do clique para que o submenu não feche quando clicado em seus próprios links
            event.stopPropagation();
        });
    });

    // Adiciona event listeners aos links dentro de menufilho
    document.querySelectorAll('.menufilho a[data-link]').forEach(link => {
        link.addEventListener('click', function (event) {
            // Carregar conteúdo no iframe
            loadContent(event);

            // Fecha o menu no modo mobile ao selecionar um link (para liberar espaço na tela)
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
            }

            // Evitar que o clique no link também feche o submenu
            event.stopPropagation();
        });
    });

    // Adiciona um event listener para abrir a pagina de versao no clique da logo
    document.getElementById('logo-sortee').addEventListener('click', function () {
        const contentFrame = document.getElementById('content-frame');

        if (window.cachedPageUrl) {
            // Reutiliza o Blob já carregado
            contentFrame.src = window.cachedPageUrl;
        } else {
            // Caso o Blob não esteja carregado (falha no pré-carregamento), carrega a página diretamente
            contentFrame.src = 'http://farmacia.sortee.com.br/versao_f.htm';
        }
    });
});

//MOSTRA/ESCONDE MENU E CAIXA DE PESQUISA

document.addEventListener("DOMContentLoaded", function () {
    // Inicializa eventos de clique nos menus
    document.querySelectorAll('.clique').forEach((element, index) => {
        element.addEventListener('click', function () {
            toggleMenu(element, index);
        });
    });

    // Adiciona evento para a barra de busca
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', function (event) {
        searchFunction();
        if (event.key === 'Enter') {
            handleEnterKey();
        }
    });
});

let currentHighlightIndex = -1;

function searchFunction() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let contentContainer = document.getElementById('dynamicContent');

    // Remove marcações e expande menus anteriores
    removeHighlights(contentContainer);
    expandAllMenus();

    if (input.length < 3) {
        collapseAllMenus();
        currentHighlightIndex = -1; // Reseta o índice ao apagar a busca
        return; // Não fazer nada se a barra de busca estiver vazia ou com menos de 3 caracteres
    }

    // Função para percorrer os nós de texto e destacar a palavra-chave
    highlightTextNodes(contentContainer, input);
}

function highlightTextNodes(element, searchTerm) {
    if (element.hasChildNodes()) {
        element.childNodes.forEach(function (child) {
            if (child.nodeType === Node.TEXT_NODE) {
                let value = child.nodeValue;
                let regex = new RegExp(searchTerm, "gi");

                if (regex.test(value)) {
                    let newHTML = value.replace(regex, function (matchedText) {
                        return `<span class="highlight">${matchedText}</span>`;
                    });

                    let newSpan = document.createElement('span');
                    newSpan.innerHTML = newHTML;
                    child.parentNode.replaceChild(newSpan, child);

                    // Expande o menu correspondente
                    let parentUl = newSpan.closest('.mostra-esconde');
                    if (parentUl && parentUl.style.display === 'none') {
                        toggleMenu(parentUl.previousElementSibling, Array.from(document.querySelectorAll('.mostra-esconde')).indexOf(parentUl));
                    }
                }
            } else {
                highlightTextNodes(child, searchTerm);
            }
        });
    }
}

function removeHighlights(element) {
    let highlightedElements = element.querySelectorAll('.highlight');
    highlightedElements.forEach(function (element) {
        element.outerHTML = element.innerHTML; // Remove o span, mantendo o texto
    });
}

function expandAllMenus() {
    document.querySelectorAll('.mostra-esconde').forEach((element, index) => {
        if (element.style.display === 'none' || element.style.display === '') {
            toggleMenu(element.previousElementSibling, index);
        }
    });
}

function collapseAllMenus() {
    document.querySelectorAll('.mostra-esconde').forEach((element, index) => {
        if (element.style.display === 'block') {
            toggleMenu(element.previousElementSibling, index);
        }
    });
}

function toggleMenu(element, index) {
    const frase = document.querySelectorAll('.mostra-esconde')[index];
    const seta = element.querySelector('.seta');
    if (frase) {
        const isHidden = frase.style.display === 'none' || frase.style.display === '';
        frase.style.display = isHidden ? 'block' : 'none';
        seta.textContent = isHidden ? '-' : '+';
    }
}

function handleEnterKey() {
    let highlightedElements = document.querySelectorAll('.highlight');
    if (highlightedElements.length === 0) return;

    // Remove o destaque atual
    if (currentHighlightIndex !== -1) {
        highlightedElements[currentHighlightIndex].classList.remove('current');
    }

    // Atualiza o índice e aplica o destaque à próxima palavra-chave
    currentHighlightIndex = (currentHighlightIndex + 1) % highlightedElements.length;
    let nextElement = highlightedElements[currentHighlightIndex];
    nextElement.classList.add('current');
    nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}