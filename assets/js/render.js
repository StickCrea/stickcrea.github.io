/**
 * render.js — construye las secciones dinámicas del sitio a partir de
 * SITE_DATA (data.js). Agregar un caso, proyecto o categoría nueva es
 * cuestión de editar data.js; este archivo no necesita cambios.
 */

const chevronSvg =
  '<svg viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

function chip(text, accent = false) {
  return `<span class="chip${accent ? " chip-accent" : ""}">${text}</span>`;
}

/* ---------- Hero: subtítulo rotativo ---------- */
function renderRotatingRole() {
  const el = $("#rotatingRole");
  if (!el) return;
  const words = SITE_DATA.identity.rotating;
  const textSpan = $(".rotating-text", el);

  if (prefersReducedMotion()) {
    textSpan.textContent = SITE_DATA.identity.tagline;
    return;
  }

  let i = 0;
  textSpan.textContent = words[0];
  setInterval(() => {
    i = (i + 1) % words.length;
    textSpan.style.opacity = 0;
    setTimeout(() => {
      textSpan.textContent = words[i];
      textSpan.style.opacity = 1;
    }, 260);
  }, 2400);
}

/* ---------- Experiencia ---------- */
function renderExperience() {
  const list = $("#experienceList");
  if (!list) return;
  list.innerHTML = SITE_DATA.experience
    .map(
      (exp, i) => `
    <article class="glass-card exp-card reveal" style="--i:${i}">
      <div class="exp-head">
        <div>
          <h3>${exp.role}</h3>
          <p class="exp-company">${exp.company}</p>
        </div>
        <span class="exp-period">${exp.period}</span>
      </div>
      <p class="exp-hook">"${exp.hook}"</p>
      <p>${exp.summary}</p>
      <div class="exp-tags">${exp.tags.map((t) => chip(t)).join("")}</div>
      <button class="exp-toggle" data-toggle-exp="${i}" aria-expanded="false">
        Ver más ${chevronSvg}
      </button>
      <div class="exp-more" id="exp-more-${i}">
        <p>${exp.more}</p>
      </div>
    </article>`
    )
    .join("");

  $$("[data-toggle-exp]", list).forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = $(`#exp-more-${btn.dataset.toggleExp}`);
      const open = target.classList.toggle("open");
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.innerHTML = `Ver ${open ? "menos" : "más"} ${chevronSvg}`;
    });
  });
}

/* ---------- Formación ---------- */
function renderEducation() {
  const list = $("#educationList");
  if (!list) return;
  list.innerHTML = SITE_DATA.education
    .map(
      (edu, i) => `
    <article class="glass-card exp-card reveal" style="--i:${i}">
      <div class="exp-head">
        <div>
          <h3>${edu.title}</h3>
          <p class="exp-company">${edu.institution}</p>
        </div>
        <span class="exp-period">${edu.period}</span>
      </div>
      <p>${edu.detail}</p>
    </article>`
    )
    .join("");
}

/* ---------- Casos ---------- */
function caseDetailMarkup(c) {
  let extra = "";
  if (c.note) {
    extra += `<dt>Nota de rigor</dt><dd>${c.note}</dd>`;
  }
  if (c.securityNote) {
    extra += `<dt>Sobre la seguridad</dt><dd>${c.securityNote}</dd>`;
  }
  if (c.codeExample) {
    extra += `<dt>${c.codeExample.label}</dt><dd><div class="case-code">${c.codeExample.code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")}</div></dd>`;
  }
  return `
    <dt>Problema</dt><dd>${c.problem}</dd>
    <dt>Diagnóstico</dt><dd>${c.diagnosis}</dd>
    <dt>Solución</dt><dd>${c.solution}</dd>
    <dt>Impacto</dt><dd>${c.impact}</dd>
    ${extra}
    <dt>Ámbitos</dt><dd>${c.badges.map((b) => chip(b)).join(" ")}</dd>
  `;
}

