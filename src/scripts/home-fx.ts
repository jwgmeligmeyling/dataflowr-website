/**
 * Home page effects — ported from the "DataFlowr Landing v4" prototype logic:
 *  - hero neural-network ("brain") canvas with firing pulses + mouse parallax
 *  - blurred logo nebula parallax (hero + CTA)
 *  - scroll reveals on [data-reveal]
 *  - cursor-aware glow on bento tiles [data-tile-glow]
 * Honors prefers-reduced-motion.
 */

interface BrainNode {
  p: [number, number, number];
  r: number;
  col: 'pos' | 'bg' | 'hl';
  glow: number;
}
interface Pulse {
  e: number;
  from: number;
  to: number;
  p: number;
  sp: number;
  en: number;
  sig: boolean;
}
interface BrainState {
  nodes: BrainNode[];
  edges: [number, number][];
  adj: { to: number; e: number }[][];
  pulses: Pulse[];
  nextFire: number;
}

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

function rgbOf(hex: string): string {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

function mkBrain(): BrainState {
  const NB = 96;
  const nodes: BrainNode[] = [];
  for (let i = 0; i < NB; i++) {
    let x = 0, y = 0, z = 0, L = 0;
    do {
      x = rnd(-1, 1); y = rnd(-1, 1); z = rnd(-1, 1);
      L = Math.sqrt(x * x + y * y + z * z);
    } while (L < 0.3 || L > 1);
    const sh = 0.68 + 0.32 * Math.sqrt(L);
    x = (x / L) * sh; y = (y / L) * sh; z = (z / L) * sh;
    y *= 0.78; z *= 1.24;
    if (Math.abs(x) < 0.13) x += (x >= 0 ? 1 : -1) * 0.13;
    y -= 0.07 * Math.cos(z * 2.2);
    nodes.push({ p: [x, y, z], r: rnd(1.3, 3.4), col: i % 6 === 2 ? 'pos' : i % 3 === 0 ? 'bg' : 'hl', glow: 0 });
  }
  const cand: [number, number, number][] = [];
  for (let a = 0; a < NB; a++) {
    for (let b = a + 1; b < NB; b++) {
      const A = nodes[a].p, B = nodes[b].p;
      const dx = A[0] - B[0], dy = A[1] - B[1], dz = A[2] - B[2];
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 < 0.17) cand.push([d2, a, b]);
    }
  }
  cand.sort((u, v) => u[0] - v[0]);
  const edges = cand.slice(0, 190).map((c) => [c[1], c[2]] as [number, number]);
  const adj: { to: number; e: number }[][] = nodes.map(() => []);
  edges.forEach((e, i) => {
    adj[e[0]].push({ to: e[1], e: i });
    adj[e[1]].push({ to: e[0], e: i });
  });
  return { nodes, edges, adj, pulses: [], nextFire: 0.15 };
}

type Colors = Record<'hl' | 'pos' | 'bg' | 'signal', string>;

