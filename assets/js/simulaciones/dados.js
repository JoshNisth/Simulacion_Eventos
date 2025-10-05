// Lógica de simulación para "Lanzamiento de Dados" (juego de 2 dados)
// Contrato rápido:
// - Entradas: numSim, nmj, puj, cus7 (números)
// - Salidas por simulación: GNC (ganancia neta casa), NJGC (# juegos gana casa), PJC (%)
// - Promedios globales: sobre todas las simulaciones
// Notas: cada simulación reinicia contadores; dados ~ U{1..6} independientes

(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const resultsBody = $('#resultsBody');
  const avgGNC = $('#avgGNC');
  const avgNJGC = $('#avgNJGC');
  const avgPJC = $('#avgPJC');

  const inputNumSim = $('#numSim');
  const inputNMJ = $('#nmj');
  const inputPUJ = $('#puj');
  const inputCUS7 = $('#cus7');
  const simulateBtn = $('#simulateBtn');
  const clearBtn = $('#clearBtn');

  function lanzarDado() {
    // Genera entero uniforme 1..6 a partir de U(0,1)
    const r = Math.random(); // r_DADO
    return 1 + Math.floor(r * 6);
  }

  function formatear(num, dec = 2) {
    return Number(num).toFixed(dec);
  }

  function limpiarResultados() {
    resultsBody.innerHTML = '';
    avgGNC.textContent = '—';
    avgNJGC.textContent = '—';
  avgPJC.textContent = '—';
  }

  function simularUnaCorrida(NMJ, PUJ, CUS7) {
    let CJ = 0; // Contador de Juegos
    let NJGC = 0; // Número de Juegos Ganados por la Casa
    let GNC = 0; // Ganancia Neta de la Casa

    while (CJ < NMJ) {
      CJ++;
      const DADO1 = lanzarDado();
      const DADO2 = lanzarDado();
      const SDADOS = DADO1 + DADO2;

      // La casa cobra el costo del juego siempre
      GNC += PUJ;

      // Si sale 7, la casa paga CUS7 (pierde)
      if (SDADOS === 7) {
        GNC -= CUS7;
      } else {
        NJGC += 1;
      }
    }

    const PJC = (NJGC / NMJ) * 100;
    return { GNC, NJGC, PJC };
  }

  function simular() {
    const numSim = Math.max(1, parseInt(inputNumSim.value, 10) || 0);
    const NMJ = Math.max(1, parseInt(inputNMJ.value, 10) || 0);
    const PUJ = Math.max(0, parseFloat(inputPUJ.value) || 0);
    const CUS7 = Math.max(0, parseFloat(inputCUS7.value) || 0);

    limpiarResultados();

    let sumGNC = 0;
    let sumNJGC = 0;
    let sumPJC = 0;

    for (let i = 1; i <= numSim; i++) {
      const { GNC, NJGC, PJC } = simularUnaCorrida(NMJ, PUJ, CUS7);
      sumGNC += GNC;
      sumNJGC += NJGC;
      sumPJC += PJC;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i}</td>
        <td>${formatear(GNC)}</td>
        <td>${NJGC}</td>
        <td>${formatear(PJC, 2)}</td>
      `;
      resultsBody.appendChild(tr);
    }

    const promGNC = sumGNC / numSim;
    const promNJGC = sumNJGC / numSim;
    const promPJC = sumPJC / numSim;

    avgGNC.textContent = formatear(promGNC);
    avgNJGC.textContent = formatear(promNJGC, 0);
    avgPJC.textContent = formatear(promPJC, 2);

    // Conclusión removida por solicitud: no se muestra valor esperado ni recomendación
  }

  // Eventos
  simulateBtn?.addEventListener('click', simular);
  clearBtn?.addEventListener('click', limpiarResultados);

  // Estilos de feedback removidos (no hay conclusión)
})();