function renderCases() {
  const grid = $("#casesGrid");
  const filterWrap = $("#caseFilters");
  if (!grid) return;

  const cats = ["Todos", ...SITE_DATA.categories];
  filterWrap.innerHTML = cats
    .map((c, i) => `<button class="filter-btn${i === 0 ? " active" : ""}" data-filter="${c}">${c}</button>`)
    .join("");

  grid.innerHTML = SITE_DATA.cases
    .map(
      (c, i) => `
    <article class="glass-card case-card reveal" data-categories="${c.categories.join(",")}" style="--i:${i}">
      <div class="case-cats">${c.categories.map((cat) => chip(cat, true)).join("")}</div>
      <h3>${c.title}</h3>
      <p class="case-hook">"${c.hook}"</p>
      <div class="case-flow">${c.flow
        .map((step, idx) => `<span>${step}</span>${idx < c.flow.length - 1 ? '<span class="arrow">→</span>' : ""}`)
        .join("")}</div>
      <button class="case-toggle" data-toggle-case="${c.id}" aria-expanded="false">Ver más ${chevronSvg}</button>
      <dl class="case-detail" id="detail-${c.id}">${caseDetailMarkup(c)}</dl>
    </article>`
    )
    .join("");

  $$("[data-toggle-case]", grid).forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = $(`#detail-${btn.dataset.toggleCase}`);
      const open = target.classList.toggle("open");
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.innerHTML = `Ver ${open ? "menos" : "más"} ${chevronSvg}`;
    });
  });

  $$("[data-filter]", filterWrap).forEach((btn) => {
    btn.addEventListener("click", () => {
      $$("[data-filter]", filterWrap).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      $$(".case-card", grid).forEach((card) => {
        const cats = card.dataset.categories.split(",");
        card.classList.toggle("is-hidden", f !== "Todos" && !cats.includes(f));
      });
    });
  });
}

/* ---------- Lo que sé resolver ---------- */
function renderProblems() {
  const grid = $("#problemsGrid");
  if (!grid) return;
  grid.innerHTML = SITE_DATA.problems
    .map(
      (p, i) => `<div class="glass-card problem-card no-tilt reveal" style="--i:${i}"><span class="dot"></span><span>${p}</span></div>`
    )
    .join("");
}

/* ---------- Metodología ---------- */
function renderMethodology() {
  const steps = $("#methodologySteps");
  const quotes = $("#methodologyQuotes");
  if (steps) {
    steps.innerHTML = SITE_DATA.methodology
      .map((s) => `<div class="method-step reveal">${s}</div>`)
      .join("");
  }
  if (quotes) {
    quotes.innerHTML = SITE_DATA.methodologyQuotes
      .map((q, i) => `<div class="glass-card method-quote reveal" style="--i:${i}">"${q}"</div>`)
      .join("");
  }
}

/* ---------- Arquitectura ---------- */
function renderArchitecture() {
  const wrap = $("#archDiagram");
  if (!wrap) return;
  wrap.innerHTML = SITE_DATA.architecture
    .map(
      (node, i) => `
      ${i > 0 ? '<div class="arch-arrow">→</div>' : ""}
      <div class="glass-card arch-node no-tilt reveal" style="--i:${i}" tabindex="0">
        <h4>${node.label}</h4>
        <p>${node.detail}</p>
        <span class="reveal-tag">${node.reveal}</span>
      </div>`
    )
    .join("");
}

