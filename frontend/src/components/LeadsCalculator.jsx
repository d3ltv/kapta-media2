import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle } from 'lucide-react';

/**
 * LeadsCalculator - Calculateur interactif de leads perdus
 */
const LeadsCalculator = () => {
  const [callsPerMonth, setCallsPerMonth] = useState(50);
  const [conversionRate, setConversionRate] = useState(30);

  // Calculs
  const missedCalls = Math.round(callsPerMonth * 0.35); // 35% d'appels manqués en moyenne
  const potentialLeads = Math.round(missedCalls * (conversionRate / 100));
  const avgTicket = 250; // Ticket moyen estimé
  const lostRevenue = potentialLeads * avgTicket;

  return (
    <div className="bg-gradient-to-br from-[#1c3ff9]/5 to-[#6366f1]/5 dark:from-[#1c3ff9]/10 dark:to-[#6366f1]/10 rounded-2xl p-6 md:p-8 border-2 border-[#1c3ff9]/20 dark:border-[#1c3ff9]/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#1c3ff9] flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200">
            Calculateur de Leads Perdus
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Estimez ce que vous perdez chaque mois
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Appels reçus par mois : <span className="text-[#1c3ff9] dark:text-[#6B9FFF]">{callsPerMonth}</span>
          </label>
          <input
            type="range"
            min="10"
            max="200"
            value={callsPerMonth}
            onChange={(e) => setCallsPerMonth(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-[#2A2E39] rounded-lg appearance-none cursor-pointer accent-[#1c3ff9]"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>10</span>
            <span>200</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Taux de conversion : <span className="text-[#1c3ff9] dark:text-[#6B9FFF]">{conversionRate}%</span>
          </label>
          <input
            type="range"
            min="10"
            max="80"
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-[#2A2E39] rounded-lg appearance-none cursor-pointer accent-[#1c3ff9]"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>10%</span>
            <span>80%</span>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <motion.div
        key={`${callsPerMonth}-${conversionRate}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-[#1A1D24] rounded-xl p-6 border border-gray-100 dark:border-[#2A2E39]"
      >
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Vous perdez chaque mois :
            </p>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-red-500">{missedCalls}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">appels manqués</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-red-500">{potentialLeads}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">clients potentiels</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-red-500">{lostRevenue.toLocaleString('fr-FR')} €</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">de CA perdu</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-[#2A2E39]">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            💡 Avec KAPTA Media, récupérez jusqu'à 80% de ces appels manqués
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#10B981] dark:text-[#34D399]">
              +{Math.round(lostRevenue * 0.8).toLocaleString('fr-FR')} €
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">de CA récupérable/mois</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeadsCalculator;
