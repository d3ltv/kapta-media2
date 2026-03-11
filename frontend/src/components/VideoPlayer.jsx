import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import useVideoAutoplay from '@/hooks/useVideoAutoplay';

/**
 * VideoPlayer - Lecteur vidéo avec autoplay au scroll
 * @param {Object} props
 * @param {string} props.src - URL de la vidéo
 * @param {string} props.poster - Image de prévisualisation
 * @param {boolean} props.autoplay - Activer l'autoplay au scroll (default: true)
 * @param {boolean} props.muted - Vidéo muette par défaut (default: true)
 * @param {boolean} props.loop - Boucle la vidéo (default: true)
 * @param {string} props.className - Classes CSS additionnelles
 */
const VideoPlayer = ({
  src,
  poster,
  autoplay = true,
  muted: initialMuted = true,
  loop = true,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const videoRef = useVideoAutoplay(autoplay ? 0.5 : 0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover rounded-lg"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Contrôles */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
          {/* Play/Pause */}
          <motion.button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-gray-900" />
            ) : (
              <Play className="w-5 h-5 text-gray-900 ml-0.5" />
            )}
          </motion.button>

          {/* Mute/Unmute */}
          <motion.button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-gray-900" />
            ) : (
              <Volume2 className="w-5 h-5 text-gray-900" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
