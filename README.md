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

### 🏛 2. Cambiar / Agregar imágenes de la galería

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

### 💆 3. Modificar o agregar servicios

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
