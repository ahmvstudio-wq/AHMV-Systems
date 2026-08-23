/**
 * AHMV Premium Animation Engine v2
 * – Clip-path curtain reveals (NO word-split DOM hacks)
 * – GSAP ScrollTrigger scrubbing for every section
 * – True 3D tilt (perspective) on cards
 * – Magnetic CTA buttons
 * – Parallax depth layers
 * – Noise cursor spotlight
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────────
   HEADLINE REVEAL - clip-path curtain wipe upward
   No DOM splitting. One slick motion per headline.
──────────────────────────────────────────────────────────────── */
function revealHeadline(el, delay = 0) {
  if (!el) return;
  el.style.clipPath = 'inset(0 0 100% 0)';
  el.style.willChange = 'clip-path, transform';

  ScrollTrigger.create({
    trigger: el,
    start: 'top 86%',
    onEnter: () => {
      gsap.to(el, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.1,
        delay,
        ease: 'expo.out',
      });
    },
    once: true,
  });
}

/* ────────────────────────────────────────────────────────────────
   FADE SLIDE - body text, labels, CTAs
──────────────────────────────────────────────────────────────── */
function revealFade(el, { y = 32, duration = 0.85, delay = 0, blur = true } = {}) {
  if (!el) return;
  gsap.set(el, { y, opacity: 0, ...(blur ? { filter: 'blur(5px)' } : {}) });
  ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    onEnter: () => {
      gsap.to(el, {
        y: 0, opacity: 1,
        ...(blur ? { filter: 'blur(0px)' } : {}),
        duration, delay, ease: 'expo.out',
      });
    },
    once: true,
  });
}

/* ────────────────────────────────────────────────────────────────
   STAGGER GRID - children fly in with 3D depth
──────────────────────────────────────────────────────────────── */
function revealGrid(container, { stagger = 0.12, y = 60, rotX = 18 } = {}) {
  if (!container) return;
  const items = Array.from(container.children);
  gsap.set(items, {
    y, opacity: 0,
    rotateX: rotX,
    scale: 0.93,
    transformPerspective: 900,
    transformOrigin: 'center top',
  });
  ScrollTrigger.create({
    trigger: container,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(items, {
        y: 0, opacity: 1,
        rotateX: 0, scale: 1,
        duration: 0.9,
        stagger,
        ease: 'power4.out',
      });
    },
    once: true,
  });
}

/* ────────────────────────────────────────────────────────────────
   SCRUB PARALLAX - element scrolls at different speed
──────────────────────────────────────────────────────────────── */
function parallax(el, yStart = -60, yEnd = 60) {
  if (!el) return;
  gsap.fromTo(el,
    { y: yStart },
    {
      y: yEnd,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    }
  );
}

/* ────────────────────────────────────────────────────────────────
   3D CARD TILT - real physics feel
──────────────────────────────────────────────────────────────── */
function applyTilt(el, maxDeg = 12) {
  if (!el) return;
  el.style.willChange = 'transform';
  el.style.transformStyle = 'preserve-3d';
  el.style.transition = 'box-shadow 0.3s ease';

  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: x * maxDeg * 2,
      rotateX: -y * maxDeg * 2,
      z: 24,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    el.style.boxShadow = `${-x * 20}px ${-y * 20}px 40px rgba(0,0,0,0.18)`;
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      rotateX: 0, rotateY: 0, z: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    });
    el.style.boxShadow = '';
  });
}

/* ────────────────────────────────────────────────────────────────
   MAGNETIC BUTTON - cursor pulled toward center
──────────────────────────────────────────────────────────────── */
function applyMagnetic(el, pull = 0.38) {
  if (!el) return;
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * pull;
    const y = (e.clientY - r.top - r.height / 2) * pull;
    gsap.to(el, { x, y, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' });
  });
}

/* ────────────────────────────────────────────────────────────────
   COUNTER - animated number on scroll
──────────────────────────────────────────────────────────────── */
function animateCounter(el) {
  if (!el) return;
  const raw = el.dataset.count;
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const target = parseFloat(raw);
  const isInt = Number.isInteger(target);

  const obj = { val: 0 };
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate() {
          const v = isInt ? Math.round(obj.val) : obj.val.toFixed(1);
          el.textContent = `${prefix}${v}${suffix}`;
        },
      });
    },
    once: true,
  });
}

