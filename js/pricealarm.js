  window.addEventListener('load',function(){
	    chimeBtn.classList.add('chime-on');
		const url=window.location.search;
		eriyhsdkvbs = atob(url.substring(15));
		bvckjhfiyrwery(eriyhsdkvbs);
	  }); 
	  
  function getAudioCtx(){
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function playChime(times, direction){
    var ctx = getAudioCtx();
    var ascending = [523.25, 659.25, 783.99, 1046.5];
    var notes = direction === 'fall' ? ascending.slice().reverse() : ascending;
    var oscType = direction === 'fall' ? 'triangle' : 'sine';
    var count = Math.min(times, 12);
    for (var i = 0; i < count; i++){
      (function(i){
        var delay = i * 0.72;
        notes.forEach(function(freq, ni){
          var t = ctx.currentTime + delay + ni * 0.11;
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = oscType;
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.18, t + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
          osc.start(t);
          osc.stop(t + 1.8);
          state.activeNodes.push({ osc: osc, gain: gain });

          var osc2 = ctx.createOscillator();
          var gain2 = ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.type = oscType;
          osc2.frequency.setValueAtTime(freq * 2.756, t);
          gain2.gain.setValueAtTime(0, t);
          gain2.gain.linearRampToValueAtTime(0.05, t + 0.01);
          gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
          osc2.start(t);
          osc2.stop(t + 1.0);
          state.activeNodes.push({ osc: osc2, gain: gain2 });
        });
      })(i);
    }
  }

  function silenceAllChimes(){
    var ctx = getAudioCtx();
    var now = ctx.currentTime;
    state.activeNodes.forEach(function(node){
      try {
        node.gain.gain.cancelScheduledValues(now);
        node.gain.gain.setValueAtTime(0, now);
        node.osc.stop(now);
      } catch (e) {}
    });
    state.activeNodes = [];
  }

  function startRinging(dir){
    var r = state.ring[dir];
    if (r.ringing) return;
    r.ringing = true;
    r.endAt = Date.now() + RING_DURATION_MS;
    ringLoop(dir);
  }
  
  function ringLoop(dir){
    var r = state.ring[dir];
    if (!state.chimeOn || Date.now() >= r.endAt){
      r.ringing = false;
      return;
    }
    playChime(12, dir);
    r.timer = setTimeout(function(){ ringLoop(dir); }, 12 * 0.72 * 1000 + 300);
  }
  
  var unywznxchfiuiwre = document.getElementById('priceCanvas');
  var nc0kvhfh1woier = unywznxchfiuiwre.getContext('2d');
  var nxcvkpaedf=false,sw_no=1,xmcbnmnhirye=true,kjnsduurerUew=[];
  var state = {
	sym: '—',  
    price: 0,
    open: 0,
	change: 0,
	flat: 0,
    dayHigh: 0,
    dayLow: 0,
    history: [],
    rise: { enabled: true, target: 10.00, prevHit: false },
    fall: { enabled: false, target: 10.00, prevHit: false },
    chimeOn: true,
    ring: {
      rise: { ringing: false, endAt: 0, timer: null },
      fall: { ringing: false, endAt: 0, timer: null }
    },
    activeNodes: []
  };

  var indices = [
    { base: 10.42, val: 10.32, dec: 0.01, thousands: true },
    { base: 18.47, val: 18.24, dec: 0.01, thousands: true },
    { base: 23.53, val: 23.28, dec: 0.01, thousands: false }
  ];
  var RING_DURATION_MS = 2 * 60 * 1000; 

  /* ============ DOM refs ============ */
  var audioCtx = null;
  var alertBtn = document.getElementById('alertBtn');
  var overlay = document.getElementById('overlay');
  var closeDrawer = document.getElementById('closeDrawer');
  var riseEnabledInput = document.getElementById('riseEnabledInput');
  var fallEnabledInput = document.getElementById('fallEnabledInput');
  var riseTargetInput = document.getElementById('riseTargetInput');
  var fallTargetInput = document.getElementById('fallTargetInput');
  var saveAlert = document.getElementById('saveAlert');
  var chimeBtn = document.getElementById('chimeBtn');
  var chimeLabel = document.getElementById('chimeLabel');  
  var alertBtn = document.getElementById('alertBtn');
  var overlay = document.getElementById('overlay');
  var closeDrawer = document.getElementById('closeDrawer');
  var riseEnabledInput = document.getElementById('riseEnabledInput');
  var fallEnabledInput = document.getElementById('fallEnabledInput');
  var riseTargetInput = document.getElementById('riseTargetInput');
  var fallTargetInput = document.getElementById('fallTargetInput');
  var saveAlert = document.getElementById('saveAlert');
  var chimeBtn = document.getElementById('chimeBtn');
  var chimeLabel = document.getElementById('chimeLabel');
  var riseArmedDot = document.getElementById('riseArmedDot');
  var fallArmedDot = document.getElementById('fallArmedDot');
  var riseStatusLine = document.getElementById('riseStatusLine');
  var fallStatusLine = document.getElementById('fallStatusLine');
  var noAlertLine = document.getElementById('noAlertLine');
  var riseTargetDisplay = document.getElementById('riseTargetDisplay');
  var fallTargetDisplay = document.getElementById('fallTargetDisplay');
  var priceValue = document.getElementById('priceValue');
  var changeBadge = document.getElementById('changeBadge');
  var changeText = document.getElementById('changeText');
  var changeArrow = document.getElementById('changeArrow');
  var symEl = document.getElementById('sym');  
  var dayOpenEl = document.getElementById('dayOpen');
  var dayHighEl = document.getElementById('dayHigh');
  var dayLowEl = document.getElementById('dayLow');
  var riseGaugeRow = document.getElementById('riseGaugeRow');
  var riseGaugeFill = document.getElementById('riseGaugeFill');
  var riseGaugeMarker = document.getElementById('riseGaugeMarker');
  var riseGaugePct = document.getElementById('riseGaugePct');
  var riseGaugeOpen = document.getElementById('riseGaugeOpen');
  var riseGaugeCurrent = document.getElementById('riseGaugeCurrent');
  var riseGaugeTargetVal = document.getElementById('riseGaugeTargetVal');
  var riseGaugeTargetLbl = document.getElementById('riseGaugeTargetLbl');
  var fallGaugeRow = document.getElementById('fallGaugeRow');
  var fallGaugeFill = document.getElementById('fallGaugeFill');
  var fallGaugeMarker = document.getElementById('fallGaugeMarker');
  var fallGaugePct = document.getElementById('fallGaugePct');
  var fallGaugeOpen = document.getElementById('fallGaugeOpen');
  var fallGaugeCurrent = document.getElementById('fallGaugeCurrent');
  var fallGaugeTargetVal = document.getElementById('fallGaugeTargetVal');
  var fallGaugeTargetLbl = document.getElementById('fallGaugeTargetLbl');
  var noGaugeMsg = document.getElementById('noGaugeMsg');
  const CODEX= (str) => {
		  return decodeURIComponent(
			atob(str).split('').map(
			  ch => '%' + ch.charCodeAt(0).toString(16).padStart(2, '0')
			).join('')
		  );
   }

  function stopRinging(dir){
    var r = state.ring[dir];
    r.ringing = false;
    r.endAt = 0;
    if (r.timer) clearTimeout(r.timer);
  }
  
  function stopAllRinging(){
    stopRinging('rise');
    stopRinging('fall');
    silenceAllChimes();
  }

  function syncDrawerFromState(){
    riseEnabledInput.checked = state.rise.enabled;
    riseTargetInput.value = state.rise.target.toFixed(2);
    riseTargetInput.disabled = !state.rise.enabled;
    fallEnabledInput.checked = state.fall.enabled;
    fallTargetInput.value = state.fall.target.toFixed(2);
    fallTargetInput.disabled = !state.fall.enabled;
  }
  
  riseEnabledInput.addEventListener('change', function(){
    riseTargetInput.disabled = !riseEnabledInput.checked;
  });
  
  fallEnabledInput.addEventListener('change', function(){
    fallTargetInput.disabled = !fallEnabledInput.checked;
  });

  alertBtn.addEventListener('click', function(){
    getAudioCtx();
    syncDrawerFromState();
    overlay.classList.add('open');
  });
  
  closeDrawer.addEventListener('click', function(){ overlay.classList.remove('open'); });
  overlay.addEventListener('click', function(e){ if (e.target === overlay) overlay.classList.remove('open'); });

  saveAlert.addEventListener('click', function(){
    var riseOn = riseEnabledInput.checked;
    var fallOn = fallEnabledInput.checked;
    var riseVal = parseFloat(riseTargetInput.value);
    var fallVal = parseFloat(fallTargetInput.value);

    if (riseOn && (isNaN(riseVal) || riseVal <= 0)){
      riseTargetInput.style.borderColor = 'var(--gain)';
      return;
    }
    if (fallOn && (isNaN(fallVal) || fallVal <= 0)){
      fallTargetInput.style.borderColor = 'var(--loss)';
      return;
    }
	
    riseTargetInput.style.borderColor = '';
    fallTargetInput.style.borderColor = '';

    state.rise.enabled = riseOn;
    if (riseOn) state.rise.target = riseVal;
    state.rise.prevHit = false;
    stopRinging('rise');

    state.fall.enabled = fallOn;
    if (fallOn) state.fall.target = fallVal;
    state.fall.prevHit = false;
    stopRinging('fall');

    shdkjhfwueywrr();
    overlay.classList.remove('open');
  });

  chimeBtn.addEventListener('click', function(){
    getAudioCtx();
    state.chimeOn = !state.chimeOn;
    chimeBtn.classList.toggle('chime-on', state.chimeOn);
    chimeLabel.textContent = state.chimeOn ? 'Chime on' : 'Chime off';
    if (!state.chimeOn) stopAllRinging();
  });

  function shdkjhfwueywrr(){
    riseStatusLine.style.display = state.rise.enabled ? 'flex' : 'none';
    fallStatusLine.style.display = state.fall.enabled ? 'flex' : 'none';
    noAlertLine.style.display = (!state.rise.enabled && !state.fall.enabled) ? 'flex' : 'none';

    if (state.rise.enabled){
      riseTargetDisplay.textContent = '$' + state.rise.target.toFixed(2);
      riseArmedDot.className = 'alert-armed-dot ' + (state.rise.prevHit ? 'fired' : 'armed');
    }
    if (state.fall.enabled){		
      fallTargetDisplay.textContent = '$' + state.fall.target.toFixed(2);
      fallArmedDot.className = 'alert-armed-dot ' + (state.fall.prevHit ? 'fired' : 'armed');
    }
  }

  async function getData(eriyhsdkvbs) {
	  let fetchUrl_str="" ;	  
	  if (xmcbnmnhirye) HFDIOVRUEUY=eriyhsdkvbs ;  
	  try {
		let fetchUrl_str1=CODEX('aHR0cHM6Ly93cy5hcGkuY255ZXMuY29tL3dzL2FwaS92MS9jaGFydGluZy9oaXN0b3J5P3Jlc29sdXRpb249MSZzeW1ib2w9VFdTOg==');
		let fetchUrl_str2=CODEX('OlNUT0NLJnF1b3RlPTE=');
		if (eriyhsdkvbs == 58490548385) {
		   fetchUrl_str=CODEX('aHR0cHM6Ly93cy5hcGkuY255ZXMuY29tL3dzL2FwaS92MS9jaGFydGluZy9oaXN0b3J5P3N5bWJvbD1UV1M6VFNFMDE6SU5ERVgmcmVzb2x1dGlvbj1EJnF1b3RlPTEmZnJvbT1OYU4mdG89TmFO') 
		} else if (eriyhsdkvbs == 0) {
			fetchUrl_str=CODEX('aHR0cHM6Ly93cy5hcGkuY255ZXMuY29tL3dzL2FwaS92MS9jaGFydGluZy9oaXN0b3J5P3Jlc29sdXRpb249MSZzeW1ib2w9VFdTOlRTRTAxOklOREVYJnF1b3RlPTE=')
		} else {
			fetchUrl_str=fetchUrl_str1 + eriyhsdkvbs + fetchUrl_str2
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

  async function opdqihchbchmve(eriyhsdkvbs){
	  var itemName,incdecPrice,itemPrice,incdectxtPrice,highPrice,lowPrice,flatPrice,midPrice,change,pct,dirClass;
	  const post = await getData(eriyhsdkvbs);
	  if (post) {			
			const wi_o=post.data.o;
			const wi_h=post.data.h;
			const wi_c=post.data.c;
			const wi_t=post.data.t;
			const wi_oo=[...wi_o].reverse();
			const wi_cc=[...wi_c].reverse();
			const wi_tt=[...wi_t].reverse();
			const quote_obj = post.data.quote ;
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
			if (xmcbnmnhirye) {
				xmcbnmnhirye= false ;
				state.rise.target= midPrice*1.1 ;
				state.fall.target= midPrice*0.9 ;
			}	
		    state.sym=itemName;
		    state.price=itemPrice ;
			state.flat=midPrice ;
		    state.open=wi_oo[0] ;
		    state.history=[...wi_c].reverse();
		    state.dayHigh=highPrice ;
		    state.dayLow=lowPrice ;
			change = incdecPrice ;
			symEl.textContent = state.sym;
			pct = (change / state.open) * 100;
			dirClass = change > 0.001 ? 'up' : (change < -0.001 ? 'down' : '');
			priceValue.textContent = state.price.toFixed(2);
			priceValue.className = 'price-value mono pulse ' + dirClass;
			void priceValue.offsetWidth;
			priceValue.classList.add('pulse');
			changeBadge.className = 'change-badge mono ' + dirClass;
			var sign = change >= 0 ? '+' : '';
			changeText.textContent = sign + change.toFixed(2) + ' (' + sign + pct.toFixed(2) + '%)';
			changeArrow.style.display = dirClass ? 'block' : 'none';
			if (dirClass === 'down'){
			  changeArrow.innerHTML = '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>';
			} else {
			  changeArrow.innerHTML = '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>';
			}			
		}  
  }

  function jhciuayhdyuiywe(){
    symEl.textContent = state.sym;	  
    dayOpenEl.textContent = state.open.toFixed(2);
    dayHighEl.textContent = state.dayHigh.toFixed(2);
    dayLowEl.textContent = state.dayLow.toFixed(2);
  }

  function ncvbureurewior(){
    riseGaugeRow.style.display = state.rise.enabled ? 'block' : 'none';
    fallGaugeRow.style.display = state.fall.enabled ? 'block' : 'none';
    noGaugeMsg.style.display = (!state.rise.enabled && !state.fall.enabled) ? 'block' : 'none';

    if (state.rise.enabled){
      riseGaugeOpen.textContent = state.open.toFixed(2);
      riseGaugeCurrent.textContent = state.price.toFixed(2);
      riseGaugeTargetVal.textContent = '$' + state.rise.target.toFixed(2);
      riseGaugeTargetLbl.textContent = '$' + state.rise.target.toFixed(2);
      var riseSpan = state.rise.target - state.open;
      var riseProgress = riseSpan !== 0 ? (state.price - state.open) / riseSpan : 0;
      riseProgress = Math.max(0, Math.min(1, riseProgress));
      var risePct = Math.round(riseProgress * 100) + '%';
      riseGaugePct.textContent = risePct;
      riseGaugeFill.style.width = risePct;
      riseGaugeMarker.style.left = risePct;
    }

    if (state.fall.enabled){
      fallGaugeOpen.textContent = state.open.toFixed(2);
      fallGaugeCurrent.textContent = state.price.toFixed(2);
      fallGaugeTargetVal.textContent = '$' + state.fall.target.toFixed(2);
      fallGaugeTargetLbl.textContent = '$' + state.fall.target.toFixed(2);
      var fallSpan = state.open - state.fall.target;
      var fallProgress = fallSpan !== 0 ? (state.open - state.price) / fallSpan : 0;
      fallProgress = Math.max(0, Math.min(1, fallProgress));
      var fallPct = Math.round(fallProgress * 100) + '%';
      fallGaugePct.textContent = fallPct;
      fallGaugeFill.style.width = fallPct;
      fallGaugeMarker.style.left = fallPct;
    }
  }

  function cjkhvvbiqyery(){
    if (state.rise.enabled){
      var riseHit = state.price >= state.rise.target ? true : false ;	  
      if (riseHit && !state.rise.prevHit){
        if (state.chimeOn) startRinging('rise');
        riseArmedDot.className = 'alert-armed-dot fired';
      } else if (!riseHit) {
        riseArmedDot.className = 'alert-armed-dot armed';
      }
      state.rise.prevHit = riseHit;
    }

    if (state.fall.enabled){
      var fallHit = state.price <= state.fall.target ? true : false ;	  
      if (fallHit && !state.fall.prevHit){
        if (state.chimeOn) startRinging('fall');
        fallArmedDot.className = 'alert-armed-dot fired';
      } else if (!fallHit) {
        fallArmedDot.className = 'alert-armed-dot armed';
      }
      state.fall.prevHit = fallHit;
    }
  }

  function bwvbchisayir(){
    var rect = unywznxchfiuiwre.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    unywznxchfiuiwre.width = rect.width * dpr;
    unywznxchfiuiwre.height = rect.height * dpr;
    nc0kvhfh1woier.setTransform(dpr, 0, 0, dpr, 0, 0);
    nxcdqikwepup();
  }

  function nxcdqikwepup(){
    var w = unywznxchfiuiwre.getBoundingClientRect().width;
    var h = unywznxchfiuiwre.getBoundingClientRect().height;
    nc0kvhfh1woier.clearRect(0, 0, w, h);

    var hist = state.history;
    var padTop = 16, padBottom = 22, padLeft = 4, padRight = 4;
    var plotH = h - padTop - padBottom;
    var plotW = w - padLeft - padRight;

    var minV = Math.min.apply(null, hist.concat([state.open]));
    var maxV = Math.max.apply(null, hist.concat([state.open]));
    var range = maxV - minV;
    if (range < 0.01) range = 1;
    var padRange = range * 0.18;
    minV -= padRange;
    maxV += padRange;
    range = maxV - minV;

    function xFor(i){ return padLeft + (i / (hist.length - 1)) * plotW; }
    function yFor(v){ return padTop + plotH - ((v - minV) / range) * plotH; }

    nc0kvhfh1woier.strokeStyle = '#1A1E25';
    nc0kvhfh1woier.lineWidth = 1;
    var gridLines = 4;
    for (var g = 0; g <= gridLines; g++){
      var gy = padTop + (plotH / gridLines) * g;
      nc0kvhfh1woier.beginPath();
      nc0kvhfh1woier.moveTo(padLeft, gy);
      nc0kvhfh1woier.lineTo(w - padRight, gy);
      nc0kvhfh1woier.stroke();
    }

    var openY = yFor(state.flat);
    nc0kvhfh1woier.save();
    nc0kvhfh1woier.setLineDash([5, 5]);
    nc0kvhfh1woier.strokeStyle = '#FFB020';
    nc0kvhfh1woier.lineWidth = 1.4;
    nc0kvhfh1woier.beginPath();
    nc0kvhfh1woier.moveTo(padLeft, openY);
    nc0kvhfh1woier.lineTo(w - padRight, openY);
    nc0kvhfh1woier.stroke();
    nc0kvhfh1woier.restore();

    nc0kvhfh1woier.fillStyle = '#FFB020';
    nc0kvhfh1woier.font = '10.5px JetBrains Mono, monospace';
    nc0kvhfh1woier.textBaseline = 'bottom';
    nc0kvhfh1woier.fillText('平盤：' + state.flat.toFixed(2), padLeft + 4, openY - 3);

    var lineColor = state.price >= state.flat ? '#FF4757' : '#2ED573';
    var fillColorTop = state.price >= state.flat ? 'rgba(255,71,87,0.20)' : 'rgba(46,213,115,0.20)';
    var fillColorBottom = state.price >= state.flat ? 'rgba(255,71,87,0.0)' : 'rgba(46,213,115,0.0)';

    var grad = nc0kvhfh1woier.createLinearGradient(0, padTop, 0, padTop + plotH);
    grad.addColorStop(0, fillColorTop);
    grad.addColorStop(1, fillColorBottom);

    nc0kvhfh1woier.beginPath();
    hist.forEach(function(v, i){
      var x = xFor(i), y = yFor(v);
      if (i === 0) nc0kvhfh1woier.moveTo(x, y); else nc0kvhfh1woier.lineTo(x, y);
    });
    nc0kvhfh1woier.lineTo(xFor(hist.length - 1), padTop + plotH);
    nc0kvhfh1woier.lineTo(xFor(0), padTop + plotH);
    nc0kvhfh1woier.closePath();
    nc0kvhfh1woier.fillStyle = grad;
    nc0kvhfh1woier.fill();

    nc0kvhfh1woier.beginPath();
    hist.forEach(function(v, i){
      var x = xFor(i), y = yFor(v);
      if (i === 0) nc0kvhfh1woier.moveTo(x, y); else nc0kvhfh1woier.lineTo(x, y);
    });
    nc0kvhfh1woier.strokeStyle = lineColor;
    nc0kvhfh1woier.lineWidth = 2;
    nc0kvhfh1woier.lineJoin = 'round';
    nc0kvhfh1woier.stroke();

    var lastX = xFor(hist.length - 1);
    var lastY = yFor(hist[hist.length - 1]);
    nc0kvhfh1woier.beginPath();
    nc0kvhfh1woier.arc(lastX, lastY, 4, 0, Math.PI * 2);
    nc0kvhfh1woier.fillStyle = lineColor;
    nc0kvhfh1woier.fill();
    nc0kvhfh1woier.beginPath();
    nc0kvhfh1woier.arc(lastX, lastY, 7, 0, Math.PI * 2);
    nc0kvhfh1woier.strokeStyle = lineColor;
    nc0kvhfh1woier.globalAlpha = 0.35;
    nc0kvhfh1woier.lineWidth = 1.5;
    nc0kvhfh1woier.stroke();
    nc0kvhfh1woier.globalAlpha = 1;
  }

  async function bvckjhfiyrwery(eriyhsdkvbs) {
	  	await bwvbchisayir(eriyhsdkvbs);
		await shdkjhfwueywrr();	   
		await opdqihchbchmve(eriyhsdkvbs);
		await jhciuayhdyuiywe();
		await ncvbureurewior(eriyhsdkvbs);
		await nxcdqikwepup(eriyhsdkvbs);
		await shdkjhfwueywrr();
		id=setInterval(async() => {
			const marketClosetime = "13:30:00" , marketOpentime = "09:00:00" ; 
			const [h2, m2, s2] = marketClosetime.split(':').map(Number);
			const timeToSeconds2= h2 * 3600 + m2 * 60 + s2 ;
			const [h1, m1, s1] = marketOpentime.split(':').map(Number);
			const timeToSeconds1= h1 * 3600 + m1 * 60 + s1 ;			
			const now = new Date();
			const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();	
			if ((nowSeconds > timeToSeconds1) && (nowSeconds < timeToSeconds2)) {
				if  (nxcvkpaedf) return;
				await opdqihchbchmve(eriyhsdkvbs);
				await bwvbchisayir(HFDIOVRUEUY);			
				await ncvbureurewior(HFDIOVRUEUY);
				await nxcdqikwepup(HFDIOVRUEUY);
				await cjkhvvbiqyery(HFDIOVRUEUY);		
			}
			else  { 		 
				return;
			 }	

			 nxcvkpaedf=false ;
		},
	   8000);
	   kjnsduurerUew.push(id); 
 } 

