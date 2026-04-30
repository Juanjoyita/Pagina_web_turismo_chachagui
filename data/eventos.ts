import { imgPortada, imgGaleria } from '@/lib/imagenes'

export const eventos = [
  {
    id: 'FES001',
    slug: 'festival-de-cometas',
    titulo: 'Festival de Cometas',
    tituloCorto: 'Festival de Cometas',
    tituloCompleto: 'Festival de Cometas y Muestras Campesinas: expresiones del campo en movimiento',
    fecha: 'Agosto',
    fechaCompleta: 'Agosto · Anual',
    descripcion:
      'Un encuentro donde el cielo y el campo se convierten en escenario de tradición, cultura y vida rural.',
    descripcionCompleta:
      'Durante este festival, el territorio se transforma en un espacio donde lo rural se hace visible.\n\nLas cometas llenan el cielo, mientras en tierra se comparten saberes, productos y tradiciones propias del campo. La gastronomía, las muestras campesinas y las actividades culturales hacen parte de un encuentro que refleja la vida cotidiana del entorno rural.\n\nEs una forma de reconocer y valorar lo que hace parte del territorio.',
    emoji: '🪁',
    imagen: imgPortada('festividades', 'FES001'),
    imagenes: imgGaleria('festividades', 'FES001'),
    lugar: 'Chachagüí',
    duracion: 'Agosto',
    actividades: ['Vuelo de cometas', 'Muestras campesinas', 'Gastronomía local', 'Actividades culturales'],
  },
  {
    id: 'FES002',
    slug: 'fiestas-virgen-de-fatima',
    titulo: 'Fiestas en honor a la Virgen de Fátima',
    tituloCorto: 'Fiestas en honor a la Virgen de Fátima',
    tituloCompleto: 'Fiestas de la Virgen de Fátima: tradición que se vive en comunidad',
    fecha: 'Mayo',
    fechaCompleta: 'Mayo · Fiestas patronales',
    descripcion:
      'Una celebración donde la fe y la tradición crean espacios de encuentro que hacen parte de la vida en Chachagüí.',
    descripcionCompleta:
      'En Chachagüí, la celebración de la Virgen de Fátima marca uno de los momentos más significativos del año.\n\nDurante estos días, la fe se mezcla con la vida cotidiana, generando espacios donde la comunidad se reúne, comparte y mantiene vivas sus tradiciones. Las calles, los encuentros y las expresiones culturales reflejan una conexión que va más allá de lo religioso.\n\nEs una celebración que, con el tiempo, se ha convertido en parte esencial de la identidad del municipio.',
    emoji: '⛪',
    imagen: imgPortada('festividades', 'FES002'),
    imagenes: imgGaleria('festividades', 'FES002'),
    lugar: 'Casco urbano de Chachagüí',
    duracion: 'Varios días',
    actividades: ['Actos religiosos', 'Eventos culturales', 'Participación comunitaria', 'Procesiones'],
  },
  {
    id: 'FES003',
    slug: 'feria-frutas-y-flores',
    titulo: 'Feria de las Frutas y las Flores',
    tituloCorto: 'Feria de las frutas y las flores',
    tituloCompleto: 'Feria de la Fruta y las Flores: donde el color y el sabor se reúnen',
    fecha: 'Enero',
    fechaCompleta: 'Enero · Anual',
    descripcion:
      'Una celebración donde el color, los sabores y la producción del campo toman protagonismo en el territorio.',
    descripcionCompleta:
      'La Feria de la Fruta y las Flores reúne en un solo espacio la riqueza agrícola de Chachagüí.\n\nDurante su desarrollo, los productos del campo, los colores y las expresiones culturales se convierten en parte del paisaje, reflejando el vínculo entre el territorio y su vocación agrícola.\n\nEs un momento en el que lo que se cultiva, se transforma y se comparte adquiere un significado colectivo dentro del municipio.',
    emoji: '🌸',
    imagen: imgPortada('festividades', 'FES003'),
    imagenes: imgGaleria('festividades', 'FES003'),
    lugar: 'Chachagüí',
    duracion: 'Enero',
    actividades: ['Muestra agrícola', 'Exhibición de flores', 'Gastronomía', 'Actividades culturales'],
  },
]

export const calendarioEventos = [
  { mes: 'Ene', evento: 'Frutas y Flores' },
  { mes: 'May', evento: 'Virgen de Fátima' },
  { mes: 'Ago', evento: 'Festival de Cometas' },
]
