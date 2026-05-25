# Havana Massage · Website

Sitio web estático premium para Havana Massage — un estudio de masajes para hombres en Miraflores, Lima. Diseñado con estética editorial dark warm inspirada en el café cubano y la marca dorada del logo.

**Sin frameworks. Sin build step. Sin npm.** Solo HTML5 + CSS3 + JavaScript vanilla. Listo para subir por FTP a Hostinger o cualquier hosting compartido.

---

## 📂 Estructura del proyecto

```
havana-massage/
├── index.html             ← Página principal (todas las secciones)
├── .htaccess              ← Cache, compresión y seguridad (Apache)
├── README.md              ← Este archivo
│
├── css/
│   └── styles.css         ← Todos los estilos
│
├── js/
│   └── main.js            ← Toda la interactividad
│
└── img/
    ├── logo.jpg           ← Logo principal
    ├── ambient/           ← Imágenes de instalaciones (galería + hero)
    │   ├── salon.png
    │   ├── cabina-1.png
    │   └── cabina-2.png
    └── team/              ← Fotos de los masajistas
        ├── yamel-hermida.jpg
        ├── reinier-dias.jpg
        ├── daniel-lopez.jpg
        ├── yasmany-monte.jpg
        └── julio-guerra.jpg
```

---

## 🚀 Desplegar el sitio

### Opción A · Hostinger (recomendado)

1. Entra al panel de Hostinger → **Administrador de archivos**.
2. Abre la carpeta `public_html/` (vacíala si tiene archivos viejos).
3. Sube **todo el contenido** de esta carpeta `havana-massage/` (no la carpeta misma, sino sus archivos: `index.html`, `.htaccess`, `css/`, `js/`, `img/`).
4. Listo. El sitio queda en `https://tu-dominio.com`.

> ⚠️ El archivo `.htaccess` empieza con punto y a veces queda oculto. En Hostinger, activa "Mostrar archivos ocultos" en el administrador de archivos para verlo y asegúrate de que se subió.

### Opción B · Netlify (drag & drop, gratis)

