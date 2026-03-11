// Lazy-loaded components pour réduire le bundle initial
import { lazy } from 'react';

// Composants non-critiques chargés à la demande
export const BeforeAfterSlider = lazy(() => import('./components/BeforeAfterSlider'));
export const BottomSheet = lazy(() => import('./components/BottomSheet'));
export const FlipCard = lazy(() => import('./components/FlipCard'));
export const FloatingActionButton = lazy(() => import('./components/FloatingActionButton'));
export const FontSizeControl = lazy(() => import('./components/FontSizeControl'));
export const InteractiveGlassTitle = lazy(() => import('./components/InteractiveGlassTitle'));
export const LeadsCalculator = lazy(() => import('./components/LeadsCalculator'));
export const MagneticButton = lazy(() => import('./components/MagneticButton'));
export const VideoPlayer = lazy(() => import('./components/VideoPlayer'));
export const Waveform = lazy(() => import('./components/Waveform'));
export const ScrollBadge = lazy(() => import('./components/ScrollBadge'));
export const SectionIndicator = lazy(() => import('./components/SectionIndicator'));

// Composants UI Radix (lourds) chargés à la demande
export const Accordion = lazy(() => import('./components/ui/accordion').then(m => ({ default: m.Accordion })));
export const AccordionContent = lazy(() => import('./components/ui/accordion').then(m => ({ default: m.AccordionContent })));
export const AccordionItem = lazy(() => import('./components/ui/accordion').then(m => ({ default: m.AccordionItem })));
export const AccordionTrigger = lazy(() => import('./components/ui/accordion').then(m => ({ default: m.AccordionTrigger })));
