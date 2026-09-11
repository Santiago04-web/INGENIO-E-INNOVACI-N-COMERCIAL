/**
 * INGENIO E INNOVACIÓN COMERCIAL S.A.S.
 * Main Application Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initIntentSelector();
  initCatalog();
  initNeedsSection();
  initContactForm();
  initModal();
});

/* ==========================================================================
   1. Navbar & Header Interactions
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   2. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/* ==========================================================================
   3. Buscador / Selector de Intención ("Encuentra lo que estás buscando")
   ========================================================================== */
function initIntentSelector() {
  const tabs = document.querySelectorAll('.intent-tab');
  const typeSelect = document.getElementById('intent-type');
  const locationSelect = document.getElementById('intent-location');
  const actionBtn = document.getElementById('intent-action-btn');

  const intentMessages = {
    comprar: "Hola, estoy interesado en comprar una propiedad en Medellín/Antioquia con Ingenio e Innovación Comercial S.A.S.",
    arrendar: "Hola, deseo arrendar una propiedad a través de Ingenio e Innovación Comercial S.A.S.",
    vender: "Hola, deseo vender un inmueble y requiero asesoría comercial y acompañamiento de corretaje.",
    avaluar: "Hola, requiero solicitar información y cotización para un avalúo inmobiliario profesional.",
    administrar: "Hola, estoy buscando administración profesional para mi bien inmueble con su firma.",
    invertir: "Hola, quiero recibir asesoría en oportunidades de inversión inmobiliaria patrimonial."
  };

  let currentIntent = 'comprar';

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentIntent = tab.getAttribute('data-intent');

      // Update button text and action
      updateIntentAction(currentIntent);
    });
  });

  function updateIntentAction(intent) {
    if (!actionBtn) return;
    const baseText = intentMessages[intent] || intentMessages.comprar;
    const selectedType = typeSelect ? typeSelect.value : '';
    const selectedLoc = locationSelect ? locationSelect.value : '';
    
    let finalQuery = baseText;
    if (selectedType) finalQuery += ` Tipo: ${selectedType}.`;
    if (selectedLoc) finalQuery += ` Sector preferido: ${selectedLoc}.`;

    actionBtn.href = `https://wa.me/573206799857?text=${encodeURIComponent(finalQuery)}`;
  }

  if (typeSelect) typeSelect.addEventListener('change', () => updateIntentAction(currentIntent));
  if (locationSelect) locationSelect.addEventListener('change', () => updateIntentAction(currentIntent));
}

/* ==========================================================================
   4. Catálogo de Propiedades ("Oportunidades Inmobiliarias")
   ========================================================================== */
function initCatalog() {
  const catalogContainer = document.getElementById('properties-catalog-container');
  const filterPills = document.querySelectorAll('.filter-pill');

  if (!catalogContainer) return;

  function renderList(category) {
    const list = getPropertiesByCategory(category);

    if (!list || list.length === 0) {
      // Estado arquitectónico de espera para catálogo oficial
      catalogContainer.innerHTML = `
        <div style="grid-column: 1 / -1; background: var(--color-stone-light); border: 1px solid var(--color-border); padding: 3.5rem 2.5rem; text-align: center; border-radius: 4px;" data-reveal="zoom">
          <div style="width: 56px; height: 56px; margin: 0 auto 1.2rem auto; background: var(--color-petroleum-soft); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--color-petroleum);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          </div>
          <h3 style="font-size: 1.4rem; margin-bottom: 0.6rem; color: var(--color-primary);">Gestión de Oportunidades Personalizadas</h3>
          <p style="max-width: 620px; margin: 0 auto 1.8rem auto; color: var(--color-graphite-muted); font-size: 0.95rem; line-height: 1.6;">
            En <strong>INGENIO E INNOVACIÓN COMERCIAL S.A.S.</strong> canalizamos inventario bajo estricto criterio de confidencialidad y análisis de mercado. Cuéntanos las especificaciones de la propiedad que buscas o deseas comercializar en Medellín y Antioquia.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="https://wa.me/573206799857?text=Hola,%20deseo%20consultar%20oportunidades%20inmobiliarias%20disponibles" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              Consultar Oportunidades Disponibles
            </a>
            <a href="#contacto" class="btn btn-secondary btn-sm">
              Registrar Requerimiento
            </a>
          </div>
        </div>
      `;
      return;
    }

    catalogContainer.innerHTML = list.map(item => createPropertyCardHTML(item)).join('');
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-filter');
      renderList(cat);
    });
  });

  // Initial render
  renderList('todos');
}

/* ==========================================================================
   5. Sección "¿Qué Necesitas?" (6 Bloques Interactivos)
   ========================================================================== */
function initNeedsSection() {
  const needCards = document.querySelectorAll('.need-card');
  const intentMessages = {
    comprar: "Hola, me interesa recibir acompañamiento para COMPRAR una propiedad en Medellín o Antioquia con Ingenio e Innovación Comercial S.A.S.",
    vender: "Hola, tengo una propiedad que deseo VENDER y busco el acompañamiento y corretaje de Ingenio e Innovación Comercial S.A.S.",
    arrendar: "Hola, solicito asesoría en procesos de ARRENDAMIENTO de bienes inmuebles.",
    avaluar: "Hola, deseo solicitar información sobre un AVALÚO profesional de propiedad raíz.",
    administrar: "Hola, busco ADMINISTRACIÓN integral y profesional para mi inmueble.",
    proyecto: "Hola, requiero acompañamiento o consultoría para el desarrollo y gerencia de un PROYECTO de construcción u obras."
  };

  needCards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-need');
      const msg = intentMessages[type] || "Hola, deseo información general de sus soluciones inmobiliarias.";
      window.open(`https://wa.me/573206799857?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });
}

/* ==========================================================================
   6. Formulario de Contacto
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('corporate-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const service = document.getElementById('contact-service').value;
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !phone) {
      alert('Por favor completa al menos tu nombre y número de teléfono.');
      return;
    }

    const compiledMsg = `*Solicitud Web - Ingenio e Innovación Comercial S.A.S.*\n` +
      `👤 *Nombre:* ${name}\n` +
      `📞 *Teléfono:* ${phone}\n` +
      `✉️ *Correo:* ${email || 'No especificado'}\n` +
      `🏷️ *Servicio de interés:* ${service}\n` +
      `📝 *Mensaje:* ${message || 'Solicitud de contacto y asesoría'}`;

    // Abre WhatsApp oficial con el mensaje estructurado
    window.open(`https://wa.me/573206799857?text=${encodeURIComponent(compiledMsg)}`, '_blank');
    form.reset();
  });
}

/* ==========================================================================
   7. Modal Controller (Para términos / consultas)
   ========================================================================== */
function initModal() {
  const modalOverlay = document.getElementById('info-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modalOverlay || !closeBtn) return;

  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('open');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  });
}
