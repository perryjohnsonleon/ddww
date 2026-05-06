// ── DATA ───────────────────────────────────────────────────────────────────
const stockId_list1=['2330','2454','2308','2317','2303','2356','2357','2353','1102','2324','2344','2408','6770','2337','2347','2371','1504','2891','2887','2884','00982A','00980A','00981A','0050','0056'];
const stockId_list2=['2330','2454','3661','3443','2303','2606','9940','3042','2603','1713','2609','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'] ;
const stockId_list3=['2882','2887','2891','2881','2884','2883','2892','2886','2838','2885','2890','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
const stockId_list4=['2603','2606','2605','2609','2610','2618','2615','2633','2645','2646','2634','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
const stockId_list5=['1301','1303','1325','1326','1314','1307','1304','1310','1308','1312','1313','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
const stockId_list6=['2027','2002','2014','2006','2010','2008','2009','2032','2010','2211','9958','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
const stockId_list7=['2501','2504','2528','2542','5522','2515','2520','2539','2536','2540','2505','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
const stockId_list8=['1402','1409','1413','1414','1417','1418','1419','1419','1434','1440','1441','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
const stockId_list9=['1216','1210','1215','1229','1217','1218','1201','1702','1203','1737','3054','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
const stockId_list10=['1903','1904','1905','1906','1907','1909','6790','6790','6790','6790','6790','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
const stockId_list11=['6214','2427','2453','2468','2471','2480','3029','4994','5203','6112','6183','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
const MAIN = { sym: '宏碁(一)', name: '2353', price: 213.42 };

const MARKETS = [
  { sym: '加權指數',  name: 'NASDAQ 100',     sub: 'US Index',    price: 18680.14 },
];

// ── STATE ──────────────────────────────────────────────────────────────────
const state = {
  main: { ...MAIN, open: MAIN.price, high: MAIN.price, low: MAIN.price, change: 0 },
  markets: MARKETS.map(m => ({ ...m, change: 0, spark: [] })),
  history: Array.from({ length: 80 }, (_, i) => {
    const t = MAIN.price * (1 + (Math.random() - 0.5) * 0.04);
    return MAIN.price + (t - MAIN.price) * (i / 80);
  }),
};

// seed sparks
state.markets.forEach(m => {
  m.spark = Array.from({ length: 20 }, () => m.price * (1 + (Math.random() - 0.5) * 0.02));
});

// ── CHART ──────────────────────────────────────────────────────────────────
const canvas = document.getElementById('mainChart');
const ctx = canvas.getContext('2d');
let animFrame;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 200 * dpr;
  canvas.style.height = '200px';
  ctx.scale(dpr, dpr);
  drawChart();
}

function drawChart() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);

  const data = state.history;
  if (data.length < 2) return;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = { top: 10, bottom: 24, left: 8, right: 8 };

  const xStep = (w - pad.left - pad.right) / (data.length - 1);
  const yScale = (h - pad.top - pad.bottom) / range;
  const pt = (i) => ({
    x: pad.left + i * xStep,
    y: pad.top + (max - data[i]) * yScale
  });

  const isGain = data[data.length - 1] >= data[0];
  const lineColor = isGain ? '#ff1744' : '#00e676';
  const fillColor = isGain ? 'rgba(255,23,68,' : 'rgba(0,230,118,';

  // Area fill
  const grad = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
  grad.addColorStop(0, fillColor + '0.18)');
  grad.addColorStop(1, fillColor + '0)');

  ctx.beginPath();
  ctx.moveTo(pt(0).x, h - pad.bottom);
  ctx.lineTo(pt(0).x, pt(0).y);
  for (let i = 1; i < data.length; i++) {
    const p0 = pt(i - 1), p1 = pt(i);
    const cx = (p0.x + p1.x) / 2;
    ctx.bezierCurveTo(cx, p0.y, cx, p1.y, p1.x, p1.y);
  }
  ctx.lineTo(pt(data.length - 1).x, h - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(pt(0).x, pt(0).y);
  for (let i = 1; i < data.length; i++) {
    const p0 = pt(i - 1), p1 = pt(i);
    const cx = (p0.x + p1.x) / 2;
    ctx.bezierCurveTo(cx, p0.y, cx, p1.y, p1.x, p1.y);
  }
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;
  ctx.shadowColor = lineColor;
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Last dot
  const last = pt(data.length - 1);
  ctx.beginPath();
  ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = lineColor;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(last.x, last.y, 7, 0, Math.PI * 2);
  ctx.fillStyle = fillColor + '0.3)';
  ctx.fill();

  // Open price midline
  const openPrice = state.main.open;
  const clampedOpen = Math.min(Math.max(openPrice, min), max);
  const openY = pad.top + (max - clampedOpen) * yScale;
  ctx.beginPath();
  ctx.setLineDash([4, 6]);
  ctx.moveTo(pad.left, openY);
  ctx.lineTo(w - pad.right, openY);
  ctx.strokeStyle = 'rgba(180,190,220,0.35)';
  ctx.lineWidth = 1;
  ctx.shadowBlur = 0;
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '9px DM Mono';
  ctx.fillStyle = 'rgba(180,190,220,0.45)';
  ctx.textAlign = 'left';
  ctx.fillText('OPEN  $' + openPrice.toFixed(2), pad.left + 4, openY - 4);

  // Price labels y-axis
  ctx.font = '10px DM Mono';
  ctx.fillStyle = 'rgba(74,80,104,0.9)';
  ctx.textAlign = 'right';
  [0.25, 0.5, 0.75].forEach(t => {
    const val = min + range * t;
    const y = pad.top + (max - val) * yScale;
    ctx.fillText('$' + val.toFixed(2), w - 2, y + 4);
  });
}

// ── SPARKS ─────────────────────────────────────────────────────────────────
function drawSpark(svgEl, data, isGain) {
  const W = 60, H = 24;
  const min = Math.min(...data), max = Math.max(...data), rng = max - min || 1;
  const xStep = W / (data.length - 1);
  const pts = data.map((v, i) => `${i * xStep},${H - ((v - min) / rng) * (H - 2) - 1}`).join(' ');
  const color = isGain ? '#ff1744' : '#00e676';
  svgEl.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

// ── RENDER ─────────────────────────────────────────────────────────────────
function renderMain() {
  const m = state.main;
  const isGain = m.change >= 0;

  const priceEl = document.getElementById('mainPrice');
  priceEl.textContent = '$' + m.price.toFixed(2);
  priceEl.classList.remove('price-tick');
  void priceEl.offsetWidth;
  priceEl.classList.add('price-tick');

  const changeBlock = document.getElementById('priceChange');
  changeBlock.className = 'price-change ' + (isGain ? 'gain' : 'loss');
  document.getElementById('changeVal').textContent = (isGain ? '+' : '') + m.change.toFixed(2);
  document.getElementById('changePct').textContent =
    '(' + (isGain ? '+' : '') + ((m.change / m.open) * 100).toFixed(2) + '%)';

  document.getElementById('statOpen').textContent = '$' + m.open.toFixed(2);
  document.getElementById('statHigh').textContent = '$' + m.high.toFixed(2);
  document.getElementById('statLow').textContent = '$' + m.low.toFixed(2);

  drawChart();
}

function renderMarkets() {
  const list = document.getElementById('marketList');
  list.innerHTML = '';
  state.markets.forEach((m, idx) => {
    const isGain = m.change >= 0;
    const row = document.createElement('div');
    row.className = 'market-row';
    row.id = 'mrow-' + idx;

    const sparkEl = document.createElement('span');
    sparkEl.className = 'mini-spark';
    drawSpark(sparkEl, m.spark, isGain);

    row.innerHTML = `
      <div class="market-name-col">
        <div class="name">${m.sym}</div>
      </div>
      <div class="market-price-col" id="mprice-${idx}">$${m.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      <div class="market-change-col ${isGain ? 'gain-text' : 'loss-text'}" id="mchange-${idx}">
        ${isGain ? '+' : ''}${m.change.toFixed(2)}<br>
        <span style="font-size:0.62rem;opacity:0.7">${isGain ? '+' : ''}${((m.change / (m.price - m.change)) * 100).toFixed(2)}%</span>
      </div>
    `;

    const nameCol = row.querySelector('.market-name-col .name');
    const sparkWrap = document.createElement('span');
    sparkWrap.style.cssText = 'display:flex;align-items:center;gap:4px';
    sparkWrap.appendChild(sparkEl);
    const nameText = document.createElement('span');
    nameText.textContent = m.sym;
    sparkWrap.appendChild(nameText);
    row.querySelector('.market-name-col').firstElementChild.replaceWith(sparkWrap);

    list.appendChild(row);
  });
}

// ── UPDATE ─────────────────────────────────────────────────────────────────
function tick() {
  // Main stock update
  const volatility = 0.0012;
  const drift = (Math.random() - 0.499) * volatility;
  state.main.price = parseFloat((state.main.price * (1 + drift)).toFixed(2));
  state.main.change = parseFloat((state.main.price - state.main.open).toFixed(2));
  if (state.main.price > state.main.high) state.main.high = state.main.price;
  if (state.main.price < state.main.low) state.main.low = state.main.price;
  state.history.push(state.main.price);
  if (state.history.length > 120) state.history.shift();
  renderMain();

  // Market rows update
  state.markets.forEach((m, idx) => {
    const d = (Math.random() - 0.499) * 0.0015;
    m.price = parseFloat((m.price * (1 + d)).toFixed(2));
    m.change = parseFloat((m.change + m.price * d).toFixed(2));
    m.spark.push(m.price);
    if (m.spark.length > 20) m.spark.shift();

    const isGain = m.change >= 0;
    const priceEl = document.getElementById('mprice-' + idx);
    const changeEl = document.getElementById('mchange-' + idx);
    const rowEl = document.getElementById('mrow-' + idx);

    if (priceEl) {
      priceEl.textContent = '$' + m.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      priceEl.className = 'market-price-col';
    }
    if (changeEl) {
      changeEl.className = 'market-change-col ' + (isGain ? 'gain-text' : 'loss-text');
      changeEl.innerHTML = `${isGain ? '+' : ''}${m.change.toFixed(2)}<br>
        <span style="font-size:0.62rem;opacity:0.7">${isGain ? '+' : ''}${Math.abs((m.change / (m.price - m.change || 1)) * 100).toFixed(2)}%</span>`;
    }
    if (rowEl) {
      rowEl.classList.remove('flash-gain', 'flash-loss');
      void rowEl.offsetWidth;
      rowEl.classList.add(isGain ? 'flash-gain' : 'flash-loss');

      // Redraw spark
      const sparkEl = rowEl.querySelector('.mini-spark');
      if (sparkEl) drawSpark(sparkEl, m.spark, isGain);
    }
  });
}

// ── RANGE BUTTONS ──────────────────────────────────────────────────────────
document.querySelectorAll('.range-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── INIT ───────────────────────────────────────────────────────────────────
// Seed open slightly below current price
state.main.open = parseFloat((MAIN.price * (1 - Math.random() * 0.01)).toFixed(2));
state.main.high = parseFloat((MAIN.price * (1 + Math.random() * 0.008)).toFixed(2));
state.main.low = parseFloat((MAIN.price * (1 - Math.random() * 0.008)).toFixed(2));
state.main.change = parseFloat((state.main.price - state.main.open).toFixed(2));

// Seed market changes
state.markets.forEach(m => {
  m.change = parseFloat(((Math.random() - 0.48) * m.price * 0.015).toFixed(2));
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
renderMain();
renderMarkets();
setInterval(tick, 3000);