# Cómo personalizar el sitio (colores y tipografía)

Esta guía explica cómo cambiar los **colores** y las **fuentes** de todo el sitio editando solo uno o dos archivos.

---

## PARTE 1 · COLORES

Todos los colores están en **un solo archivo**:

```
app/globals.css
```

Cuando cambias un color ahí, se actualiza automáticamente en toda la página.

### Los colores que puedes cambiar

| Variable                    | Para qué se usa                                  | Valor actual |
|-----------------------------|--------------------------------------------------|--------------|
| `--color-verde-oscuro`      | Fondos oscuros, textos principales, encabezados  | `#1C2316`    |
| `--color-verde-claro`       | Botones, líneas, badges, color de acento         | `#CAD74B`    |
| `--color-verde-claro-hover` | Color del botón cuando pasas el cursor           | `#D8E25C`    |
| `--color-fondo`             | Fondo gris suave de las secciones                | `#F1F1F1`    |
| `--color-borde`             | Bordes beige de las tarjetas                     | `#E8E0D4`    |
| `--color-crema`             | Texto claro sobre fondos oscuros                 | `#FFF6E6`    |

### Cambiar un color — paso a paso

**Ejemplo: cambiar el verde claro a azul**

1. Elige tu nuevo color. Por ejemplo, azul: `#3B82F6`
2. Abre `app/globals.css`
3. Busca:

```css
--color-verde-claro:        #CAD74B;
--color-verde-claro-rgb:    202, 215, 75;
```

4. Reemplaza por:

```css
--color-verde-claro:        #3B82F6;
--color-verde-claro-rgb:    59, 130, 246;
```

5. Guarda y listo.

### Importante: cada color tiene dos formas

- La versión **HEX** (ej. `#CAD74B`) — para colores sólidos
- La versión **RGB** (ej. `202, 215, 75`) — para colores transparentes

**Si cambias uno, también tienes que cambiar el otro.** Convierte HEX a RGB aquí:
https://www.rapidtables.com/convert/color/hex-to-rgb.html

### Ejemplos correctos vs. incorrectos

```css
/* ✓ correcto */
--color-verde-claro:        #CAD74B;
--color-verde-claro-rgb:    202, 215, 75;

/* ✗ falta el # */
--color-verde-claro:        CAD74B;

/* ✗ no debe tener rgb() */
--color-verde-claro-rgb:    rgb(202, 215, 75);

/* ✗ no debe tener paréntesis */
--color-verde-claro-rgb:    (202, 215, 75);
```

---

## PARTE 2 · TIPOGRAFÍA (FUENTES)

Las fuentes funcionan de manera distinta a los colores. Hay **dos archivos** involucrados:

| Archivo                     | Para qué                                                                   |
|-----------------------------|----------------------------------------------------------------------------|
| `app/layout.tsx`            | **Aquí eliges qué fuente cargar** desde Google Fonts                       |
| `app/globals.css`           | Aquí se decide en qué partes del sitio se usa cada fuente (titulo/cuerpo)  |

### El sitio usa dos fuentes

| Variable          | Para qué se usa                          | Fuente actual |
|-------------------|------------------------------------------|---------------|
| `--font-titulo`   | Títulos H1, H2, H3, encabezados grandes  | Playfair Display |
| `--font-cuerpo`   | Párrafos, textos de UI, listas           | Raleway       |

### Cambiar una fuente — paso a paso

**Ejemplo: cambiar el título de Playfair a Merriweather**

**Paso 1 — Abrir `app/layout.tsx`**

Encuentra esta línea (línea 2):

```tsx
import { Playfair_Display, Raleway } from 'next/font/google'
```

Cámbiala por:

```tsx
import { Merriweather, Raleway } from 'next/font/google'
```

**Paso 2 — Cambiar la declaración (líneas 8-12)**

Encuentra:

```tsx
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})
```

Cámbialo a:

```tsx
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
})
```

**Paso 3 — Actualizar el `className` del `<body>` (línea 34)**

Cambia:

```tsx
className={`${playfair.variable} ${raleway.variable}`}
```

Por:

```tsx
className={`${merriweather.variable} ${raleway.variable}`}
```

**Paso 4 — Abrir `app/globals.css` y actualizar la variable**

Encuentra:

```css
--font-titulo:  var(--font-playfair),  Georgia, serif;
```

Cámbialo a:

```css
--font-titulo:  var(--font-merriweather),  Georgia, serif;
```

**Paso 5 — Guarda. Listo.** Todos los títulos del sitio (Hero, secciones, fichas) cambian automáticamente.

### Trucos para cambiar la fuente más rápido

Si quieres cambiar la fuente **sin renombrar nada**, basta con que la nueva fuente use el **mismo nombre de variable**:

En `app/layout.tsx`, mantén `variable: '--font-playfair'` aunque la fuente real sea otra:

```tsx
const titulo = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',  // ← deja el nombre viejo
  display: 'swap',
})
```

Y actualiza el className:

```tsx
className={`${titulo.variable} ${raleway.variable}`}
```

Con eso ya no necesitas tocar `globals.css` — el nombre de la variable sigue siendo el mismo, pero ahora apunta a otra fuente.

### ¿Dónde encuentro fuentes para usar?

Google Fonts: https://fonts.google.com — todas las que aparezcan ahí funcionan con Next.js.

**Combinaciones recomendadas para sitios turísticos:**

| Estilo            | Título               | Cuerpo            |
|-------------------|----------------------|-------------------|
| Elegante (actual) | Playfair Display     | Raleway           |
| Moderno minimal   | Inter                | Inter             |
| Editorial         | Merriweather         | Source Sans 3     |
| Cálido / artesanal| Cormorant Garamond   | Lato              |
| Estilo magazine   | Bodoni Moda          | Inter             |

### Cambiar solo el peso (negrita) sin cambiar la fuente

Si solo quieres que los títulos se vean más finos o más gordos, no necesitas tocar la fuente. En cualquier componente, busca el `fontWeight` y cámbialo:

- `fontWeight: 300` → muy fino
- `fontWeight: 400` → normal
- `fontWeight: 700` → negrita
- `fontWeight: 800` → muy negrita (actual)
- `fontWeight: 900` → ultra negrita

---

## Resumen

| Quiero cambiar...        | Edito                                              |
|--------------------------|----------------------------------------------------|
| Cualquier color          | `app/globals.css` (un solo archivo)                |
| Una fuente del sitio     | `app/layout.tsx` (lo principal) y opcionalmente `app/globals.css` |

Y todo el sitio se actualiza automáticamente.