function drawBrain(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number,
  dt: number,
  C: Colors,
  st: BrainState,
  m: { x: number; y: number },
) {
  const cx = W * 0.74, cy = H * 0.52, SC = Math.min(W * 0.5, H) * 0.46, F = 5;
  const rot = t * 0.09 + m.x * 0.8;
  const tilt = -0.1 - m.y * 0.45;
  const cr = Math.cos(rot), sr = Math.sin(rot);
  const ct = Math.cos(tilt), stt = Math.sin(tilt);
  const pts = st.nodes.map((nd) => {
    const p = nd.p;
    const x1 = p[0] * cr + p[2] * sr;
    const z1 = -p[0] * sr + p[2] * cr;
    const y2 = p[1] * ct - z1 * stt;
    const z2 = p[1] * stt + z1 * ct;
    const s = F / (F + z2 * 1.6);
    return { nd, z: z2, s, x: cx + x1 * s * SC, y: cy + y2 * s * SC, near: Math.max(0, Math.min(1, (1 - z2 / 1.35) / 2)) };
  });
  st.nextFire -= dt;
  if (st.nextFire <= 0) {
    st.nextFire = rnd(0.22, 0.55);
    const n = (Math.random() * st.nodes.length) | 0;
    st.nodes[n].glow = 1;
    for (const lk of st.adj[n]) {
      if (st.pulses.length < 90) st.pulses.push({ e: lk.e, from: n, to: lk.to, p: 0, sp: rnd(1.1, 2.0), en: 1, sig: Math.random() < 0.05 });
    }
  }
  const act = new Float32Array(st.edges.length);
  const alive: Pulse[] = [];
  for (const pu of st.pulses) {
    pu.p += pu.sp * dt;
    if (pu.p >= 1) {
      const tgt = st.nodes[pu.to];
      tgt.glow = Math.max(tgt.glow, 0.85 * pu.en);
      if (pu.en > 0.4) {
        let spawned = 0;
        for (const lk of st.adj[pu.to]) {
          if (lk.to === pu.from) continue;
          if (Math.random() < 0.4 && st.pulses.length + alive.length < 90 && spawned < 2) {
            alive.push({ e: lk.e, from: pu.to, to: lk.to, p: 0, sp: rnd(1.1, 2.0), en: pu.en * 0.55, sig: pu.sig });
            spawned++;
          }
        }
      }
    } else {
      act[pu.e] = Math.max(act[pu.e], pu.en * (1 - pu.p * 0.4));
      alive.push(pu);
    }
  }
  st.pulses = alive;
  for (let i = 0; i < st.edges.length; i++) {
    const ed = st.edges[i];
    const A = pts[ed[0]], B = pts[ed[1]];
    const al = 0.025 + 0.085 * ((A.near + B.near) / 2) + act[i] * 0.3;
    ctx.strokeStyle = `rgba(${C.hl},${Math.min(0.5, al).toFixed(3)})`;
    ctx.lineWidth = 0.6 + act[i] * 0.8;
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.stroke();
  }
  for (const pu of st.pulses) {
    const A = pts[pu.from], B = pts[pu.to];
    const px = A.x + (B.x - A.x) * pu.p;
    const py = A.y + (B.y - A.y) * pu.p;
    const c = pu.sig ? C.signal : C.hl;
    ctx.fillStyle = `rgba(${c},${(0.35 * pu.en).toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(px, py, 3.6, 0, 6.284);
    ctx.fill();
    ctx.fillStyle = `rgba(${pu.sig ? C.signal : C.bg},${(0.9 * pu.en).toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(px, py, 1.6, 0, 6.284);
    ctx.fill();
  }
  const sorted = pts.slice().sort((a, b) => b.z - a.z);
  for (const P of sorted) {
    const nd = P.nd;
    nd.glow *= Math.exp(-dt * 2.1);
    const c = C[nd.col];
    if (nd.glow > 0.03) {
      ctx.fillStyle = `rgba(${C.bg},${(nd.glow * 0.4).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(P.x, P.y, nd.r * P.s * (1.6 + nd.glow * 2.4), 0, 6.284);
      ctx.fill();
    }
    ctx.fillStyle = `rgba(${c},${(0.28 + 0.62 * P.near + nd.glow * 0.1).toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(P.x, P.y, nd.r * P.s * (1 + nd.glow * 0.5), 0, 6.284);
    ctx.fill();
  }
}

function setupReveals(reduced: boolean) {
  const io = new IntersectionObserver(
    (ents) => {
      for (const en of ents) {
        if (!en.isIntersecting) continue;
        const el = en.target as HTMLElement;
        io.unobserve(el);
        if (el.dataset.dfDone) continue;
        el.dataset.dfDone = '1';
        if (!reduced) {
          const d = parseFloat(el.getAttribute('data-reveal') || '0') || 0;
          el.animate(
            [{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'none' }],
            { duration: 800, delay: d, easing: 'cubic-bezier(0.16,1,0.3,1)', fill: 'backwards' },
          );
        }
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -6% 0px' },
  );
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (!el.dataset.dfDone) io.observe(el);
  });
}

export function initHomeFx() {
  const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  setupReveals(reduced);

  // Cursor-aware glow on bento tiles.
  document.querySelectorAll<HTMLElement>('[data-tile-glow]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  if (reduced) return;

  const mouse = { x: (window.innerWidth || 1280) / 2, y: -600 };
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

  const root = document.documentElement;
  const cvar = (n: string, fb: string) => getComputedStyle(root).getPropertyValue(n).trim() || fb;
  const C: Colors = {
    hl: rgbOf(cvar('--heroAccent', cvar('--hl', '#1B5FB3'))),
    pos: rgbOf(cvar('--pos', '#4DCBC9')),
    bg: rgbOf(cvar('--bg', '#F3F6F8')),
    signal: rgbOf(cvar('--signal', '#FF301D')),
  };

  // Smoothed local mouse offset per element.
  const locals = new Map<string, { x: number; y: number }>();
  const mloc = (el: Element | null, key: string, dt: number) => {
    let s = locals.get(key);
    if (!s) { s = { x: 0, y: 0 }; locals.set(key, s); }
    if (!el) return s;
    const r = el.getBoundingClientRect();
    const inR = mouse.x > r.left - 140 && mouse.x < r.right + 140 && mouse.y > r.top - 140 && mouse.y < r.bottom + 140;
    const tx = inR ? Math.max(-0.7, Math.min(0.7, (mouse.x - (r.left + r.width / 2)) / r.width)) : 0;
    const ty = inR ? Math.max(-0.7, Math.min(0.7, (mouse.y - (r.top + r.height / 2)) / r.height)) : 0;
    const k = Math.min(1, dt * 5);
    s.x += (tx - s.x) * k;
    s.y += (ty - s.y) * k;
    return s;
  };

  const hero = document.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
  const nebHero = document.querySelector<HTMLElement>('[data-nebula="hero"]');
  const nebCta = document.querySelector<HTMLElement>('[data-nebula="cta"]');
  const brain = mkBrain();

  const fit = (cv: HTMLCanvasElement) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = cv.getBoundingClientRect();
    const W = Math.max(1, r.width), H = Math.max(1, r.height);
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
    }
    return { W, H, dpr };
  };
  const onScreen = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.bottom > -60 && r.top < (window.innerHeight || 800) + 60;
  };

  let last = performance.now();
  const step = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = now / 1000;
    if (hero && hero.isConnected && onScreen(hero)) {
      const { W, H, dpr } = fit(hero);
      const ctx = hero.getContext('2d')!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const m = mloc(hero, 'mh', dt);
      drawBrain(ctx, W, H, t, dt, C, brain, m);
    }
    if (nebHero && nebHero.isConnected) {
      const m = mloc(nebHero.parentElement, 'mnb', dt);
      nebHero.style.transform = `translate3d(${(m.x * -22).toFixed(1)}px,${(m.y * -16).toFixed(1)}px,0)`;
    }
    if (nebCta && nebCta.isConnected) {
      const m = mloc(nebCta.parentElement, 'mnc', dt);
      nebCta.style.transform = `translate3d(${(m.x * -18).toFixed(1)}px,${(m.y * -12).toFixed(1)}px,0)`;
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
