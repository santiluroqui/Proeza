// components/navbar.js

/**
 * ============================================================
 * SISTEMA DE COMPONENTES DINÁMICOS - GRUPO PROEZA
 * Inyecta navbar y footer automáticamente en todas las páginas
 * ============================================================
 */

(function() {
    'use strict';

    /**
     * Carga un componente HTML desde un archivo externo
     * @param {string} containerId - ID del contenedor donde se inyectará
     * @param {string} filePath - Ruta del archivo HTML a cargar
     */
    async function loadComponent(containerId, filePath) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`⚠️ Contenedor #${containerId} no encontrado`);
            return;
        }

        try {
            const response = await fetch(filePath);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const html = await response.text();
            container.innerHTML = html;
            
            console.log(`✅ Componente cargado: ${filePath}`);
        } catch (error) {
            console.error(`❌ Error cargando ${filePath}:`, error.message);
            container.innerHTML = `
                <div style="background: #ff4444; color: white; padding: 1rem; text-align: center;">
                    ⚠️ Error cargando componente. Asegúrate de abrir el sitio con un servidor local (Live Server).
                </div>
            `;
        }
    }

    /**
     * SOLUCIÓN CRÍTICA: Mueve el footer al final del body
     * Esto evita que sea cortado por contenedores padres con overflow:hidden
     */
    function moveFooterToBody() {
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) return;

        // Obtener el contenido original del footer
        const footerContent = footerContainer.innerHTML;
        
        // Limpiar y ocultar el contenedor original
        footerContainer.innerHTML = '';
        footerContainer.style.display = 'none';
        
        // Crear un nuevo wrapper al final del body
        const newFooterWrapper = document.createElement('div');
        newFooterWrapper.id = 'footer-wrapper';
        newFooterWrapper.innerHTML = footerContent;
        
        // Aplicar estilos críticos inline para que NO se recorte
        newFooterWrapper.style.cssText = `
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            clear: both !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            position: relative !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            box-sizing: border-box !important;
        `;
        
        // Agregar al final del body
        document.body.appendChild(newFooterWrapper);
        
        // Forzar que todos los elementos internos también sean visibles sin recortes
        const allFooterElements = newFooterWrapper.querySelectorAll('*');
        allFooterElements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.overflow === 'hidden') {
                el.style.overflow = 'visible';
            }
            if (computedStyle.maxHeight !== 'none') {
                el.style.maxHeight = 'none';
            }
        });
        
        console.log('✅ Footer movido al final del body y forzado a mostrar completo');
    }

    /**
     * Limpia estilos residuales del footer para evitar cualquier recorte interno
     */
    function fixFooterGlobalStyles() {
        const footerWrapper = document.getElementById('footer-wrapper');
        if (!footerWrapper) return;
        
        // Busca el elemento raíz del footer (normalmente <footer> o .footer)
        const footerElement = footerWrapper.querySelector('footer') || footerWrapper.firstElementChild;
        if (footerElement) {
            footerElement.style.cssText += `
                overflow: visible !important;
                max-height: none !important;
                position: relative !important;
                clear: both !important;
            `;
        }
    }

    /**
     * Marca el enlace activo según la página actual
     */
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop().replace('.html', '') || 'index';
        
        const navLinks = document.querySelectorAll('.navbar-link');
        navLinks.forEach(link => {
            const pageAttr = link.getAttribute('data-page');
            if (pageAttr === currentPage) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Inicializa el menú móvil
     */
    function initMobileMenu() {
        const navbarToggle = document.getElementById('navbarToggle');
        const navbarNav = document.getElementById('navbarNav');
        
        if (!navbarToggle || !navbarNav) return;
        
        navbarToggle.addEventListener('click', function() {
            const isActive = navbarNav.classList.toggle('active');
            navbarToggle.classList.toggle('active');
            navbarToggle.setAttribute('aria-expanded', isActive);
        });
        
        // Cerrar menú al hacer clic en un enlace (mobile)
        const navbarLinks = navbarNav.querySelectorAll('.navbar-link');
        navbarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navbarNav.classList.remove('active');
                    navbarToggle.classList.remove('active');
                    navbarToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            if (!navbarToggle.contains(event.target) && !navbarNav.contains(event.target)) {
                navbarNav.classList.remove('active');
                navbarToggle.classList.remove('active');
                navbarToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * Aplica estilos críticos al navbar para asegurar que no se corte
     */
    function fixNavbarStyles() {
        const navbarContainer = document.getElementById('navbar-container');
        if (!navbarContainer) return;

        // Asegurar que el contenedor del navbar tenga ancho completo
        navbarContainer.style.cssText = `
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            position: relative !important;
            z-index: 1000 !important;
        `;
    }

    /**
     * Función principal que inicializa todo
     */
    async function init() {
        // Cargar navbar y footer
        await Promise.all([
            loadComponent('navbar-container', '../components/navbar.html'),
            loadComponent('footer-container', '../components/footer.html')
        ]);
        
        // Aplicar correcciones críticas
        fixNavbarStyles();
        moveFooterToBody();
        fixFooterGlobalStyles();
        
        // Inicializar funcionalidades después de cargar
        setActiveLink();
        initMobileMenu();
        
        console.log('🎉 Sistema de componentes Proeza inicializado');
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
