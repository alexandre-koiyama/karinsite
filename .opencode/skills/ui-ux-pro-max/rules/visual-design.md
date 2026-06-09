# Rule: Visual Design

**Priority:** MEDIUM
**Category:** Visual Design

## Description

Visual design communicates hierarchy, establishes brand consistency, and guides user attention — without requiring users to think about it. A solid design system ensures these principles are applied consistently.

## Visual Hierarchy Principles

### Establishing Hierarchy

1. **Size:** Larger elements attract attention first; use for headings and primary CTAs
2. **Contrast:** High contrast draws the eye; use for key actions and critical information
3. **Color:** Saturated/brand colors for emphasis; muted tones for secondary elements
4. **Position:** Top-left scanned first (LTR); place key content in F-pattern or Z-pattern
5. **Whitespace:** Generous spacing isolates and elevates important elements
6. **Typography:** Weight, size, and style create clear content levels

### Typography Scale

- Limit to 3-4 distinct text sizes per screen
- Maintain a consistent ratio between levels (1.25x or 1.333x scale)
- Use weight (bold vs. regular) to differentiate within the same size
- Reserve ALL CAPS for very short labels only (buttons, tags)

### Color Usage

- Primary color for main CTAs and key interactive elements
- Neutral colors (grays) for body text and secondary elements
- Semantic colors for feedback: green (success), red (error), yellow (warning), blue (info)
- Limit accent colors to 1-2 per screen to maintain focus

### Layout Principles

- Align to a consistent grid (8px base unit is standard)
- Use tighter spacing between related elements, looser between unrelated
- Group related items visually using proximity and shared containers

## Design System Foundations

### Core Elements

- **Color palette:** Primary, secondary, neutral, and semantic colors with usage rules
- **Typography:** Font families, size scale, weight usage, and line heights
- **Spacing:** A base unit (typically 4px or 8px) applied consistently
- **Grid:** Column structure, gutters, and margins for each breakpoint
- **Elevation:** Shadow levels indicating depth and layering
- **Border radius:** Consistent rounding (4px subtle, 8px cards, full for pills)

### Component Documentation

Every component should define:

- **Purpose, anatomy, and states** (default, hover, active, focus, disabled, error)
- **Variants** (size options, with/without icons)
- **Responsive behavior** and **accessibility requirements**

### Essential Components

Buttons · Text inputs · Select/Dropdown · Checkbox/Radio · Toggle · Cards · Modals · Toast notifications · Navigation (tabs, breadcrumbs, sidebar) · Tables/Lists · Loading indicators

## CSS Custom Properties Pattern

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-secondary: #64748b;
  --color-error: #dc2626;
  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-info: #2563eb;
  --color-surface: #ffffff;
  --color-on-surface: #0f172a;
  --color-muted: #64748b;

  /* Typography */
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-heading: 'Inter', system-ui, -apple-system, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;

  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 16px;
  --spacing-4: 24px;
  --spacing-5: 32px;
  --spacing-6: 48px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

## Common Mistakes

- Making everything bold or large (if everything is emphasized, nothing is)
- Using too many colors without clear purpose
- Competing CTAs of equal visual weight on the same screen
- Building a design system before understanding actual product needs
- Maintaining separate design and code component libraries that drift apart
