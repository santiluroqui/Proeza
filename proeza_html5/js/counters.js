/* ================================================================
   CONTADORES - counters.js
   Animación suave de números, requestAnimationFrame
   ================================================================ */

class Counter {
  constructor(element, targetValue, duration = 2000) {
    this.element = element;
    this.targetValue = parseFloat(targetValue);
    this.currentValue = 0;
    this.duration = duration;
    this.startTime = null;
    this.hasStarted = false;
  }
  
  start() {
    if (this.hasStarted) return;
    this.hasStarted = true;
    
    this.startTime = performance.now();
    this.animate();
  }
  
  animate(timestamp = null) {
    if (!this.startTime) return;
    
    const elapsed = timestamp - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    
    // Easing function: easeOutQuad
    const easeProgress = 1 - Math.pow(1 - progress, 2);
    
    // Calcular valor actual
    this.currentValue = this.targetValue * easeProgress;
    
    // Actualizar elemento
    this.updateDisplay();
    
    // Continuar animación si no ha terminado
    if (progress < 1) {
      requestAnimationFrame((ts) => this.animate(ts));
    } else {
      this.currentValue = this.targetValue;
      this.updateDisplay();
    }
  }
  
  updateDisplay() {
    let displayValue = this.currentValue;
    
    // Formatear según el tipo
    if (this.targetValue > 1000) {
      displayValue = Math.round(displayValue).toLocaleString();
    } else if (Number.isInteger(this.targetValue)) {
      displayValue = Math.round(displayValue);
    } else {
      displayValue = displayValue.toFixed(1);
    }
    
    this.element.textContent = displayValue;
  }
}

// Gestión global de contadores
const CounterManager = {
  counters: [],
  
  init() {
    // Buscar todos los elementos con clase counter
    document.querySelectorAll('[data-counter]').forEach(element => {
      const target = element.getAttribute('data-counter');
      const duration = element.getAttribute('data-duration') || 2000;
      
      const counter = new Counter(element, target, duration);
      this.counters.push({
        element,
        counter,
        triggered: false
      });
    });
    
    // Usar Intersection Observer para activar contadores al scroll
    this.setupIntersectionObserver();
    console.log(`✅ ${this.counters.length} contadores inicializados`);
  },
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counterObj = this.counters.find(c => c.element === entry.target);
          if (counterObj && !counterObj.triggered) {
            counterObj.counter.start();
            counterObj.triggered = true;
            observer.unobserve(entry.target);
          }
        }
      });
    }, {
      threshold: 0.5
    });
    
    this.counters.forEach(({ element }) => {
      observer.observe(element);
    });
  }
};

// Inicializar contadores cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  CounterManager.init();
});

// Exportar para uso global
window.CounterManager = CounterManager;
window.Counter = Counter;
