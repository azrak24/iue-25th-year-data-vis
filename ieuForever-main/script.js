/* ════════════════════════════════════════════════════════
   IEU ACADEMIC STAFF — DYNAMIC JSON, 5 TOTAL BRANCHES
   ────────────────────────────────────────────────────────
   Structure:
   • Reads ALL YEARS from local JSON file
   • 5 radial lines = 5 Staff Types (Totals combined)
   • DYNAMIC CLUSTERING: First batch uses YEARS_FIRST_BATCH years per ring,
     remaining rings use YEARS_SECOND_BATCH years per ring.
   • Generalized Exact Dynamic Collision Prevention (Radius-based pushing) with tight gaps.
   • EXPONENTIAL ring spread (POWER parameter).
   • 10s are full thick rings, 1s are 36-degree arc segments!

   ── PARAMETRIC RING GROUPING ──────────────────────────
   Change these two values to adjust how many years are
   packed into each ring tier.
   ════════════════════════════════════════════════════════ */

/* How many years are grouped in the FIRST batch of rings (innermost) */
const YEARS_FIRST_BATCH = 4;
/* How many years are grouped in the SECOND batch of rings (outer) */
const YEARS_SECOND_BATCH = 5;
/* How many rings belong to the first batch */
const N_RINGS_FIRST_BATCH = 5;

let DATA = [];
let N_YEARS = 0;

/* ── STALKS: 5 lines for 5 Academic Ranks ──

const STALKS = [
  { label: 'Professor', key: 'PT', col: '#e67e22', rankLabel: 'Professor', angleDeg: 198 },
  { label: 'Assoc. Prof.', key: 'AT', col: '#e74c3c', rankLabel: 'Assoc. Prof.', angleDeg: 126 },
  { label: 'Doctor', key: 'DT', col: '#3498db', rankLabel: 'Doctor', angleDeg: 54 },
  { label: 'Lecturer', key: 'LT', col: '#2ecc71', rankLabel: 'Lecturer', angleDeg: 342 },
  { label: 'Researcher', key: 'RT', col: '#9b59b6', rankLabel: 'Researcher', angleDeg: 270 }
];
*/
const STALKS = [
  { label: 'Professor', key: 'PT', col: '#e67e22', rankLabel: 'Professor', angleDeg: 201 },
  { label: 'Associate Prof.', key: 'AT', col: '#e74c3c', rankLabel: 'Assoc. Prof.', angleDeg: 146 },
  { label: 'Assistant Prof.', key: 'DT', col: '#3498db', rankLabel: 'Doctor', angleDeg: 88 },
  { label: 'Lecturer', key: 'LT', col: '#2ecc71', rankLabel: 'Lecturer', angleDeg: 3 },
  { label: 'Researcher', key: 'RT', col: '#9b59b6', rankLabel: 'Researcher', angleDeg: 270 }
];

/**
 * SINGLE SOURCE OF TRUTH for ring grouping.
 * Given a year index (yi), returns:
 *   { ringIndex, posInRing, startYi, itemsInGroup }
 *
 * First N_RINGS_FIRST_BATCH rings hold YEARS_FIRST_BATCH years each.
 * All subsequent rings hold YEARS_SECOND_BATCH years each.
 */
function getYearGroup(yi, nYears) {
  const firstBatchTotal = N_RINGS_FIRST_BATCH * YEARS_FIRST_BATCH;

  if (yi < firstBatchTotal) {
    // In the first batch
    const ringIndex = Math.floor(yi / YEARS_FIRST_BATCH);
    const posInRing = yi % YEARS_FIRST_BATCH;
    const startYi = ringIndex * YEARS_FIRST_BATCH;
    const itemsInGroup = Math.min(YEARS_FIRST_BATCH, nYears - startYi);
    return { ringIndex, posInRing, startYi, itemsInGroup };
  } else {
    // In the second batch
    const offsetYi = yi - firstBatchTotal;
    const ringIndex = N_RINGS_FIRST_BATCH + Math.floor(offsetYi / YEARS_SECOND_BATCH);
    const posInRing = offsetYi % YEARS_SECOND_BATCH;
    const startYi = firstBatchTotal + (ringIndex - N_RINGS_FIRST_BATCH) * YEARS_SECOND_BATCH;
    const itemsInGroup = Math.min(YEARS_SECOND_BATCH, nYears - startYi);
    return { ringIndex, posInRing, startYi, itemsInGroup };
  }
}

