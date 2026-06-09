---
name: ui-ux-pro-max
description: "UI/UX design intelligence for web applications. Includes 50+ styles, color palettes, font pairings, product types, 99 UX guidelines, and chart types for HTML/CSS + JavaScript + FastAPI (Jinja2 templates or API+SPA). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, and check UI/UX code. Projects: website, landing page, dashboard, admin panel, e-commerce, SaaS, portfolio, blog. Elements: button, modal, navbar, sidebar, card, table, form, and chart. Styles: glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, and flat design. Topics: color systems, accessibility, animation, layout, typography, font pairing, spacing, interaction states, shadow, and gradient."
---

# UI/UX Pro Max - Design Intelligence for Web

Comprehensive design guide for web applications built with HTML/CSS + JavaScript + FastAPI. Contains 50+ styles, color palettes, font pairings, product types with reasoning rules, 99 UX guidelines, and chart types.

## When to Apply

This Skill should be used when the task involves **UI structure, visual design decisions, interaction patterns, or user experience quality control**.

### Must Use

This Skill must be invoked in the following situations:

- Designing new pages (Landing Page, Dashboard, Admin, SaaS, Website)
- Creating or refactoring UI components (buttons, modals, forms, tables, charts, etc.)
- Choosing color schemes, typography systems, spacing standards, or layout systems
- Reviewing UI code for user experience, accessibility, or visual consistency
- Implementing navigation structures, animations, or responsive behavior
- Making product-level design decisions (style, information hierarchy, brand expression)
- Improving perceived quality, clarity, or usability of interfaces

### Recommended

This Skill is recommended in the following situations:

- UI looks "not professional enough" but the reason is unclear
- Receiving feedback on usability or experience
- Pre-launch UI quality optimization
- Building design systems or reusable component libraries

### Skip

This Skill is not needed in the following situations:

- Pure backend logic development
- Only involving API or database design
- Performance optimization unrelated to the interface
- Infrastructure or DevOps work
- Non-visual scripts or automation tasks

**Decision criteria**: If the task will change how a feature **looks, feels, moves, or is interacted with**, this Skill should be used.

## Rule Categories by Priority

| Priority | Category | Impact | Key Checks (Must Have) | Anti-Patterns (Avoid) |
|----------|----------|--------|------------------------|------------------------|
| 1 | Accessibility | CRITICAL | Contrast 4.5:1, Alt text, Keyboard nav, Aria-labels | Removing focus rings, Icon-only buttons without labels |
| 2 | Touch & Interaction | CRITICAL | Min size 44x44px, 8px+ spacing, Loading feedback | Reliance on hover only, Instant state changes (0ms) |
| 3 | Performance | HIGH | WebP/AVIF, Lazy loading, Reserve space (CLS < 0.1) | Layout thrashing, Cumulative Layout Shift |
| 4 | Style Selection | HIGH | Match product type, Consistency, SVG icons (no emoji) | Mixing flat & skeuomorphic randomly, Emoji as icons |
| 5 | Layout & Responsive | HIGH | Mobile-first breakpoints, Viewport meta, No horizontal scroll | Horizontal scroll, Fixed px container widths, Disable zoom |
| 6 | Typography & Color | MEDIUM | Base 16px, Line-height 1.5, Semantic color tokens | Text < 12px body, Gray-on-gray, Raw hex in components |
| 7 | Animation | MEDIUM | Duration 150-300ms, Motion conveys meaning, Spatial continuity | Decorative-only animation, Animating width/height, No reduced-motion |
| 8 | Forms & Feedback | MEDIUM | Visible labels, Error near field, Helper text, Progressive disclosure | Placeholder-only label, Errors only at top, Overwhelm upfront |
| 9 | Navigation Patterns | HIGH | Predictable back, Max 5 nav items, Deep linking | Overloaded nav, Broken back behavior, No deep links |
| 10 | Charts & Data | LOW | Legends, Tooltips, Accessible colors | Relying on color alone to convey meaning |

## Quick Reference

### 1. Accessibility (CRITICAL)

