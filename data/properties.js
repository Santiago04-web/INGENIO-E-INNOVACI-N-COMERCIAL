/**
 * INGENIO E INNOVACIÓN COMERCIAL S.A.S.
 * Módulo de Datos: Catálogo Inmobiliario & Oportunidades
 * 
 * Esquema de datos preparado para integración con CRM / Backend / Inventario:
 * {
 *   id: string,
 *   title: string,
 *   location: string,
 *   type: string,          // Apartamento, Casa, Local, Lote, Bodega, etc.
 *   price: string | null,
 *   area: string,          // e.g. "120 m²"
 *   bedrooms: number | null,
 *   bathrooms: number | null,
 *   status: string,        // "Disponible", "En Gestión", "Exclusiva"
 *   description: string,
 *   image: string,
 *   featured: boolean
 * }
 */

// Inventario oficial verificado (vacío hasta incorporación por parte de la firma)
export const PROPERTIES_INVENTORY = [];

/**
 * Obtiene las propiedades según el filtro especificado
 * @param {string} filterType - Tipo o categoría
 * @returns {Array} Lista filtrada
 */
export function getProperties(filterType = 'all') {
  if (filterType === 'all') {
    return PROPERTIES_INVENTORY;
  }
  return PROPERTIES_INVENTORY.filter(item => 
    item.type.toLowerCase() === filterType.toLowerCase()
  );
}