/** Total number of rings needed for nYears years. */
function calcNRings(nYears) {
  const firstBatchTotal = N_RINGS_FIRST_BATCH * YEARS_FIRST_BATCH;
  if (nYears <= firstBatchTotal) {
    return Math.ceil(nYears / YEARS_FIRST_BATCH);
  }
  return N_RINGS_FIRST_BATCH + Math.ceil((nYears - firstBatchTotal) / YEARS_SECOND_BATCH);
}

/* ── SVG HELPERS ── */
const SVG_NS = 'http://www.w3.org/2000/svg';

function el(tag, attrs = {}) {
  const e = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  return e;
}

function txt(parent, x, y, content, size, weight, color, anchor, letterSpacing) {
  const t = el('text', {
    x, y,
    'text-anchor': anchor || 'middle',
    'dominant-baseline': 'middle',
    'font-family': "'Bricolage Grotesque', sans-serif",
    'font-size': size || 10,
    'font-weight': weight || 400,
    'letter-spacing': letterSpacing || '0.04em',
    fill: color || '#1a1714'
  });
  t.textContent = content;
  parent.appendChild(t);
  return t;
}

function formatYear(yStr) {
  if (!yStr) return '';
  const parts = yStr.split('-');
  if (parts.length === 2) {
    return parts[0] + '–' + parts[1].slice(-2);
  }
  return yStr;
}

/* ── DATA FETCHING & INIT ── */
async function loadDataAndInit() {
  try {
    const res = await fetch('ieuForeverData_staffRegistered_revised.json');
    const rawData = await res.json();

    rawData.reverse();

    DATA = rawData.map(d => ({
      y: formatYear(d['Academic Year']),
      PT: Number(d['Professor_T']) || 0,
      AT: Number(d['A. Professor_T']) || 0,
      DT: Number(d['Doctor_T']) || 0,
      LT: Number(d['Lecturer_T']) || 0,
      RT: Number(d['Researcher_T']) || 0
    }));

    N_YEARS = DATA.length;

    buildLegend();
    buildViz();
    buildTooltip();
  } catch (err) {
    console.error('Error loading JSON data:', err);
    document.getElementById('legend').textContent = "Veri yüklenemedi. JSON dosyasının ismini ve yolunu kontrol edin.";
  }
}

