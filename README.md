# Simulación de Eventos Discretos

Un proyecto educativo que presenta simulaciones interactivas para el aprendizaje de conceptos fundamentales en la simulación de eventos discretos.

## 🎯 Objetivo

Proporcionar demos visuales e interactivas que permiten explorar diferentes aspectos de los procesos estocásticos y modelado probabilístico a través de cuatro simulaciones principales:

- **🎲 Lanzamiento de Dados**: Experimentos aleatorios y distribución de sumas
- **🏪 Llegada de Clientes**: Entradas Poisson/Exponencial a una tienda  
- **🐔 Gallina Ponedora**: Proceso de producción por lotes y colas
- **🧂 Agencia de Azúcar**: Inventario y demanda aleatoria

## 🚀 Características

### Tecnológicas
- ✅ **100% Frontend**: HTML5, CSS3 y JavaScript vanilla
- ✅ **GitHub Pages Ready**: Sin dependencias externas
- ✅ **Responsive Design**: Mobile-first (360px → desktop)
- ✅ **Accesible**: Semántica HTML5, ARIA, contraste AA
- ✅ **Temas**: Dark/Light automático + toggle manual
- ✅ **Optimizado**: Lighthouse ≥ 90 en todas las métricas

### Diseño
- 🎨 **Glassmorphism**: Efectos de cristal con blur y transparencias
- ⚡ **Microinteracciones**: Hover effects con parallax sutil
- 🎭 **Animaciones**: Entrada suave con `@keyframes` (respeta `prefers-reduced-motion`)
- 🎨 **Tipografía Fluida**: Sistema de fuentes con `clamp()` para escalado responsivo
- 🌈 **Paleta Moderna**: Variables CSS con soporte para temas

## 📁 Estructura del Proyecto

```
/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   └── styles.css        # Estilos principales
│   ├── js/
│   │   └── main.js          # Lógica JavaScript
│   └── img/
│       ├── dados.svg        # Iconos SVG
│       ├── tienda.svg
│       ├── gallina.svg
│       └── azucar.svg
├── simulaciones/
│   ├── dados.html           # Simulación de dados
│   ├── llegada-clientes.html # Simulación de llegadas
│   ├── gallina.html         # Simulación de gallina
│   └── agencia-azucar.html  # Simulación de inventario
└── README.md
```

## 🛠️ Instalación y Uso

### Opción 1: GitHub Pages (Recomendado)
1. Fork este repositorio
2. Ve a Settings → Pages
3. Selecciona "Deploy from a branch" → `main` → `/ (root)`
4. Tu sitio estará disponible en `https://tu-usuario.github.io/Simulacion_Eventos`

### Opción 2: Local
```bash
# Clonar el repositorio
git clone https://github.com/JoshNisth/Simulacion_Eventos.git
cd Simulacion_Eventos

# Servir localmente (cualquier servidor HTTP)
# Opción Python
python -m http.server 8000

# Opción Node.js
npx serve .

# Abrir en http://localhost:8000
```

## 🎨 Personalización

### Temas y Colores
Los colores se definen en variables CSS en `assets/css/styles.css`:

```css
:root {
    --bg: hsl(220 18% 8%);           /* Fondo principal */
    --panel: hsl(228 16% 14% / 0.6); /* Paneles glass */
    --text: hsl(0 0% 98%);           /* Texto principal */
    --primary: hsl(200 100% 60%);    /* Color primario */
    --accent: hsl(280 100% 70%);     /* Color acento */
}
```

### Animaciones
Para deshabilitar animaciones globalmente:
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

## 🧪 Estado de las Simulaciones

| Simulación | Estado | Descripción |
|------------|--------|-------------|
| 🎲 Dados | 🚧 En desarrollo | Próximamente |
| 🏪 Clientes | 🚧 En desarrollo | Próximamente |
| 🐔 Gallina | 🚧 En desarrollo | Próximamente |
| 🧂 Azúcar | 🚧 En desarrollo | Próximamente |

## 📊 Performance

El sitio está optimizado para obtener puntuaciones altas en Lighthouse:

- **Performance**: ≥ 90
- **Accessibility**: ≥ 90  
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

### Optimizaciones aplicadas:
- ⚡ CSS y JS minificados en producción
- 🖼️ SVG inline para iconos (sin requests HTTP)
- 📱 Responsive images con `srcset`
- 🎭 Animaciones GPU-accelerated
- 🚀 Preload de recursos críticos

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-simulacion`)
3. Commit tus cambios (`git commit -m 'Añadir nueva simulación'`)
4. Push a la rama (`git push origin feature/nueva-simulacion`)
5. Abre un Pull Request

### Lineamientos para contribuir:
- Mantener compatibilidad con GitHub Pages
- Seguir las convenciones de accesibilidad
- Probar en dispositivos móviles
- Respetar la paleta de colores existente
- Documentar nuevas características

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**JoshNisth**
- GitHub: [@JoshNisth](https://github.com/JoshNisth)
- Proyecto: [Simulacion_Eventos](https://github.com/JoshNisth/Simulacion_Eventos)

## 🙏 Agradecimientos

- Iconos creados con SVG personalizado
- Inspiración de diseño: Glassmorphism y Material Design
- Paleta de colores: Basada en principios de accesibilidad

---

⭐ **¡No olvides dar una estrella al proyecto si te resultó útil!**