import { useEffect, useRef } from 'react';

/**
 * useVideoAutoplay - Hook pour auto-play vidéos au scroll
 * Démarre la vidéo quand elle est visible, pause quand elle sort
 * @param {number} threshold - Pourcentage de visibilité requis (default: 0.5)
 */
const useVideoAutoplay = (threshold = 0.5) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Vidéo visible - play
            video.play().catch((error) => {
              // Autoplay peut être bloqué par le navigateur
              console.log('Autoplay prevented:', error);
            });
          } else {
            // Vidéo hors vue - pause
            video.pause();
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px'
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return videoRef;
};

export default useVideoAutoplay;
