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
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
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
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextScreen();
      } else {
        prevScreen();
      }
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
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const deltaX = e.deltaX;
      const deltaY = e.deltaY;
      const threshold = 30;

      if (!isTransitioning) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > threshold) {
            nextScreen();
          } else if (deltaX < -threshold) {
            prevScreen();
          }
        } else {
          if (deltaY > threshold) {
            nextScreen();
          } else if (deltaY < -threshold) {
            prevScreen();
          }
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
      className="relative w-screen h-screen overflow-hidden animate-in fade-in duration-500"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="flex h-full"
        style={{
          width: `${screens.length * 100}vw`,
          transform: `translateX(-${currentScreen * 100}vw)`,
          transition: prefersReducedMotion 
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