1. Entra a [app.netlify.com](https://app.netlify.com) (puedes registrarte gratis).
2. En el dashboard, arrastra la carpeta `havana-massage/` completa.
3. Netlify te da una URL como `https://random-name.netlify.app`.
4. Puedes conectar tu dominio propio en Settings → Domain.

### Opción C · Vercel / GitHub Pages / Cloudflare Pages

Cualquier hosting de archivos estáticos funciona. Sube la carpeta y listo.

---

## ✉️ Formulario de contacto

El formulario funciona de **dos formas**, sin que tengas que tocar código:

### Modo 1 (default) · WhatsApp
Por defecto, cuando alguien envía el formulario, se abre WhatsApp con todos los datos pre-cargados en el mensaje al número **+51 922 014 182**. Sin configuración previa. Funciona desde el primer minuto.

### Modo 2 · Recibir por email con Formspree (opcional)

Si prefieres recibir las consultas en `yamelhd@gmail.com`:

1. Regístrate gratis en [formspree.io](https://formspree.io) (con el email `yamelhd@gmail.com`).
2. Crea un nuevo formulario y copia el ID que te dan. Tiene este formato: `f/xyzABC123`.
3. Abre `index.html` y busca esta línea (cerca del final, dentro del `<form>`):

   ```html
   <form class="contact__form" id="contactForm" action="https://formspree.io/f/REEMPLAZAR_ID" method="POST">
   ```

4. Reemplaza `REEMPLAZAR_ID` por tu ID real:

   ```html
   <form class="contact__form" id="contactForm" action="https://formspree.io/f/xyzABC123" method="POST">
   ```

5. Sube el archivo. A partir de ahora, los mensajes llegan a tu correo.

> Formspree gratis permite 50 envíos por mes. Más que suficiente para empezar.

---

## ✏️ Cómo personalizar el sitio

Tres tareas son las más comunes. A continuación, cada una paso a paso.

---

### 🧖 1. Cambiar / Agregar masajistas

**Las imágenes están en:** `img/team/`

#### Para reemplazar una foto existente:

1. Prepara la foto del masajista en formato **JPG**, orientación vertical (3:4), idealmente **800×1066 px** o más, peso menor a 300 KB.
2. Renómbrala exactamente igual a la que reemplazas. Por ejemplo, para reemplazar a Yamel: `yamel-hermida.jpg`.
3. Sube la foto a `img/team/` por FTP (sobrescribiendo la antigua). Hostinger te confirma "archivo reemplazado".
4. Listo, sin tocar el HTML.

#### Para agregar un masajista nuevo:

1. Sube la foto a `img/team/`. Por ejemplo: `carlos-perez.jpg`.
2. Abre `index.html` y busca la sección `<!-- ============ EQUIPO / MASAJISTAS ============ -->`.
3. Dentro de `<div class="team__track">`, copia un bloque `<article class="member">` completo y pégalo al final.

   El bloque tiene esta forma:

   ```html
   <article class="member">
     <div class="member__photo">
       <img src="img/team/carlos-perez.jpg" alt="Carlos Pérez" loading="lazy" />
     </div>
     <div class="member__info">
       <span class="member__num mono">06</span>
       <h3 class="member__name">Carlos Pérez</h3>
       <p class="member__meta"><span>32 años</span><span class="sep">·</span><span>Cuba</span></p>
       <p class="member__bio">Especialista en relajación profunda. Mano cálida y técnica precisa.</p>
     </div>
   </article>
   ```

4. Edita: `src` de la imagen, número (`06`, `07`...), nombre, edad, país y biografía corta (1–2 frases en el tono de marca: cálido, cercano, sin tecnicismos).
5. Guarda y sube `index.html` por FTP.

#### Para quitar un masajista:

Borra el `<article class="member">...</article>` completo correspondiente. El carrusel se ajusta solo.

---

### 🟢 2. Marcar qué masajistas están activos hoy

Cada card de masajista tiene un atributo `data-active` que controla si aparece o no el punto verde luminoso junto a su nombre. Cuando está activo, el punto verde pulsa suavemente para indicar disponibilidad.

#### Cómo activar o desactivar un masajista:

1. Abre `index.html` con tu editor de texto.
2. Busca la sección `<!-- ============ EQUIPO / MASAJISTAS ============ -->`.
3. Cada masajista tiene esta forma:

   ```html
   <article class="member" data-active="true">
   ```

4. Cambia el valor de `data-active`:
   - **`data-active="true"`** → aparece el punto verde (masajista disponible hoy).
   - **`data-active="false"`** → sin punto (masajista no disponible hoy).

#### Ejemplo — Reinier disponible hoy:

**Antes:**
```html
<article class="member" data-active="false">
```

**Después:**
```html
<article class="member" data-active="true">
```

5. Guarda `index.html` y súbelo por FTP. El cambio se ve de inmediato en el sitio.

> **Tip**: haz este cambio cada mañana según quién trabaja ese día. Solo toma 30 segundos editar el archivo y volverlo a subir.

---

### 🏛 3. Cambiar / Agregar imágenes de la galería

**Las imágenes están en:** `img/ambient/`

#### Para reemplazar una imagen existente:

1. Prepara la foto en **PNG o JPG**, mínimo **1200 px** de ancho, peso ideal menor a 500 KB.
2. Renómbrala igual a la que reemplazas (`salon.png`, `cabina-1.png`, `cabina-2.png`).
3. Sube por FTP a `img/ambient/`, sobrescribiendo.

#### Para agregar una imagen nueva a la galería:

1. Sube la foto a `img/ambient/`. Por ejemplo: `recepcion.png`.
2. Abre `index.html` y busca la sección `<!-- ============ GALERÍA ============ -->`.
3. Dentro de `<div class="gallery__grid">`, agrega un nuevo bloque:

   ```html
   <a class="gallery__item reveal" data-gallery href="img/ambient/recepcion.png">
     <img src="img/ambient/recepcion.png" alt="Descripción de la imagen" loading="lazy" />
     <span class="gallery__label mono">Recepción · Detalle</span>
   </a>
   ```

4. Edita `href`, `src`, `alt` y la etiqueta (`gallery__label`).
5. Guarda y sube.

> 💡 La primera imagen tiene la clase `gallery__item--tall` (ocupa más espacio). Si quieres cambiar cuál es la "destacada", mueve esa clase a otro bloque.

#### Para cambiar la imagen del hero (banner principal):

1. Abre `index.html` y busca `<div class="hero__image"`.
2. Cambia el `style="background-image:url('img/ambient/cabina-1.png')"` por la nueva ruta.

---

### 💆 4. Modificar o agregar servicios

**Todos los servicios están en `index.html`** dentro de `<!-- ============ SERVICIOS ============ -->`.

Cada servicio es un bloque `<article class="service">`. Hay dos paneles: Essential y Premium, separados por `data-pane="essential"` y `data-pane="premium"`.

#### Para modificar precio, duración o descripción:

1. Encuentra el `<article class="service">` del servicio que quieres editar (busca por nombre, ej. "Jardín de Paz").
2. Edita los campos:

   ```html
   <article class="service">
     <header class="service__head">
       <span class="service__tag mono">Essential</span>     <!-- categoría -->
       <span class="service__price">S/. 100</span>          <!-- ← precio -->
     </header>
     <h3 class="service__name">Jardín de Paz</h3>           <!-- ← nombre -->
     <p class="service__desc">                              <!-- ← descripción -->
       Masaje relajante con crema o aceite tibio...
     </p>
     <div class="service__meta">
       <span>... 60 min</span>                              <!-- ← duración -->
     </div>
     <a class="service__cta" href="https://wa.me/51922014182?text=...">
       Reservar <span>→</span>
     </a>
   </article>
   ```

3. **Importante**: si cambias el nombre, también cambia el texto en el link de WhatsApp (`?text=...`) para que el mensaje pre-llenado coincida.
4. Si modificas el precio, **actualiza también el `<option>` en el formulario de contacto** (busca `<select id="service"`).

#### Para agregar un servicio nuevo:

1. Copia un bloque `<article class="service">` completo y pégalo dentro del panel correspondiente (`data-pane="essential"` o `data-pane="premium"`).
2. Edita todos los campos.
3. Agrega también una nueva opción en el formulario de contacto:

   ```html
   <option value="Nombre del servicio">Nombre · S/. precio</option>
   ```

#### Para agregar un servicio destacado:

Agrega la clase `service--feature` al `<article>`:

```html
<article class="service service--feature">
```

Esto le pone un borde dorado superior y un fondo con resplandor.

#### Para los servicios adicionales (Exfoliación, Depilación, Baño de Espuma):

Busca `<ul class="extras__list">` y edita / agrega `<li>` siguiendo la misma estructura.

---

## 📊 Panel de administración y visitas

El sitio incluye un **panel de administración** con contador de visitas y gráfico de los últimos 7 días.

### Cómo abrir el panel

| Método | Instrucción |
|---|---|
| Teclado | Presiona `Ctrl + Shift + H` en cualquier momento |
| URL | Agrega `?admin` al final de la URL del sitio |
| Cerrar | Tecla `Esc`, clic fuera del panel, o el botón `×` |

### Qué muestra el panel

- **Total visitas · Hoy · Esta semana · Este mes** — conteo automático por sesión de navegador
- **Gráfico de barras** — visitas de los últimos 7 días
- **Última visita** — fecha y hora exacta
- **Estado de Google Analytics** — verde si está configurado, dorado si falta configurarlo
- **Botón "Resetear datos"** — borra el historial (pide confirmación)

> El contador local registra visitas del navegador actual. Para ver **todas las visitas desde cualquier dispositivo**, configura Google Analytics (sección siguiente).

---

## 📈 Cómo configurar Google Analytics 4

Google Analytics es gratis y te permite ver cuántas personas visitan el sitio, desde dónde, cuánto tiempo se quedan y más. El sitio ya tiene el código listo — solo necesitas tu ID personal.

### Paso 1 — Crear una cuenta en Google Analytics

1. Ve a **[analytics.google.com](https://analytics.google.com)** (entra con tu cuenta de Google).
2. Haz clic en **"Empezar a medir"**.
3. En **Nombre de la cuenta** escribe: `CTA_sony_admin`.
4. Clic en **Siguiente**.

### Paso 2 — Crear una propiedad

1. En **Nombre de la propiedad** escribe: `Havana Massage Web`.
2. Elige zona horaria: **Perú (GMT-5)** y moneda: **Soles peruanos (PEN)**.
3. Clic en **Siguiente** → completa los datos del negocio → **Crear**.
4. Acepta las condiciones de servicio.

### Paso 3 — Obtener tu Measurement ID

1. Después de crear la propiedad, aparecerá la pantalla **"Configurar una fuente de datos"**.
2. Elige **Web**.
3. En URL escribe la dirección de tu sitio (ej. `havana-massage.com`).
4. En **Nombre de la secuencia** escribe: `Sitio web principal`.
5. Clic en **Crear secuencia**.
6. Aparecerá tu **ID de medición** — tiene este formato: **`G-XXXXXXXXXX`** (empieza con `G-` seguido de letras y números).
7. **Copia ese ID**.

### Paso 4 — Obtener el Property ID de GA4

1. En [analytics.google.com](https://analytics.google.com), ve a **Administrar** (ícono de engranaje, abajo izquierda).
2. En la columna **Propiedad**, haz clic en **Configuración de propiedad**.
3. Verás el **ID de propiedad** — es un número como `412345678`. Cópialo.

### Paso 5 — Crear un OAuth2 Client ID en Google Cloud

Esto permite que el panel de admin lea tus datos de Analytics sin exponer contraseñas.

1. Ve a [console.cloud.google.com](https://console.cloud.google.com) (misma cuenta de Google).
2. Crea un proyecto nuevo → ponle nombre: `Havana Massage Admin`.
3. En el menú lateral: **APIs y servicios** → **Biblioteca**.
4. Busca **"Google Analytics Data API"** → haz clic → **Habilitar**.
5. Ve a **APIs y servicios** → **Credenciales** → **Crear credenciales** → **ID de cliente de OAuth 2.0**.
6. Si pide configurar la pantalla de consentimiento: elige **Externo** → completa nombre de app (`Havana Admin`) y correo. En **Usuarios de prueba**, añade tu correo de Google.
7. Tipo de aplicación: **Aplicación web**.
8. En **Orígenes de JavaScript autorizados**, agrega la URL de tu sitio (ej: `https://tu-dominio.com`). Si también quieres probarlo en local: agrega `http://localhost`.
9. Clic en **Crear** → copia el **ID de cliente** (formato: `123456789-xxxx.apps.googleusercontent.com`).

### Paso 6 — Pegar los tres valores en el sitio

1. Abre `index.html` con tu editor de texto.
2. Busca este bloque (en el `<head>`):

   ```html
   window.HM_GA_ID          = 'G-X4RK096B76';
   window.HM_GA_PROPERTY_ID = 'PROPERTY_ID';
   window.HM_GA_CLIENT_ID   = 'CLIENT_ID';
   ```

3. Reemplaza `PROPERTY_ID` por el número de propiedad (ej: `412345678`) y `CLIENT_ID` por el OAuth Client ID:

   ```html
   window.HM_GA_ID          = 'G-X4RK096B76';
   window.HM_GA_PROPERTY_ID = '412345678';
   window.HM_GA_CLIENT_ID   = '123456789-xxxx.apps.googleusercontent.com';
   ```

4. Guarda y sube `index.html` por FTP.

### Paso 7 — Usar el panel en tiempo real

1. Abre el sitio → presiona `Ctrl + Shift + H`.
2. En la sección **Google Analytics · Tiempo Real**, aparecerá el botón **"Conectar con Google Analytics"**.
3. Haz clic → se abre un popup de Google pidiendo permiso de solo lectura → acepta.
4. El panel mostrará inmediatamente:
   - **Usuarios activos ahora** (punto verde pulsante)
   - Sesiones y usuarios de **hoy**, **7 días** y **30 días**
   - **Gráfico** de sesiones por día (últimos 7 días)
5. Los datos se actualizan automáticamente **cada 30 segundos**.

> La sesión de Google dura hasta que cierres el navegador o hagas clic en "Desconectar". La próxima vez que abras el panel solo necesitarás reconectar una vez.

---

## 🎨 Cómo cambiar colores, tipografía o tono

Toda la paleta está en variables CSS al inicio de `css/styles.css`:

```css
:root {
  --black: #050505;          /* fondo principal */
  --gold: #f2b544;           /* dorado del logo, CTAs */
  --amber: #d88a1c;          /* acentos cálidos */
  --gold-soft: #cfa15a;      /* tipografía suave dorada */
  --cream: #f4eadc;          /* texto claro */
  --brown: #2a1a12;          /* sombras cálidas */
}
```

Cambia un valor → se actualiza todo el sitio.

Las fuentes vienen de Google Fonts (Playfair Display + DM Sans + DM Mono). Si quieres cambiarlas, edita el `<link href="https://fonts.googleapis.com/css2?..."` en `index.html` y las variables `--serif` y `--sans` en CSS.

---

## 📱 Datos de contacto

Si cambia el número de WhatsApp, el email o el horario, hay que actualizar varias partes del HTML:

- **WhatsApp** (`+51 922 014 182` → `51922014182` sin signos en los links): aparece **muchas veces** en `index.html`. Usa **Buscar y Reemplazar** en tu editor (Ctrl/Cmd + F) y reemplaza `51922014182` por el nuevo número (sin `+`, sin espacios).
- **Email** (`yamelhd@gmail.com`): aparece en el `<a href="mailto:...">` de la sección de contacto y en el footer.
- **Horario** (`10:00 – 23:00`): aparece en la sección contacto y en el footer.
- **Ubicación**: el mapa usa una URL de Google Maps en el `<iframe>` de la sección contacto. Para cambiarla, ve a [google.com/maps](https://google.com/maps), busca la dirección exacta, click en "Compartir" → "Insertar mapa" → copia el `src` del iframe y reemplaza el actual.

---

## 🛠 Notas técnicas

- **Sin dependencias externas en runtime**: solo se cargan las fuentes desde Google Fonts. El resto es todo local.
- **Cache busting**: los `<link>` de CSS y `<script>` de JS tienen un parámetro `?v=20260518`. Cuando hagas un cambio importante en `styles.css` o `main.js`, sube ese número (`?v=20260519`) para forzar a los navegadores a recargar.
- **Compatibilidad**: funciona en todos los navegadores modernos (Chrome, Safari, Firefox, Edge). Probado en móvil iOS y Android.
- **Performance**: el sitio pesa ~600 KB total (con imágenes). Carga rápida en 3G.
- **SEO**: ya tiene `<title>`, `<meta description>`, Open Graph para Facebook/WhatsApp. Para Google, dale unas semanas tras el lanzamiento para que indexe.

---

## 🧭 Preguntas frecuentes

**¿Necesito instalar algo?**
No. Solo subir los archivos a un hosting.

**¿Puedo editar el sitio sin saber programar?**
Sí, abre `index.html` con cualquier editor de texto (incluso el Bloc de notas, aunque [VS Code](https://code.visualstudio.com) gratis es mejor). Busca el texto que quieres cambiar y reemplázalo. No toques las etiquetas `<...>`.

**¿El sitio se ve bien en celular?**
Sí, está diseñado mobile-first. La nav se convierte en menú hamburguesa, los servicios y testimonios pasan a una columna, y el carrusel de masajistas muestra uno a la vez.

**¿Cómo agrego Google Analytics o el píxel de Facebook?**
Pega el código de tracking justo antes de `</head>` en `index.html`.

**¿El formulario manda emails de verdad?**
Por defecto abre WhatsApp con todos los datos. Para email, sigue los pasos de la sección "Formulario de contacto" más arriba (Formspree).

---

## 📝 Créditos

Diseño y desarrollo · Equipo Havana · 2026
Identidad de marca · Havana Massage · Miraflores, Lima

Tipografías:
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) (Google Fonts)
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Google Fonts)
- [DM Mono](https://fonts.google.com/specimen/DM+Mono) (Google Fonts)

---

**Privado. Cálido. Sin prisas.**
