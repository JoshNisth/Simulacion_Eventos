/* Copiado desde assets/js/simulaciones/llegada-clientes.js - versión con init robusto */
(function(){
 function ready(fn){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',fn,{once:true}); } else { fn(); } }
 let attempts=0;
 function init(){
  const $=s=>document.querySelector(s);const $$=s=>Array.from(document.querySelectorAll(s));
  const numSimEl=$('#numSim');
  if(!numSimEl){ if(attempts++<5){ return setTimeout(init,40*attempts); } return; }
  const numHorasEl=$('#numHoras');const costoFijoEl=$('#costoFijo');const precioVentaEl=$('#precioVenta');const precioCompraEl=$('#precioCompra');const minClientesEl=$('#minClientes');const maxClientesEl=$('#maxClientes');
  const probInputs=$$('.prob');const probTotalEl=$('#probTotal');const tbody=$('#tbodyResultados');const totalArticulosEl=$('#totalArticulos');const promGananciaEl=$('#promGanancia');const btnSimular=$('#btnSimular');const btnLimpiar=$('#btnLimpiar');
  function formatear(n){return Number.isInteger(n)?n.toString():n.toFixed(2);} 
  function validarProbabilidades(){let sum=0;probInputs.forEach(i=>sum+=parseFloat(i.value||'0'));probTotalEl.textContent=sum.toFixed(2);const ok=Math.abs(sum-1)<1e-6;probTotalEl.style.color=ok?'var(--ok,#4ade80)':'var(--warn,#fbbf24)';return ok;}
  function tomarArticulos(vals){const r=Math.random();let acc=0;for(const {art,p} of vals){acc+=p;if(r<acc)return art;}return vals[vals.length-1].art;}
  function simularUnDia(p,vals){const {horas,minC,maxC,costoFijo,precioVenta,precioCompra}=p;let total=0;for(let h=0;h<horas;h++){const llegadas=minC+Math.floor(Math.random()*(maxC-minC+1));for(let c=0;c<llegadas;c++){total+=tomarArticulos(vals);}}const ingresos=total*precioVenta;const costosVar=total*precioCompra;const ganancia=ingresos-costosVar-costoFijo;return{totalArticulos:total,gananciaNeta:ganancia};}
  function limpiar(){tbody.innerHTML='';totalArticulosEl.textContent='—';promGananciaEl.textContent='—';}
  function obtenerProbValues(){return probInputs.map(inp=>({art:parseInt(inp.dataset.art,10),p:parseFloat(inp.value||'0')}));}
  function validarFormulario(){let valido=true;const numeros=[numSimEl,numHorasEl,costoFijoEl,precioVentaEl,precioCompraEl,minClientesEl,maxClientesEl];numeros.forEach(el=>el.classList.remove('error'));numeros.forEach(el=>{if(el.value===''||isNaN(el.value)||parseFloat(el.value)<0){el.classList.add('error');valido=false;}});if(parseInt(minClientesEl.value,10)>parseInt(maxClientesEl.value,10)){minClientesEl.classList.add('error');maxClientesEl.classList.add('error');valido=false;}if(!validarProbabilidades())valido=false;return valido;}
  function simular(){if(!validarFormulario())return;limpiar();const numSim=parseInt(numSimEl.value,10);const params={horas:parseInt(numHorasEl.value,10),minC:parseInt(minClientesEl.value,10),maxC:parseInt(maxClientesEl.value,10),costoFijo:parseFloat(costoFijoEl.value),precioVenta:parseFloat(precioVentaEl.value),precioCompra:parseFloat(precioCompraEl.value)};const probValues=obtenerProbValues();let accArt=0,accGan=0;const frag=document.createDocumentFragment();for(let i=1;i<=numSim;i++){const {totalArticulos,gananciaNeta}=simularUnDia(params,probValues);accArt+=totalArticulos;accGan+=gananciaNeta;const tr=document.createElement('tr');const tdSim=document.createElement('td');tdSim.textContent=i;const tdArt=document.createElement('td');tdArt.textContent=totalArticulos;const tdGan=document.createElement('td');tdGan.textContent=formatear(gananciaNeta);tr.append(tdSim,tdArt,tdGan);frag.appendChild(tr);}tbody.appendChild(frag);totalArticulosEl.textContent=accArt;promGananciaEl.textContent=formatear(accGan/numSim);} 
  probInputs.forEach(i=>i.addEventListener('input',validarProbabilidades));
  if(btnSimular) btnSimular.addEventListener('click',simular);
  if(btnLimpiar) btnLimpiar.addEventListener('click',()=>{limpiar();validarProbabilidades();});
  validarProbabilidades();
 }
 ready(init);
})();
