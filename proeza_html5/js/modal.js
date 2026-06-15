/* ================================================================
   MODALES - modal.js
   Abrir/cerrar smooth, backdrop blur, vanilla JS
   ================================================================ */

class Modal {
  constructor(triggerId, modalId) {
    this.trigger = document.getElementById(triggerId);
    this.modal = document.getElementById(modalId);
    this.closeBtn = this.modal?.querySelector('.modal-close');
    
    if (!this.trigger || !this.modal) return;
    
    this.init();
  }
  
  init() {
    // Abrir modal
    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.open();
    });
    
    // Cerrar modal
    this.closeBtn?.addEventListener('click', () => this.close());
    
    // Cerrar al hacer click en el backdrop
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }
  
  open() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('📂 Modal abierto');
  }
  
  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    console.log('📂 Modal cerrado');
  }
  
  toggle() {
    if (this.modal.classList.contains('active')) {
      this.close();
    } else {
      this.open();
    }
  }
}

// Gestión global de modales
const ModalManager = {
  modals: {},
  
  register(triggerId, modalId) {
    this.modals[modalId] = new Modal(triggerId, modalId);
  },
  
  registerAll() {
    document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
      const modalId = trigger.getAttribute('data-modal-trigger');
      const triggerId = trigger.id;
      if (triggerId && modalId) {
        this.register(triggerId, modalId);
      }
    });
  },
  
  openModal(modalId) {
    this.modals[modalId]?.open();
  },
  
  closeModal(modalId) {
    this.modals[modalId]?.close();
  },
  
  closeAll() {
    Object.values(this.modals).forEach(modal => modal.close());
  }
};

// Inicializar modales cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  ModalManager.registerAll();
  console.log('✅ Sistema de modales inicializado');
});

// Exportar para uso global
window.ModalManager = ModalManager;