/* ---------- From UI to Database ---------- */
function renderUiToDb() {
  const wrap = $("#uitodbFlow");
  if (!wrap) return;
  wrap.innerHTML = SITE_DATA.uiToDb
    .map((step, i) => `<span class="uitodb-node" data-idx="${i}">${step}</span>`)
    .join("");

  const nodes = $$(".uitodb-node", wrap);
  let idx = 0;
  let interval = null;

  function tick() {
    nodes.forEach((n) => n.classList.remove("is-active"));
    nodes[idx].classList.add("is-active");
    idx = (idx + 1) % nodes.length;
  }

  if (!prefersReducedMotion()) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tick();
          interval = setInterval(tick, 1100);
        } else if (interval) {
          clearInterval(interval);
          interval = null;
        }
      });
    }, { threshold: 0.4 });
    obs.observe(wrap);
  } else {
    nodes[0].classList.add("is-active");
  }
}

/* ---------- What I actually do ---------- */
function renderActions() {
  const wrap = $("#verbsList");
  const example = $("#verbExample");
  if (!wrap) return;
  wrap.innerHTML = SITE_DATA.actions
    .map((a, i) => `<button class="verb-btn${i === 0 ? " active" : ""}" data-verb="${i}">${a.verb}</button>`)
    .join("");

  function setActive(i) {
    $$("[data-verb]", wrap).forEach((b) => b.classList.toggle("active", Number(b.dataset.verb) === i));
    example.style.opacity = 0;
    setTimeout(() => {
      example.textContent = SITE_DATA.actions[i].example;
      example.style.opacity = 1;
    }, 150);
  }
  example.textContent = SITE_DATA.actions[0].example;
  example.style.transition = "opacity .25s ease";

  $$("[data-verb]", wrap).forEach((btn) => {
    btn.addEventListener("click", () => setActive(Number(btn.dataset.verb)));
  });
}

/* ---------- Principios ---------- */
function renderPrinciples() {
  const main = $("#principlesMain");
  const secondary = $("#principlesSecondary");
  if (main) {
    main.innerHTML = SITE_DATA.principles.main
      .map(
        (p, i) => `<div class="glass-card principle-card reveal" style="--i:${i}"><h3>${p.title}</h3><p>${p.detail}</p></div>`
      )
      .join("");
  }
  if (secondary) {
    secondary.innerHTML = SITE_DATA.principles.secondary.map((s) => chip(s, true)).join("");
  }
}

/* ---------- Technical snapshot ---------- */
function renderSnapshot() {
  const grid = $("#snapshotGrid");
  if (!grid) return;
  grid.innerHTML = SITE_DATA.snapshot
    .map(
      (g) => `
    <div class="snapshot-group">
      <h4>${g.group}</h4>
      <ul>${g.items.map((it) => `<li>${it}</li>`).join("")}</ul>
    </div>`
    )
    .join("");
}

/* ---------- Stack ---------- */
function renderStack() {
  const grid = $("#stackGrid");
  if (!grid) return;
  grid.innerHTML = SITE_DATA.stack
    .map(
      (g, i) => `
    <div class="glass-card stack-group no-tilt reveal" style="--i:${i}">
      <h3>${g.group}</h3>
      <div class="stack-chips">${g.items.map((it) => chip(it)).join("")}</div>
    </div>`
    )
    .join("");
}

/* ---------- Timeline 2023 -> 2026 ---------- */
function renderTimeline() {
  const wrap = $("#timelineItems");
  if (!wrap) return;
  wrap.innerHTML = SITE_DATA.timeline
    .map(
      (t) => `
    <div class="timeline-item reveal">
      <span class="node"></span>
      <div class="timeline-year">${t.year}</div>
      <h4>${t.label}</h4>
    </div>`
    )
    .join("");
}

