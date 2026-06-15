/* ================================================================
   FUNCIONES UTILITARIAS - utils.js
   Helpers para el proyecto
   ================================================================ */

// Utilidades generales
const Utils = {
  // Formatear números
  formatNumber(num) {
    return num.toLocaleString('es-BO');
  },
  
  // Formatear moneda
  formatCurrency(amount) {
    return new Intl.NumberFormat('es-BO', {
      style: 'currency',
      currency: 'BOB'
    }).format(amount);
  },
  
  // Formatear fecha
  formatDate(date) {
    return new Intl.DateTimeFormat('es-BO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  },
  
  // Obtener parámetro de URL
  getUrlParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  },
  
  // Establecer parámetro de URL
  setUrlParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.replaceState({}, '', url);
  },
  
  // Copiar al portapapeles
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('✅ Copiado al portapapeles');
    }).catch(() => {
      console.error('❌ Error al copiar');
    });
  },
  
  // Detectar dispositivo móvil
  isMobile() {
    return window.innerWidth <= 768;
  },
  
  // Detectar conexión lenta
  isSlowConnection() {
    if (navigator.connection) {
      const type = navigator.connection.effectiveType;
      return type === '2g' || type === '3g';
    }
    return false;
  },
  
  // Delay/Sleep promise
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  
  // Throttle function
  throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Scroll al elemento
  scrollToElement(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  },
  
  // Clase activa en navegación
  setActiveLink(selector) {
    document.querySelectorAll(selector).forEach(link => {
      link.classList.remove('active');
      if (link.href === window.location.href) {
        link.classList.add('active');
      }
    });
  }
};

// Calculadora financiera
const Calculator = {
  // Calcular cuota mensual
  calculateMonthlyPayment(principal, annualRate, months) {
    const monthlyRate = annualRate / 100 / 12;
    if (monthlyRate === 0) return principal / months;
    
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    return (principal * numerator) / denominator;
  },
  
  // Calcular interés total
  calculateTotalInterest(monthlyPayment, months, principal) {
    return (monthlyPayment * months) - principal;
  },
  
  // Calcular APR
  calculateAPR(monthlyPayment, principal, months) {
    // Usando método de Newton-Raphson (aproximación)
    let rate = 0.1;
    for (let i = 0; i < 100; i++) {
      const f = principal - (monthlyPayment * ((1 - Math.pow(1 + rate, -months)) / rate));
      const f_prime = (monthlyPayment * months * Math.pow(1 + rate, -(months + 1))) / rate - 
                     (monthlyPayment * (1 - Math.pow(1 + rate, -months))) / (rate * rate);
      rate = rate - f / f_prime;
    }
    return (rate * 12) * 100;
  },
  
  // Generar tabla de amortización
  generateAmortizationTable(principal, annualRate, months) {
    const monthlyRate = annualRate / 100 / 12;
    const monthlyPayment = this.calculateMonthlyPayment(principal, annualRate, months);
    const table = [];
    
    let remainingBalance = principal;
    
    for (let month = 1; month <= months; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      table.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      });
    }
    
    return table;
  }
};

// Validación de formularios
const Validator = {
  // Validar email
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  // Validar teléfono
  isValidPhone(phone) {
    const regex = /^[\d\s\-\+\(\)]+$/;
    return regex.test(phone) && phone.replace(/\D/g, '').length >= 7;
  },
  
  // Validar URL
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  // Validar campo requerido
  isRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  },
  
  // Validar longitud mínima
  minLength(value, min) {
    return value.toString().length >= min;
  },
  
  // Validar longitud máxima
  maxLength(value, max) {
    return value.toString().length <= max;
  }
};

// Exportar utilidades
window.Utils = Utils;
window.Calculator = Calculator;
window.Validator = Validator;

console.log('✅ Utilidades globales cargadas');
