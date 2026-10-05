  window.addEventListener('load',function(){
	const url=window.location.search;
	bccm8nv1y2iyeiwey = atob(url.substring(11));
	lkjlluGrueiuun(bccm8nv1y2iyeiwey);
	document.getElementById("s01").addEventListener("change", function(event) {
	   while(dhfkbhkzuRkg.length) {
		  clearInterval(dhfkbhkzuRkg.pop());
		}
		bccm8nv1y2iyeiwey=event.target.value;	
		if (bccm8nv1y2iyeiwey == 7592584307)	{
			return }  
		else  {
			lkjlluGrueiuun(bccm8nv1y2iyeiwey)
		}	
	});
  }); 
   
  async function hfkjyfgieytbv(bccm8nv1y2iyeiwey) {
	  let fetchUrl_str="" ;
	  if (kxch5ekkskd1dkkwe) {
		  kxch5ekkskd1dkkwe=false;
		  FJSLQDFOKJOUM=bccm8nv1y2iyeiwey
	  }	  
	  try {
		let fetchUrl_str1=CODEX('aHR0cHM6Ly93cy5hcGkuY255ZXMuY29tL3dzL2FwaS92MS9jaGFydGluZy9oaXN0b3J5P3Jlc29sdXRpb249MSZzeW1ib2w9VFdTOg==');
		let fetchUrl_str2=CODEX('OlNUT0NLJnF1b3RlPTE=');
		if (bccm8nv1y2iyeiwey == 7592584307) {
			fetchUrl_str=CODEX('aHR0cHM6Ly93cy5hcGkuY255ZXMuY29tL3dzL2FwaS92MS9jaGFydGluZy9oaXN0b3J5P3N5bWJvbD1UV1M6VFNFMDE6SU5ERVgmcmVzb2x1dGlvbj1EJnF1b3RlPTEmZnJvbT1OYU4mdG89TmFO') 
		} else if (bccm8nv1y2iyeiwey == 0) {			
			fetchUrl_str=CODEX('aHR0cHM6Ly93cy5hcGkuY255ZXMuY29tL3dzL2FwaS92MS9jaGFydGluZy9oaXN0b3J5P3Jlc29sdXRpb249MSZzeW1ib2w9VFdTOlRTRTAxOklOREVYJnF1b3RlPTE=')
		} else {
			fetchUrl_str=fetchUrl_str1 + bccm8nv1y2iyeiwey + fetchUrl_str2
		}
		const response = await fetch(fetchUrl_str); 
	    if  (!response.ok) {
		   throw new Error(`HTTP error!!!! status: ${response.status}`);
		  }
	    else {
		  const result = await response.json();
		  return result; 
	    }
	  } catch (error) {
		console.error('Fetch error:', error);
		return null;
	  }
	 }
 
// seed sparks
 state.markets.forEach(m => {
  m.spark = Array.from({ length: 20 }, () => m.price * (1 + (Math.random() - 0.5) * 0.02));
 });

