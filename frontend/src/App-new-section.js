                {/* Header avec logo Google */}
                <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#4285F4] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </div>
                
                {/* Photo de couverture */}
                <div className="h-32 sm:h-40 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1c3ff9]/10 to-[#6366f1]/10"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <h3 className="font-bold text-lg text-gray-900">Votre Commerce</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">4.9 (127 avis)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Informations principales */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-[#1c3ff9]" />
                    <span>123 Rue de la République, Tours</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                    <span className="text-[#10B981] font-medium">Ouvert</span>
                    <span className="text-gray-600">· Ferme à 19h00</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-[#1c3ff9]" />
                    <span>06 86 01 80 54</span>
                  </div>
                  
                  {/* Boutons d'action */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 bg-[#1c3ff9] text-white py-2 px-4 rounded-lg text-sm font-medium">
                      Appeler
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
                      Itinéraire
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Badge de position */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-3 -right-3 bg-[#10B981] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
              >
                Position N°1 ✓
              </motion.div>
              
              {/* Statistiques flottantes */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -left-4 top-1/2 bg-white rounded-xl p-3 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#10B981]">+127%</p>
                    <p className="text-[10px] text-gray-500">Appels/mois</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>