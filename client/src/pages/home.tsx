import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import image1 from '@assets/1_1760514742498.png';
import image2 from '@assets/2_1760514742498.png';
import image3 from '@assets/3_1760514742498.png';
import image4 from '@assets/4_1760514742497.png';

const screens = [
  { id: 1, image: image1, alt: 'Pantalla 1' },
  { id: 2, image: image2, alt: 'Pantalla 2' },
  { id: 3, image: image3, alt: 'Pantalla 3' },
  { id: 4, image: image4, alt: 'Pantalla 4' },
];

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = screens.map((screen) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = screen.image;
        });
      });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  const goToScreen = useCallback((index: number) => {
    if (index >= 0 && index < screens.length && !isTransitioning) {
      setIsTransitioning(true);
      setDragOffset(0); // Reset drag offset cuando navegamos
      setCurrentScreen(index);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  }, [isTransitioning]);

  const nextScreen = useCallback(() => {
    if (currentScreen < screens.length - 1) {
      goToScreen(currentScreen + 1);
    }
  }, [currentScreen, goToScreen]);

  const prevScreen = useCallback(() => {
    if (currentScreen > 0) {
      goToScreen(currentScreen - 1);
    }
  }, [currentScreen, goToScreen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isTransitioning) return;
    
    touchCurrentX.current = e.touches[0].clientX;
    const diff = touchCurrentX.current - touchStartX.current;
    
    // Aplicar resistencia en los bordes
    let offset = diff;
    if (currentScreen === 0 && diff > 0) {
      // Resistencia en el borde izquierdo
      offset = diff * 0.3;
    } else if (currentScreen === screens.length - 1 && diff < 0) {
      // Resistencia en el borde derecho
      offset = diff * 0.3;
    }
    
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const diff = touchCurrentX.current - touchStartX.current;
    const swipeThreshold = 75; // Umbral para cambiar de pantalla
    const velocity = Math.abs(diff);

    if (velocity > swipeThreshold) {
      if (diff < 0 && currentScreen < screens.length - 1) {
        // Swipe izquierda - siguiente pantalla
        nextScreen();
      } else if (diff > 0 && currentScreen > 0) {
        // Swipe derecha - pantalla anterior
        prevScreen();
      } else {
        // No se puede navegar, volver a la posición original
        setDragOffset(0);
      }
    } else {
      // Swipe muy corto, volver a la posición original
      setDragOffset(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTransitioning) return;
    e.preventDefault();
    touchStartX.current = e.clientX;
    touchCurrentX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isTransitioning) return;
    
    touchCurrentX.current = e.clientX;
    const diff = touchCurrentX.current - touchStartX.current;
    
    // Aplicar resistencia en los bordes
    let offset = diff;
    if (currentScreen === 0 && diff > 0) {
      offset = diff * 0.3;
    } else if (currentScreen === screens.length - 1 && diff < 0) {
      offset = diff * 0.3;
    }
    
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const diff = touchCurrentX.current - touchStartX.current;
    const swipeThreshold = 75;
    const velocity = Math.abs(diff);

    if (velocity > swipeThreshold) {
      if (diff < 0 && currentScreen < screens.length - 1) {
        nextScreen();
      } else if (diff > 0 && currentScreen > 0) {
        prevScreen();
      } else {
        setDragOffset(0);
      }
    } else {
      setDragOffset(0);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextScreen();
      } else if (e.key === 'ArrowLeft') {
        prevScreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextScreen, prevScreen]);

  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout | null = null;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (wheelTimeout || isTransitioning) return;
      
      const deltaX = e.deltaX;
      const deltaY = e.deltaY;
      const threshold = 20;

      let shouldNavigate = false;
      let direction: 'next' | 'prev' | null = null;

      if (Math.abs(deltaX) > threshold) {
        shouldNavigate = true;
        direction = deltaX > 0 ? 'next' : 'prev';
      } else if (Math.abs(deltaY) > threshold) {
        shouldNavigate = true;
        direction = deltaY > 0 ? 'next' : 'prev';
      }

      if (shouldNavigate && direction) {
        wheelTimeout = setTimeout(() => {
          wheelTimeout = null;
        }, 100);

        if (direction === 'next') {
          nextScreen();
        } else {
          prevScreen();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
    };
  }, [nextScreen, prevScreen, isTransitioning]);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!imagesLoaded) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/70 font-light text-sm">Cargando experiencia...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden animate-in fade-in duration-500 select-none cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="flex h-full"
        style={{
          width: `${screens.length * 100}vw`,
          transform: `translateX(calc(-${currentScreen * 100}vw + ${dragOffset}px))`,
          transition: prefersReducedMotion 
            ? 'none' 
            : isDragging 
              ? 'none' 
              : 'transform 700ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        }}
      >
        {screens.map((screen) => (
          <div
            key={screen.id}
            className="relative w-screen h-screen flex-shrink-0"
            data-testid={`screen-${screen.id}`}
          >
            <img
              src={screen.image}
              alt={screen.alt}
              className="absolute inset-0 w-full h-full object-cover"
              loading={screen.id === 1 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />
          </div>
        ))}
      </div>

      {currentScreen > 0 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={prevScreen}
          disabled={isTransitioning}
          className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 no-default-hover-elevate no-default-active-elevate"
          aria-label="Pantalla anterior"
          data-testid="button-prev"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}

      {currentScreen < screens.length - 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={nextScreen}
          disabled={isTransitioning}
          className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 no-default-hover-elevate no-default-active-elevate"
          aria-label="Siguiente pantalla"
          data-testid="button-next"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-3 md:gap-4 items-center px-6 py-3 rounded-full bg-black/20 backdrop-blur-sm">
        {screens.map((screen, index) => (
          <button
            key={screen.id}
            onClick={() => goToScreen(index)}
            disabled={isTransitioning}
            className={`transition-all duration-300 rounded-full ${
              currentScreen === index
                ? 'w-10 md:w-12 h-3 md:h-4 bg-white shadow-lg shadow-white/30'
                : 'w-3 md:w-4 h-3 md:h-4 bg-white/50 hover:bg-white/70 hover:scale-110'
            }`}
            aria-label={`Ir a pantalla ${index + 1}`}
            aria-current={currentScreen === index ? 'true' : 'false'}
            data-testid={`indicator-${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm">
        <span className="text-white text-sm font-light">
          <span className="font-semibold">{currentScreen + 1}</span>
          <span className="text-white/60 mx-1">/</span>
          <span className="text-white/80">{screens.length}</span>
        </span>
      </div>
    </div>
  );
}
