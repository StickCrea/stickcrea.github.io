/**
 * cursor.js — Cursor personalizado (punto + anillo con retardo elástico).
 * Se desactiva por completo en touch y con prefers-reduced-motion.
 */
function initCursor() {
  if (isTouchDevice() || prefersReducedMotion()) return;

  const dot = createEl("div", "cursor-dot");
  const ring = createEl("div", "cursor-ring");
  document.body.append(dot, ring);
  document.body.classList.add("has-custom-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  const interactiveSelector = "a, button, .glass-card, .filter-btn, input, textarea, .verb-btn";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelector)) ring.classList.add("is-active");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelector)) ring.classList.remove("is-active");
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();
}
