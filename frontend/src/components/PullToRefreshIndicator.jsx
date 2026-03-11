import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

/**
 * PullToRefreshIndicator - Indicateur visuel du pull to refresh
 */
const PullToRefreshIndicator = ({ pullDistance, isRefreshing, isReady, threshold = 80 }) => {
  const progress = Math.min((pullDistance / threshold) * 100, 100);
  const rotation = (pullDistance / threshold) * 360;

  if (pullDistance === 0 && !isRefreshing) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: pullDistance > 0 || isRefreshing ? 1 : 0,
        y: pullDistance > 0 || isRefreshing ? 0 : -20
      }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4"
    >
      <div className="bg-white dark:bg-[#1A1D24] rounded-full shadow-lg px-6 py-3 flex items-center gap-3 border border-gray-200 dark:border-[#2A2E39]">
        {/* Icône */}
        <motion.div
          animate={{ 
            rotate: isRefreshing ? 360 : rotation,
            scale: isReady ? 1.1 : 1
          }}
          transition={{ 
            rotate: isRefreshing ? { duration: 1, repeat: Infinity, ease: 'linear' } : { duration: 0 }
          }}
        >
          <RefreshCw 
            className={`w-5 h-5 ${
              isReady 
                ? 'text-[#1c3ff9] dark:text-[#6B9FFF]' 
                : 'text-gray-400 dark:text-gray-500'
            }`} 
          />
        </motion.div>

        {/* Texte */}
        <span className={`text-sm font-medium ${
          isRefreshing 
            ? 'text-[#1c3ff9] dark:text-[#6B9FFF]' 
            : isReady 
            ? 'text-[#1c3ff9] dark:text-[#6B9FFF]' 
            : 'text-gray-600 dark:text-gray-400'
        }`}>
          {isRefreshing 
            ? 'Actualisation...' 
            : isReady 
            ? 'Relâchez pour actualiser' 
            : 'Tirez pour actualiser'}
        </span>

        {/* Progress bar */}
        {!isRefreshing && (
          <div className="w-12 h-1 bg-gray-200 dark:bg-[#2A2E39] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#0052FF] to-[#1c3ff9] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PullToRefreshIndicator;
