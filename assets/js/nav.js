/**
 * nav.js — navbar sticky (se compacta al hacer scroll), menú móvil,
 * indicador de sección activa y barra de progreso de scroll.
 */
function initNav() {
  const navbar = $("#navbar");
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  const progress = $("#scrollProgress");
  const backToTop = $("#backToTop");

  const onScroll = throttleRaf(() => {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 40);
    backToTop.classList.toggle("visible", y > 600);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${docHeight > 0 ? (y / docHeight) * 100 : 0}%`;
  });
  window.addEventListener("scroll", onScroll);
  onScroll();

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  $$("#navLinks a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  });

  const sections = $$("main section[id]");
  const navAnchors = $$("#navLinks a");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));
}