// ── CHART ──────────────────────────────────────────────────────────────────
 const jkshvuzynby = document.getElementById('mainChart');
 const ctx = jkshvuzynby.getContext('2d');
 let animFrame;

 function hsjkyeWryyehq(bccm8nv1y2iyeiwey) {
  const dpr = window.devicePixelRatio || 1;
  const rect = jkshvuzynby.parentElement.getBoundingClientRect();
  jkshvuzynby.width = rect.width * dpr;
  jkshvuzynby.height = 200 * dpr;
  jkshvuzynby.style.height = '200px';
  ctx.scale(dpr, dpr);
  nxcmnzvqrurew();
 }

 function nxcmnzvqrurew() {
  const w = jkshvuzynby.clientWidth, h = jkshvuzynby.clientHeight;
  ctx.clearRect(0, 0, w, h);
  const data = bmvniiry.bvhyqwip;
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
  // const isGain = data[data.length - 1] >= data[0];
  const isGain = bmvniiry.nxcjcqw.vzsluere >=0 ? true : false ;
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
  ctx.lineWidth = 1;					// 改曲線粗細 *********
  ctx.lineJoin    = 'round';
  ctx.lineCap     = 'round';
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
  const openPrice = bmvniiry.nxcjcqw.jxcxuv;
  const flatPrice = bmvniiry.nxcjcqw.mnvqriuhf;
  const clampedOpen = Math.min(Math.max(flatPrice, min), max);
  const openY = pad.top + (max - clampedOpen) * yScale;
  ctx.beginPath();
  ctx.setLineDash([4, 6]);
  ctx.moveTo(pad.left, openY);
  ctx.lineTo(w - pad.right, openY);
  ctx.strokeStyle = 'rgba(180,190,220,0.35)';
  ctx.lineWidth = 1 ;
  ctx.shadowBlur = 0;
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '9px DM Mono';
  ctx.fillStyle = 'rgba(180,190,220,0.45)';
  ctx.textAlign = 'left';
  ctx.fillText('平盤  $' + flatPrice.toFixed(2), pad.left + 4, openY - 4);
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

 const JDSHFHIU = { sym: '大盤指數', name: '2353', price: 27 };
 const WEUZKFUC = [{ sym: '大盤指數',  name: 'VCJLKU 111', sub: 'JDJFD MNMVN', price: 32722 }];
 const bmvniiry = {
  nxcjcqw: { ...JDSHFHIU, jxcxuv: JDSHFHIU.price, nmcnio: JDSHFHIU.price, pozbwue: JDSHFHIU.price, vzsluere: 0 , mnvqriuhf:0},
  markets: WEUZKFUC.map(m => ({ ...m, change: 0, spark: [] })),
  bvhyqwip: [],
 };
 const mask_item1 = document.getElementById("hiddenMsg1") ;
 const mask_item2 = document.getElementById("hiddenMsg2") ;
 const mask_button = document.getElementById("collapseBtn2") ;
 const CODEX= (str) => {
	  return decodeURIComponent(
		atob(str).split('').map(
		  ch => '%' + ch.charCodeAt(0).toString(16).padStart(2, '0')
		).join('')
	  );
 }
 let bcv4hjyt1tytngn=false,sw_no=1,kxch5ekkskd1dkkwe = true ;     // original value:  true 
 let hvzjskadSnd = 3000 ; 
 let bccm8nv1y2iyeiwey,FJSLQDFOKJOUM , count=0 , btn2_expandId= "";
 let width = 0 , dhfkbhkzuRkg = [] ;
 let mymatrix,wi_o,wi_h,wi_c,wi_cc,wi_t,wi_tt,midline_txt,title_txt,item_price,mid_price=0,min_price=0,max_price=0,incdecPrice,point_no=0;

 async function pokjsk9kb1vkwyuse(bccm8nv1y2iyeiwey) {
	  let itemName,incdecPrice,itemPrice,incdectxtPrice,highPrice,lowPrice,midPrice;
	  const jhksdwhweiyrwr = await hfkjyfgieytbv(bccm8nv1y2iyeiwey);
	  if (jhksdwhweiyrwr) {		  
			const wi_o=jhksdwhweiyrwr.data.o;
			const wi_h=jhksdwhweiyrwr.data.h;
			const wi_c=jhksdwhweiyrwr.data.c;
			const wi_t=jhksdwhweiyrwr.data.t;
			const wi_oo=[...wi_o].reverse();
			const wi_cc=[...wi_c].reverse();
			const wi_tt=[...wi_t].reverse();
			const quote_obj = jhksdwhweiyrwr.data.quote ;
			const m = state.main;
			const isGain = m.change >= 0;
			const priceEl = document.getElementById('mainPrice');
			for ( var n in quote_obj) {
			   if ( n == "200009" ) itemName=quote_obj[n] ;
			   if ( n == "11" ) incdecPrice=quote_obj[n] ;
			   if ( n == "12" ) highPrice=quote_obj[n] ;
			   if ( n == "13" ) lowPrice=quote_obj[n] ;
			   if ( n == "6" ) itemPrice=quote_obj[n] ;
			}
		   if ( incdecPrice>0 ) 
				incdectxtPrice="+" + incdecPrice.toString()
		   else incdectxtPrice= incdecPrice ;
		   midPrice=itemPrice-incdecPrice;
		   m.price=itemPrice;
		   m.change=incdecPrice;		   
		   m.open=wi_oo[0] ;
		   m.high=highPrice ;
		   m.low=lowPrice ;
		   m.flat=midPrice ;
		   priceEl.textContent = '$' + m.price;
		   priceEl.classList.remove('price-tick');
		   void priceEl.offsetWidth;
		   priceEl.classList.add('price-tick');
		   const changeBlock = document.getElementById('priceChange');
		   changeBlock.className = 'price-change ' + (isGain ? 'gain' : 'loss');
		   document.getElementById('changeVal').textContent = (isGain ? '+' : '') + m.change;
		   document.getElementById('changePct').textContent =
			'(' + (isGain ? '+' : '') + ((m.change / m.open) * 100).toFixed(2) + '%)';
		   document.getElementById('statOpen').textContent = '$' + m.open
		   document.getElementById('statHigh').textContent = '$' + m.high;
		   document.getElementById('statLow').textContent = '$' + m.low;
		}
  const m = state.main;
  const isGain = m.change >= 0;

  const priceEl = document.getElementById('mainPrice');
  priceEl.textContent = '$' + m.price;
  priceEl.classList.remove('price-tick');
  void priceEl.offsetWidth;
  priceEl.classList.add('price-tick');

  const changeBlock = document.getElementById('priceChange');
  changeBlock.className = 'price-change ' + (isGain ? 'gain' : 'loss');
  document.getElementById('changeVal').textContent = (isGain ? '+' : '') + m.change;
  document.getElementById('changePct').textContent =
    '(' + (isGain ? '+' : '') + ((m.change / m.open) * 100).toFixed(2) + '%)';
  nxcmnzvqrurew();
}

 async function hdkSsuouePquencc(bccm8nv1y2iyeiwey) {
	  let itemName,incdecPrice,itemPrice,incdectxtPrice,highPrice,lowPrice,flatPrice,midPrice;
	  const jhksdwhweiyrwr = await hfkjyfgieytbv(bccm8nv1y2iyeiwey);
	  if (jhksdwhweiyrwr) {		  
			const wi_o=jhksdwhweiyrwr.data.o;
			const wi_h=jhksdwhweiyrwr.data.h;
			const wi_c=jhksdwhweiyrwr.data.c;
			const wi_t=jhksdwhweiyrwr.data.t;
			const wi_oo=[...wi_o].reverse();
			const wi_cc=[...wi_c].reverse();
			const wi_tt=[...wi_t].reverse();
			const quote_obj = jhksdwhweiyrwr.data.quote ;
			const m = state.main;
			const isGain = m.change >= 0;
			const symName = document.getElementById('sym');
			const priceEl = document.getElementById('mainPrice');
			for ( var n in quote_obj) {
			   if ( n == "200009" ) itemName=quote_obj[n] ;
			   if ( n == "11" ) incdecPrice=quote_obj[n] ;
			   if ( n == "12" ) highPrice=quote_obj[n] ;
			   if ( n == "13" ) lowPrice=quote_obj[n] ;
			   if ( n == "6" ) itemPrice=quote_obj[n] ;
			}
		   if ( incdecPrice>0 ) 
				incdectxtPrice="+" + incdecPrice.toString()
		   else incdectxtPrice= incdecPrice ;
		   midPrice=itemPrice-incdecPrice;
		   m.sys=itemName;
		   m.price=itemPrice ;
		   m.open=wi_oo[0] ;
		   bmvniiry.bvhyqwip=[...wi_c].reverse();
		   m.high=highPrice ;
		   m.low=lowPrice ;
		   m.change=incdecPrice ;
		   m.flat=midPrice;
		   symName.textContent = m.sys ;
		   priceEl.textContent = '$' + m.price;
		   priceEl.classList.remove('price-tick');
		   void priceEl.offsetWidth;
		   priceEl.classList.add('price-tick');
		   const changeBlock = document.getElementById('priceChange');
		   changeBlock.className = 'price-change ' + (isGain ? 'gain' : 'loss');
		   document.getElementById('changeVal').textContent = (isGain ? '+' : '') + m.change;
		   document.getElementById('changePct').textContent =
			'(' + (isGain ? '+' : '') + ((m.change / m.open) * 100).toFixed(2) + '%)';
		   document.getElementById('statOpen').textContent = '$' + m.open;
		   document.getElementById('statHigh').textContent = '$' + m.high;
		   document.getElementById('statLow').textContent = '$' + m.low;
		}
  }

 async function ncn0bchpq6yety(bccm8nv1y2iyeiwey) {
  let itemName,incdecPrice,itemPrice,incdectxtPrice,highPrice,lowPrice;
  const m = state.markets;
  const jhksdwhweiyrwr = await hfkjyfgieytbv(7592584307);
  if (jhksdwhweiyrwr) {
		const wi_o=jhksdwhweiyrwr.data.o;
		const wi_h=jhksdwhweiyrwr.data.h;
		const wi_c=jhksdwhweiyrwr.data.c;
		const wi_t=jhksdwhweiyrwr.data.t;
		const wi_oo=[...wi_o].reverse();
		const wi_cc=[...wi_c].reverse();
		const wi_tt=[...wi_t].reverse();
		const quote_obj = jhksdwhweiyrwr.data.quote ;
		const isGain = m.change >= 0;
		const priceEl = document.getElementById('mainPrice');
		for ( var n in quote_obj) {
		   if ( n == "200009" ) itemName=quote_obj[n] ;
		   if ( n == "11" ) incdecPrice=quote_obj[n] ;
		   if ( n == "12" ) highPrice=quote_obj[n] ;
		   if ( n == "13" ) lowPrice=quote_obj[n] ;
		   if ( n == "6" ) itemPrice=quote_obj[n] ;
		}
	   if ( incdecPrice>0 ) 
			incdectxtPrice="+" + incdecPrice.toString()
	   else incdectxtPrice= incdecPrice ;
	   m.sym="大盤指數";
	   m.price=itemPrice ;
	   m.open=wi_oo[0] ;
	   m.high=highPrice ;
	   m.low=lowPrice ;
	   m.change=incdecPrice ;
  }	 
	const list = document.getElementById('marketList');
	list.innerHTML = '';
	const isGain = m.change >= 0;
	const row = document.createElement('div');
	row.className = 'market-row';
	row.id = 'mrow-0';
	const sparkEl = document.createElement('span');
	sparkEl.className = 'mini-spark';
	// drawSpark(sparkEl, m.spark, isGain);
	row.innerHTML = `
	  <div class="market-name-col">
		<div class="name">${m.sym}</div>
	  </div>
	  <div class="market-price-col" id="mprice-0">$${m.price}</div>
	  <div class="market-change-col ${isGain ? 'gain-text' : 'loss-text'}" id="mchange-0">
		${isGain ? '+' : ''}${m.change}<br>
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
 }

// ── UPDATE ─────────────────────────────────────────────────────────────────
function tick(bccm8nv1y2iyeiwey) {
  // Main stock update
  const volatility = 0.0012;
  const drift = (Math.random() - 0.499) * volatility;
  state.main.price = parseFloat((state.main.price * (1 + drift)).toFixed(2));
  bmvniiry.nxcjcqw.vzsluere = parseFloat((state.main.price - bmvniiry.nxcjcqw.jxcxuv).toFixed(2));
  if (state.main.price > bmvniiry.nxcjcqw.nmcnio) bmvniiry.nxcjcqw.nmcnio = state.main.price;
  if (state.main.price < bmvniiry.nxcjcqw.pozbwue) bmvniiry.nxcjcqw.pozbwue = state.main.price;
  bmvniiry.bvhyqwip.push(state.main.price);
  if (bmvniiry.bvhyqwip.length > 120) bmvniiry.bvhyqwip.shift();
  pokjsk9kb1vkwyuse(bccm8nv1y2iyeiwey);

  // Market rows update
  state.markets.forEach((m, idx) => {
    const d = (Math.random() - 0.499) * 0.0015;
    m.price = parseFloat((m.price * (1 + d)).toFixed(2));
    m.change = parseFloat((m.change + m.price * d).toFixed(2));
    m.spark.push(m.price);
    if (m.spark.length > 20) m.spark.shift();

    const isGain = m.change >= 0;
    const priceEl = document.getElementById('mprice-0');
    const changeEl = document.getElementById('mchange-0');
    const rowEl = document.getElementById('mrow-' + idx);

    if (priceEl) {
      priceEl.textContent = '$' + m.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      priceEl.className = 'market-price-col';
    }
    if (changeEl) {
      changeEl.className = 'market-change-col ' + (isGain ? 'gain-text' : 'loss-text');
      changeEl.innerHTML = `${isGain ? '+' : ''}${m.change}<br>
        <span style="font-size:0.62rem;opacity:0.7">${isGain ? '+' : ''}${Math.abs((m.change / (m.price - m.change || 1)) * 100).toFixed(2)}%</span>`;
    }
    if (rowEl) {
      rowEl.classList.remove('flash-gain', 'flash-loss');
      void rowEl.offsetWidth;
      rowEl.classList.add(isGain ? 'flash-gain' : 'flash-loss');

      // Redraw spark
      const sparkEl = rowEl.querySelector('.mini-spark');
      // if (sparkEl) drawSpark(sparkEl, m.spark, isGain);
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
bmvniiry.nxcjcqw.jxcxuv = parseFloat((JDSHFHIU.price * (1 - Math.random() * 0.01)).toFixed(2));
bmvniiry.nxcjcqw.nmcnio = parseFloat((JDSHFHIU.price * (1 + Math.random() * 0.008)).toFixed(2));
bmvniiry.nxcjcqw.pozbwue = parseFloat((JDSHFHIU.price * (1 - Math.random() * 0.008)).toFixed(2));
bmvniiry.nxcjcqw.vzsluere = parseFloat((state.main.price - bmvniiry.nxcjcqw.jxcxuv).toFixed(2));

// Seed market changes
state.markets.forEach(m => {
  m.change = parseFloat(((Math.random() - 0.48) * m.price * 0.015).toFixed(2));
});

 async function lkjlluGrueiuun(bccm8nv1y2iyeiwey) {
	await hdkSsuouePquencc(bccm8nv1y2iyeiwey);
	await hsjkyeWryyehq(bccm8nv1y2iyeiwey);
	await pokjsk9kb1vkwyuse(bccm8nv1y2iyeiwey);
	await ncn0bchpq6yety(bccm8nv1y2iyeiwey);
    id=setInterval(async() => {
		const marketClosetime = "13:30:00" , marketOpentime = "09:00:00" ; 
		const [h2, m2, s2] = marketClosetime.split(':').map(Number);
		const timeToSeconds2= h2 * 3600 + m2 * 60 + s2 ;
		const [h1, m1, s1] = marketOpentime.split(':').map(Number);
		const timeToSeconds1= h1 * 3600 + m1 * 60 + s1 ;			
		const now = new Date();
		const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();	
		if ((nowSeconds > timeToSeconds1) && (nowSeconds < timeToSeconds2)) {
			if  (bcv4hjyt1tytngn) return;
			await hdkSsuouePquencc(FJSLQDFOKJOUM);
			await hsjkyeWryyehq(FJSLQDFOKJOUM);
			await pokjsk9kb1vkwyuse(FJSLQDFOKJOUM);
			await ncn0bchpq6yety(FJSLQDFOKJOUM);
			// await tick(FJSLQDFOKJOUM);			
		}
		else  { 		 
			return;
		 }	

	  /*
		 const jhksdwhweiyrwr1= await hfkjyfgieytbv(bccm8nv1y2iyeiwey);
		 pokjsk9kb1vkwyuse(bccm8nv1y2iyeiwey);
		 const jhksdwhweiyrwr2= await hfkjyfgieytbv(0);
		 pokjsk9kb1vkwyuse(0);	
	 */
		 bcv4hjyt1tytngn=false ;
	},
   3000);
   dhfkbhkzuRkg.push(id); 
 }   

 window.addEventListener('resize', hsjkyeWryyehq(bccm8nv1y2iyeiwey));
 // setInterval(tick, 3000);