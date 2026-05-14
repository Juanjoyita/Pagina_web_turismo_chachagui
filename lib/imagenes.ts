/**
 * ============================================================================
 *  CONFIGURACIÓN DE IMÁGENES — fuente única
 * ============================================================================
 *
 *  Aquí se decide DE DÓNDE saca el sitio cada foto.
 *
 *  Para usar TUS PROPIAS FOTOS:
 *    1. Pon las fotos en  public/imagenes/[seccion]/[id]-[portada|01-04].jpg
 *       (ver  public/imagenes/[seccion]/README.txt  para el listado exacto)
 *    2. Cambia abajo:   USAR_FOTOS_LOCALES = true
 *    3. Listo: el sitio dejará de usar Unsplash y servirá tus fotos.
 *
 *  Mientras NO tengas todas las fotos, deja USAR_FOTOS_LOCALES = false  y el
 *  sitio mostrará las imágenes de referencia de Unsplash que ya están aquí
 *  como respaldo.
 *
 *  Si quieres ir reemplazando UNA por UNA: pon la foto local con el nombre
 *  correcto y en  FOTOS_UNSPLASH  cambia esa entrada concreta por su ruta
 *  local (ej.  '/imagenes/naturaleza/nat001-portada.jpg' ).
 * ============================================================================
 */

export const USAR_FOTOS_LOCALES = false

/** Devuelve la ruta local de la portada para una sección/ID dados. */
function rutaLocalPortada(seccion: string, id: string): string {
  return `/imagenes/${seccion}/${id.toLowerCase()}-portada.jpg`
}

/** Devuelve las 4 rutas locales de la galería para una sección/ID dados. */
function rutasLocalesGaleria(seccion: string, id: string): string[] {
  return [1, 2, 3, 4].map(
    (n) => `/imagenes/${seccion}/${id.toLowerCase()}-${String(n).padStart(2, '0')}.jpg`
  )
}

/**
 * URLs de Unsplash usadas mientras no tengas las fotos definitivas.
 *
 * Estructura por elemento:
 *   ID: [
 *     'URL portada',     ← imagen de la tarjeta resumen (cover)
 *     'URL galería 1',   ← primera foto del visor con lightbox
 *     'URL galería 2',
 *     'URL galería 3',
 *     'URL galería 4',
 *   ]
 *
 * Para reemplazar una foto puntual: cambia su URL por una ruta local como
 *   '/imagenes/naturaleza/nat001-portada.jpg'
 */
