# Web de Marketing Digital - Navegación Horizontal

## Descripción General
Sitio web de marketing digital con una experiencia visual única que utiliza navegación horizontal en lugar del scroll vertical tradicional. El diseño presenta 4 pantallas con imágenes de fondo a pantalla completa que se desplazan lateralmente, creando una experiencia cinematográfica e inmersiva.

## Estado Actual del Proyecto
**Última actualización**: Octubre 15, 2025

El proyecto actualmente tiene:
- ✅ Navegación horizontal suave entre 4 pantallas
- ✅ Imágenes de fondo a pantalla completa
- ✅ Controles de navegación (flechas laterales)
- ✅ Indicadores de progreso (dots en la parte inferior)
- ✅ **Arrastre fluido con dedo/mouse**: La pantalla sigue el movimiento del dedo en tiempo real
- ✅ **Efecto de resistencia en bordes**: Feedback visual cuando no puedes avanzar más
- ✅ Navegación con teclado (flechas izquierda/derecha)
- ✅ Navegación con scroll del mouse (vertical/horizontal)
- ✅ Transiciones animadas suaves (700ms)
- ✅ Diseño responsive para todos los dispositivos
- ✅ Cursor grab/grabbing en modo arrastre
- ✅ Respeto por prefers-reduced-motion
- ✅ **Texto overlay en primera pantalla**: Imagen con mensaje "Nie nudź jak wszyscy - Bądź zajebisty!"
- ✅ **Servidor configurado**: Puerto por defecto 80 en producción

## Arquitectura Técnica

### Frontend
- **Framework**: React con TypeScript
- **Routing**: Wouter (no se usa mucho, solo una página principal)
- **Estilos**: Tailwind CSS con sistema de diseño personalizado
- **Componentes UI**: shadcn/ui
- **Fuentes**: Montserrat e Inter de Google Fonts

### Estructura de Pantallas
1. **Pantalla 1**: Imagen 1_1760514742498.png + Texto overlay (zajebistymarketing_1760541934438.png)
2. **Pantalla 2**: Imagen 2_1760514742498.png  
3. **Pantalla 3**: Imagen 3_1760514742498.png
4. **Pantalla 4**: Imagen 4_1760514742497.png

### Características de Navegación
- **Desktop**: 
  - Arrastre con mouse (click y arrastrar)
  - Flechas laterales (botones visuales)
  - Teclas de flecha izquierda/derecha
  - Scroll con rueda del mouse (vertical/horizontal)
- **Mobile**: 
  - Arrastre táctil fluido (swipe con seguimiento en tiempo real)
  - La pantalla sigue el dedo mientras arrastras
- **Todos**: 
  - Indicadores de progreso (dots) en la parte inferior
  - Efecto de resistencia (rubber band) en los bordes
  - Umbral de 75px para cambiar de pantalla
- **Transiciones**: 
  - Durante arrastre: Sin transición (sigue el dedo)
  - Al soltar: 700ms con easing cubic-bezier(0.4, 0.0, 0.2, 1)

## Próximos Pasos Planeados
El sitio está preparado para:
- Agregar contenido de texto sobre las imágenes de fondo
- Incluir CTAs (Call-to-Actions) en cada pantalla
- Añadir información de servicios de marketing digital
- Incorporar formulario de contacto
- Integrar secciones de portafolio o casos de éxito

## Decisiones de Diseño
- **Sin menú tradicional**: El diseño minimalista elimina la navegación tradicional
- **Experiencia inmersiva**: Las imágenes a pantalla completa crean un impacto visual fuerte
- **Horizontal sobre vertical**: Rompe con las convenciones para destacar
- **Accesibilidad**: Soporte completo para teclado, lectores de pantalla, y motion preferences

## Comando de Inicio
```bash
npm run dev
```

El servidor se ejecuta en el puerto 5000 (frontend y backend integrados).