/* ── MAIN BUILD ── */
function buildViz() {
  /* ── GLOBAL SCALE FACTOR ─────────────────────────────────
     Change this one value to uniformly resize the whole graph.
     1.0 = original size, 0.8 = 80% (smaller), 1.15 = 15% bigger, etc. */
  const SCALE = 1;

  const W = 1800 * SCALE;
  const H = 1800 * SCALE;
  const CX = W / 2;
  const CY = H / 2;

  const RING_MIN = 100 * SCALE;
  const RING_MAX = 600 * SCALE;

  /* Ring count — derived from parametric constants via calcNRings() */
  const N_RINGS = calcNRings(N_YEARS);

  /* Üssel Yörünge Aralığı (Dışa doğru açılmayı belirler) */
  const POWER = 1.38 * SCALE;

  const ringRadii = Array.from({ length: N_RINGS }, (_, i) => {
    const normalized = i / Math.max(1, N_RINGS - 1);
    const curved = Math.pow(normalized, POWER);
    return RING_MIN + curved * (RING_MAX - RING_MIN);
  });

  /* ── GLOBAL ROTATION OFFSET ──────────────────────────────
       Tüm grafiği döndürmek için bu değeri değiştirin (derece cinsinden) */
  const GLOBAL_ANGLE_OFFSET = 0;
  // Açıları radyana çevirirken bu ortak offset değerini ekliyoruz:
  const stalkAngles = STALKS.map(s => (s.angleDeg + GLOBAL_ANGLE_OFFSET) * Math.PI / 180);

  const STALK_LEN = RING_MAX + 55 * SCALE;

  const svg = document.getElementById('main-svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('width', W);
  svg.setAttribute('height', H);
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  svg.appendChild(el('rect', { x: 0, y: 0, width: W, height: H, fill: '#F4EEDB' }));

  const ringLayer = el('g', { id: 'rings' });
  const stalkLayer = el('g', { id: 'stalks' });
  const dotLayer = el('g', { id: 'dots' });
  const labelLayer = el('g', { id: 'labels' });
  svg.appendChild(ringLayer);
  svg.appendChild(stalkLayer);
  svg.appendChild(dotLayer);
  svg.appendChild(labelLayer);

  /* ── VERTICAL DIVIDER ── */
  const dividerTop = CY - RING_MAX - 70 * SCALE;
  const dividerBottom = CY + RING_MAX + 70 * SCALE;
  svg.appendChild(el('line', {
    x1: CX, y1: dividerTop,
    x2: CX, y2: dividerBottom,
    stroke: '#1a1714',
    'stroke-width': 0.6 * SCALE,
    'stroke-dasharray': '4 6',
    'stroke-opacity': 0.2
  }));

  /* ── GROUPED YEAR RINGS & VERTICAL TEXT ── */
  ringRadii.forEach((r, i) => {
    ringLayer.appendChild(el('circle', {
      cx: CX, cy: CY, r,
      fill: 'none',
      stroke: '#1a1714',
      'stroke-width': 1,
      'stroke-opacity': 0.1,
      'stroke-dasharray': '20 5'
    }));

    // Use the shared helper — first year index for ring i
    const firstYiForRing = i < N_RINGS_FIRST_BATCH
      ? i * YEARS_FIRST_BATCH
      : N_RINGS_FIRST_BATCH * YEARS_FIRST_BATCH + (i - N_RINGS_FIRST_BATCH) * YEARS_SECOND_BATCH;
    const { startYi, itemsInGroup: itemsInThisGroup } = getYearGroup(firstYiForRing, N_YEARS);
    const endYi = startYi + itemsInThisGroup - 1;

    let labelText = DATA[startYi].y;
    if (startYi !== endYi) {
      const yStart = DATA[startYi].y.split('–')[0];
      const yEnd = DATA[endYi].y.split('–')[1];
      labelText = `${yStart}–${yEnd}`;
    }

    // --- ESKİ YAZI KODU SİLİNDİ, YERİNE YATAY ÇİZGİ VE YENİ YAZI EKLENDİ ---

    // Çizginin solda biteceği nokta (Lejanta yakın bir sınır)
    const lineLeftEdge = 150 * SCALE;

    // Halkanın en altından (CX, CY+r) sola doğru uzanan yatay rehber çizgisi
    labelLayer.appendChild(el('line', {
      x1: CX,
      y1: CY + r,
      x2: lineLeftEdge,
      y2: CY + r,
      stroke: '#1a1714',
      'stroke-width': 0.8 * SCALE,
      'stroke-opacity': 0.3,
      'stroke-dasharray': '6 6' /* Teknik çizim hissiyatı için kesikli çizgi */
    }));

    // Sola yaslı, çizginin ucuna oturtulmuş yıl yazıları
    txt(labelLayer, lineLeftEdge - 20 * SCALE, CY + r, labelText, 16 * SCALE, 600, '#878786', 'end', '0.08em');
  });

  /* ── STRAIGHT GUIDE LINES & LABELS ── */
  STALKS.forEach((s, i) => {
    const ang = stalkAngles[i];
    const tipX = CX + Math.cos(ang) * STALK_LEN;
    const tipY = CY + Math.sin(ang) * STALK_LEN;

    stalkLayer.appendChild(el('line', {
      x1: CX, y1: CY,
      x2: tipX, y2: tipY,
      stroke: s.col,
      'stroke-width': 1 * SCALE,
      'stroke-opacity': 0.15,
      'stroke-linecap': 'round'
    }));

    const labDist = STALK_LEN + 18 * SCALE;
    const lx = CX + Math.cos(ang) * labDist;
    const ly = CY + Math.sin(ang) * labDist;
    const normDeg = ((ang * 180 / Math.PI) + 360) % 360;

    let anchor = 'middle';
    if (normDeg < 90 || normDeg > 270) anchor = 'start';
    else if (normDeg > 90 && normDeg < 270) anchor = 'end';

    txt(labelLayer, lx, ly, s.label, 18 * SCALE, 800, s.col, anchor, '0.07em');
  });

  /* ── DATA RINGS & ORBITING ARCS (Dynamic Center-of-Mass) ── */
  DATA.forEach((d, yi) => {

    // Use the shared helper — single source of truth for ring assignment
    const { ringIndex, posInRing, startYi, itemsInGroup } = getYearGroup(yi, N_YEARS);

    const r = ringRadii[ringIndex];

    STALKS.forEach((s, si) => {
      const baseAng = stalkAngles[si];
      const v = d[s.key] || 0;
      if (v === 0) return;

      const tens = Math.floor(v / 10);
      const ones = v % 10;

      const STEP_R = 3.5 * SCALE;
      const ARC_PAD = 3.5 * SCALE;
      const STROKE_W = 1.8 * SCALE;

      const baseR = tens > 0 ? tens * STEP_R : STEP_R;
      const placementR = baseR + ARC_PAD;
      const totalSize = placementR + STROKE_W;

      function getExactRadius(val) {
        if (!val) return 0;
        const tns = Math.floor(val / 10);
        const bR = tns > 0 ? tns * STEP_R : STEP_R;
        return (bR + ARC_PAD + STROKE_W) * 1.1; // Taşırma toleransı
      }

      /* Kümedeki tüm elemanların yarıçaplarını toplayıp genişlik ağırlığını çıkarma. */
      const groupSizes = [];
      for (let k = 0; k < itemsInGroup; k++) {
        const val = DATA[startYi + k]?.[s.key] || 0;
        groupSizes.push(getExactRadius(val));
      }

      /* Sıkılaştırılmış Yeni Gap (Padding) Hesaplaması */
      const padding = 4 * SCALE + (r * 0.01) + (Math.max(...groupSizes, 0) * 0.15);

      let currentPos = 0;
      const centers = [];
      let validItemsBefore = 0;

      for (let k = 0; k < itemsInGroup; k++) {
        const rad = groupSizes[k];
        if (rad > 0 && validItemsBefore > 0) {
          currentPos += padding;
        }
        centers.push(currentPos + rad);
        if (rad > 0) {
          currentPos += rad * 2;
          validItemsBefore++;
        }
      }

      // Grubun toplam fiziksel genişliğinin ortası (ağırlık merkezi)
      const groupCenter = currentPos / 2 * SCALE;

      // Çizilen elemanın eksen çizgisine olan net sapması
      const offsetArc = centers[posInRing] - groupCenter;

      // Radyan'a çevir
      const theta = offsetArc / r;
      const finalAng = baseAng + theta;

      const cx = CX + Math.cos(finalAng) * r;
      const cy = CY + Math.sin(finalAng) * r;

      const group = el('g', { class: 'data-dot' });
      group.dataset.value = v;
      group.dataset.stalk = s.label;
      group.dataset.rank = s.rankLabel;
      group.dataset.year = d.y;
      group.dataset.col = s.col;

      const hitAreaR = totalSize + 4 * SCALE;
      group.appendChild(el('circle', {
        cx, cy,
        r: hitAreaR,
        fill: 'transparent',
        'pointer-events': 'all'
      }));

      // Kalın 10'luk Daireler 
      for (let i = 0; i < tens; i++) {
        group.appendChild(el('circle', {
          cx, cy,
          r: (i + 1) * STEP_R,
          fill: 'none',
          stroke: s.col,
          'stroke-width': STROKE_W
        }));
      }

      // Görünmez merkez daire
      if (tens === 0) {
        group.appendChild(el('circle', {
          cx, cy,
          r: baseR,
          fill: 'none',
          stroke: 'transparent',
          'stroke-width': STROKE_W
        }));
      }

      // 1'lik Yaylar (Arc Segments - 36 derece)
      if (ones > 0) {
        for (let j = 0; j < ones; j++) {
          const startAngle = -Math.PI / 2 + j * (Math.PI / 5);
          const endAngle = startAngle + (Math.PI / 5) * 0.8;

          const startX = cx + placementR * Math.cos(startAngle);
          const startY = cy + placementR * Math.sin(startAngle);
          const endX = cx + placementR * Math.cos(endAngle);
          const endY = cy + placementR * Math.sin(endAngle);

          const pathD = `M ${startX} ${startY} A ${placementR} ${placementR} 0 0 1 ${endX} ${endY}`;

          group.appendChild(el('path', {
            d: pathD,
            fill: 'none',
            stroke: s.col,
            'stroke-width': STROKE_W,
            'stroke-linecap': 'round'
          }));
        }
      }

      dotLayer.appendChild(group);
    });
  })
}

/* ── LEGEND ── */
function buildLegend() {
  const legend = document.getElementById('legend');
  legend.innerHTML = '';

  const rankGroups = [
    { label: 'Professor', col: '#e67e22' },
    { label: 'Assoc. Prof.', col: '#e74c3c' },
    { label: 'Doctor', col: '#3498db' },
    { label: 'Lecturer', col: '#2ecc71' },
    { label: 'Researcher', col: '#9b59b6' }
  ];

  rankGroups.forEach(r => {
    const group = document.createElement('div');
    group.className = 'leg-group';

    const name = document.createElement('span');
    name.className = 'leg-rank';
    name.textContent = r.label.toUpperCase();
    group.appendChild(name);

    const wrap = document.createElement('div');
    wrap.className = 'leg-swatch';
    wrap.innerHTML = `
      <svg width="24" height="24">
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="${r.col}" stroke-width="1.8"/>
        <path d="M 12 3.5 A 8.5 8.5 0 0 1 17 5.1" fill="none" stroke="${r.col}" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M 18.8 7.1 A 8.5 8.5 0 0 1 20.5 12" fill="none" stroke="${r.col}" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M 19.9 14.7 A 8.5 8.5 0 0 1 17 18.9" fill="none" stroke="${r.col}" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    `;
    group.appendChild(wrap);
    legend.appendChild(group);
  });

  /* ── İKONLU AÇIKLAMALAR (NOTES) ── */
  const noteWrapper = document.createElement('div');
  noteWrapper.className = 'leg-note-wrapper';

  // 1. Madde: Tam Daire (10 Staff)
  const note10 = document.createElement('div');
  note10.className = 'leg-note-item';
  note10.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 18 18">
      <circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" stroke-width="1.8" />
    </svg>
    <span>1 full ring = 10 staff</span>
  `;

  // 2. Madde: Kesikli Daire (1 Staff)
  const note1 = document.createElement('div');
  note1.className = 'leg-note-item';
  note1.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 18 18">
      <circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="3 4" />
    </svg>
    <span>1 arc segment = 1 staff</span>
  `;

  noteWrapper.appendChild(note10);
  noteWrapper.appendChild(note1);
  legend.appendChild(noteWrapper);
}

/* ── TOOLTIP ── */
function buildTooltip() {
  const tt = document.getElementById('tooltip');
  const svg = document.getElementById('main-svg');

  svg.addEventListener('mousemove', e => {
    const dot = e.target.closest && e.target.closest('.data-dot');
    if (!dot) { tt.classList.remove('visible'); return; }

    const { value, rank, year, col } = dot.dataset;
    tt.innerHTML = `
      <strong>${year}</strong>
      <div class="tt-row"><span><span class="tt-swatch" style="background:${col}"></span>${rank}</span></div>
      <div class="tt-row"><span style="color:#c8bfaf;">Total:</span><span>${value}</span></div>`;
    tt.style.left = (e.clientX + 16) + 'px';
    tt.style.top = (e.clientY - 10) + 'px';
    tt.classList.add('visible');
  });

  svg.addEventListener('mouseleave', () => tt.classList.remove('visible'));
}

/* ── EXPORT SVG ── */
function exportSVG() {
  const svg = document.getElementById('main-svg');
  const clone = svg.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const style = document.createElementNS(SVG_NS, 'style');
  style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,600;12..96,800&display=swap'); text { font-family: 'Bricolage Grotesque', sans-serif; }`;
  clone.insertBefore(style, clone.firstChild);

  const serializer = new XMLSerializer();
  const svgStr = '<?xml version="1.0" encoding="UTF-8"?>\n' + serializer.serializeToString(clone);
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'IEU-staff-radial-total.svg'; a.click();
  URL.revokeObjectURL(url);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  loadDataAndInit();
  document.getElementById('export-btn').addEventListener('click', exportSVG);
});