/* ────────────────────────────────────────────────────────────────
   CURSOR SPOTLIGHT - subtle radial glow follows cursor
──────────────────────────────────────────────────────────────── */
function initCursorSpotlight() {
  const spot = document.createElement('div');
  spot.style.cssText = `
    position:fixed; pointer-events:none; z-index:9999;
    width:360px; height:360px; border-radius:50%;
    background: radial-gradient(circle, rgba(255,255,255,0.055) 0%, transparent 72%);
    transform: translate(-50%,-50%);
    mix-blend-mode: screen;
    transition: none;
  `;
  document.body.appendChild(spot);

  let tx = 0, ty = 0;
  window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
  gsap.ticker.add(() => gsap.set(spot, { x: tx, y: ty }));
}

/* ────────────────────────────────────────────────────────────────
   HORIZONTAL SCROLL MARQUEE - auto-loop
──────────────────────────────────────────────────────────────── */
function initMarquees() {
  document.querySelectorAll('[data-marquee]').forEach((track) => {
    // Duplicate content for seamless loop
    const clone = track.innerHTML;
    track.innerHTML += clone;
    const speed = parseFloat(track.dataset.marqueeSpeed || 30);
    gsap.to(track, {
      x: `-${50}%`,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });
  });
}

/* ────────────────────────────────────────────────────────────────
   HORIZONTAL PINNED SECTION - scrub-scroll
──────────────────────────────────────────────────────────────── */
function initHorizontalScrub(wrapper, track) {
  if (!wrapper || !track) return;
  const trackWidth = track.scrollWidth;
  const viewW = window.innerWidth;
  const distance = trackWidth - viewW;

  gsap.to(track, {
    x: -distance,
    ease: 'none',
    scrollTrigger: {
      trigger: wrapper,
      start: 'top top',
      end: `+=${distance}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });
}

/* ────────────────────────────────────────────────────────────────
   SECTION BACKGROUND SCRUB - dark sections shift hue subtly
──────────────────────────────────────────────────────────────── */
function initSectionScrubs() {
  document.querySelectorAll('[data-scrub-bg]').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const l = Math.round(7 + p * 4);
        el.style.background = `hsl(0,0%,${l}%)`;
      },
    });
  });
}

/* ────────────────────────────────────────────────────────────────
   BOOT - wire everything after React renders
──────────────────────────────────────────────────────────────── */
export function bootAnimations() {
  setTimeout(() => {
    // Headlines - clip-path curtain (NO word-split)
    document.querySelectorAll('.title-l').forEach((el) => revealHeadline(el, 0.05));
    document.querySelectorAll('.title-m').forEach((el) => revealHeadline(el, 0));
    document.querySelectorAll('.title-s').forEach((el) => revealHeadline(el, 0));

    // Body + label fade-slides
    document.querySelectorAll('.body-s, .body-m').forEach((el) => revealFade(el));
    document.querySelectorAll('.label').forEach((el) => revealFade(el, { y: 14, duration: 0.5, blur: false }));

    // Grid reveals (cards, chips, etc.)
    document.querySelectorAll('[data-grid-reveal]').forEach((g) => revealGrid(g));

    // Tilt
    document.querySelectorAll('[data-tilt]').forEach((el) => applyTilt(el));

    // Magnetic CTAs
    document.querySelectorAll('.cta-main').forEach((el) => applyMagnetic(el));

    // Counters
    document.querySelectorAll('[data-count]').forEach((el) => animateCounter(el));

    // Marquees
    initMarquees();

    // Background scrub on dark sections
    initSectionScrubs();

    // Cursor spotlight
    initCursorSpotlight();

    ScrollTrigger.refresh();
  }, 250);
}

export {
  gsap,
  ScrollTrigger,
  revealHeadline,
  revealFade,
  revealGrid,
  parallax,
  applyTilt,
  applyMagnetic,
  animateCounter,
  initHorizontalScrub,
};
