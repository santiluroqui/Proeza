/* ================================================================
   APLICACIÓN PRINCIPAL - app.js
   Inicializador global, navegación y coordinación
   ================================================================ */

// Estado global de la aplicación
const app = {
  currentPage: 'index',
  isMenuOpen: false,
  carousels: {},
  modals: {},
  
  // Inicializador
  init() {
    console.log('🚀 Inicializando aplicación Grupo Proeza...');
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupScrollEffects();
    this.loadDynamicContent();
    console.log('✅ Aplicación inicializada correctamente');
  },
  
  // Navegación
  setupNavigation() {
    const navLinks = document.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        this.navigateTo(page);
        this.closeMenu();
      });
    });
  },
  
  // Navegación a página
  navigateTo(page) {
    console.log(`📄 Navegando a: ${page}`);
    
    // Actualizar enlace activo
    document.querySelectorAll('.navbar-link').forEach(link => {
      link.classList.remove('active');
    });
    document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
    
    // Scroll al top
    window.scrollTo(0, 0);
    
    // Guardar en history API
    history.pushState({ page }, page, `${page}.html`);
    this.currentPage = page;
  },
  
  // Menú móvil
  setupMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-nav');
    
    if (toggle) {
      toggle.addEventListener('click', () => {
        this.isMenuOpen = !this.isMenuOpen;
        toggle.classList.toggle('active');
        nav?.classList.toggle('active');
      });
    }
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar') && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  },
  
  closeMenu() {
    this.isMenuOpen = false;
    document.querySelector('.navbar-toggle')?.classList.remove('active');
    document.querySelector('.navbar-nav')?.classList.remove('active');
  },
  
  // Efectos de scroll
  setupScrollEffects() {
    // Scroll animations con Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1
    });
    
    document.querySelectorAll('[class*="on-scroll"]').forEach(el => {
      observer.observe(el);
    });
    
    // Navbar sticky
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
          navbar.style.boxShadow = '0 4px 20px rgba(46, 10, 74, 0.15)';
        } else {
          navbar.style.boxShadow = '0 4px 20px rgba(46, 10, 74, 0.1)';
        }
      });
    }
  },
  
  // Cargar contenido dinámico
  loadDynamicContent() {
    // Aquí se pueden cargar componentes dinámicos
    console.log('📦 Contenido dinámico cargado');
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

// Manejar navegación del navegador
window.addEventListener('popstate', (e) => {
  if (e.state?.page) {
    app.currentPage = e.state.page;
  }
});
