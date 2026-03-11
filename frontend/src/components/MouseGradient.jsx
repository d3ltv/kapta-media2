import useMouseGradient from '@/hooks/useMouseGradient';

/**
 * MouseGradient - Gradient qui suit le curseur
 * Effet spotlight subtil
 */
const MouseGradient = ({ color = '#1c3ff9', size = 600, opacity = 0.15 }) => {
  const { gradientStyle } = useMouseGradient(color, size, opacity);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] hidden md:block"
      style={gradientStyle}
    />
  );
};

export default MouseGradient;
