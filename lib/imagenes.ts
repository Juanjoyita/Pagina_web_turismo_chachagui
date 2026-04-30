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
 * Estructura: id → [portada, galería1, galería2, galería3, galería4]
 */
const FOTOS_UNSPLASH: Record<string, string[]> = {
  /* ---------------- Naturaleza ---------------- */
  NAT001: [
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&q=80&auto=format&fit=crop',
  ],
  NAT002: [
    'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1600&q=80&auto=format&fit=crop',
  ],
  NAT003: [
    'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511497584788-876760111969?w=1600&q=80&auto=format&fit=crop',
  ],
  NAT004: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop',
  ],
  NAT005: [
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1467303085825-6e8acac84b8d?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1467811884947-2ab06df4e1bb?w=1600&q=80&auto=format&fit=crop',
  ],
  NAT006: [
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&q=80&auto=format&fit=crop',
  ],
  NAT007: [
    'https://images.unsplash.com/photo-1467303085825-6e8acac84b8d?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1467303085825-6e8acac84b8d?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&q=80&auto=format&fit=crop',
  ],
  NAT009: [
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80&auto=format&fit=crop',
  ],
  NAT010: [
    'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=1600&q=80&auto=format&fit=crop',
  ],
  NAT011: [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1467303085825-6e8acac84b8d?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1600&q=80&auto=format&fit=crop',
  ],
  NAT012: [
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1600&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516224498413-84ecf3a1e7fd?w=1600&q=80&auto=format&fit=crop',
  ],

  /* ---------------- Aventura ---------------- */
  AVEN001: [
    'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=1600&q=80',
    'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=1600&q=80',
    'https://images.unsplash.com/photo-1528277342758-f1d7613d4d8e?w=1600&q=80',
    'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=1600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1600&q=80',
  ],
  AVEN002: [
    'https://images.unsplash.com/photo-1544191696-15693072e0b5?w=1600&q=80',
    'https://images.unsplash.com/photo-1544191696-15693072e0b5?w=1600&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&q=80',
    'https://images.unsplash.com/photo-1594942932583-d87c8abb9a14?w=1600&q=80',
    'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1600&q=80',
  ],
  AVEN003: [
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80',
    'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=1600&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
  ],
  AVEN004: [
    'https://images.unsplash.com/photo-1467890947394-8171244e5410?w=1600&q=80',
    'https://images.unsplash.com/photo-1467890947394-8171244e5410?w=1600&q=80',
    'https://images.unsplash.com/photo-1432889490240-84df33d47091?w=1600&q=80',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80',
    'https://images.unsplash.com/photo-1502209524164-acea936639a2?w=1600&q=80',
  ],
  AVEN005: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80',
  ],
  AVEN006: [
    'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1600&q=80',
    'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1600&q=80',
    'https://images.unsplash.com/photo-1555169062-013468b47731?w=1600&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80',
    'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=1600&q=80',
  ],

  /* ---------------- Gastronomía ---------------- */
  GAS001: [
    'https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=1600&q=80',
    'https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=1600&q=80',
    'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1600&q=80',
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1600&q=80',
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1600&q=80',
  ],
  GAS002: [
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=1600&q=80',
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=1600&q=80',
    'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=1600&q=80',
    'https://images.unsplash.com/photo-1567337710282-00832b415979?w=1600&q=80',
    'https://images.unsplash.com/photo-1578366930709-9daad3d92c18?w=1600&q=80',
  ],
  GAS003: [
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1600&q=80',
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1600&q=80',
    'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1600&q=80',
    'https://images.unsplash.com/photo-1590080876351-99e5094ccba5?w=1600&q=80',
    'https://images.unsplash.com/photo-1501574834228-39c5b3f5c90e?w=1600&q=80',
  ],
  GAS004: [
    'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=1600&q=80',
    'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=1600&q=80',
    'https://images.unsplash.com/photo-1601050690294-23d2cfbab4d8?w=1600&q=80',
    'https://images.unsplash.com/photo-1625944525533-473d883c4eb6?w=1600&q=80',
    'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=1600&q=80',
  ],
  GAS005: [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&q=80',
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1600&q=80',
    'https://images.unsplash.com/photo-1558030006-450675393462?w=1600&q=80',
  ],
  GAS006: [
    'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=1600&q=80',
    'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=1600&q=80',
    'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=1600&q=80',
    'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=1600&q=80',
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&q=80',
  ],

  /* ---------------- Historia / Cultura / Artesanías ---------------- */
  HIS001: [
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600&q=80',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&q=80',
    'https://images.unsplash.com/photo-1502657877623-f66bf489d236?w=1600&q=80',
  ],
  HIS002: [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80',
    'https://images.unsplash.com/photo-1540339832862-474599807836?w=1600&q=80',
    'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1600&q=80',
    'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1600&q=80',
  ],
  HIS003: [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80',
    'https://images.unsplash.com/photo-1502920514313-52581002a659?w=1600&q=80',
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=80',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80',
  ],
  HIS004: [
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1600&q=80',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1600&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&q=80',
  ],
  HIS006: [
    'https://images.unsplash.com/photo-1442411397262-cf701fcdc1d4?w=1600&q=80',
    'https://images.unsplash.com/photo-1442411397262-cf701fcdc1d4?w=1600&q=80',
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80',
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1600&q=80',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1600&q=80',
  ],
  HIS007: [
    'https://images.unsplash.com/photo-1467811884-5f6d1f2e2bb9?w=1600&q=80',
    'https://images.unsplash.com/photo-1467811884-5f6d1f2e2bb9?w=1600&q=80',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80',
  ],
  CUL001: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80',
    'https://images.unsplash.com/photo-1516646255117-f95d5e4b512a?w=1600&q=80',
    'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1600&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
  ],
  CUL002: [
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80',
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80',
    'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=1600&q=80',
  ],
  ART001: [
    'https://images.unsplash.com/photo-1606293459279-d9bb96a11d3d?w=1600&q=80',
    'https://images.unsplash.com/photo-1606293459279-d9bb96a11d3d?w=1600&q=80',
    'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1600&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80',
    'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1600&q=80',
  ],
  ART002: [
    'https://images.unsplash.com/photo-1599631438215-75bc2640feb8?w=1600&q=80',
    'https://images.unsplash.com/photo-1599631438215-75bc2640feb8?w=1600&q=80',
    'https://images.unsplash.com/photo-1610561081960-8d0d9b2eec77?w=1600&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1600&q=80',
  ],

  /* ---------------- Festividades ---------------- */
  FES001: [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80',
    'https://images.unsplash.com/photo-1530021232320-687d8e3dba54?w=1600&q=80',
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
  ],
  FES002: [
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80',
    'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1600&q=80',
    'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1600&q=80',
    'https://images.unsplash.com/photo-1526383281230-b9d164bbcd95?w=1600&q=80',
  ],
  FES003: [
    'https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=1600&q=80',
    'https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=1600&q=80',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1600&q=80',
    'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1600&q=80',
    'https://images.unsplash.com/photo-1502331538081-041522531548?w=1600&q=80',
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

/* ---------- Hero (videos + imágenes de la portada principal) ---------- */

const HERO_UNSPLASH = {
  v01: {
    video:  'https://videos.pexels.com/video-files/857134/857134-hd_1920_1080_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1600&q=80&auto=format&fit=crop',
  },
  v02: {
    video:  'https://videos.pexels.com/video-files/2491284/2491284-uhd_2732_1440_24fps.mp4',
    poster: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80&auto=format&fit=crop',
  },
  i01: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format&fit=crop',
  i02: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&auto=format&fit=crop',
  i03: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop',
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
