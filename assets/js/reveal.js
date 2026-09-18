/**
 * reveal.js — animaciones de entrada (fade + slide) al entrar en viewport,
 * más el "dibujado" progresivo de la línea de tiempo.
 */
function initReveal() {
  $$(".reveal-stagger").forEach(applyStaggerIndices);

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));
}

function initTimelineDraw() {
  const wrap = $("#timelineWrap");
  if (!wrap) return;
  const fill = $(".timeline-line-fill", wrap);
  const items = $$(".timeline-item", wrap);

  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    },
    { threshold: 0.5 }
  );
  items.forEach((it) => itemObserver.observe(it));

  const wrapObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fill.style.height = "100%";
        } else if (entry.boundingClientRect.top > 0) {
          fill.style.height = "0%";
        }
      });
    },
    { threshold: 0.15 }
  );
  wrapObserver.observe(wrap);
}
