/**
 * main.js — orquesta la inicialización del sitio: detecta capacidades
 * del dispositivo, ajusta la intensidad visual, renderiza el contenido
 * y arranca cada módulo. Pausa animaciones fuera de viewport y con la
 * pestaña oculta para mantener el rendimiento.
 */
document.addEventListener("DOMContentLoaded", () => {
  const reduced = prefersReducedMotion();
  const lowPower = isLowPowerDevice() || isTouchDevice();

  if (reduced || lowPower) {
    document.documentElement.dataset.fx = "low";
  }

  renderAll();
  initNav();
  initReveal();
  initTimelineDraw();
  initCardInteractions();
  initCursor();
  initContactForm();
  initStackToggle();

  // ---- Red de nodos del Hero ----
  const canvas = $("#heroNetwork");
  if (canvas) {
    const network = new NodeNetwork(canvas, {
      coreLabels: ["Usuario", "Aplicación", "Backend", "Base de datos", "API", "Automatización"],
      particleDensity: reduced || lowPower ? 0.4 : 1,
      reducedMotion: reduced,
    });

    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) network.start();
          else network.stop();
        });
      },
      { threshold: 0.05 }
    );
    heroObserver.observe(canvas);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) network.stop();
      else if (canvas.getBoundingClientRect().top < window.innerHeight) network.start();
    });
  }

  // El contenido se arma dinámicamente desde data.js, así que un enlace
  // directo con hash (ej. index.html#contacto) puede llegar antes de que
  // el layout final exista. Se corrige la posición una vez que todo está listo.
  if (location.hash) {
    const target = $(location.hash);
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: "auto" }));
  }
});

/**
 * initContactForm — El sitio es estático (GitHub Pages, sin backend),
 * así que el formulario compone un mailto: con los datos ingresados en
 * vez de enviarlos a un servicio de terceros. No se guarda ni se
 * transmite nada a servidores propios.
 */
/**
 * initStackToggle — el panel técnico (Technical Snapshot) es la vista
 * rápida pensada para un visitante no técnico; el stack completo por
 * categoría queda un clic más abajo para quien sí quiere profundizar
 * (recruiter/perfil técnico), en vez de duplicar la sección.
 */
function initStackToggle() {
  const btn = $("#stackToggle");
  const panel = $("#stackFull");
  if (!btn || !panel) return;
  btn.addEventListener("click", () => {
    const open = panel.classList.toggle("open");
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.childNodes[0].textContent = open ? "Ocultar stack completo " : "Ver stack completo ";
  });
}

function initContactForm() {
  const form = $("#contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#cf-name", form).value.trim();
    const message = $("#cf-message", form).value.trim();
    const email = SITE_DATA.contact.email;
    const subject = encodeURIComponent(`Contacto desde StivCrea — ${name || "sin nombre"}`);
    const body = encodeURIComponent(message || "");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
}
