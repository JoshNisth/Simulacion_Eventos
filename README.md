git clone https://github.com/JoshNisth/Simulacion_Eventos.git
# Simulación de Eventos Discretos

Proyecto educativo con simulaciones interactivas para explorar procesos estocásticos, inventarios simples y modelos probabilísticos usando únicamente HTML, CSS y JavaScript (sin dependencias externas).

## 🎯 Objetivo

Ofrecer un laboratorio visual para entender distribuciones, generación de números aleatorios, conteos Poisson, políticas simples de inventario y crecimiento financiero básico.

## 🚀 Simulaciones Incluidas

| Simulación | Archivo | Conceptos Clave |
|------------|---------|-----------------|
| 🎲 Lanzamiento de Dados | `docs/simulaciones/dados.html` | Variables discretas, expectativa empírica |
| 🏪 Llegada de Clientes | `docs/simulaciones/llegada-clientes.html` | Llegadas uniformes, distribución discreta de demanda |
| 🐔 Gallina Ponedora | `docs/simulaciones/gallina.html` | Poisson diario + ramificación probabilística |
| 🧂 Agencia de Azúcar | `docs/simulaciones/agencia-azucar.html` | Revisión periódica inventario, demanda exponencial, pérdidas |
| � Interés Simple | `docs/simulaciones/interes-simple.html` | Crecimiento lineal (M = C + C·i·n) |

## 🧱 Stack
- ✅ 100% Frontend (GitHub Pages friendly)
- ✅ Vanilla JS modular (un archivo por simulación)
- ✅ Tema oscuro único optimizado (sin toggle ahora)
- ✅ Accesibilidad: headings lógicos, focus visible, ARIA donde aporta
- ✅ Sin build step: clonas y funciona

## 📁 Estructura (deploy desde `/docs`)

```
/
├── docs/
│   ├── index.html                  # Menú principal
│   ├── css/                        # Estilos globales + específicos
│   ├── js/                         # Lógica global
│   │   └── simulaciones/           # Lógica por módulo
│   └── simulaciones/               # Páginas de cada demo
└── README.md
```

> Se consolidó la antigua estructura (`assets/`, `html/`, `simulaciones/`) dentro de `docs/` para simplificar GitHub Pages.

## 🌐 Despliegue en GitHub Pages
1. Fork del repositorio
2. Settings → Pages → Source = "Deploy from a branch"
3. Branch = `main`, carpeta = `/docs`
4. Guardar. URL: `https://<tu-usuario>.github.io/Simulacion_Eventos/`

## ▶️ Uso Local
```bash
git clone https://github.com/JoshNisth/Simulacion_Eventos.git
cd Simulacion_Eventos
python -m http.server 8000   # o npx serve ./docs
# Abrir: http://localhost:8000/docs/
```

## 🎨 Personalización Rápida
Variables principales en `docs/css/styles.css`:
```css
:root {
  --bg: hsl(220 18% 8%);
  --panel: hsl(228 16% 14% / 0.6);
  --text: hsl(0 0% 98%);
  --primary: hsl(200 100% 60%);
  --accent: hsl(280 100% 70%);
}
```

## 🧪 Generación Aleatoria / Modelos
- Poisson: método de Knuth
- Exponencial: inversa ( -λ ln(1-u) )
- Discreto: acumulación de probabilidades ordenadas
- Uniforme entero: `min + floor(u*(max-min+1))`

## 📊 Métricas Clave por Simulación
| Simulación | Métricas |
|------------|----------|
| Dados | Ganancia neta, % juegos ganados |
| Clientes | Artículos totales, ganancia neta promedio |
| Gallina | Huevos rotos, pollitos muertos, ingreso total y promedio por día |
| Azúcar | Nivel servicio, inventario promedio, ganancia neta, capacidad suficiente |
| Interés | Capital final, interés acumulado y tabla de evolución |

## ♿ Accesibilidad
- Tablas con `<caption>` (sr-only) y cabeceras sticky
- Colores con buen contraste en fondo oscuro
- Indicadores de foco consistentes

## 🤝 Contribuciones
1. Crea rama: `git checkout -b feature/nueva-simulacion`
2. Agrega tu HTML a `docs/simulaciones/` + JS en `docs/js/simulaciones/`
3. Incluye CSS modular si hace falta
4. Actualiza este README si agregas una simulación
5. Pull Request 👍

## 🔍 Próximas Ideas (Roadmap ligero)
- Exportar resultados a CSV
- Gráficas simples (canvas) para series de inventario / Poisson
- Parámetros guardados en `localStorage`

## 📄 Licencia
MIT — úsalo libremente citando la fuente si te es útil.

## 👨‍💻 Autor
**JoshNisth** – [GitHub](https://github.com/JoshNisth)

---
⭐ Si te ayudó, considera dejar una estrella.