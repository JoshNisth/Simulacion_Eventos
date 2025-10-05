// Gallina Ponedora Simulation
(function(){
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  // Inputs
  const nsimEl = $('#nsim');
  const diasEl = $('#dias');
  const precioHuevoEl = $('#precioHuevo');
  const precioPolloEl = $('#precioPollo');
  const lambdaEl = $('#lambda');
  const probInputs = $$('.prob');
  const totalHuevoEl = $('#totalHuevo');
  const totalPollitoEl = $('#totalPollito');
  const tbody = $('#tbodyGallina');

  // KPI outputs
  const kIngresoTotal = $('#kIngresoTotal');
  const kIngresoProm = $('#kIngresoProm');
  const kHuevosRotos = $('#kHuevosRotos');
  const kPollitosMuertos = $('#kPollitosMuertos');

  const btnSimular = $('#btnSimularGallina');
  const btnLimpiar = $('#btnLimpiarGallina');

  function formatear(n){ return Number.isInteger(n) ? n.toString() : n.toFixed(2); }

  // Validate probability groups must sum to 1
  function validarGrupo(grupo){
    const inputs = probInputs.filter(i => i.dataset.group === grupo);
    let sum = 0; let rangoOk = true;
    inputs.forEach(i => {
      let v = parseFloat(i.value||'0');
      if(isNaN(v)) v = 0;
      if(v < 0 || v > 1){ rangoOk = false; i.classList.add('error'); } else { i.classList.remove('error'); }
      sum += v;
    });
    const elTotal = grupo === 'huevo' ? totalHuevoEl : totalPollitoEl;
    elTotal.textContent = sum.toFixed(2);
    const sumOk = Math.abs(sum - 1) < 1e-6;
    elTotal.style.color = (sumOk && rangoOk) ? 'var(--ok,#4ade80)' : 'var(--warn,#fbbf24)';
    const errEl = grupo === 'huevo' ? $('#err-huevo') : $('#err-pollito');
    if(!rangoOk){
      errEl.hidden = false;
      errEl.textContent = 'Cada probabilidad debe estar entre 0 y 1.';
    } else if(!sumOk){
      errEl.hidden = false;
      errEl.textContent = 'La suma actual es ' + sum.toFixed(2) + ' y debe ser 1.00.';
    } else {
      errEl.hidden = true;
      errEl.textContent = '';
    }
    return rangoOk && sumOk;
  }
  function validarProbabilidades(){
    const hOk = validarGrupo('huevo');
    const pOk = validarGrupo('pollito');
    return hOk && pOk;
  }

  // Poisson via Knuth
  function poisson(lambda){
    const L = Math.exp(-lambda);
    let k = 0, p = 1;
    do { k++; p *= Math.random(); } while(p > L);
    return k - 1;
  }

  // Binomial naive (sufficient small n daily)
  function binomial(n, p){
    let x = 0;
    for(let i=0;i<n;i++) if(Math.random() < p) x++;
    return x;
  }

  function limpiarResultados(){
    tbody.innerHTML='';
    kIngresoTotal.textContent='—';
    kIngresoProm.textContent='—';
    kHuevosRotos.textContent='—';
    kPollitosMuertos.textContent='—';
  }

  function leerNumeric(el){ return parseFloat(el.value); }

  function simularUnaCorrida(params){
    const { dias, precioHuevo, precioPollo, lambda, pRoto, pPollito, pHuevoFinal, pMuere, pSobrevive } = params;
    let totalHuevos = 0;
    let totalRotos = 0;
    let totalNacen = 0;
    let totalMueren = 0;
    let totalPollosVendidos = 0;
    let totalHuevosVendidos = 0; // huevos finales
    let ingreso = 0;

    for(let d=0; d<dias; d++){
      const huevosDia = poisson(lambda);
      totalHuevos += huevosDia;
      const rotos = binomial(huevosDia, pRoto);
      const restantes = huevosDia - rotos;
      const nacen = binomial(restantes, pPollito);
      const huevosFinales = restantes - nacen; // se venden como huevo
      const mueren = binomial(nacen, pMuere);
      const pollosVendidos = nacen - mueren; // sobreviven

      totalRotos += rotos;
      totalNacen += nacen;
      totalMueren += mueren;
      totalPollosVendidos += pollosVendidos;
      totalHuevosVendidos += huevosFinales;

      ingreso += huevosFinales * precioHuevo + pollosVendidos * precioPollo;
    }

    return { totalHuevos, totalRotos, totalNacen, totalMueren, totalPollosVendidos, totalHuevosVendidos, ingreso };
  }

  function simular(){
    if(!validarProbabilidades()) return;

    limpiarResultados();

    const nsim = parseInt(nsimEl.value,10);
    const dias = parseInt(diasEl.value,10);
    const paramsBase = {
      dias,
      precioHuevo: leerNumeric(precioHuevoEl),
      precioPollo: leerNumeric(precioPolloEl),
      lambda: leerNumeric(lambdaEl),
      pRoto: leerNumeric($('#pRoto')),
      pPollito: leerNumeric($('#pPollito')),
      pHuevoFinal: leerNumeric($('#pHuevoFinal')),
      pMuere: leerNumeric($('#pMuere')),
      pSobrevive: leerNumeric($('#pSobrevive'))
    };

    let accIngreso = 0, accRotos = 0, accMueren = 0;

    const frag = document.createDocumentFragment();
    for(let i=1;i<=nsim;i++){
      const r = simularUnaCorrida(paramsBase);
      accIngreso += r.ingreso;
      accRotos += r.totalRotos;
      accMueren += r.totalMueren;

      const tr = document.createElement('tr');
      const cells = [i, r.totalHuevos, r.totalRotos, r.totalNacen, r.totalMueren, r.totalPollosVendidos, r.totalHuevosVendidos, formatear(r.ingreso)];
      cells.forEach(c => { const td=document.createElement('td'); td.textContent=c; tr.appendChild(td); });
      frag.appendChild(tr);
    }
    tbody.appendChild(frag);

    kIngresoTotal.textContent = formatear(accIngreso);
    kIngresoProm.textContent = formatear(accIngreso / (nsim * paramsBase.dias));
    kHuevosRotos.textContent = accRotos;
    kPollitosMuertos.textContent = accMueren;
  }

  // Events
  // Validación inmediata con mensajes inline
  probInputs.forEach(inp => inp.addEventListener('input', () => validarProbabilidades()));
  btnSimular.addEventListener('click', simular);
  btnLimpiar.addEventListener('click', () => { limpiarResultados(); validarProbabilidades(); });
  document.addEventListener('DOMContentLoaded', validarProbabilidades);
})();
