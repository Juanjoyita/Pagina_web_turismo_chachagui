# 🌿 Chachagüí Turismo — Panel de Administración de Imágenes

## ¿Qué hace el panel admin?

El panel en `/admin` permite gestionar las imágenes que aparecen en el sitio público sin tocar código. Desde ahí puedes subir fotos propias para reemplazar las imágenes originales de cada sección, ocultarlas temporalmente o restaurar las originales.

---

## ⚠️ Una cosa importante antes de empezar

**En el panel admin, la imagen que ves en cada slot es la imagen original del sistema** — la que tiene el sitio por defecto (puede venir de Unsplash o de la carpeta `public/imagenes/`). Eso es lo normal. Esa imagen original **no se puede ocultar ni gestionar desde el admin** porque no está registrada en la base de datos, simplemente es el fallback del código.

Las opciones de **Ocultar**, **Mostrar** y **Restaurar original** solo aparecen **después de que subes una imagen propia**. En ese momento el sistema guarda un registro en la base de datos y a partir de ahí sí puedes controlar esa foto.

Dicho de otra forma:

- **Imagen original (sin subir nada)** → se muestra en el sitio, no tiene controles en el admin
- **Imagen subida por ti** → puedes ocultarla, volverla a mostrar, o restaurar la original

---

## 🔄 Flujo normal de uso

### 1. Entrar al panel
Ve a `/admin/login` e ingresa la contraseña configurada en `.env.local` (`ADMIN_PASSWORD`).

### 2. Elegir sección e ítem
En la barra lateral elige la sección (Naturaleza, Aventura, Gastronomía, etc.) y luego haz clic en el elemento que quieres editar.

### 3. Ver las fotos del ítem
Verás dos bloques:
- **Foto de portada** — la que aparece en las tarjetas del listado y en el encabezado de la página de detalle
- **Galería** — las fotos que aparecen en el visor con lightbox dentro de la página de detalle

Cada slot muestra la imagen actual. Si no has subido nada, es la imagen original.

### 4. Subir una imagen propia
Haz clic sobre cualquier slot o arrastra una foto directamente encima. Formatos aceptados: JPG, PNG, WebP, AVIF.

En ese momento el archivo se guarda en `public/imagenes/[seccion]/` y se registra en la base de datos como **override** de ese slot. Verás que aparece el badge **✓ personalizada** en la cabecera del slot.

### 5. Opciones disponibles después de subir

Una vez que un slot tiene imagen propia, aparecen dos botones:

#### 🚫 Ocultar del sitio
Marca la imagen como no visible. El sitio deja de mostrarla pero el archivo **no se borra**. En el admin aparece en gris con el texto "No visible en el sitio". Útil si quieres sacar temporalmente una foto sin perderla.

#### 👁 Mostrar en sitio
Vuelve a activar una imagen que estaba oculta. La foto reaparece en el sitio inmediatamente.

#### ↩ Restaurar original
Elimina el registro de la base de datos para ese slot. El sitio vuelve a mostrar la imagen original del sistema. El archivo físico que subiste **no se borra del servidor** — queda en `public/imagenes/[seccion]/` pero el sitio deja de usarlo.

---

## 📍 Dónde aparece cada foto en el sitio

| Slot | Dónde se ve |
|---|---|
| **Portada (índice 0)** | Tarjeta en el listado de la sección, hero de la página de detalle |
| **Galería 1–4** | Visor con lightbox dentro de la página de detalle |

---

## 🗂️ Estructura de archivos

Las imágenes subidas desde el admin se guardan en:
```
public/
  imagenes/
    naturaleza/       ← fotos de Naturaleza
    aventura/         ← fotos de Aventura
    gastronomia/      ← fotos de Gastronomía
    arte-cultura/     ← fotos de Arte y Cultura
    festividades/     ← fotos de Festividades
    prestadores/      ← fotos de Servicios Turísticos
```

Los nombres de archivo siguen el patrón:
```
[id-del-item]-portada.jpg     ← portada (índice 0)
[id-del-item]-01.jpg          ← galería 1
[id-del-item]-02.jpg          ← galería 2
...
```

---

## 🛠️ Requisitos técnicos

### Variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:
```env
ADMIN_PASSWORD=tu-contraseña-aqui
SQLITE_PATH=./data/admin.db        # opcional, esta es la ruta por defecto
```

### Base de datos
El sistema usa SQLite a través de `better-sqlite3`. Si al intentar entrar al admin aparece un error relacionado con versiones de Node, ejecuta en la terminal:
```bash
npm rebuild better-sqlite3
```
Luego reinicia el servidor: `npm run dev`.

La base de datos se crea automáticamente en `data/admin.db` la primera vez que se usa. Si ya tenías una versión anterior sin el campo `visible`, la migración se aplica sola al arrancar.

---

## 🔁 ¿Por qué los cambios no se ven de inmediato en el sitio?

Next.js puede tener en caché las páginas generadas estáticamente. Si subes una imagen y no aparece en el sitio al instante, prueba:

1. **Recargar la página con Ctrl+Shift+R** (fuerza recarga sin caché del navegador)
2. Si estás en producción con `next build`, hay que hacer un nuevo build para que las páginas de detalle se regeneren con las imágenes nuevas. En desarrollo (`next dev`) los cambios se ven en cada request sin build.

Las páginas de detalle de cada ítem (`/naturaleza/[slug]`, `/gastronomia/[slug]`, etc.) ya están configuradas para consultar la base de datos en cada solicitud, por lo que en desarrollo los cambios del admin se reflejan al recargar la página.

---

## 📋 Resumen rápido de acciones

```
┌─────────────────────────────────────────────────────────────┐
│  Estado del slot          │  Qué puedes hacer               │
├─────────────────────────────────────────────────────────────┤
│  Original (sin override)  │  Subir imagen propia            │
│  Personalizada (visible)  │  Ocultar · Restaurar · Cambiar  │
│  Personalizada (oculta)   │  Mostrar · Restaurar · Cambiar  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Seguridad

- El panel está protegido por contraseña mediante cookie de sesión (24 horas de duración)
- Las sesiones caducadas se limpian automáticamente en cada login
- Todas las rutas `/admin/*` redirigen al login si no hay sesión válida
- La contraseña se compara directamente con `ADMIN_PASSWORD` del entorno — cámbiala por algo seguro antes de subir a producción