- `color-contrast` - Minimum 4.5:1 ratio for normal text (large text 3:1)
- `focus-states` - Visible focus rings on interactive elements (2-4px)
- `alt-text` - Descriptive alt text for meaningful images; decorative images use `alt=""`
- `aria-labels` - aria-label for icon-only buttons
- `keyboard-nav` - Tab order matches visual order; full keyboard support
- `form-labels` - Use `<label>` with `for` attribute
- `skip-links` - Skip to main content for keyboard users
- `heading-hierarchy` - Sequential h1->h6, no level skip
- `color-not-only` - Don't convey info by color alone (add icon/text)
- `dynamic-type` - Support system text scaling; avoid truncation as text grows
- `reduced-motion` - Respect `prefers-reduced-motion`; reduce/disable animations when requested
- `escape-routes` - Provide cancel/back in modals and multi-step flows
- `keyboard-shortcuts` - Preserve system and a11y shortcuts; offer keyboard alternatives

### 2. Touch & Interaction (CRITICAL)

- `touch-target-size` - Min 44x44px; extend hit area beyond visual bounds if needed
- `touch-spacing` - Minimum 8px gap between touch targets
- `hover-vs-tap` - Use click/tap for primary interactions; don't rely on hover alone
- `loading-buttons` - Disable button during async operations; show spinner or progress
- `error-feedback` - Clear error messages near problem
- `cursor-pointer` - Add `cursor: pointer` to clickable elements
- `gesture-conflicts` - Avoid horizontal swipe on main content; prefer vertical scroll
- `tap-delay` - Use `touch-action: manipulation` to reduce 300ms delay
- `press-feedback` - Visual feedback on press (opacity change, ripple effect)
- `gesture-alternative` - Don't rely on gesture-only interactions; always provide visible controls
- `no-precision-required` - Avoid requiring pixel-perfect taps on small icons or thin edges

### 3. Performance (HIGH)

- `image-optimization` - Use WebP/AVIF, responsive images (srcset/sizes), lazy load non-critical assets
- `image-dimension` - Declare width/height or use aspect-ratio to prevent layout shift (CLS)
- `font-loading` - Use `font-display: swap/optional` to avoid invisible text (FOIT)
- `font-preload` - Preload only critical fonts; avoid overusing preload on every variant
- `critical-css` - Prioritize above-the-fold CSS (inline critical CSS)
- `lazy-loading` - Lazy load non-hero components via dynamic import
- `bundle-splitting` - Split code by route/feature to reduce initial load
- `third-party-scripts` - Load third-party scripts async/defer; audit and remove unnecessary ones
- `reduce-reflows` - Avoid frequent layout reads/writes; batch DOM reads then writes
- `content-jumping` - Reserve space for async content to avoid layout jumps (CLS)
- `lazy-load-below-fold` - Use `loading="lazy"` for below-the-fold images
- `main-thread-budget` - Keep per-frame work under ~16ms for 60fps
- `progressive-loading` - Use skeleton screens instead of long blocking spinners for >1s operations
- `debounce-throttle` - Use debounce/throttle for high-frequency events (scroll, resize, input)

### 4. Style Selection (HIGH)

- `style-match` - Match style to product type
- `consistency` - Use same style across all pages
- `no-emoji-icons` - Use SVG icons (Heroicons, Lucide), not emojis
- `color-palette-from-product` - Choose palette from product/industry
- `effects-match-style` - Shadows, blur, radius aligned with chosen style
- `state-clarity` - Make hover/pressed/disabled states visually distinct
- `elevation-consistent` - Use a consistent elevation/shadow scale for cards, modals
- `dark-mode-pairing` - Design light/dark variants together
- `icon-style-consistent` - Use one icon set/visual language across the product
- `blur-purpose` - Use blur to indicate background dismissal (modals), not as decoration
- `primary-action` - Each screen should have only one primary CTA; secondary actions visually subordinate

### 5. Layout & Responsive (HIGH)

- `viewport-meta` - `width=device-width, initial-scale=1` (never disable zoom)
- `mobile-first` - Design mobile-first, then scale up to tablet and desktop
- `breakpoint-consistency` - Use systematic breakpoints (375 / 768 / 1024 / 1440)
- `readable-font-size` - Minimum 16px body text on mobile (avoids iOS auto-zoom)
- `line-length-control` - Mobile 35-60 chars per line; desktop 60-75 chars
- `horizontal-scroll` - No horizontal scroll on mobile; ensure content fits viewport width
- `spacing-scale` - Use 4pt/8px incremental spacing system
- `container-width` - Consistent max-width on desktop (max-w-6xl / 7xl)
- `z-index-management` - Define layered z-index scale (0 / 10 / 20 / 40 / 100 / 1000)
- `fixed-element-offset` - Fixed navbar must reserve safe padding for underlying content
- `viewport-units` - Prefer `min(100dvh, 100vh)` over `100vh` on mobile
- `orientation-support` - Keep layout readable and operable in landscape mode
- `content-priority` - Show core content first on mobile; fold or hide secondary content
- `visual-hierarchy` - Establish hierarchy via size, spacing, contrast — not color alone

