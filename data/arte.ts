export const historia = [
  {
    id: 'HIS001',
    nombre: 'Origen del nombre',
    fecha: 'Época indígena',
    descripcion: 'El nombre proviene de la lengua indígena Quillacinga y se deriva de la palabra chachaví, que se traduce como "tierra de aguas buenas". Esta toponimia hace referencia a la riqueza hidrográfica de la zona, que incluye ríos como el Pasto y Juanambú.',
    imagen: '/images/historia/HIS001.jpg',
  },
  {
    id: 'HIS002',
    nombre: 'Aeropuerto Antonio Nariño',
    fecha: '1960',
    descripcion: 'El Aeropuerto Antonio Nariño es la principal terminal aérea del departamento de Nariño, ubicada en Chachagüí, conectando la región con diferentes ciudades del país.',
    imagen: '/images/historia/HIS002.jpg',
  },
  {
    id: 'HIS003',
    nombre: 'Corredor Panamericano',
    fecha: '',
    descripcion: 'Ruta estratégica nacional que atraviesa el municipio conectando el sur del país.',
    imagen: '/images/historia/HIS003.jpg',
  },
  {
    id: 'HIS004',
    nombre: 'Casona de Pasizara',
    fecha: '',
    descripcion: 'Próximamente.',
    imagen: '/images/historia/HIS004.jpg',
  },
  {
    id: 'HIS005',
    nombre: 'Casona de Cimarrones',
    fecha: '',
    descripcion: 'Próximamente.',
    imagen: '/images/historia/HIS005.jpg',
  },
  {
    id: 'HIS006',
    nombre: 'Finca Loyola',
    fecha: '',
    descripcion: 'Construcción tradicional de gran valor histórico vinculada a la comunidad Jesuita. Con más de un siglo de antigüedad, representa el legado rural y religioso del territorio.',
    imagen: '/images/historia/HIS006.jpg',
  },
]

export const cultura = [
  {
    id: 'CUL001',
    nombre: 'Tejidos en fique',
    descripcion: 'Talleres artesanales tradicionales elaborados por mujeres de la comunidad.',
    imagen: '/images/cultura/CUL001.jpg',
  },
  {
    id: 'CUL002',
    nombre: 'Tradición campesina',
    descripcion: 'Vida rural y prácticas agrícolas tradicionales que definen la identidad del municipio.',
    imagen: '/images/cultura/CUL002.jpg',
  },
]

export const artesanias = [
  {
    id: 'ART001',
    nombre: 'Tejidos tradicionales',
    material: 'Fique',
    descripcion: 'Elementos elaborados en cabuya realizados por mujeres cabezas de familia.',
    artesano: 'Doña Marleny, Casabuy · Doña Luz',
    imagen: '/images/artesanias/ART001.jpg',
  },
  {
    id: 'ART002',
    nombre: 'Figuras talladas',
    material: 'Madera',
    descripcion: 'Elaboración artesanal local realizada por el Maestro Arturo Ibadango, oriundo del vecino país Ecuador.',
    artesano: 'Maestro Arturo Ibadango',
    imagen: '/images/artesanias/ART002.jpg',
  },
]

// Todos juntos para buscar por id fácilmente
export const todosArte = [
  ...historia.map(i => ({ ...i, subcategoria: 'Historia',    emoji: '🏛️', badge: i.fecha || 'Historia' })),
  ...cultura.map(i  => ({ ...i, subcategoria: 'Cultura',     emoji: '🎨', badge: 'Cultura',   material: '', artesano: '' })),
  ...artesanias.map(i => ({ ...i, subcategoria: 'Artesanías', emoji: '🏺', badge: i.material  })),
]