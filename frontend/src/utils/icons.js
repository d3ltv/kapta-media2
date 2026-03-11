/**
 * Imports optimisés des icônes Lucide React
 * Utilise des imports ciblés pour réduire la taille du bundle
 * 
 * Au lieu de: import { ArrowRight, Phone, ... } from "lucide-react"
 * Utilisez: import { ArrowRight, Phone } from "@/utils/icons"
 */

// Exports ciblés uniquement des icônes utilisées
export { ArrowRight } from 'lucide-react';
export { Phone } from 'lucide-react';
export { Check } from 'lucide-react';
export { X } from 'lucide-react';
export { Radar } from 'lucide-react';
export { Camera } from 'lucide-react';
export { Trophy } from 'lucide-react';
export { Star } from 'lucide-react';
export { Nfc } from 'lucide-react';
export { ShieldCheck } from 'lucide-react';
export { MapPin } from 'lucide-react';
export { TrendingUp } from 'lucide-react';
export { ChevronDown } from 'lucide-react';
export { Calendar } from 'lucide-react';
export { MessageCircle } from 'lucide-react';
export { Play } from 'lucide-react';
export { Pause } from 'lucide-react';
export { Menu } from 'lucide-react';
export { ChevronRight } from 'lucide-react';
export { Mail } from 'lucide-react';
export { ExternalLink } from 'lucide-react';
export { Zap } from 'lucide-react';
export { Users } from 'lucide-react';
export { Target } from 'lucide-react';
export { BarChart } from 'lucide-react';
export { Clock } from 'lucide-react';
export { CheckCircle } from 'lucide-react';
export { AlertCircle } from 'lucide-react';
export { Info } from 'lucide-react';
export { Search } from 'lucide-react';
export { Filter } from 'lucide-react';
export { Download } from 'lucide-react';
export { Upload } from 'lucide-react';
export { Share2 } from 'lucide-react';
export { Heart } from 'lucide-react';
export { Bookmark } from 'lucide-react';
export { Eye } from 'lucide-react';
export { EyeOff } from 'lucide-react';
export { Settings } from 'lucide-react';
export { LogOut } from 'lucide-react';
export { User } from 'lucide-react';
export { Home } from 'lucide-react';

// Tailles d'icônes standardisées
export const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
};

// Props communes pour les icônes
export const iconProps = {
  strokeWidth: 2,
  className: 'inline-block',
};