const FOTOS_UNSPLASH: Record<string, string[]> = {
  /* ============================================================
     NATURALEZA  — 11 lugares naturales del municipio
     ============================================================ */

  // NAT001 · Reserva Natural La Tebaida (vereda La Tebaida, El Convento)
  NAT001: [
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80&auto=format&fit=crop', // portada
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80&auto=format&fit=crop', // galería 1
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80&auto=format&fit=crop', // galería 2
    'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1600&q=80&auto=format&fit=crop', // galería 3
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&q=80&auto=format&fit=crop', // galería 4
  ],
  // NAT002 · Reserva Rosa de los Andes (sector rural Pasizara)
  NAT002: [
    '/imagenes/naturaleza/NAT002.png', // portada
    '/imagenes/naturaleza/NAT002-1.png', // galería 1
    '/imagenes/naturaleza/NAT002-2.png', // galería 2
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80&auto=format&fit=crop', // galería 3
    'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1600&q=80&auto=format&fit=crop', // galería 4
  ],
  // NAT003 · Bosque El Común (zona rural Pasizara)
  NAT003: [
    '/imagenes/naturaleza/NAT003.png', // portada
    '/imagenes/naturaleza/NAT003-1.png', // galería 1
    '/imagenes/naturaleza/NAT003-2.png', // galería 2
    '/imagenes/naturaleza/NAT003-3.png', // galería 3
    '/imagenes/naturaleza/NAT003-4.png', // galería 4
  ],
  // NAT004 · Reserva Comunitaria Matarredonda (vereda Portachuelo)
  NAT004: [
    '/imagenes/naturaleza/NAT004.png', // portada
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format&fit=crop', // galería 1
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80&auto=format&fit=crop', // galería 2
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80&auto=format&fit=crop', // galería 3
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop', // galería 4
  ],
  // NAT005 · Cascada La Diamantina (vereda Hato Viejo, finca Leche y Miel)
  NAT005: [
    '/imagenes/naturaleza/NAT005.png', // portada
    '/imagenes/naturaleza/NAT005-1.png', // galería 1
    '/imagenes/naturaleza/NAT005-2.png', // galería 2
    '/imagenes/naturaleza/NAT005-3.png', // galería 3
    'https://images.unsplash.com/photo-1467811884947-2ab06df4e1bb?w=1600&q=80&auto=format&fit=crop', // galería 4
  ],
  // NAT006 · Cerro El Cundur (corregimiento de Pasizara) — mirador natural
  NAT006: [
    '/imagenes/naturaleza/NAT006-portada.png',                                                       // portada (local)
    '/imagenes/naturaleza/NAT006-1.png',                                                             // galería 1 (local)
    '/imagenes/naturaleza/NAT006-2.png',                                                             // galería 2 (local)
    '/imagenes/naturaleza/NAT006-3.png',                                                             // galería 3 (local)
  ],
  // NAT007 · Cascadas de Merlo (Saladito Cimarrones, vereda Merlo)
  NAT007: [
    '/imagenes/naturaleza/NAT007.png', // portada
    'https://images.unsplash.com/photo-1467303085825-6e8acac84b8d?w=1600&q=80&auto=format&fit=crop', // galería 1
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1600&q=80&auto=format&fit=crop', // galería 2
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80&auto=format&fit=crop', // galería 3
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&q=80&auto=format&fit=crop', // galería 4
  ],
  // NAT009 · Sendero Ecológico La Pradera / Casabuy
  NAT009: [
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=1600&q=80&auto=format&fit=crop', // portada
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=1600&q=80&auto=format&fit=crop', // galería 1
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1600&q=80&auto=format&fit=crop', // galería 2
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=80&auto=format&fit=crop', // galería 3
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80&auto=format&fit=crop', // galería 4
  ],
  // NAT010 · Sendero Leche y Miel (vereda Hato Viejo)
  NAT010: [
    '/imagenes/naturaleza/NAT010.png', // portada
    'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=1600&q=80&auto=format&fit=crop', // galería 1
    'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1600&q=80&auto=format&fit=crop', // galería 2
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80&auto=format&fit=crop', // galería 3
    'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=1600&q=80&auto=format&fit=crop', // galería 4
  ],
  // NAT011 · Cascadas de Charmolán (reserva comunitaria Charmolán)
  NAT011: [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80&auto=format&fit=crop', // portada
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80&auto=format&fit=crop', // galería 1
    'https://images.unsplash.com/photo-1467303085825-6e8acac84b8d?w=1600&q=80&auto=format&fit=crop', // galería 2
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&q=80&auto=format&fit=crop', // galería 3
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1600&q=80&auto=format&fit=crop', // galería 4
  ],
  // NAT012 · Fincas cafeteras (El Convento, Sánchez, Matarredonda)
  NAT012: [
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80&auto=format&fit=crop', // portada
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80&auto=format&fit=crop', // galería 1
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80&auto=format&fit=crop', // galería 2
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1600&q=80&auto=format&fit=crop', // galería 3
    'https://images.unsplash.com/photo-1516224498413-84ecf3a1e7fd?w=1600&q=80&auto=format&fit=crop', // galería 4
  ],

  /* ============================================================
     DEPORTE Y AVENTURA  — 6 actividades del municipio
     ============================================================ */

  // AVEN001 · Parapente — desde el Cerro El Cundur (vista al valle)
  AVEN001: [
    '/imagenes/aventura/parapente/aven001.png', // portada
    '/imagenes/aventura/parapente/aven001-1.png', // galería 1
    '/imagenes/aventura/parapente/aven001-2.png', // galería 2
    'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=1600&q=80', // galería 3
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1600&q=80', // galería 4
  ],
  // AVEN002 · Ciclomontañismo (rutas Sánchez, Merlo, Pasizara, Casabuy)
  AVEN002: [
    '/imagenes/aventura/ciclomontanismo/AVEN002.png', // portada
    '/imagenes/aventura/ciclomontanismo/AVEN002-1.png', // galería 1
    '/imagenes/aventura/ciclomontanismo/AVEN002-2.png', // galería 2
    '/imagenes/aventura/ciclomontanismo/AVEN002-3.png', // galería 3
    '/imagenes/aventura/ciclomontanismo/AVEN002-4.png', // galería 4
  ],
  // AVEN003 · Senderismo / Hiking (sendero Casabuy, finca Leche y Miel)
  AVEN003: [
    '/imagenes/aventura/senderismo/aven003.png', // portada
    '/imagenes/aventura/senderismo/aven003-1.png', // galería 1
    '/imagenes/aventura/senderismo/aven003-2.png', // galería 2
    '/imagenes/aventura/senderismo/aven003-3.png', // galería 3
    '/imagenes/aventura/senderismo/aven003-4.png', // galería 4
  ],
  // AVEN004 · Recorridos a cascadas (cascada La Diamantina)
  AVEN004: [
    '/imagenes/aventura/cascadas/AVEN004.png', // portada
    '/imagenes/aventura/cascadas/AVEN004-1.png', // galería 1
    '/imagenes/aventura/cascadas/AVEN004-2.png', // galería 2
  ],
  // AVEN005 · Exploración de montaña (Cerro El Cundur, Matarredonda)
  AVEN005: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80', // portada
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80', // galería 1
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80', // galería 2
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&q=80', // galería 3
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80', // galería 4
  ],
  // AVEN006 · Avistamiento de aves (Reserva El Común, Rosa de los Andes)
  AVEN006: [
    '/imagenes/aventura/aves/aven006-4.png', // portada
    '/imagenes/aventura/aves/aven006-2.png', // galería 1
    '/imagenes/aventura/aves/aven006-3.png', // galería 2
    '/imagenes/aventura/aves/aven006-5.png', // galería 3
    '/imagenes/aventura/aves/aven006-6.png', // galería 4
  ],

  /* ============================================================
     GASTRONOMÍA  — 7 platos típicos del municipio
     ============================================================ */

  // GAS001 · Arepas de choclo (maíz tierno, horneadas)
  GAS001: [
    '/imagenes/gastronomia/GAS001.png',                                         // portada (local)
    '/imagenes/gastronomia/GAS001-1.png',                                       // galería 1 (local)
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1600&q=80', // galería 2
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1600&q=80',    // galería 3
  ],
  // GAS002 · La Boda (sopa tradicional con envueltos de maíz)
  GAS002: [
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=1600&q=80', // portada
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=1600&q=80', // galería 1
    'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=1600&q=80', // galería 2
    'https://images.unsplash.com/photo-1567337710282-00832b415979?w=1600&q=80', // galería 3
    'https://images.unsplash.com/photo-1578366930709-9daad3d92c18?w=1600&q=80', // galería 4
  ],
  // GAS003 · Heladería artesanal (helados de frutas locales)
  GAS003: [
    '/imagenes/gastronomia/GAS003-1.png',                                         // portada (local)
    '/imagenes/gastronomia/GAS003.png',                                       // galería 1 (local)
    'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1600&q=80', // galería 2
    'https://images.unsplash.com/photo-1590080876351-99e5094ccba5?w=1600&q=80', // galería 3
    'https://images.unsplash.com/photo-1501574834228-39c5b3f5c90e?w=1600&q=80', // galería 4
  ],
  // GAS004 · Empanadas de añejo y harina (maíz fermentado, carne y papa)
  GAS004: [
    '/imagenes/gastronomia/GAS004.png',                                         // portada (local)
    '/imagenes/gastronomia/GAS004-1.png',                                       // galería 1 (local)
    '/imagenes/gastronomia/GAS004-2.png',                                       // galería 2 (local)
    '/imagenes/gastronomia/GAS004-3.png',                                       // galería 3 (local)
    'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=1600&q=80', // galería 4
  ],
  // GAS005 · El Cuy asado (plato típico, acompañado con papas y maíz)
  GAS005: [
    '/imagenes/gastronomia/GAS005.png',                                         // portada (local)
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80', // galería 1
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&q=80',    // galería 2
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1600&q=80', // galería 3
    'https://images.unsplash.com/photo-1558030006-450675393462?w=1600&q=80',    // galería 4
  ],
  // GAS007 · Buñuelos de harina (Finca Leche y Miel · con miel y cuajada)
  GAS007: [
    '/imagenes/gastronomia/GAS007-1.png',                                         // portada (local)
    '/imagenes/gastronomia/GAS007.png',    // galería 1
    '/imagenes/gastronomia/GAS007-2.png', // galería 2
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1600&q=80', // galería 3
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80', // galería 4
  ],
  // GAS008 · Tacacho (vereda La Pradera, Casabuy · plátano + mole + arroz)
  GAS008: [
    '/imagenes/gastronomia/GAS008.png',                                         // portada (local)
    '/imagenes/gastronomia/GAS008-2.png',                                       // galería 1 (local)
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1600&q=80', // galería 2
    'https://images.unsplash.com/photo-1574484284002-952d92456975?w=1600&q=80', // galería 3
    'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=1600&q=80',    // galería 4
  ],

  /* ============================================================
     ARTE Y CULTURA  — Historia (HIS), Cultura (CUL) y Artesanías (ART)
     ============================================================ */

  // HIS001 · Origen del nombre — "Chachagüí, tierra de aguas buenas"
  HIS001: [
    '/imagenes/historia/HIS001.png', // portada
    '/imagenes/historia/HIS001-2.png', // galería 1
    '/imagenes/historia/HIS001-3.png', // galería 2
  ],
  // HIS002 · Aeropuerto Antonio Nariño (1960 · principal acceso aéreo a Nariño)
  HIS002: [
    '/imagenes/historia/HIS002-1.png', // portada
    '/imagenes/historia/HIS002.png', // galería 1 
  ],
  // HIS003 · Corredor Panamericano (vía continental que cruza Chachagüí)
  HIS003: [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80', // portada
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80', // galería 1
    'https://images.unsplash.com/photo-1502920514313-52581002a659?w=1600&q=80', // galería 2
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=80', // galería 3
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80', // galería 4
  ],
  // HIS004 · Casonas de Pasizara, Cimarrones y Sánchez (arquitectura rural)
  HIS004: [
    '/imagenes/historia/HIS004.png', // portada
    '/imagenes/historia/HIS004-1.png', // galería 1
    '/imagenes/historia/HIS004-2.png', // galería 2
    '/imagenes/historia/HIS004-3.png', // galería 3
    '/imagenes/historia/HIS004-4.png', // galería 4
  ],
  // HIS006 · Finca Loyola (tradición cafetera de más de un siglo)
  HIS006: [
    '/imagenes/historia/HIS006.png', // portada
    '/imagenes/historia/HIS006-1.png', // galería 1
    '/imagenes/historia/HIS006-2.png', // galería 2
    '/imagenes/historia/HIS006-3.png', // galería 3
    '/imagenes/historia/HIS006-4.png', // galería 4
  ],
  // HIS007 · Puente Calicanto El Diablo (entre Pasizara y Cimarrones)
  HIS007: [
    '/imagenes/historia/HIS007.png', // portada
    '/imagenes/historia/HIS007-1.png', // galería 1
  ],
  // CUL001 · Tejidos en fique (talleres artesanales tradicionales)
  CUL001: [
    '/imagenes/arte-cultura/artesanias/art001.png', // portada
    '/imagenes/arte-cultura/artesanias/art001-1.png', // galería 1
  ],
  // CUL002 · Tradición campesina (vida rural y prácticas agrícolas)
  CUL002: [
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80', // portada
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80', // galería 1
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80', // galería 2
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80', // galería 3
    'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=1600&q=80', // galería 4
  ],
  // ART001 · Artesanías en fique (Doña Marleny — Casabuy · Doña Luz)
  ART001: [
    '/imagenes/arte-cultura/artesanias/art001.png', // portada
    '/imagenes/arte-cultura/artesanias/art001-1.png', // galería 1
    '/imagenes/arte-cultura/artesanias/art001-2.png', // galería 2
  ],
  // ART002 · Figuras talladas en madera (Maestro Arturo Ibadango)
  ART002: [
    'https://images.unsplash.com/photo-1599631438215-75bc2640feb8?w=1600&q=80', // portada
    'https://images.unsplash.com/photo-1599631438215-75bc2640feb8?w=1600&q=80', // galería 1
    'https://images.unsplash.com/photo-1610561081960-8d0d9b2eec77?w=1600&q=80', // galería 2
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80', // galería 3
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1600&q=80', // galería 4
  ],

  /* ============================================================
     FESTIVIDADES  — eventos anuales del municipio
     ============================================================ */

  // FES001 · Festival de Cometas y Muestras Campesinas (Agosto)
  FES001: [
    '/imagenes/festividades/cometas/FES001.png', // portada
    '/imagenes/festividades/cometas/FES001-1.png', // galería 1
    '/imagenes/festividades/cometas/FES001-2.png', // galería 2
    '/imagenes/festividades/cometas/FES001-3.png', // galería 3
    '/imagenes/festividades/cometas/FES001-4.png', // galería 4
  ],
  // FES002 · Fiestas Patronales en honor a la Virgen de Fátima (Mayo)
  FES002: [
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80', // portada
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80', // galería 1
    'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1600&q=80', // galería 2
    'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1600&q=80', // galería 3
    'https://images.unsplash.com/photo-1526383281230-b9d164bbcd95?w=1600&q=80', // galería 4
  ],
  // FES003 · Carnaval de Negros y Blancos (Enero)
  FES003: [
    '/imagenes/festividades/carnaval/FES003.png', // portada
    '/imagenes/festividades/carnaval/FES003-1.png', // galería 1
    '/imagenes/festividades/carnaval/FES003-3.png', // galería 2
    '/imagenes/festividades/carnaval/FES003-4.png', // galería 3
    '/imagenes/festividades/carnaval/FES003-5.png', // galería 4
  ],

  // FES004 · Semana Santa (Marzo – Abril)
  FES004: [
    'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1600&q=80', // portada
    'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1600&q=80', // galería 1
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&q=80', // galería 2
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80', // galería 3
    'https://images.unsplash.com/photo-1526383281230-b9d164bbcd95?w=1600&q=80', // galería 4
  ],

  /* ============================================================
     PRESTADORES TURÍSTICOS  — 7 prestadores del municipio
     ============================================================ */

  // PRE001 · Finca Leche y Miel (vereda Hato Viejo — naturaleza, café, cascada)
  PRE001: [
    '/imagenes/prestadores/finca_leche_miel/PRE001.png',                                                               // portada (reutiliza cascada)
    '/imagenes/prestadores/finca_leche_miel/PRE001-1.png',                     // galería 1
    '/imagenes/prestadores/finca_leche_miel/PRE001-3.png',                     // galería 2
    '/imagenes/prestadores/finca_leche_miel/PRE001-4.png',                     // galería 3
  ],
  // PRE002 · Las Palmas Campestre (piscina, río, naturaleza)
  PRE002: [
    '/imagenes/prestadores/las_palmas/PRE002.png',                     // portada
    '/imagenes/prestadores/las_palmas/PRE002-1.png',                     // galería 1
    '/imagenes/prestadores/las_palmas/PRE002-2.png',                     // galería 2
    '/imagenes/prestadores/las_palmas/PRE002-3.png',                     // galería 3
    '/imagenes/prestadores/las_palmas/PRE002-4.png',  
    '/imagenes/prestadores/las_palmas/PRE002-5.png',                     
    '/imagenes/prestadores/las_palmas/PRE002-6.png',                     
    '/imagenes/prestadores/las_palmas/PRE002-7.png'                                        // galería 4
  ],
  // PRE003 · Hotel Padua (jardines, cabañas, calma rural)
  PRE003: [
    '/imagenes/prestadores/hotel_padua/PRE003.png',                     // portada
    '/imagenes/prestadores/hotel_padua/PRE003-1.png',                     // galería 1
    '/imagenes/prestadores/hotel_padua/PRE003-2.png',                     // galería 2
    '/imagenes/prestadores/hotel_padua/PRE003-3.png',                     // galería 3
    '/imagenes/prestadores/hotel_padua/PRE003-4.png',                     // galería 4
  ],
  // PRE004 · La Gran Estancia (piscinas, zonas verdes, eventos)
  PRE004: [
    '/imagenes/prestadores/gran_estancia/PRE004.png',                     // portada
    '/imagenes/prestadores/gran_estancia/PRE004-1.png',                     // portada
    '/imagenes/prestadores/gran_estancia/PRE004-2.png',                     // galería 1
    '/imagenes/prestadores/gran_estancia/PRE004-3.png',                     // galería 2
    '/imagenes/prestadores/gran_estancia/PRE004-4.png',                     // galería 3
    '/imagenes/prestadores/gran_estancia/PRE004-5.png',   
    '/imagenes/prestadores/gran_estancia/PRE004-6.png'                  // galería 4
  ],
  // PRE005 · Charmolán (mirador, aves, paisaje rural)
  PRE005: [
    '/imagenes/prestadores/charmolan/PRE005.png',                     // portada
    '/imagenes/prestadores/charmolan/PRE005-1.png',                     // galería 1
    '/imagenes/prestadores/charmolan/PRE005-2.png',                     // galería 2                   
  ],
  // PRE006 · Matarredonda (café, aves, senderos, bosque)
  PRE006: [
    '/imagenes/prestadores/matarredonda/PRE006.png',                     // portada
    '/imagenes/prestadores/matarredonda/PRE006-1.png',                     // galería 1
  ],
  // PRE007 · Jardín Botánico Health Garden (plantas medicinales, bienestar)
  PRE007: [
    '/imagenes/prestadores/jardin/PRE007.png',                     // portada
    '/imagenes/prestadores/jardin/PRE007-1.png',                     // galería 1
    '/imagenes/prestadores/jardin/PRE007-2.png',                     // galería 2
    '/imagenes/prestadores/jardin/PRE007-3.png',                     // galería 3                 
    
  ],
}

