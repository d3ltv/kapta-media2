import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, MessageCircle, X } from 'lucide-react';
import * as Analytics from '@/utils/analytics';

/**
 * FloatingActionButton - FAB avec menu radial
 * Actions rapides : Téléphone, WhatsApp, Calendrier
 */
const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Phone,
      label: 'Appeler',
      color: 'from-[#10B981] to-[#059669]',
      href: 'tel:0686018054',
      onClick: () => {
        Analytics.trackPhoneClick('06 86 01 80 54', 'FAB');
        window.location.href = 'tel:0686018054';
      }
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      color: 'from-[#25D366] to-[#128C7E]',
      href: 'https://wa.me/33686018054',
      onClick: () => {
        Analytics.trackWhatsAppClick('FAB');
        window.open('https://wa.me/33686018054', '_blank');
      }
    },
    {
      icon: Calendar,
      label: 'Réserver',
      color: 'from-[#1c3ff9] to-[#0052FF]',
      onClick: () => {
        Analytics.trackCTAClick('Réserver', 'FAB');
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Pas besoin de tracker l'ouverture du menu, c'est juste une interaction UI
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      {/* Actions radiales */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Actions */}
            {actions.map((action, index) => {
              const angle = (index * 60 - 90) * (Math.PI / 180); // Répartir en arc
              const radius = 80;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.button
                  key={action.label}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    x: x, 
                    y: y, 
                    opacity: 1 
                  }}
                  exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 260, 
                    damping: 20,
                    delay: index * 0.05 
                  }}
                  onClick={action.onClick}
                  className={`absolute bottom-0 right-0 w-14 h-14 rounded-full bg-gradient-to-br ${action.color} text-white shadow-lg flex items-center justify-center group hover:scale-110 transition-transform`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <action.icon className="w-6 h-6" />
                  
                  {/* Label */}
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg"
                  >
                    {action.label}
                  </motion.span>
                </motion.button>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Bouton principal */}
      <motion.button
        onClick={toggleMenu}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] text-white shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isOpen ? 45 : 0,
          boxShadow: isOpen 
            ? '0 20px 60px rgba(28, 63, 249, 0.6)' 
            : '0 10px 40px rgba(28, 63, 249, 0.4)'
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-1"
            >
              <div className="w-6 h-0.5 bg-white rounded-full" />
              <div className="w-6 h-0.5 bg-white rounded-full" />
              <div className="w-6 h-0.5 bg-white rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