### 6. Typography & Color (MEDIUM)

- `line-height` - Use 1.5-1.75 for body text
- `line-length` - Limit to 65-75 characters per line
- `font-pairing` - Match heading/body font personalities
- `font-scale` - Consistent type scale (e.g. 12 14 16 18 24 32)
- `contrast-readability` - Darker text on light backgrounds (e.g. slate-900 on white)
- `weight-hierarchy` - Bold headings (600-700), Regular body (400), Medium labels (500)
- `color-semantic` - Define semantic color tokens (primary, secondary, error, surface, on-surface) not raw hex
- `color-dark-mode` - Dark mode uses desaturated / lighter tonal variants, not inverted colors
- `color-accessible-pairs` - Foreground/background pairs must meet 4.5:1 (AA) or 7:1 (AAA)
- `color-not-decorative-only` - Functional color (error red, success green) must include icon/text
- `truncation-strategy` - Prefer wrapping over truncation; when truncating use ellipsis + tooltip
- `number-tabular` - Use tabular/monospaced figures for data columns, prices, timers
- `whitespace-balance` - Use whitespace intentionally to group related items and separate sections

### 7. Animation (MEDIUM)

- `duration-timing` - Use 150-300ms for micro-interactions; complex transitions <=400ms; avoid >500ms
- `transform-performance` - Use transform/opacity only; avoid animating width/height/top/left
- `loading-states` - Show skeleton or progress indicator when loading exceeds 300ms
- `excessive-motion` - Animate 1-2 key elements per view max
- `easing` - Use ease-out for entering, ease-in for exiting; avoid linear for UI transitions
- `motion-meaning` - Every animation must express a cause-effect relationship, not just be decorative
- `state-transition` - State changes should animate smoothly, not snap
- `continuity` - Page transitions should maintain spatial continuity
- `parallax-subtle` - Use parallax sparingly; must respect reduced-motion
- `spring-physics` - Prefer spring/physics-based curves over linear or cubic-bezier for natural feel
- `exit-faster-than-enter` - Exit animations shorter than enter (~60-70% of enter duration)
- `stagger-sequence` - Stagger list/grid item entrance by 30-50ms per item
- `interruptible` - Animations must be interruptible; user tap cancels in-progress animation
- `no-blocking-animation` - Never block user input during an animation; UI must stay interactive
- `scale-feedback` - Subtle scale (0.95-1.05) on press for tappable cards/buttons
- `modal-motion` - Modals should animate from their trigger source (scale+fade or slide-in)
- `navigation-direction` - Forward navigation animates left/up; backward animates right/down
- `layout-shift-avoid` - Animations must not cause layout reflow or CLS; use transform for position

### 8. Forms & Feedback (MEDIUM)

- `input-labels` - Visible label per input (not placeholder-only)
- `error-placement` - Show error below the related field
- `submit-feedback` - Loading then success/error state on submit
- `required-indicators` - Mark required fields (e.g. asterisk)
- `empty-states` - Helpful message and action when no content
- `toast-dismiss` - Auto-dismiss toasts in 3-5s
- `confirmation-dialogs` - Confirm before destructive actions
- `input-helper-text` - Provide persistent helper text below complex inputs
- `disabled-states` - Disabled elements use reduced opacity (0.38-0.5) + cursor change
- `progressive-disclosure` - Reveal complex options progressively; don't overwhelm upfront
- `inline-validation` - Validate on blur (not keystroke); show error only after user finishes input
- `input-type-keyboard` - Use semantic input types (email, tel, number) to trigger correct mobile keyboard
- `password-toggle` - Provide show/hide toggle for password fields
- `autofill-support` - Use autocomplete attributes so the browser can autofill
- `undo-support` - Allow undo for destructive or bulk actions
- `success-feedback` - Confirm completed actions with brief visual feedback (checkmark, toast)
- `error-recovery` - Error messages must include a clear recovery path (retry, edit, help link)
- `multi-step-progress` - Multi-step flows show step indicator or progress bar; allow back navigation
- `error-clarity` - Error messages must state cause + how to fix (not just "Invalid input")
- `focus-management` - After submit error, auto-focus the first invalid field
- `touch-friendly-input` - Mobile input height >=44px to meet touch target requirements
- `destructive-emphasis` - Destructive actions use semantic danger color (red) and are visually separated
- `toast-accessibility` - Toasts must not steal focus; use `aria-live="polite"` for screen readers
- `aria-live-errors` - Form errors use aria-live region or role="alert" to notify screen readers
- `contrast-feedback` - Error and success state colors must meet 4.5:1 contrast ratio
- `timeout-feedback` - Request timeout must show clear feedback with retry option