/**
 * Devuelve la portada (1 foto) para un elemento.
 * Uso:  imgPortada('naturaleza', 'NAT001')
 */
export function imgPortada(seccion: string, id: string): string {
  if (USAR_FOTOS_LOCALES) return rutaLocalPortada(seccion, id)
  return FOTOS_UNSPLASH[id]?.[0] ?? ''
}

/**
 * Devuelve la galería completa (5 fotos: portada + 4 detalles) para un elemento.
 * Uso:  imgGaleria('naturaleza', 'NAT001')
 */
export function imgGaleria(seccion: string, id: string): string[] {
  if (USAR_FOTOS_LOCALES) {
    return [rutaLocalPortada(seccion, id), ...rutasLocalesGaleria(seccion, id)]
  }
  return FOTOS_UNSPLASH[id] ?? []
}

/* ============================================================
   HERO  — carrusel de la portada principal del sitio
   2 videos + 4 imágenes que rotan en bucle
   ============================================================ */

const HERO_UNSPLASH = {
  // Video 1 — Naturaleza y paisajes (cascadas, ríos, niebla)
  v01: {
    video:  '/imagenes/hero/hero-v01.mp4', // video local (no se encuentra uno adecuado en Unsplash)
    poster: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1600&q=80&auto=format&fit=crop',
  },
  // Video 2 — Bosque andino (sendero, copas de árboles)
  v02: {
    video:  '/imagenes/hero/hero-v02.mp4', // video local (no se encuentra uno adecuado en Unsplash)
    poster: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80&auto=format&fit=crop',
  },
  // Imagen 1 — Aventura (senderismo / parapente / ciclismo)
  i01: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format&fit=crop',
  // Imagen 2 — Gastronomía (mesa servida con platos típicos)
  i02: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&auto=format&fit=crop',
  // Imagen 3 — Rutas turísticas (camino rural panorámico)
  i03: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop',
  // Imagen 4 — Cultura y tradición (festival, gente celebrando)
  i04: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80&auto=format&fit=crop',
}

export function heroVideo(num: 1 | 2): { video: string; poster: string } {
  if (USAR_FOTOS_LOCALES) {
    return {
      video:  `/imagenes/hero/hero-v${String(num).padStart(2, '0')}.mp4`,
      poster: `/imagenes/hero/hero-v${String(num).padStart(2, '0')}-poster.jpg`,
    }
  }
  return HERO_UNSPLASH[`v${String(num).padStart(2, '0')}` as 'v01' | 'v02']
}

export function heroImagen(num: 1 | 2 | 3 | 4): string {
  if (USAR_FOTOS_LOCALES) {
    return `/imagenes/hero/hero-i${String(num).padStart(2, '0')}.jpg`
  }
  return HERO_UNSPLASH[`i${String(num).padStart(2, '0')}` as 'i01' | 'i02' | 'i03' | 'i04']
}
