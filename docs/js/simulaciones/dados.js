/* Copiado desde assets/js/simulaciones/dados.js - ajustado para asegurar registro tardío de eventos */
(function(){'use strict';
 function ready(fn){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',fn,{once:true}); } else { fn(); } }
 function init(){
	 const $=s=>document.querySelector(s);
	 const resultsBody=$('#resultsBody');
	 if(!resultsBody){ console.warn('[Dados] No se encontró el contenedor de resultados, reintentando...'); return retry(); }
	 const avgGNC=$('#avgGNC');
	 const avgNJGC=$('#avgNJGC');
	 const avgPJC=$('#avgPJC');
	 const inputNumSim=$('#numSim');
	 const inputNMJ=$('#nmj');
	 const inputPUJ=$('#puj');
	 const inputCUS7=$('#cus7');
	 const simulateBtn=$('#simulateBtn');
	 const clearBtn=$('#clearBtn');
	 function lanzarDado(){return 1+Math.floor(Math.random()*6);}
	 function formatear(n,d=2){return Number(n).toFixed(d);} 
	 function limpiar(){resultsBody.innerHTML='';avgGNC.textContent='—';avgNJGC.textContent='—';avgPJC.textContent='—';}
	 function simularUna(NMJ,PUJ,CUS7){let CJ=0,NJGC=0,GNC=0;while(CJ<NMJ){CJ++;const D1=lanzarDado();const D2=lanzarDado();const S=D1+D2;GNC+=PUJ;if(S===7){GNC-=CUS7;}else{NJGC++;}}const PJC=(NJGC/NMJ)*100;return{GNC,NJGC,PJC};}
	 function simular(){if(!inputNumSim||!inputNMJ) return; const numSim=Math.max(1,parseInt(inputNumSim.value,10)||0);const NMJ=Math.max(1,parseInt(inputNMJ.value,10)||0);const PUJ=Math.max(0,parseFloat(inputPUJ.value)||0);const CUS7=Math.max(0,parseFloat(inputCUS7.value)||0);limpiar();let sumGNC=0,sumNJGC=0,sumPJC=0;for(let i=1;i<=numSim;i++){const {GNC,NJGC,PJC}=simularUna(NMJ,PUJ,CUS7);sumGNC+=GNC;sumNJGC+=NJGC;sumPJC+=PJC;const tr=document.createElement('tr');tr.innerHTML=`<td>${i}</td><td>${formatear(GNC)}</td><td>${NJGC}</td><td>${formatear(PJC,2)}</td>`;resultsBody.appendChild(tr);}avgGNC.textContent=formatear(sumGNC/numSim);avgNJGC.textContent=formatear(sumNJGC/numSim,0);avgPJC.textContent=formatear(sumPJC/numSim,2);} 
	 if(simulateBtn){ simulateBtn.addEventListener('click',simular,{once:false}); } else { console.warn('[Dados] Botón simular no encontrado'); }
	 if(clearBtn){ clearBtn.addEventListener('click',limpiar,{once:false}); }
 }
 let retries=0;function retry(){ if(retries>5) return; retries++; setTimeout(init,50*retries); }
 ready(init);
})();
