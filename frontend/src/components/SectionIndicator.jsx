import { useState, useEffect } from 'react';

/**
 * SectionIndicator - Indicateur de navigation entre sections
 * @param {Array} sections - Liste des IDs de sections
 */
const SectionIndicator = ({ sections = [] }) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  if (sections.length === 0) return null;

  return (
    <div className="section-indicator">
      {sections.map((sectionId, index) => (
        <button
          key={sectionId}
          className={`section-indicator-dot ${activeSection === index ? 'active' : ''}`}
          onClick={() => scrollToSection(sectionId)}
          aria-label={`Aller à la section ${index + 1}`}
          title={`Section ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default SectionIndicator;
