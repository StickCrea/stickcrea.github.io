/**
 * cards.js — spotlight que sigue el cursor y un tilt 3D muy sutil
 * sobre las glass cards. Desactivado en touch por rendimiento y porque
 * no tiene sentido sin cursor.
 */
function initCardInteractions() {
  if (isTouchDevice()) return;

  $$(".glass-card").forEach((card) => {
    if (!card.querySelector(".spotlight")) {
      card.appendChild(createEl("div", "spotlight"));
    }

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--spot-x", `${x}px`);
      card.style.setProperty("--spot-y", `${y}px`);

      if (card.classList.contains("no-tilt")) return;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateY = ((x - cx) / cx) * 3.5;
      const rotateX = -((y - cy) / cy) * 3.5;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
