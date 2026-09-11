/**
 * INGENIO E INNOVACIÓN COMERCIAL S.A.S.
 * Lógica de interacción, navegación y contacto
 * Teléfono Oficial: +57 3181278259
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initContactForm();
});

/* ==========================================================================
   1. Navbar & Navegación Móvil
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky blur al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle menú responsive
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar al pulsar cualquier enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   2. Animaciones de Revelación al Scroll
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('is-revealed'));
  }
}

/* ==========================================================================
   3. Formulario de Contacto Directo
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
      alert('Por favor diligencia tu nombre y número de contacto.');
      return;
    }

    const compiledMessage = 
      `*Consulta Web - INGENIO E INNOVACIÓN COMERCIAL S.A.S.*\n` +
      `👤 *Nombre:* ${name}\n` +
      `📞 *Teléfono:* ${phone}\n` +
      `✉️ *Correo:* ${email || 'No especificado'}\n` +
      `🏷️ *Servicio:* ${service}\n` +
      `📝 *Mensaje:* ${message || 'Solicitud de asesoría inmobiliaria personalizada'}`;

    // Redirección oficial al WhatsApp corporativo: +57 3181278259
    const whatsappUrl = `https://wa.me/573181278259?text=${encodeURIComponent(compiledMessage)}`;
    window.open(whatsappUrl, '_blank');
    form.reset();
  });
}