/* ---------- Proyectos personales ---------- */
function renderAgentForCard(project) {
  const radius = 109;
  const angleStep = (Math.PI * 2) / project.orbLabels.length;
  const labels = project.orbLabels
    .map((label, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const x = 50 + (Math.cos(angle) * radius) / 2.18;
      const y = 50 + (Math.sin(angle) * radius) / 2.18;
      return `<span style="left:${x}%; top:${y}%; transform:translate(-50%,-50%);">${label}</span>`;
    })
    .join("");

  return `
  <article class="glass-card agentfor-card reveal" data-palette="${project.palette}" id="${project.id}">
    <div class="agentfor-head">
      <div class="agentfor-title">
        <span class="eyebrow">Proyecto personal</span>
        <h3>${project.name}</h3>
        <p>${project.subtitle}</p>
      </div>
      <div class="orb-wrap">
        <div class="orb"></div>
        <div class="orb-ring"></div>
        <div class="orb-labels">${labels}</div>
      </div>
    </div>
    <p>${project.summary}</p>
    <div class="status-groups">
      <div class="status-group implemented">
        <h4><span class="status-dot"></span>Implementado</h4>
        <ul>${project.implemented.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>
      <div class="status-group roadmap">
        <h4><span class="status-dot"></span>En diseño / roadmap</h4>
        <ul>${project.roadmap.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>
    </div>
    <p class="eyebrow" style="margin-top:.5rem;">Pipeline de voz (roadmap, no funcional aún)</p>
    <div class="pipeline">${project.pipeline
      .map((p) => `<span class="pipeline-step">${p.stage}</span>`)
      .join('<span class="arrow" style="color:var(--text-faint)">→</span>')}</div>
    <p class="eyebrow" style="margin-top:1.5rem;">Decisiones técnicas</p>
    <div class="decisions-list">${project.decisions
      .map((d) => `<div class="decision-row"><b>${d.tech}</b><span>${d.reason}</span></div>`)
      .join("")}</div>
  </article>`;
}

function renderFinanceCard(project, i) {
  return `
  <article class="glass-card agentfor-card reveal" data-palette="${project.palette}" style="--i:${i}">
    <div class="agentfor-title">
      <span class="eyebrow">Proyecto personal</span>
      <h3>${project.name}</h3>
      <p>${project.subtitle}</p>
    </div>
    <p>${project.summary}</p>
    <div class="scope-chips">${project.scope.map((s) => chip(s)).join("")}</div>
  </article>`;
}

function renderPersonalProjects() {
  const wrap = $("#personalProjects");
  if (!wrap) return;
  wrap.innerHTML = SITE_DATA.personalProjects
    .map((p, i) => (p.pipeline ? renderAgentForCard(p) : renderFinanceCard(p, i)))
    .join("");
}

/* ---------- Available for ---------- */
function renderAvailableFor() {
  const wrap = $("#availableFor");
  if (!wrap) return;
  wrap.innerHTML = SITE_DATA.availableFor.map((a) => chip(a, true)).join("");
}

/* ---------- Contacto ---------- */
function renderContact() {
  const wrap = $("#contactLinks");
  if (!wrap) return;
  const { email, github, linkedin } = SITE_DATA.contact;
  wrap.innerHTML = `
    <a class="glass-card contact-link no-tilt" href="mailto:${email}">
      <i class="far fa-envelope"></i><span>${email}</span>
    </a>
    <a class="glass-card contact-link no-tilt" href="${github}" target="_blank" rel="noopener noreferrer">
      <i class="fab fa-github"></i><span>GitHub</span>
    </a>
    <a class="glass-card contact-link no-tilt" href="${linkedin || "#"}" ${linkedin ? 'target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true" title="Próximamente"'}>
      <i class="fab fa-linkedin"></i><span>LinkedIn${linkedin ? "" : " (próximamente)"}</span>
    </a>
  `;
}

/* ---------- Footer ---------- */
function renderFooter() {
  const year = $("#footerYear");
  if (year) year.textContent = new Date().getFullYear();
}

function renderAll() {
  renderRotatingRole();
  renderExperience();
  renderEducation();
  renderCases();
  renderProblems();
  renderMethodology();
  renderArchitecture();
  renderUiToDb();
  renderActions();
  renderPrinciples();
  renderSnapshot();
  renderStack();
  renderTimeline();
  renderPersonalProjects();
  renderAvailableFor();
  renderContact();
  renderFooter();
}
