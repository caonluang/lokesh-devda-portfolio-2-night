# Design Brief — Lokesh Devda Portfolio

**Vision**: Cinematic dark luxury portfolio showcasing a graphic designer's work with neon glow, glassmorphism, and immersive 3D depth effects.

**Tone**: Premium, cinematic, bold, immersive — high visual intensity appropriate for a creative showcase.

**Differentiation**: Floating glassmorphic cards with gradient neon borders (purple→cyan), gradient mesh radial backgrounds, 3D perspective transforms, and smooth scroll animations create an unforgettable first impression.

## Color Palette

| Token | OKLCH | Intent |
|-------|-------|--------|
| Background Primary | `0.06 0 0` | Deep jet black (#0a0a0f) |
| Foreground Primary | `1.0 0 0` | Pure white for high contrast |
| Accent Purple | `0.62 0.22 285` | Electric purple (#7c3aed) — primary accent |
| Accent Cyan | `0.80 0.24 192` | Neon cyan (#00f5ff) — secondary accent |
| Accent Red | `0.57 0.25 20` | Hot red (#ff2d55) — destructive/attention |
| Accent Gold | `0.70 0.17 60` | Warm gold (#f5a623) — highlights |
| Muted | `0.25 0 0` | Dark grey for secondary text |
| Card | `0.08 0 0` | Slightly lighter than background for elevation |

## Typography

| Layer | Font | Scale | Usage |
|-------|------|-------|-------|
| Display | General Sans | 64–80px | Hero title, section heads |
| Body | DM Sans | 16–18px | Copy, descriptions |
| Mono | Geist Mono | 12–14px | Code, technical labels |

## Structural Zones

| Zone | Surface | Treatment |
|------|---------|-----------|
| Hero | Gradient mesh radial | Full-bleed dark + floating purple/cyan/red overlays |
| Card | Glass card | `bg-card/80 backdrop-blur-2xl border border-border/20 rounded-3xl` |
| Section Bg | Elevated | `bg-card/30` with subtle border-top |
| Footer | Muted | `bg-muted/20` with top border, reduced visual weight |

## Elevation & Depth

- **Card layer**: `backdrop-filter: blur(20px)` + `rgba(255,255,255,0.04–0.08)` background
- **Glow effects**: Purple `0 0 30px rgba(124,58,237,0.4)` | Cyan `0 0 30px rgba(0,245,255,0.3)`
- **3D perspective**: `perspective: 1000px` on interactive sections
- **Border accents**: Gradient borders (purple→cyan) on featured cards

## Component Patterns

- **Glass cards**: Hover reveals glow border, slight scale increase
- **Buttons**: Neon cyan border + glow on hover, magnetic cursor behavior
- **Category pills**: Bucket-fill effect on hover (image pours up from bottom)
- **Timeline nodes**: Glowing circles with connecting line, scroll-triggered reveal

## Motion & Animation

- **Scroll behavior**: Lenis.js smooth inertia scrolling
- **Section reveals**: GSAP ScrollTrigger with scrub animations tied to scroll
- **Floating elements**: 6s ease-in-out infinite float (±20px vertical)
- **Pulse glow**: 2s ease-in-out opacity pulse on interactive elements
- **Cursor**: Custom neon trail cursor

## Constraints & Spacing

- **Border radius**: Cards 24–32px, buttons 12–20px, sharp 0px for accents
- **Gap density**: 24px section padding, 16px card gap, 8px inline spacing
- **Aspect ratios**: 16:9 hero, 4:3 portfolio grid, 1:1 skill rings

## Signature Detail

Gradient mesh radial background (purple at 20% / cyan at 80% / red at center) creates visual depth without distraction — the portfolio content floats above, never fights for attention.

## Dark Mode

No light mode — dark luxury only. Palette is dark-mode-first, fully saturated with high contrast for readability and visual impact.
