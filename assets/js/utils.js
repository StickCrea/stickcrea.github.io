/**
 * utils.js — helpers compartidos. Sin dependencias externas.
 */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isTouchDevice() {
  return window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
}

/** Heurística simple de "dispositivo de baja potencia" para reducir efectos. */
function isLowPowerDevice() {
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  return cores <= 4 || mem <= 4;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function debounce(fn, wait = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function throttleRaf(fn) {
  let ticking = false;
  return (...args) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      fn(...args);
      ticking = false;
    });
  };
}

function createEl(tag, className, html) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html !== undefined) el.innerHTML = html;
  return el;
}

/** Aplica un stagger de entrada a los hijos directos de un contenedor .reveal-stagger */
function applyStaggerIndices(container) {
  Array.from(container.children).forEach((child, i) => {
    child.style.setProperty("--i", i);
  });
}
