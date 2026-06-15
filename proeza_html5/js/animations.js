/* ================================================================
   ANIMACIONES GLOBALES - animations.js
   Scroll animations, hover effects, transiciones
   ================================================================ */

class AnimationManager {
  constructor() {
    this.observer = null;
    this.init();
  }
  
  init() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupLazyLoading();
    console.log('✅ Gestor de animaciones inicializado');
  }
  
  // Animaciones al scroll
  setupScrollAnimations() {
    const options = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Agregar delay a elementos hermanos
          const children = entry.target.querySelectorAll('[class*="on-scroll"]');
          children.forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
            child.classList.add('in-view');
          });
        }
      });
    }, options);
    
    // Observar todos los elementos con clases de animación
    document.querySelectorAll('[class*="on-scroll"]').forEach(el => {
      this.observer.observe(el);
    });
  }
  
  // Efectos hover
  setupHoverEffects() {
    // Hover scale en cards
    document.querySelectorAll('.card, .product-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }
  
  // Lazy loading de imágenes
  setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Animación de entrada de página
  pageTransition() {
    const elements = document.querySelectorAll('main > *');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.05}s`;
      el.classList.add('animate-fadeInUp');
    });
  }
}

// Efecto parallax
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    if (this.elements.length > 0) {
      window.addEventListener('scroll', () => this.update());
      console.log('✅ Efecto parallax inicializado');
    }
  }
  
  update() {
    const scrollTop = window.scrollY;
    
    this.elements.forEach(element => {
      const speed = element.getAttribute('data-parallax') || 0.5;
      const yPos = scrollTop * speed;
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
}

// Efecto smooth scroll en links internos
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Inicializar cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new AnimationManager();
  new ParallaxEffect();
  new SmoothScroll();
});
