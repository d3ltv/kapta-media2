/**
 * Bouton de carrousel accessible
 * Corrige les problèmes identifiés dans l'audit PageSpeed:
 * - Zone tactile trop petite (6×6px → 44×44px)
 * - Absence d'aria-label
 * - Absence d'indication du slide actif
 */

const CarouselButton = ({ 
  index, 
  isActive, 
  onClick, 
  totalSlides,
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={`Aller au slide ${index + 1} sur ${totalSlides}${isActive ? ' (actif)' : ''}`}
      aria-current={isActive ? 'true' : 'false'}
      className={`
        carousel-dot
        relative inline-flex items-center justify-center
        min-w-[44px] min-h-[44px]
        transition-all duration-300
        focus-visible:outline-2 focus-visible:outline-[#1c3ff9] focus-visible:outline-offset-2
        ${className}
      `}
      type="button"
    >
      {/* Indicateur visuel */}
      <span 
        className={`
          block rounded-full transition-all duration-300
          ${isActive 
            ? 'w-8 h-1.5 bg-[#1c3ff9]' 
            : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
          }
        `}
        aria-hidden="true"
      />
      
      {/* Texte pour lecteurs d'écran */}
      <span className="sr-only">
        {isActive ? 'Slide actif' : 'Aller au slide'} {index + 1}
      </span>
    </button>
  );
};

export default CarouselButton;