### 9. Navigation Patterns (HIGH)

- `bottom-nav-limit` - Navigation max 5-7 items; use labels with icons
- `drawer-usage` - Use drawer/sidebar for secondary navigation, not primary actions
- `back-behavior` - Back navigation must be predictable and consistent; preserve scroll/state
- `deep-linking` - All key screens must be reachable via URL for sharing
- `nav-label-icon` - Navigation items must have both icon and text label; icon-only nav harms discoverability
- `nav-state-active` - Current location must be visually highlighted in navigation
- `nav-hierarchy` - Primary nav vs secondary nav must be clearly separated
- `modal-escape` - Modals must offer a clear close/dismiss affordance (X button, Escape key)
- `search-accessible` - Search must be easily reachable; provide recent/suggested queries
- `breadcrumb-web` - Use breadcrumbs for 3+ level deep hierarchies
- `state-preservation` - Navigating back must restore previous scroll position and input
- `overflow-menu` - When actions exceed available space, use overflow/more menu
- `navigation-consistency` - Navigation placement must stay the same across all pages
- `persistent-nav` - Core navigation must remain reachable from deep pages
- `destructive-nav-separation` - Dangerous actions (delete, logout) must be visually separated from normal nav items

### 10. Charts & Data (LOW)

- `chart-type` - Match chart type to data type (trend -> line, comparison -> bar, proportion -> pie/donut)
- `color-guidance` - Use accessible color palettes; avoid red/green only pairs for colorblind users
- `data-table` - Provide table alternative for accessibility; charts alone are not screen-reader friendly
- `legend-visible` - Always show legend; position near the chart
- `tooltip-on-interact` - Provide tooltips showing exact values on hover/tap
- `axis-labels` - Label axes with units and readable scale
- `responsive-chart` - Charts must reflow or simplify on small screens
- `empty-data-state` - Show meaningful empty state when no data exists
- `no-pie-overuse` - Avoid pie/donut for >5 categories; switch to bar chart
- `focusable-elements` - Interactive chart elements must be keyboard-navigable
- `screen-reader-summary` - Provide a text summary for screen readers
- `gridline-subtle` - Grid lines should be low-contrast so they don't compete with data

## Design Workflow for HTML/CSS + JS + FastAPI

### Step 1: Analyze User Requirements

Extract key information from user request:

- **Product type**: Website, SaaS, Portfolio, Dashboard, Blog, Landing page
- **Target audience**: C-end consumer users; consider age group, usage context
- **Style keywords**: clean, professional, tech, minimal, dark mode, content-first, etc.
- **Stack**: HTML/CSS + Vanilla JavaScript + FastAPI (Jinja2 templates or API+SPA)

### Step 2: Define Design System

When starting a new page or component, establish:

1. **Color palette**: Primary, secondary, neutral, semantic (success/error/warning/info)
2. **Typography**: Heading font + body font pairing, size scale, weight hierarchy
3. **Spacing**: 8px base grid applied consistently
4. **Components**: Button variants, form styles, card patterns, navigation structure
5. **Responsive breakpoints**: 375px (mobile) / 768px (tablet) / 1024px (desktop) / 1440px (wide)

**Recommendations by product type:**

| Product Type | Style | Color Direction | Typography |
|-------------|-------|-----------------|------------|
| SaaS / Tech | Minimal, clean | Blue/indigo primary, neutral grays | Inter + system sans-serif |
| Portfolio | Bold, editorial | Dark/monochrome with accent | Display serif + sans body |
| Dashboard | Data-dense, flat | Muted palette, semantic colors | Monospace data + sans UI |
| Landing Page | Hero-centric, modern | Brand primary, high contrast | Variable weight sans |
| Blog | Content-first, readable | Warm neutrals, subtle accent | Serif body + sans headings |
| E-commerce | Clean, trustworthy | Brand primary, urgency accents | Readable sans, clear hierarchy |

### Step 3: Implement with HTML/CSS + JS

For this stack (no React/Vue), follow these patterns:

