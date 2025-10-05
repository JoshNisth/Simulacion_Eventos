// Extraído del inline de interes-simple.html (robusto DOM ready)
(function(){
 function ready(fn){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',fn,{once:true}); } else { fn(); } }
 function init(){
  const $=s=>document.querySelector(s);
  const capitalEl=$('#capital'); if(!capitalEl){ return; }
  const tasaEl=$('#tasa');const periodosEl=$('#periodos');const redondeoEl=$('#redondeo');
  const btnCalcular=$('#btnCalcular');const btnLimpiar=$('#btnLimpiar');
  const kCapitalFinal=$('#kCapitalFinal');const kInteresTotal=$('#kInteresTotal');
  const tbody=$('#tablaEvolucion tbody');const tablaWrap=$('#tablaWrap');const notaModo=$('#notaModo');
  function fmt(n,d){return Number(n).toLocaleString('es-VE',{minimumFractionDigits:d,maximumFractionDigits:d});}
  function calcular(){let C0=parseFloat(capitalEl.value)||0;if(C0<0)C0=0;let tasaInput=parseFloat(tasaEl.value)||0;if(tasaInput<0)tasaInput=0;let n=parseInt(periodosEl.value,10)||0;if(n<1)n=1;let dec=parseInt(redondeoEl.value,10)||2;if(dec<0)dec=0;if(dec>6)dec=6;const i=tasaInput/100;tbody.innerHTML='';tablaWrap.hidden=false;let capitalFin=C0;for(let periodo=1;periodo<=n;periodo++){const capInicio=C0+C0*i*(periodo-1);const interesPeriodo=C0*i;const capFin=capInicio+interesPeriodo;capitalFin=capFin;const tr=document.createElement('tr');tr.innerHTML=`<td>${periodo}</td><td>${fmt(capInicio,dec)}</td><td>${fmt(interesPeriodo,dec)}</td><td>${fmt(capFin,dec)}</td>`;tbody.appendChild(tr);}capitalFin=C0+C0*i*n;const interesTotal=capitalFin-C0;kCapitalFinal.textContent=`Bs ${fmt(capitalFin,dec)}`;kInteresTotal.textContent=`Bs ${fmt(interesTotal,dec)}`;notaModo.textContent='Interés simple: cada período genera C·i constante, acumulación lineal.';}
  function limpiar(){tbody.innerHTML='';kCapitalFinal.textContent='—';kInteresTotal.textContent='—';notaModo.textContent='Interés simple: el interés de cada período es constante (C·i).';tablaWrap.hidden=false;}
  if(btnCalcular) btnCalcular.addEventListener('click',calcular);
  if(btnLimpiar) btnLimpiar.addEventListener('click',limpiar);
 }
 ready(init);
})();
