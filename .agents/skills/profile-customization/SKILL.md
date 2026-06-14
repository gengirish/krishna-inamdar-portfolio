---
name: profile-customization
description: Customizes the visual design, sections, and components of a digital profile portfolio. Handles theme changes, color palettes, section reordering, component toggling, and design modifications. Use when modifying the look and feel, changing colors, adding or removing sections, or adjusting the design of an existing profile.
---

# Profile Customization

Customizes the visual design and component structure of a digital profile portfolio.

## Customization Points

### 1. Color Theme

**File:** `tailwind.config.ts`

Update the `neural` color object. All components reference these tokens:
- `neural-bg` — Page background
- `neural-surface` — Section backgrounds
- `neural-card` — Card backgrounds
- `neural-border` — Border colors
- `neural-cyan` — Primary accent (links, highlights, CTAs)
- `neural-purple` — Secondary accent (badges, tags)
- `neural-pink` — Tertiary accent (decorative)
- `neural-green` — Success/growth indicators
- `neural-amber` — Warm accent (warnings, attention)

### 2. Typography

**File:** `tailwind.config.ts` → `fontFamily`

Default fonts: Inter (sans) + JetBrains Mono (mono)

Alternatives:
- Professional: `"DM Sans"` + `"IBM Plex Mono"`
- Modern: `"Outfit"` + `"Fira Code"`
- Elegant: `"Playfair Display"` + `"Source Code Pro"`

Update the Google Fonts import in `src/app/layout.tsx` when changing fonts.

### 3. Section Visibility

**File:** `src/app/page.tsx`

Toggle sections by commenting/uncommenting components:

```
Available sections (in render order):
- LoadingScreen      — Boot-style intro animation
- CustomCursor       — Custom cursor effect (desktop only)
- ScrollProgress     — Top scroll progress bar
- CommandPalette     — Ctrl+K command palette
- Navbar             — Fixed navigation bar
- HeroSection        — Hero with animated role text + neural canvas
- AboutSection       — About and career summary
- SkillsSection      — Skill categories grid
- ExperienceTimeline — Career timeline with epochs
- SkillDNA           — Career graph + skill progression charts
- ProjectShowcase    — Featured projects grid
- Testimonials       — Colleague testimonials
- Footer             — Contact and links
- ChatWidget         — Floating AI chat assistant
```

**Sections safe to remove:**
- `LoadingScreen` — Remove for faster initial load
- `CustomCursor` — Remove for mobile-first clients
- `SkillDNA` — Remove if client has < 3 roles
- `Testimonials` — Remove if no testimonials available
- `CommandPalette` — Remove for non-technical clients

**Never remove:** `Navbar`, `HeroSection`, `Footer`

### 4. Hero Section Variants

**File:** `src/components/HeroSection.tsx`

Customizable elements:
- Animated role text array — Update the rotating titles
- Stats display — Pulled from `resume-data.ts` stats
- Neural network canvas — Toggle via `NeuralNetworkCanvas` component
- CTA buttons — Update text, links, and actions

### 5. Loading Screen

**File:** `src/components/LoadingScreen.tsx`

Customize:
- Boot text lines (the terminal-style loading messages)
- Version string
- Loading duration

### 6. Global CSS Utilities

**File:** `src/app/globals.css`

Custom utilities available:
- `.text-gradient` — Gradient text effect (update gradient colors)
- `.glass` / `.glass-card` — Glassmorphism effects
- `.glow-cyan` / `.glow-purple` — Glow box-shadow effects
- Custom scrollbar — Thumb and track colors

Update glow colors when changing the theme:

```css
.glow-cyan {
  box-shadow: 0 0 20px rgba(R, G, B, 0.3), 0 0 40px rgba(R, G, B, 0.1);
}
```

Convert the theme's `cyan` hex to RGB values.

### 7. Navbar Links

**File:** `src/components/Navbar.tsx`

Update navigation links to match visible sections. Remove nav items for any sections that were hidden.

## Customization Workflow

1. Apply theme preset or custom colors → `tailwind.config.ts`
2. Update glow/gradient utilities → `globals.css`
3. Toggle sections → `page.tsx`
4. Update nav links → `Navbar.tsx`
5. Customize hero content → `HeroSection.tsx`
6. Update loading screen → `LoadingScreen.tsx`
7. Test with `npm run dev` → verify all sections render
8. Run `npm run build` → ensure no build errors
