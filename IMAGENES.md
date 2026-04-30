# Cómo gestionar las imágenes y videos del sitio

El sitio está preparado para usar **una sola carpeta** donde dejas todas tus fotos y videos, organizados por sección. La aplicación las recoge automáticamente.

---

## La carpeta donde van todas tus fotos

```
public/imagenes/
├── hero/                ← Carrusel de la portada principal (videos + imágenes)
├── naturaleza/          ← Lugares naturales (11 lugares)
├── aventura/            ← Actividades de Deporte y Aventura (6 actividades)
├── gastronomia/         ← Platos típicos (6 platos)
├── arte-cultura/        ← Historia, Cultura y Artesanías (10 elementos)
└── festividades/        ← Eventos y festividades (3 eventos)
```

Cada subcarpeta tiene un archivo **`README.txt`** con la lista exacta de archivos esperados y los nombres correctos.

---

## La regla de los nombres

Cada elemento del sitio tiene un **ID** (ej. `NAT001`, `GAS003`, `AVEN002`). Sus 5 fotos siempre se nombran así:

```
[id-en-minúscula]-portada.jpg     ← La foto principal (tarjeta resumen)
[id-en-minúscula]-01.jpg          ← Galería - foto 1
[id-en-minúscula]-02.jpg          ← Galería - foto 2
[id-en-minúscula]-03.jpg          ← Galería - foto 3
[id-en-minúscula]-04.jpg          ← Galería - foto 4
```

**Ejemplos reales:**

```
public/imagenes/naturaleza/nat005-portada.jpg
public/imagenes/naturaleza/nat005-01.jpg
public/imagenes/naturaleza/nat005-02.jpg
public/imagenes/naturaleza/nat005-03.jpg
public/imagenes/naturaleza/nat005-04.jpg

public/imagenes/gastronomia/gas003-portada.jpg
public/imagenes/aventura/aven001-portada.jpg
```

### Hero (portada animada)

El Hero usa una nomenclatura distinta porque tiene videos:

```
hero-v01.mp4              ← Video 1 (Naturaleza/cascadas)
hero-v01-poster.jpg       ← Imagen estática del video 1
hero-v02.mp4              ← Video 2 (Bosque andino)
hero-v02-poster.jpg       ← Imagen estática del video 2
hero-i01.jpg              ← Imagen de Aventura
hero-i02.jpg              ← Imagen de Gastronomía
hero-i03.jpg              ← Imagen de Rutas turísticas
hero-i04.jpg              ← Imagen de Cultura y tradición
```

---

## El interruptor: `lib/imagenes.ts`

Hay un solo archivo que decide si el sitio usa **tus fotos locales** o las **imágenes de respaldo de Unsplash** que están actualmente:

```
lib/imagenes.ts
```

Al inicio del archivo verás esta línea:

```ts
export const USAR_FOTOS_LOCALES = false
```

| Valor   | Qué hace                                                                  |
|---------|---------------------------------------------------------------------------|
| `false` | El sitio sigue usando las imágenes de Unsplash (estado actual)            |
| `true`  | El sitio busca las fotos en `public/imagenes/` con los nombres explicados |

---

## Cómo cambiar al modo local — flujo recomendado

**Paso 1.** Tu empresa te entrega las fotos. Las descargas a tu computador.

**Paso 2.** Las renombras siguiendo las convenciones (`nat001-portada.jpg`, etc.) — los `README.txt` de cada subcarpeta tienen el listado completo.

**Paso 3.** Las arrastras a la subcarpeta correspondiente:

- Fotos de Naturaleza → `public/imagenes/naturaleza/`
- Fotos de Gastronomía → `public/imagenes/gastronomia/`
- Fotos de Aventura → `public/imagenes/aventura/`
- Fotos de Arte/Cultura/Historia → `public/imagenes/arte-cultura/`
- Fotos de Festividades → `public/imagenes/festividades/`
- Videos e imágenes del Hero → `public/imagenes/hero/`

**Paso 4.** Abres `lib/imagenes.ts` y cambias:

```ts
export const USAR_FOTOS_LOCALES = false   // ← cámbialo a true
```

por:

```ts
export const USAR_FOTOS_LOCALES = true
```

**Paso 5.** Guardas. Listo. Todo el sitio empieza a usar tus fotos.

---

## Cómo cambiar fotos UNA POR UNA (modo gradual)

Si quieres reemplazar las fotos de a poco a medida que las recibes, deja `USAR_FOTOS_LOCALES = false` y reemplaza cada URL de Unsplash en `lib/imagenes.ts` por su ruta local.

Por ejemplo, en `FOTOS_UNSPLASH`, busca:

```ts
NAT005: [
  'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1600&q=80&auto=format&fit=crop',
  // ...resto
],
```

Y reemplaza la URL con la ruta local de tu foto:

```ts
NAT005: [
  '/imagenes/naturaleza/nat005-portada.jpg',
  '/imagenes/naturaleza/nat005-01.jpg',
  '/imagenes/naturaleza/nat005-02.jpg',
  '/imagenes/naturaleza/nat005-03.jpg',
  '/imagenes/naturaleza/nat005-04.jpg',
],
```

Este modo te permite ir mezclando fotos locales y URLs externas mientras llegan las definitivas.

---

## ¿Qué pasa si una foto no existe?

Si dejas `USAR_FOTOS_LOCALES = true` y aún no has subido alguna foto, el navegador mostrará un ícono de imagen rota en ese lugar. Al subirla con el nombre correcto, aparece automáticamente sin necesidad de tocar el código.

---

## Resumen rápido

| Quiero…                              | Edito                              |
|--------------------------------------|------------------------------------|
| Saber qué fotos faltan en una sección | `public/imagenes/[seccion]/README.txt` |
| Activar las fotos locales            | `lib/imagenes.ts` → `USAR_FOTOS_LOCALES = true` |
| Reemplazar una foto puntual          | `lib/imagenes.ts` → cambia su URL en `FOTOS_UNSPLASH` |
| Ver qué nombres usa cada elemento    | El README de su subcarpeta         |

Con esto solo tienes que arrastrar y soltar tus fotos en la carpeta correcta, cambiar una línea, y el sitio entero se actualiza con tus imágenes.
