// Simulación Llegada de Clientes Tienda
// Distribución uniforme discreta de llegadas por hora: U{minClientes..maxClientes}
// Distribución discreta de artículos comprados por cliente (0..3) con probabilidades ajustables.

(function(){
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const numSimEl = $('#numSim');
  const numHorasEl = $('#numHoras');
  const costoFijoEl = $('#costoFijo');
  const precioVentaEl = $('#precioVenta');
  const precioCompraEl = $('#precioCompra');
  const minClientesEl = $('#minClientes');
  const maxClientesEl = $('#maxClientes');
  const probInputs = $$('.prob');
  const probTotalEl = $('#probTotal');
  const tbody = $('#tbodyResultados');
  const totalArticulosEl = $('#totalArticulos');
  const promGananciaEl = $('#promGanancia');
  const btnSimular = $('#btnSimular');
  const btnLimpiar = $('#btnLimpiar');

  function formatear(n){
    if(Number.isInteger(n)) return n.toString();
    return n.toFixed(2);
  }

  function validarProbabilidades(){
    let sum = 0;
    probInputs.forEach(inp => sum += parseFloat(inp.value||'0'));
    probTotalEl.textContent = sum.toFixed(2);
    const ok = Math.abs(sum - 1) < 1e-6; // tolerancia flotante
    probTotalEl.style.color = ok ? 'var(--ok, #4ade80)' : 'var(--warn, #fbbf24)';
    return ok;
  }

  function tomarArticulos(probValues){
    // probValues = [{art:0, p:0.2}, ...];
    const r = Math.random();
    let acumulado = 0;
    for(const {art, p} of probValues){
      acumulado += p;
      if(r < acumulado) return art;
    }
    return probValues[probValues.length-1].art; // fallback numérico
  }

  function simularUnDia(params, probValues){
    const { horas, minC, maxC, costoFijo, precioVenta, precioCompra } = params;
    let totalArticulos = 0;
    for(let h=0; h<horas; h++){
      // llegadas uniformes enteras entre minC y maxC inclusive
      const llegadas = minC + Math.floor(Math.random() * (maxC - minC + 1));
      for(let c=0; c<llegadas; c++){
        const articulos = tomarArticulos(probValues);
        totalArticulos += articulos;
      }
    }
    const ingresos = totalArticulos * precioVenta;
    const costosVar = totalArticulos * precioCompra;
    const gananciaNeta = ingresos - costosVar - costoFijo;
    return { totalArticulos, gananciaNeta };
  }

  function limpiarResultados(){
    tbody.innerHTML='';
    totalArticulosEl.textContent='—';
    promGananciaEl.textContent='—';
  }

  function obtenerProbValues(){
    return probInputs.map(inp => ({ art: parseInt(inp.dataset.art,10), p: parseFloat(inp.value||'0') }));
  }

  function validarFormulario(){
    let valido = true;
    const numeros = [numSimEl,numHorasEl,costoFijoEl,precioVentaEl,precioCompraEl,minClientesEl,maxClientesEl];
    numeros.forEach(el => el.classList.remove('error'));
    numeros.forEach(el => {
      if(el.value === '' || isNaN(el.value) || parseFloat(el.value) < 0){
        el.classList.add('error');
        valido = false;
      }
    });
    if(parseInt(minClientesEl.value,10) > parseInt(maxClientesEl.value,10)){
      minClientesEl.classList.add('error');
      maxClientesEl.classList.add('error');
      valido = false;
    }
    if(!validarProbabilidades()) valido = false;
    return valido;
  }

  function simular(){
    if(!validarFormulario()) return;

    limpiarResultados();

    const numSim = parseInt(numSimEl.value,10);
    const params = {
      horas: parseInt(numHorasEl.value,10),
      minC: parseInt(minClientesEl.value,10),
      maxC: parseInt(maxClientesEl.value,10),
      costoFijo: parseFloat(costoFijoEl.value),
      precioVenta: parseFloat(precioVentaEl.value),
      precioCompra: parseFloat(precioCompraEl.value)
    };
    const probValues = obtenerProbValues();

    let acumuladosArt = 0;
    let acumuladaGan = 0;

    const frag = document.createDocumentFragment();

    for(let i=1; i<=numSim; i++){
      const { totalArticulos, gananciaNeta } = simularUnDia(params, probValues);
      acumuladosArt += totalArticulos;
      acumuladaGan += gananciaNeta;

      const tr = document.createElement('tr');
      const tdSim = document.createElement('td'); tdSim.textContent = i;
      const tdArt = document.createElement('td'); tdArt.textContent = totalArticulos;
      const tdGan = document.createElement('td'); tdGan.textContent = formatear(gananciaNeta);
      tr.append(tdSim, tdArt, tdGan);
      frag.appendChild(tr);
    }

    tbody.appendChild(frag);
    totalArticulosEl.textContent = acumuladosArt;
    promGananciaEl.textContent = formatear(acumuladaGan / numSim);
  }

  // Eventos
  probInputs.forEach(inp => inp.addEventListener('input', validarProbabilidades));
  btnSimular.addEventListener('click', simular);
  btnLimpiar.addEventListener('click', () => { limpiarResultados(); validarProbabilidades(); });
  document.addEventListener('DOMContentLoaded', validarProbabilidades);
})();
