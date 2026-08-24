	const list1=['2330','2454','2308','3008','2317','2303','2356','2357','2353','1102','2324','2344','8299','2408','6770','2337','2347','2371','1504','2891','00403A','00991A','00982A','00980A','00981A','0050','0056'];
	const list2=['2330','2454','3661','3443','2303','2606','9940','3042','2603','1713','2609','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'] ;
	const list3=['2882','2887','2891','2881','2884','2883','2892','2886','2838','2885','2890','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
	const list4=['2603','2606','2605','2609','2610','2618','2615','2633','2645','2646','2634','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
	const list5=['1301','1303','1325','1326','1314','1307','1304','1310','1308','1312','1313','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
	const list6=['2027','2002','2014','2006','2010','2008','2009','2032','2010','2211','9958','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
	const list7=['2501','2504','2528','2542','5522','2515','2520','2539','2536','2540','2505','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
	const list8=['1402','1409','1413','1414','1417','1418','1419','1419','1434','1440','1441','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
	const list9=['1216','1210','1215','1229','1217','1218','1201','1702','1203','1737','3054','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
	const list10=['1903','1904','1905','1906','1907','1909','6790','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
	const list11=['6214','2427','2453','2468','2471','2480','3029','4994','5203','6112','6183','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
	const MAIN = { sym: '大盤指數', id: '2353', price: 0 , high: 0, low: 0, change: 0 };
	const MARKETS = [list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11];
	const state = {
	  main: { ...MAIN, open: MAIN.price, high: MAIN.price, low: MAIN.price, change: 0 , flat:0},
	  markets: MARKETS.map(m => ({ ...m, change: 0, spark: [] })),
	  history: [],
	 };
	STOCKS = [list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11];
	const mainList = document.getElementById("marketList") ;
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
	let stockId_list=[],running=false,sw_no=1,firstVisit = true ;     // original value:  true 
    let refSec = 3000 ; // original value:  0
	let count=0 ,stockId=0 , btn2_expandId= ""  ;
	let width = 0 , intervalIds = [] , itemPrice_matrix=[] , itemPrice_arry = [] , itemYear_arry11 = [] , itemYear_arry12 = [] , itemYear_arry13 = [] , itemYear_arry21 = [] , itemYear_arry22 = [] , itemYear_arry23 = [] ;
	let show_YearRpt="" , show_SeasonRpt="" , show_MonthRpt="" , tr_line="" ; 
    let mymatrix,wi_o,wi_h,wi_c,wi_cc,wi_t,wi_tt,midline_txt1,midline_txt2,title_txt,item_price1,item_price2,mid_price1=0,mid_price2=0,min_price=0,max_price=0,incdecPrice1,incdecPrice2,timeLabel,labels=[],dataPoints1=[],dataPoints2=[],title1="圖例1",title2="圖例2",point_no=0;
	window.addEventListener('load',function(){
		mask_item1.style.display == "none" ;
		mask_item2.style.display == "none" ;
		startShow(0);
		document.getElementById("s01").addEventListener("change", function(event) {
		   while(intervalIds.length) {
			  clearInterval(intervalIds.pop());
			}
			const symId=event.target.value;	
			if (symId == 9999)	
				return   
			else if (symId === "Z" )
				displayWPost()
			else
				startShow(symId) ;				
		});		
	}); 
		
  async function getpricePost(stockId) {
	  try {
	   let itemPrice_matrix="" ;
	   let oldCanvas = document.getElementById("hiddenMsg2");
	   if (oldCanvas && stockId == -1) {
	      oldCanvas.outerHTML = "<div id='hiddenMsg2' style='display:none;'><canvas id='myChart' width='320' height='200'  display='none'></canvas><div id='collapseBtn2' style='display:none;justify-content:center;'><img src='collapse.png' style='cursor:pointer;' onclick='getPost(0)' /></div></div>" ;
	      return 0;
		}
		else {
		  oldCanvas.outerHTML = "<div id='hiddenMsg2' style='display:block;'><canvas id='myChart' width='320' height='200'></canvas><div id='collapseBtn2' style='justify-content:center;'><img src='collapse.png' style='cursor:pointer;' onclick='getpricePost(-1)' /></div></div>" ;
		}				
		let fetchUrl_str1 = CODEX('aHR0cHM6Ly93cy5hcGkuY255ZXMuY29tL3dzL2FwaS92MS9jaGFydGluZy9oaXN0b3J5P3Jlc29sdXRpb249MSZzeW1ib2w9VFdTOg=='); 
		let fetchUrl_str2 = CODEX('OlNUT0NLJnF1b3RlPTE=') ;
		let fetchUrl_str=fetchUrl_str1 + stockId_list[stockId] + fetchUrl_str2 ;
		const response = await fetch(fetchUrl_str);
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}

		const post = await response.json(); // Convert response to JS object
		return post;
	  } catch (error) {
		console.error('Fetch error:', error);
		return null;
	  }
	}
		
 
  async function getPost(stockId) {
		let fetchUrl_str; 	  
	  try {
		let fetchUrl_str1=CODEX('aHR0cHM6Ly93cy5hcGkuY255ZXMuY29tL3dzL2FwaS92MS9jaGFydGluZy9oaXN0b3J5P3Jlc29sdXRpb249MSZzeW1ib2w9VFdTOg==');
		let fetchUrl_str2=CODEX('OlNUT0NLJnF1b3RlPTE=');
		if (stockId == 9999 ) 
			fetchUrl_str=CODEX('aHR0cHM6Ly93cy5hcGkuY255ZXMuY29tL3dzL2FwaS92MS9jaGFydGluZy9oaXN0b3J5P3N5bWJvbD1UV1M6VFNFMDE6SU5ERVgmcmVzb2x1dGlvbj1EJnF1b3RlPTEmZnJvbT1OYU4mdG89TmFO') 
		else
			fetchUrl_str=fetchUrl_str1 + stockId + fetchUrl_str2 ;
		if (stockId == 8888 ) fetchUrl_str= CODEX('aHR0cHM6Ly93cy5hcGkuY255ZXMuY29tL3dzL2FwaS92MS9jaGFydGluZy9oaXN0b3J5P3N5bWJvbD1UV1M6VFNFMDE6SU5ERVgmcmVzb2x1dGlvbj1EJnF1b3RlPTEmZnJvbT1OYU4mdG89TmFO') ;
		if (stockId == 7777 ) fetchUrl_str= CODEX('aHR0cHM6Ly93cy5hcGkuY255ZXMuY29tL3dzL2FwaS92My91bml2ZXJzYWwvcXVvdGU/dHlwZT1JRFhNQUpPUiZjb2x1bW49QiZwYWdlPTEmbGltaXQ9MjA=') ;		
		const response = await fetch(fetchUrl_str);
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
		const post = await response.json(); // Convert response to JS object
		return post;
	  } catch (error) {
		console.error('Fetch error:', error);
		return null;
     }
   }
  
    async function getWDATA() {
		await displayPost(7777);
	}  
  

   async function getPostYOY(stockId,firstVisit) {
	  try {	  
		fetchUrl_str=CODEX('aHR0cHM6Ly9tYXJrZXRpbmZvLmFwaS5jbnllcy5jb20vbWkvYXBpL3YxL2ZpbmFuY2lhbEluZGljYXRvci9yZXZlbnVlL1RXUzo=') + stockId + CODEX('OlNUT0NLP3llYXI9NSZ0bz0xNTcyMzY0ODAw') ;
		const response = await fetch(fetchUrl_str);
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
		const post = await response.json(); // Convert response to JS object
		return post;
	  } catch (error) {
		console.error('Fetch error:', error);
		return null;
     }
  }

   async function getPostEPS(stockId,firstVisit) {
	  try { 		
		fetchUrl_str= CODEX('aHR0cHM6Ly9tYXJrZXRpbmZvLmFwaS5jbnllcy5jb20vbWkvYXBpL3YxL2ZpbmFuY2lhbEluZGljYXRvci9lcHMvVFdTOg==') + stockId + CODEX('OlNUT0NLP3Jlc29sdXRpb249USZhY2M9ZmFsc2UmeWVhcj01JnRvPTE1NzM0ODgwMDA=') ;
		const response = await fetch(fetchUrl_str);
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
		const post = await response.json(); // Convert response to JS object
		return post;
	  } catch (error) {
		console.error('Fetch error:', error);
		return null;
     }
  }
  
  async function displayWPost() {
	  mainList.textContent = "";
	  const post = await getPost(7777);
	  if (post) {
			const ITEMS = post.data.items ;
			const ITEM1 = ITEMS.slice(13, 17);
			const ITEM2 = ITEMS.slice(0, 12);	
			ITEM1.forEach((quote_obj,idx) => {
				for ( var n in quote_obj) {
					if ( n == "200009" ) MAIN.sys=quote_obj[n];
					if ( n == "6" ) MAIN.price= quote_obj[n];
					if ( n == "11" ) MAIN.change=quote_obj[n];  
					if ( n == "12" ) MAIN.high=quote_obj[n];
					if ( n == "13" ) MAIN.low= quote_obj[n];
				} 
				  const row = document.createElement('div');
				  row.style.display = 'flex';
				  const nameCell = document.createElement('div');
				  nameCell.className = 'item2';
				  nameCell.textContent = MAIN.sys;
				  row.appendChild(nameCell);
				  const priceCell = document.createElement('div');
				  priceCell.className = 'item3w';
				  priceCell.textContent = MAIN.price;		  
				  if (MAIN.change > 0) priceCell.classList.add('risePrice');
				  else if (MAIN.change < 0) priceCell.classList.add('fellPrice');
				  else priceCell.classList.add('flatPrice');			  
				  row.appendChild(priceCell);
				  const gainCell = document.createElement('div');
				  gainCell.className = 'item3w';
				  gainCell.textContent = MAIN.change;
				  if (MAIN.change > 0) gainCell.classList.add('risePrice');
				  else if (MAIN.change < 0) gainCell.classList.add('fellPrice');
				  else gainCell.classList.add('flatPrice');
				  row.appendChild(gainCell);
				  [MAIN.high, MAIN.low].forEach(value => {
					const cell = document.createElement('div');
					cell.className = 'item3w';
					cell.textContent = value;
					row.appendChild(cell);
				  });		  
				  mainList.appendChild(row);							
			});
			ITEM2.forEach((quote_obj,idx) => {
				for ( var n in quote_obj) {
					if ( n == "200009" ) MAIN.sys=quote_obj[n];
					if ( n == "6" ) MAIN.price= quote_obj[n];
					if ( n == "11" ) MAIN.change=quote_obj[n];  
					if ( n == "12" ) MAIN.high=quote_obj[n];
					if ( n == "13" ) MAIN.low= quote_obj[n];
				} 
				  const row = document.createElement('div');
				  row.style.display = 'flex';
				  const nameCell = document.createElement('div');
				  nameCell.className = 'item2';
				  nameCell.textContent = MAIN.sys;
				  row.appendChild(nameCell);
				  const priceCell = document.createElement('div');
				  priceCell.className = 'item3w';
				  priceCell.textContent = MAIN.price;		  
				  if (MAIN.change > 0) priceCell.classList.add('risePrice');
				  else if (MAIN.change < 0) priceCell.classList.add('fellPrice');
				  else priceCell.classList.add('flatPrice');			  
				  row.appendChild(priceCell);
				  const gainCell = document.createElement('div');
				  gainCell.className = 'item3w';
				  gainCell.textContent = MAIN.change;
				  if (MAIN.change > 0) gainCell.classList.add('risePrice');
				  else if (MAIN.change < 0) gainCell.classList.add('fellPrice');
				  else gainCell.classList.add('flatPrice');
				  row.appendChild(gainCell);
				  [MAIN.high, MAIN.low].forEach(value => {
					const cell = document.createElement('div');
					cell.className = 'item3w';
					cell.textContent = value;
					row.appendChild(cell);
				  });		  
				  mainList.appendChild(row);							
			});
	   }
	
  }  

 async function displayPost(stockId,itemId) {
	  const post = await getPost(stockId);
	  let elemId_price = "" , elemId_price_flag = 0;
	  if (stockId == 9999) {
			if (post) {
				const quote_obj = post.data.quote ;	
				for ( var n in quote_obj) {
					if ( n == "11" ) {
						if (quote_obj[n]> 0) 
                            {
							document.getElementById("wi-d").classList.add("wi-risePrice");
                            } 
                        else {
                          if (quote_obj[n] == 0){ 
                           	document.getElementById("wi-d").classList.add("wi-flatPrice");                           	  	 		
                          }
                          else {
							document.getElementById("wi-d").classList.add("wi-fellPrice");
                          }
                        }
						document.getElementById("wi-d").innerHTML = quote_obj[n]  ;		
					} 		
				}
				document.getElementById("wi-c").innerHTML= post.data.c + '(C)';
				document.getElementById("wi-h").innerHTML= post.data.h + '(H)';
				document.getElementById("wi-l").innerHTML= post.data.l + '(L)';						
			}	
	  }
	  else {
		  if (post) {
				const quote_obj = post.data.quote ;
			    for ( var n in quote_obj) {
					if ( n == "200009" ) MAIN.sys=quote_obj[n];
					if ( n == "6" ) MAIN.price= quote_obj[n];
					if ( n == "11" ) MAIN.change=quote_obj[n];  
					if ( n == "12" ) MAIN.high=quote_obj[n];
					if ( n == "13" ) MAIN.low= quote_obj[n];
				} 
		   }
			  const row = document.createElement('div');
			  row.style.display = 'flex';
			  const nameCell = document.createElement('div');
			  nameCell.className = 'item2';
			  const namebtn = document.createElement('button');
			  namebtn.className = 'btn-expand1'; 
			  namebtn.textContent = MAIN.sys;
			  namebtn.onclick = () => showElement(stockId,firstVisit);  
			  nameCell.appendChild(namebtn);
			  row.appendChild(nameCell);
			  const priceCell = document.createElement('div');
			  priceCell.className = 'item3';
			  const pricebtn = document.createElement('button');
			  pricebtn.className = 'btn-expand1';
			  if (MAIN.change > 0) pricebtn.classList.add('risePrice');
			  else if (MAIN.change < 0) pricebtn.classList.add('fellPrice');
			  else pricebtn.classList.add('flatPrice');			  
			  pricebtn.textContent = MAIN.price;
			  pricebtn.onclick = () => showRealprice(stockId) ;  	 
			  priceCell.appendChild(pricebtn);
			  row.appendChild(priceCell);
			  const gainCell = document.createElement('div');
			  gainCell.className = 'item3';
			  gainCell.textContent = MAIN.change;
			  if (MAIN.change > 0) gainCell.classList.add('risePrice');
			  else if (MAIN.change < 0) gainCell.classList.add('fellPrice');
			  else gainCell.classList.add('flatPrice');
			  row.appendChild(gainCell);
			  [MAIN.high, MAIN.low].forEach(value => {
				const cell = document.createElement('div');
				cell.className = 'item3';
				cell.textContent = value;
				row.appendChild(cell);
			  });
			  const abacusCell = document.createElement('div');
			  abacusCell.className = 'item-abacus';
			  const abacusbtn = document.createElement('button');
			  abacusbtn.className = 'btn-expand2'; 
			  abacusbtn.textContent = "\u{1F9EE}" ;
			  abacusbtn.onclick = () => countProfit(stockId,firstVisit);  
			  abacusCell.appendChild(abacusbtn);
			  row.appendChild(abacusCell);
			  const alarmCell = document.createElement('div');
			  alarmCell.className = 'item-abacus';
			  const alarmbtn = document.createElement('button');
			  alarmbtn.className = 'btn-expand3'; 
			  alarmbtn.textContent = "\u{1F514}" ;
			  alarmbtn.onclick = () => alarmPrice(stockId) ;  
			  alarmCell.appendChild(alarmbtn);
			  row.appendChild(alarmCell);			  
			  mainList.appendChild(row);	
	  }
  } 

   async function displayPostYE1(stockId,firstVisit) {
	  const post1 = await getPostYOY(stockId,firstVisit);
	  const post2 = await getPostEPS(stockId,firstVisit);
		if (post1) {
			let postData1 = post1.data ;
			let postDataMatrix1 = postData1[0] ;
			itemYear_stockname = postDataMatrix1.name ;
			itemYear_arry11 = postDataMatrix1.time ;
			itemYear_arry12 = postDataMatrix1.revenue ;
			itemYear_arry13 = postDataMatrix1.revenueYOY ;
			tr_line ="",show_YearRpt="" ;
       		let  item2currency=0 ;
			for (let i = 0; i < itemYear_arry11.length; i++) {
				item2currency = (itemYear_arry12[i]/1000) + "" ;
				item2currency = item2currency.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
				tr_line = tr_line + '<tr><td>' + timestampToTime(itemYear_arry11[i]) + '</td><td>' + item2currency + '</td><td>' +　itemYear_arry13[i]　+'</td></tr>' ;
			} ;						 
		    show_YearRpt='<table width="33%" style="color: rgb(132, 141, 151); font-size: 14px; text-align: right;" border="1">' + '<thead><tr><td style="width:33%;color:#9c3579">[' + itemYear_stockname + ']月財報</td><td style="width:25%">營收(千元)</td><td style="width:33%">年增率</td></thead><tbody>' + tr_line  + '</tbody></table>'  ;				
		}

		if (post2) {
			let postData2 = post2.data ;
			let postDataMatrix2 = postData2[0] ;
			itemYear_stockname = postDataMatrix2.name ;
			itemYear_arry21 = postDataMatrix2.time ; ;
			itemYear_arry22 = postDataMatrix2.epsYOY ;
			itemYear_arry23 = postDataMatrix2.eps ;
			tr_line =""
			var item2currency=0;
			var espEarning_digit=0; 
			var espDate_arry = [...itemYear_arry21].reverse();
			var espEarning_arry = [...itemYear_arry23].reverse(); 
			var accuEarning_arry = espEarning_arry ;
			var text,subStr,quarterDateStr,quarterDate_arry ;
			for (var i = 0; i < espDate_arry.length; i++) {
			espDate_arry[i]=timestampToTime(espDate_arry[i]) ;
			subStr =espDate_arry[i].substring(espDate_arry[i].indexOf("-")+1) ;
			switch (subStr) {
				case "01": 
					accuEarning_arry[i]= espEarning_arry[i] ;
					espEarning_digit=accuEarning_arry[i] ;
					accuEarning_arry[i]=parseFloat(espEarning_digit.toFixed(2)) ;
					break ;
				case "04": 
					espEarning_digit=accuEarning_arry[i] ;
					accuEarning_arry[i]=parseFloat(espEarning_digit.toFixed(2)) ;
					accuEarning_arry[i] += espEarning_arry[i-1] ;
					espEarning_digit= accuEarning_arry[i] ;
					accuEarning_arry[i]= parseFloat(espEarning_digit.toFixed(2)) ; 
					break;
				case "07": 
					espEarning_digit=accuEarning_arry[i] ;
					accuEarning_arry[i]=parseFloat(espEarning_digit.toFixed(2)) ;
					accuEarning_arry[i] += espEarning_arry[i-1] ;
					espEarning_digit= accuEarning_arry[i] ;
					accuEarning_arry[i]= parseFloat(espEarning_digit.toFixed(2)) ;
					break; 
				case "10": 
					espEarning_digit=accuEarning_arry[i] ;
					accuEarning_arry[i]=parseFloat(espEarning_digit.toFixed(2)) ;
					accuEarning_arry[i] += espEarning_arry[i-1] ;
					espEarning_digit= accuEarning_arry[i] ;
					accuEarning_arry[i]= parseFloat(espEarning_digit.toFixed(2)) ;
					break;      

			}     
			} ; 
			accuEarning_arry.reverse() ;
			for (var i = 0; i < itemYear_arry21.length; i++) {
				item2currency = itemYear_arry22[i]  ;
				quarterDateStr=timestampToTime(itemYear_arry21[i]) ;
				quarterDate_arry= quarterDateStr.split("-") ;
				switch (quarterDate_arry[1]) {
					case "01": 
						quarterDate_arry[1]="Q1"
						break;
					case "04": 
						quarterDate_arry[1]="Q2"
						break;
					case "07": 
						quarterDate_arry[1]="Q3"
						break;
					case "10": 
						quarterDate_arry[1]="Q4"
						break;
				}
				tr_line = tr_line + '<tr><td><b>' +  quarterDate_arry[0] + quarterDate_arry[1] + '</b></td><td>' + item2currency + '</td><td>' +　itemYear_arry23[i]　+'</td><td>' +　accuEarning_arry[i]　+'</td></tr>' ;
			} ;
			show_SeasonRpt='<table width="30%" style="color: rgb(132, 141, 151); font-size: 14px; text-align: right;" border="1">' + '<thead><tr><td style="width:40%;color:#9c3579">[' + itemYear_stockname + ']季財報</td><td style="width:40%">epsYOY(%)</td><td style="width:20%">EPS</td><td style="width:35%">累計EPS</td></thead><tbody>' + tr_line  + '</tbody></table>'  ;
		}	
        if (firstVisit === undefined || firstVisit === null) {
			document.getElementById("hiddenElement1").innerHTML="&nbsp;" ;
			document.getElementById("hiddenElement2").innerHTML="&nbsp;" ;
			document.getElementById("collapseBtn").innerHTML="&nbsp;" ;			
        }
        else {
			document.getElementById("hiddenElement1").innerHTML=show_YearRpt ;
			document.getElementById("hiddenElement2").innerHTML=show_SeasonRpt ;
			document.getElementById("collapseBtn").outerHTML="<div id='collapseBtn'><img src='collapse.png' style='cursor:pointer;' onclick='collapseElement()' /></div>" ;
        } 
  } 

  async function displayPostYE2(stockId,firstVisit) {
		mask_item1.style.display = "block" ;
		document.documentElement.scrollTop=0;
  }

  async function displayPostChart() {
		document.documentElement.scrollTop=0;
  } 
 
   function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;
	    return Y+M ;
    }

	async function showElement(stockNo,firstVisit) {
		await displayPostYE1(stockNo,firstVisit);
		await displayPostYE2(stockNo,firstVisit);  
    }
	
	async function showRealprice(stockNo) {
		window.location.href = 'https://perryjohnsonleon.github.io/ddww/tickchart.htm?stockid=' + stockNo ;
    }
	
	async function alarmPrice(stockNo) {
		window.location.href = 'https://perryjohnsonleon.github.io/ddww/pricealarm.htm?stockid=' + stockNo ;
    }	
	
	async function countProfit(stockNo) {
		window.location.href = 'https://perryjohnsonleon.github.io/ddww/cal.htm?stockid=' + stockNo ;
    }

	function collapseElement() {
      mask_item1.style.display="none" ;
      }	  
	  
	function collapseElement2() {
		while(intervalIds.length){
		  clearInterval(intervalIds.pop());
		}
		firstVisit = false;
	    let mask_item2 = document.getElementById("hiddenMsg2");
	    if (mask_item2) {
	      mask_item2.outerHTML = "<div id='hiddenMsg2' style='display:block;'><div><canvas id='realtimeChart' width='320' height='200' style='display:none;'></canvas></div>" + 
			"<div id='collapseBtns' style='display:flex'><div id='collapseBtn2' style='display:none;justify-content:center;'><img src='collapse.png' style='cursor:pointer;' onclick='collapseElement2()' /></div>" + 
			"<div id='oneBtn' style='display:none;justify-content:center;'><img src='onebtn.png' style='cursor:pointer;' /></div>" +
			"<div id='twinBtn' style='display:none;justify-content:center;'><img src='twinbtn.png' style='cursor:pointer;' /></div>" +			
			"<div id='stopBtn' style='display:none;justify-content:center;'><img src='stopbtn.png' style='cursor:pointer;' /></div>" +
			"<div id='goBtn' style='display:none;justify-content:center;'><img src='gobtn.png' style='cursor:pointer;' /></div></div>" ; 	
		}
    }
	
	function collapseElement3() {
	    const mask_item2 = document.getElementById("hiddenMsg2");
		while(intervalIds.length){
		  clearInterval(intervalIds.pop());
		}
		firstVisit = false;
    }
	  
  async function startShow(sel_No) {
		mainList.textContent = "";
		stockId_list=STOCKS[sel_No];
		await displayPost(9999);
		for (let i=0;i<stockId_list.length;i++) {
			await displayPost(stockId_list[i],i);
		}
	}   
