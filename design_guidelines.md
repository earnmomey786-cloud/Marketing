# Design Guidelines: Horizontal Scrolling Marketing Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern horizontal scroll experiences (Apple product showcases, Awwwards-winning portfolios) combined with minimalist presentation principles. This design intentionally breaks the vertical scroll convention for a memorable, unique experience.

## Core Design Principles
- **Horizontal Flow**: Content moves left-to-right, creating a cinematic narrative experience
- **Image-First**: Full-screen backgrounds drive the visual experience
- **Minimal Interface**: No traditional navigation, letting imagery speak
- **Future-Ready Structure**: Clean foundation for content overlay

## Layout System
- **Tailwind spacing primitives**: Use units of 4, 8, 12, 16 for consistent spacing
- **Full-screen sections**: Each screen occupies 100vw × 100vh
- **Horizontal container**: 400vw total width (4 screens × 100vw each)

## Color Palette
**Currently minimal** (images provide color):
- **UI overlays** (for future content): White text with semi-transparent dark backgrounds (0 0% 0% / 0.6)
- **Accent elements**: Extract from images or use neutral white (0 0% 100%)
- **Navigation indicators**: White dots with 50% opacity, active at 100%

## Typography
- **Primary font**: Inter or Montserrat via Google Fonts
- **Sizes**: Prepared for overlay text - h1: text-6xl, h2: text-4xl, body: text-lg
- **Weight**: font-light for elegance, font-bold for emphasis

## Component Library

### Navigation System
- **Horizontal scroll controls**: Arrow buttons (left/right) positioned fixed on screen edges
- **Progress indicators**: Dot navigation at bottom center showing active screen (1/4)
- **Swipe gestures**: Touch-enabled horizontal drag for mobile
- **Keyboard support**: Arrow keys for desktop navigation

### Background Image Screens
- **Screen 1**: Image 1_1760514742498.png - Full bleed background
- **Screen 2**: Image 2_1760514742498.png - Full bleed background  
- **Screen 3**: Image 3_1760514742498.png - Full bleed background
- **Screen 4**: Image 4_1760514742498.png - Full bleed background
- **Treatment**: object-cover to maintain aspect ratio, brightness/contrast filters prepared for text legibility

### Transition Behavior
- **Scroll method**: Smooth CSS scroll-snap or animated translate-x transitions
- **Duration**: 600-800ms ease-in-out
- **Mobile swipe**: Touch/drag threshold ~50px to trigger screen change

## Accessibility Considerations
- **Keyboard navigation**: Full support via arrow keys and tab navigation
- **Screen reader**: ARIA labels for navigation controls, semantic section structure
- **Motion**: Respect prefers-reduced-motion for users sensitive to horizontal sliding

## Responsive Strategy
- **Desktop (1024px+)**: Full horizontal scroll experience, arrow navigation prominent
- **Tablet (768-1023px)**: Maintained horizontal flow, larger touch targets
- **Mobile (< 768px)**: Swipe-optimized, remove arrow buttons, emphasize dot indicators
- **Viewport lock**: Prevent vertical scroll, fix overflow-y: hidden on body

## Future Content Preparation
- **Overlay zones**: Pre-planned areas for text/CTA overlays with backdrop-blur-sm
- **Modular structure**: Each screen ready for centered content cards or asymmetric layouts
- **Z-index hierarchy**: Background (0), content overlays (10), navigation controls (50)

## Images
- **Hero concept**: All 4 images serve as full-screen hero backgrounds for each horizontal section
- **Placement**: Sequential left-to-right (Image 1 → Image 2 → Image 3 → Image 4)
- **Format**: Full-bleed, edge-to-edge coverage with subtle darkening overlay (optional) for future text contrast