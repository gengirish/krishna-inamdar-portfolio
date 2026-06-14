# Theme Presets

Pre-built color palettes for digital profiles. Apply to `tailwind.config.ts` under `theme.extend.colors.neural` and update `globals.css` glow/gradient utilities.

## Cyberpunk Dark (Default)

Best for: Tech/AI/Engineering professionals

```
bg: "#030014"
surface: "#0f0f23"
card: "#1a1a2e"
border: "#16213e"
cyan: "#00d4ff"
purple: "#7c3aed"
pink: "#f472b6"
green: "#34d399"
amber: "#fbbf24"
```

Primary accent: cyan `#00d4ff`
Secondary accent: purple `#7c3aed`

## Ocean Deep

Best for: Finance, consulting, healthcare professionals

```
bg: "#020617"
surface: "#0f172a"
card: "#1e293b"
border: "#334155"
cyan: "#06b6d4"
purple: "#6366f1"
pink: "#ec4899"
green: "#10b981"
amber: "#f59e0b"
```

Primary accent: cyan `#06b6d4`
Secondary accent: indigo `#6366f1`

## Emerald Matrix

Best for: Data science, analytics, sustainability professionals

```
bg: "#022c22"
surface: "#064e3b"
card: "#065f46"
border: "#047857"
cyan: "#2dd4bf"
purple: "#a78bfa"
pink: "#fb7185"
green: "#4ade80"
amber: "#facc15"
```

Primary accent: green `#4ade80`
Secondary accent: teal `#2dd4bf`

## Amber Tech

Best for: Product managers, designers, creative technologists

```
bg: "#0c0a09"
surface: "#1c1917"
card: "#292524"
border: "#44403c"
cyan: "#22d3ee"
purple: "#a855f7"
pink: "#f472b6"
green: "#4ade80"
amber: "#fbbf24"
```

Primary accent: amber `#fbbf24`
Secondary accent: purple `#a855f7`

## Minimal Slate

Best for: Executive, management, non-technical professionals

```
bg: "#09090b"
surface: "#18181b"
card: "#27272a"
border: "#3f3f46"
cyan: "#67e8f9"
purple: "#c084fc"
pink: "#f9a8d4"
green: "#86efac"
amber: "#fde68a"
```

Primary accent: cyan `#67e8f9`
Secondary accent: purple `#c084fc`

## Royal Blue

Best for: Enterprise, banking, government professionals

```
bg: "#020420"
surface: "#0a0e2e"
card: "#141938"
border: "#1e2548"
cyan: "#38bdf8"
purple: "#818cf8"
pink: "#f472b6"
green: "#34d399"
amber: "#fbbf24"
```

Primary accent: blue `#38bdf8`
Secondary accent: indigo `#818cf8`

## Applying a Theme

### 1. Update tailwind.config.ts

Replace the `neural` color object:

```typescript
colors: {
  neural: {
    bg: "<bg>",
    surface: "<surface>",
    card: "<card>",
    border: "<border>",
    cyan: "<cyan>",
    purple: "<purple>",
    pink: "<pink>",
    green: "<green>",
    amber: "<amber>",
  },
},
```

### 2. Update globals.css glow utilities

Replace the rgba values in `.glow-cyan` and `.glow-purple` with the new accent colors. Convert hex to rgba for shadow effects.

### 3. Update resume-data.ts colors

Assign the theme's 5 accent colors (`cyan`, `purple`, `pink`, `green`, `amber`) as `domainColor` values in experience, projects, and `color` values in skillCategories and graphNodes.

### 4. Update OG image

Match the gradient background in `src/app/og-image.png/route.tsx` to the new theme.

## Custom Theme Creation

If the client has brand colors, create a custom palette:

1. **bg**: The darkest shade (near-black with a hint of the primary hue)
2. **surface**: Slightly lighter than bg
3. **card**: Noticeably lighter, used for card backgrounds
4. **border**: Subtle border color between card and surface
5. **5 accent colors**: Bright, saturated colors for data visualization and highlights

Ensure sufficient contrast (WCAG AA minimum) between text on `bg` and `surface` backgrounds.
