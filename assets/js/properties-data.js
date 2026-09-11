/**
 * INGENIO E INNOVACIÓN COMERCIAL S.A.S.
 * Arquitectura de Datos para Catálogo Inmobiliario
 * 
 * Estructura estándar para conexión de inventario real:
 * {
 *   id: string,
 *   title: string,
 *   category: 'comprar' | 'arrendar' | 'invertir',
 *   location: string,
 *   image: string,
 *   price: string | null, // Formateado o null si es confidencial
 *   area: string,         // e.g. "140 m²"
 *   bedrooms: number | null,
 *   bathrooms: number | null,
 *   status: string,       // e.g. "Disponible", "En Gestión", "Exclusiva"
 *   description: string,
 *   featured: boolean
 * }
 */

// Repositorio de propiedades en memoria
// NOTA OFICIAL: Se mantiene la estructura lista para recibir el inventario verificado de la empresa.
const PROPERTIES_CATALOG = [
  /* Los inmuebles verificados de la firma se incorporan en este arreglo */
];

/**
 * Obtener propiedades con filtro opcional de categoría
 * @param {string} category - 'todos' | 'comprar' | 'arrendar' | 'invertir'
 * @returns {Array} Listado de propiedades
 */
function getPropertiesByCategory(category = 'todos') {
  if (category === 'todos') {
    return PROPERTIES_CATALOG;
  }
  return PROPERTIES_CATALOG.filter(item => item.category.toLowerCase() === category.toLowerCase());
}

/**
 * Renderizador de tarjeta de propiedad según arquitectura de datos
 * @param {Object} prop - Objeto con el esquema oficial
 * @returns {string} Markup HTML
 */
function createPropertyCardHTML(prop) {
  const priceDisplay = prop.price ? prop.price : 'Consultar Valor';
  const specs = [];
  if (prop.area) specs.push(`<span>📐 ${prop.area}</span>`);
  if (prop.bedrooms) specs.push(`<span>🛏️ ${prop.bedrooms} Hab</span>`);
  if (prop.bathrooms) specs.push(`<span>🚿 ${prop.bathrooms} Baños</span>`);

  return `
    <article class="property-card" data-reveal="zoom">
      <div class="property-img-wrap">
        <img src="${prop.image || 'assets/images/hero-banner.jpg'}" alt="${prop.title}" class="property-img" loading="lazy">
        <span class="property-badge">${prop.category.toUpperCase()}</span>
        <span class="property-status-tag">${prop.status || 'Disponible'}</span>
      </div>
      <div class="property-body">
        <div class="property-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${prop.location}
        </div>
        <h3 class="property-title">${prop.title}</h3>
        <p class="property-desc">${prop.description}</p>
        <div class="property-specs">
          ${specs.join('')}
        </div>
        <div class="property-footer">
          <span style="font-weight: 700; color: var(--color-primary);">${priceDisplay}</span>
          <a href="https://wa.me/573206799857?text=Hola,%20solicito%20información%20sobre:%20${encodeURIComponent(prop.title)}" target="_blank" rel="noopener noreferrer" class="property-cta-btn">
            Consultar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>
    </article>
  `;
}
