/* ================================================================
   CARRUSEL - carousel.js
   Autoplay cada 5 segundos, transiciones suaves, vanilla JS
   ================================================================ */

class Carousel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.slides = this.container.querySelectorAll('.carousel-slide');
    this.indicators = this.container.querySelectorAll('.carousel-indicator');
    this.prevBtn = this.container.querySelector('.carousel-nav-btn.prev');
    this.nextBtn = this.container.querySelector('.carousel-nav-btn.next');
    this.progressBar = this.container.querySelector('.carousel-progress');
    
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.autoplayDuration = 5000; // 5 segundos
    this.isAutoplay = true;
    
    this.init();
  }
  
  init() {
    if (this.slides.length === 0) return;
    
    // Mostrar primer slide
    this.showSlide(0);
    
    // Event listeners
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Pausar autoplay en hover
    this.container?.addEventListener('mouseenter', () => this.pauseAutoplay());
    this.container?.addEventListener('mouseleave', () => this.startAutoplay());
    
    // Touch support
    this.setupTouchSupport();
    
    // Iniciar autoplay
    this.startAutoplay();
    
    console.log('✅ Carrusel inicializado');
  }
  
  showSlide(index) {
    // Validar índice
    if (index >= this.slides.length) {
      this.currentIndex = 0;
    } else if (index < 0) {
      this.currentIndex = this.slides.length - 1;
    } else {
      this.currentIndex = index;
    }
    
    // Ocultar todos los slides
    this.slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Mostrar slide actual
    this.slides[this.currentIndex].classList.add('active');
    
    // Actualizar indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });
    
    // Reset progress bar
    this.resetProgressBar();
  }
  
  next() {
    this.pauseAutoplay();
    this.showSlide(this.currentIndex + 1);
    this.startAutoplay();
  }
  
  prev() {
    this.pauseAutoplay();
    this.showSlide(this.currentIndex - 1);
    this.startAutoplay();
  }
  
  goToSlide(index) {
    this.pauseAutoplay();
    this.showSlide(index);
    this.startAutoplay();
  }
  
  startAutoplay() {
    if (!this.isAutoplay) return;
    
    this.autoplayInterval = setInterval(() => {
      this.showSlide(this.currentIndex + 1);
    }, this.autoplayDuration);
  }
  
  pauseAutoplay() {
    clearInterval(this.autoplayInterval);
  }
  
  resetProgressBar() {
    if (this.progressBar) {
      this.progressBar.style.animation = 'none';
      // Trigger reflow
      this.progressBar.offsetHeight;
      this.progressBar.style.animation = 'carousel-progress 5s linear';
    }
  }
  
  setupTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.container?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    this.container?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });
    
    const handleSwipe = () => {
      if (touchStartX - touchEndX > 50) {
        // Swipe izquierda = siguiente
        this.next();
      } else if (touchEndX - touchStartX > 50) {
        // Swipe derecha = anterior
        this.prev();
      }
    };
    
    this.handleSwipe = handleSwipe;
  }
}

// Inicializar carrusel cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const carouselHero = new Carousel('carousel-hero');
  const carouselTestimonios = new Carousel('carousel-testimonios');
});
