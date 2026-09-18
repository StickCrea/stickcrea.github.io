# StivCrea 2.0 — Portafolio de Stiven Cuesta

Portafolio personal de **Stiven Cuesta**, bajo la marca **StivCrea**.
Reconstrucción 2026 del portafolio original de 2023, que se conserva íntegro en
[`/legacy-2023`](legacy-2023/index.html) como archivo histórico.

Posicionamiento: **Applications Analyst · Backend · Data · Automation**.

## Tecnologías

Sitio estático, sin build ni dependencias de terceros en tiempo de ejecución
(salvo Google Fonts y Font Awesome vía CDN):

- HTML5 semántico, CSS moderno (custom properties, grid, glassmorphism) y
  JavaScript vanilla, organizado en módulos por responsabilidad.
- `<canvas>` para la red de nodos animada del Hero (sin librerías externas).
- Sin framework ni bundler: se eligió deliberadamente para que el sitio sea
  mantenible por una sola persona y se despliegue en GitHub Pages sin paso de
  build.

## Estructura

```
index.html                 Página única (secciones ancladas por id)
assets/
  css/
    tokens.css              Paleta, tipografía, espaciado, velocidad de animación
    base.css                 Reset, fondo vivo (aurora, grilla, grano)
    components.css           Navbar, botones, glass cards, cursor, badges
    sections.css              Estilos propios de cada sección
    responsive.css            Breakpoints (mobile / tablet / desktop)
  js/
    data.js                   Todo el contenido del sitio (editar aquí para actualizar)
    utils.js                  Helpers (detección de dispositivo, debounce, etc.)
    network.js                 Red de nodos animada (Hero)
    cursor.js                  Cursor personalizado (desktop, no-touch)
    nav.js                     Navbar, menú móvil, scroll progress
    reveal.js                  Animaciones de entrada + timeline
    cards.js                   Spotlight + tilt 3D de las glass cards
    render.js                  Renderiza el contenido de data.js al DOM
    main.js                    Orquestación e inicialización
Imgs/
  Img-Logo/image.png          Lockup de marca (logo + tagline)
  brand/                       Favicon y marca recortada, generados desde el logo
legacy-2023/                   Snapshot exacto del sitio original de 2023
```

## Actualizar contenido

Casi todo el contenido (experiencia, casos, stack, proyectos, timeline) vive en
**`assets/js/data.js`**. Agregar un caso o proyecto nuevo es añadir un objeto al
arreglo correspondiente; no hace falta tocar HTML ni el resto del JS.

## Desarrollo local

No requiere instalación. Basta un servidor estático simple, por ejemplo:

```bash
python -m http.server 8080
# abrir http://localhost:8080
```

## Despliegue (GitHub Pages)

El sitio ya está listo para GitHub Pages: solo se sirve la raíz del
repositorio (`index.html` + `assets/` + `Imgs/`), sin build. Si el repositorio
es `usuario.github.io`, publicar en la rama por defecto es suficiente.

## Notas de seguridad y privacidad

- No hay backend ni almacenamiento de datos: el formulario de contacto arma un
  enlace `mailto:` en el navegador del visitante; no se envía nada a un
  servidor propio ni de terceros.
- No se exponen credenciales, tokens, endpoints internos, nombres de clientes,
  compañeros, tablas ni datos reales de sistemas empresariales.
- Los ejemplos de código (XML/JSON) mostrados en la sección de casos son
  **ficticios**, creados solo con fines ilustrativos.
- Los casos profesionales están anonimizados: no identifican empleador,
  clientes ni infraestructura privada.
- Si en el futuro se agrega alguna integración real (por ejemplo, un formulario
  con backend), cualquier clave de API debe ir en variables de entorno del
  lado servidor — nunca incrustada en el frontend.
