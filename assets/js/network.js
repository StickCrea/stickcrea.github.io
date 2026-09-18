/**
 * network.js — Red de nodos conectados sobre <canvas>, usada en el Hero.
 * Representa conceptualmente: Usuario → Aplicación → Backend →
 * Base de datos → API → Automatización.
 *
 * Diseño deliberado:
 *  - Los "nodos núcleo" siguen el orden de la arquitectura real (no son
 *    decoración aleatoria); los nodos ambiente solo rellenan la red.
 *  - Un único requestAnimationFrame por instancia; se pausa fuera de
 *    viewport y cuando la pestaña no es visible (ver main.js).
 *  - Con prefers-reduced-motion se dibuja un frame estático, sin loop.
 */
class NodeNetwork {
  constructor(canvas, { coreLabels = [], particleDensity = 1, reducedMotion = false } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.coreLabels = coreLabels;
    this.particleDensity = particleDensity;
    this.reducedMotion = reducedMotion;
    this.mouse = { x: null, y: null };
    this.running = false;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._tick = this._tick.bind(this);

    this.resize();
    this._buildNodes();

    canvas.addEventListener("mousemove", this._onMouseMove);
    canvas.addEventListener("mouseleave", this._onMouseLeave);
    window.addEventListener("resize", debounce(() => {
      this.resize();
      this._buildNodes();
      if (this.reducedMotion) this._drawFrame(0);
    }, 200));

    if (this.reducedMotion) {
      this._drawFrame(0);
    }
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  _buildNodes() {
    const { width, height, coreLabels } = this;
    const coreCount = coreLabels.length;
    this.coreNodes = coreLabels.map((label, i) => ({
      label,
      core: true,
      baseX: (width / (coreCount + 1)) * (i + 1),
      baseY: height / 2 + (i % 2 === 0 ? -1 : 1) * height * 0.14,
      phase: Math.random() * Math.PI * 2,
      r: 5,
    }));

    const ambientCount = Math.round(18 * this.particleDensity);
    this.ambientNodes = Array.from({ length: ambientCount }, () => ({
      core: false,
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.4,
      r: 1.5 + Math.random() * 1.5,
    }));

    this.nodes = [...this.coreNodes, ...this.ambientNodes];

    // Pulsos viajando por las conexiones núcleo → núcleo (la arquitectura real)
    this.pulses = this.coreNodes.slice(0, -1).map((_, i) => ({
      from: i,
      to: i + 1,
      t: Math.random(),
      speed: 0.0028 + Math.random() * 0.001,
    }));
  }

  _onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }
  _onMouseLeave() {
    this.mouse.x = null;
    this.mouse.y = null;
  }

  start() {
    if (this.running || this.reducedMotion) return;
    this.running = true;
    this.rafId = requestAnimationFrame(this._tick);
  }

  stop() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  _positionOf(node, t) {
    let x = node.baseX;
    let y = node.baseY;
    if (node.core) {
      y += Math.sin(t * 0.0006 + node.phase) * 10;
    } else {
      x += Math.sin(t * 0.0004 * node.speed + node.phase) * 26;
      y += Math.cos(t * 0.0005 * node.speed + node.phase) * 18;
    }
    if (this.mouse.x !== null) {
      const dx = x - this.mouse.x;
      const dy = y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 130;
      if (dist < radius) {
        const force = (radius - dist) / radius;
        x += (dx / (dist || 1)) * force * 14;
        y += (dy / (dist || 1)) * force * 14;
      }
    }
    return { x, y };
  }

  _drawFrame(t) {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);

    const positions = this.nodes.map((n) => this._positionOf(n, t));

    // Conexiones núcleo -> núcleo (la columna vertebral de la arquitectura)
    ctx.lineWidth = 1;
    for (let i = 0; i < this.coreNodes.length - 1; i++) {
      const a = positions[i];
      const b = positions[i + 1];
      const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      grad.addColorStop(0, "rgba(16,245,163,0.5)");
      grad.addColorStop(1, "rgba(34,211,238,0.5)");
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    // Conexiones ambiente -> nodo núcleo o ambiente cercano
    const all = positions;
    for (let i = this.coreNodes.length; i < all.length; i++) {
      let nearestDist = Infinity;
      let nearestIdx = -1;
      for (let j = 0; j < all.length; j++) {
        if (i === j) continue;
        const dx = all[i].x - all[j].x;
        const dy = all[i].y - all[j].y;
        const d = dx * dx + dy * dy;
        if (d < nearestDist) {
          nearestDist = d;
          nearestIdx = j;
        }
      }
      if (nearestIdx !== -1 && nearestDist < 210 * 210) {
        ctx.strokeStyle = "rgba(139,92,246,0.18)";
        ctx.beginPath();
        ctx.moveTo(all[i].x, all[i].y);
        ctx.lineTo(all[nearestIdx].x, all[nearestIdx].y);
        ctx.stroke();
      }
    }

    // Pulsos luminosos viajando por la columna vertebral
    if (!this.reducedMotion) {
      this.pulses.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const a = positions[p.from];
        const b = positions[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 8);
        glow.addColorStop(0, "rgba(255,255,255,0.9)");
        glow.addColorStop(1, "rgba(16,245,163,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Nodos
    positions.forEach((pos, i) => {
      const node = this.nodes[i];
      ctx.beginPath();
      const pulse = node.core ? 1 + Math.sin(t * 0.003 + node.phase) * 0.15 : 1;
      ctx.arc(pos.x, pos.y, node.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = node.core ? "#eafff6" : "rgba(166,176,195,0.5)";
      ctx.shadowColor = node.core ? "#10f5a3" : "transparent";
      ctx.shadowBlur = node.core ? 12 : 0;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (node.core && node.label) {
        ctx.font = "600 11px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(230,236,246,0.75)";
        ctx.textAlign = "center";
        ctx.fillText(node.label, pos.x, pos.y + 24);
      }
    });
  }

  _tick(t) {
    if (!this.running) return;
    this._drawFrame(t);
    this.rafId = requestAnimationFrame(this._tick);
  }
}