- **CSS Custom Properties** for theming and design tokens:
  ```css
  :root {
    --color-primary: #2563eb;
    --color-surface: #ffffff;
    --spacing-base: 8px;
    --font-body: 'Inter', system-ui, sans-serif;
    --font-heading: 'Inter', system-ui, sans-serif;
    --radius-sm: 4px;
    --radius-md: 8px;
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  }
  ```

- **Mobile-first CSS** with progressive enhancement:
  ```css
  .container { padding: 16px; }
  @media (min-width: 768px) { .container { padding: 24px; max-width: 720px; } }
  @media (min-width: 1024px) { .container { max-width: 960px; } }
  ```

- **Semantic HTML structure**:
  ```html
  <header><nav>...</nav></header>
  <main>
    <section>...</section>
  </main>
  <footer>...</footer>
  ```

- **Progressive JavaScript**: Add interactivity with `addEventListener`, `async/await`, template literals

### Step 4: Validate

Before delivering UI code, verify against the Pre-Delivery Checklist below.

## Common Rules for Professional Web UI

### Icons & Visual Elements

| Rule | Standard | Avoid |
|------|----------|-------|
| No Emoji as Structural Icons | Use SVG icons (Lucide, Heroicons) | Emojis for navigation or controls |
| Vector-Only Assets | SVG icons that scale cleanly | Raster PNG icons that blur |
| Stable Interaction States | Color/opacity transitions for states | Layout-shifting transforms on press |
| Consistent Icon Sizing | Design tokens (icon-sm, icon-md=24px, icon-lg) | Mixing arbitrary sizes |
| Stroke Consistency | Consistent stroke width per layer | Mixing thick and thin strokes |
| Filled vs Outline Discipline | One icon style per hierarchy level | Mixing filled and outline at same level |
| Touch Target Minimum | Minimum 44x44px interactive area | Small icons without expanded tap area |
| Icon Contrast | 4.5:1 for small elements, 3:1 for larger glyphs | Low-contrast icons blending into background |

### Light/Dark Mode

| Rule | Do | Don't |
|------|----|----|
| Surface readability (light) | Cards clearly separated with sufficient contrast | Overly transparent surfaces |
| Text contrast (light) | Body text contrast >=4.5:1 against light surfaces | Low-contrast gray body text |
| Text contrast (dark) | Primary text contrast >=4.5:1 on dark surfaces | Text that blends into background |
| Border visibility | Separators visible in both themes | Borders disappearing in one mode |
| State contrast parity | Pressed/focused/disabled equally distinguishable in both | States defined for one theme only |
| Token-driven theming | Semantic color tokens mapped per theme | Hardcoded per-screen hex values |

### Layout & Spacing

| Rule | Do | Don't |
|------|----|----|
| Consistent content width | Predictable max-width per viewport | Mixing arbitrary widths |
| 8px spacing rhythm | Consistent 4/8px system for padding/gaps | Random spacing increments |
| Readable text measure | Limit line length on large screens | Full-width long text |
| Section spacing hierarchy | Clear vertical rhythm tiers (16/24/32/48px) | Inconsistent spacing between similar sections |
| Adaptive gutters | Increase horizontal insets on larger widths | Same narrow gutter on all sizes |
| Scroll and fixed coexistence | Content insets for fixed bars | Scroll content obscured by sticky elements |

## Pre-Delivery Checklist

### Visual Quality

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from a consistent icon family and style
- [ ] Pressed-state visuals do not shift layout bounds
- [ ] Semantic theme tokens used consistently (no hardcoded colors)

### Interaction

- [ ] All tappable elements provide clear pressed feedback
- [ ] Touch targets meet minimum size (44x44px)
- [ ] Micro-interaction timing in 150-300ms range
- [ ] Disabled states are visually clear and non-interactive
- [ ] Screen reader focus order matches visual order

### Light/Dark Mode

- [ ] Primary text contrast >=4.5:1 in both modes
- [ ] Secondary text contrast >=3:1 in both modes
- [ ] Dividers/borders distinguishable in both modes
- [ ] Both themes tested before delivery

### Layout

- [ ] No horizontal scroll on mobile
- [ ] Verified on 375px, 768px, and 1024px+
- [ ] Horizontal insets/gutters adapt by viewport size
- [ ] 8px spacing rhythm maintained
- [ ] Long-form text measure remains readable

### Accessibility

- [ ] All meaningful images have alt text
- [ ] Form fields have labels, hints, and clear error messages
- [ ] Color is not the only indicator
- [ ] Reduced motion and dynamic text size supported
- [ ] ARIA roles/states announced correctly
