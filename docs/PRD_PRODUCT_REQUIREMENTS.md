# KAPTA REACH BOOST - Product Requirements Document

## Project Overview
**Project Name:** KAPTA REACH BOOST  
**Type:** High-Conversion Landing Page  
**Target:** Local physical businesses (restaurants, garages, salons)  
**Goal:** Improve local SEO and Google visibility  
**Language:** French  

## Core Value Proposition
"On vous met dans le Top 3 Google Maps en 14 jours avec une vidéo pro + une fiche Google qui donne envie d'appeler."

## Tech Stack
- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Components:** Shadcn UI
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend:** None (Frontend-only)

## Design Theme: "KAPTA ONYX AUTHORITY"
- **Background:** White/Slate
- **CTA Color:** Electric Royal Blue (#1c3ff9)
- **Effects:** Glassmorphism, colored shadows, technical grid background
- **Typography:** Inter (body), Space Grotesk (headings), JetBrains Mono (code/markers)
- **Tone:** Authoritative, Surgical, Tech-Forward, 'No-BS'

## Page Structure
1. ✅ Sticky Glassmorphic Navbar with logo "KAPTA media"
2. ✅ Hero Section with client photo and floating stats
3. ✅ Problem Comparison Section (Old vs. New)
4. ✅ 4-Step Mechanism Section
5. ✅ Case Studies / Partners Section
6. ✅ Offer/Pricing Section with "Decoy Effect"
7. ✅ FAQ & Guarantee Section
8. ✅ Dark Mode Footer
9. ✅ Mobile Sticky CTA

## File Architecture
```
/app/frontend/src/
├── App.js           # Main component (all sections)
├── App.css          # Custom animations, component styles
├── index.css        # Global styles, CSS variables, fonts
└── components/ui/   # Shadcn UI components
```

---

## Completed Work

### 2025-01-30
- ✅ Initial landing page creation (all sections)
- ✅ Multiple copywriting iterations (clarity, proof, psychology)
- ✅ Hero redesign with authentic client photo
- ✅ Mobile-first optimization
- ✅ Header logo styling (KAPTA bold + media italic)

---

## Prioritized Backlog

### P0 - Critical
- None currently

### P1 - High Priority
- [ ] Google Analytics / Meta Pixel integration
- [ ] Cross-device testing (iPhone 12 Pro 390px, iPad 768px)

### P2 - Medium Priority
- [ ] Calendly integration for appointment booking
- [ ] Real video testimonial

### P3 - Low Priority / Refactoring
- [ ] Split App.js into separate component files
- [ ] Create /components/sections/ directory

---

## Notes
- Case Studies section uses "Premiers partenaires en cours" (placeholder for real testimonials)
- Client images are stock photos
- All copy has been refined to be direct, honest, and benefit-driven
