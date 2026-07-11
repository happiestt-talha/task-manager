---
name: Zinc & Charcoal Professional
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#47464b'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#77767b'
  outline-variant: '#c8c5cb'
  surface-tint: '#5f5e61'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1e'
  on-primary-container: '#858387'
  inverse-primary: '#c8c5ca'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1e'
  on-tertiary-container: '#818486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e1e6'
  primary-fixed-dim: '#c8c5ca'
  on-primary-fixed: '#1b1b1e'
  on-primary-fixed-variant: '#47464a'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system embodies a "Precision SaaS" aesthetic, drawing inspiration from high-performance developer tools and modern productivity platforms. It prioritizes utility, clarity, and a quiet sense of premium quality. The target audience consists of professionals and power users who value speed and density without sacrificing visual balance.

The style is rooted in **Minimalism** with a heavy emphasis on **High-Contrast Typography** and **Structural Rigidity**. It eschews decorative flourishes in favor of meaningful negative space, micro-interactions, and a sophisticated grayscale palette. The emotional response is one of focus, reliability, and technical excellence.

## Colors
The palette is dominated by a refined grayscale spectrum, using "Zinc" tones to prevent the interface from feeling cold or sterile.

- **Primary (#18181b):** Used for primary actions, high-level headings, and foundational structural elements. It provides the "anchor" for the visual hierarchy.
- **Secondary (#64748b):** A muted Blue-Gray reserved for secondary buttons, icons, and supporting text labels.
- **Surface & Background:** The application uses pure white (#ffffff) for primary content cards and "Zinc 50" (#f8fafc) for page backgrounds to create subtle depth.
- **Borders (#e2e8f0):** Crisp, low-contrast lines define the structure without creating visual noise.
- **Semantic Colors:** Success, Danger, and Warning states utilize muted, professional-grade hues (Emerald, Rose, and Amber) to ensure visibility while maintaining the sophisticated tone.

## Typography
The typography system relies exclusively on **Inter**, utilizing its variable font capabilities to fine-tune weights and tracking. 

- **Headlines:** Use tighter letter-spacing and heavier weights to create impact.
- **Body:** Optimized for legibility with a generous line-height (1.5x) to ensure long-form content is digestible.
- **Labels:** Small caps and increased tracking are used for secondary metadata and overlines to distinguish them from actionable body text.
- **Hierarchy:** High contrast between Heading sizes and Body text is used to guide the user's eye through complex data views.

## Layout & Spacing
This design system utilizes a strict 8px linear scale. All padding, margins, and component heights must be multiples of 8.

- **Grid Model:** A 12-column fluid grid is used for desktop layouts, transitioning to a single-column stack for mobile devices.
- **Margins:** Page-level margins are 24px (lg) on mobile and scale to 48px (2xl) or 64px (3xl) on desktop to provide breathing room.
- **Density:** Components use tight internal spacing (e.g., 8px or 12px) to support information-dense workflows, typical of technical SaaS platforms.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows.

- **Layers:** Surface levels are defined by shifting from White (#ffffff) to Zinc-50 (#f8fafc).
- **Shadows:** Use extremely subtle, neutral shadows for floating elements like dropdowns or modals (e.g., `0 4px 6px -1px rgb(0 0 0 / 0.1)`). 
- **Interaction:** On hover, interactive cards or rows should shift background color slightly or gain a subtle "inner" border to indicate focus.
- **Separation:** 1px borders in #e2e8f0 are the primary method of separating functional areas.

## Shapes
The shape language is disciplined and "Soft-Industrial." 

- **Standard Radius:** 4px (0.25rem) is the default for buttons, inputs, and small components.
- **Large Radius:** 8px (0.5rem) is reserved for cards and containers.
- **Inner Radius:** When nesting elements (e.g., a button inside a card), the inner radius should be 4px smaller than the outer radius to maintain visual harmony.

## Components
Consistent styling across the component library reinforces the professional SaaS aesthetic.

- **Buttons:**
    - *Primary:* Solid Charcoal (#18181b) with white text. No gradient.
    - *Secondary:* Ghost style with Blue-Gray (#64748b) text and a #e2e8f0 border.
    - *Tertiary:* Flat text-only with no background until hover.
- **Inputs:** 1px border (#e2e8f0) with a subtle 2px focus ring in Charcoal (#18181b) at 10% opacity.
- **Cards:** White background, 1px #e2e8f0 border, and 8px rounded corners. No shadow for static cards; subtle shadow for clickable cards.
- **Chips/Badges:** Muted backgrounds (e.g., Success background: #ecfdf5, text: #065f46) with 4px radius.
- **Lists:** Rows separated by 1px horizontal lines, using 12px vertical padding for high density.
- **Additional Components:**
    - *Command Menu (K-Bar):* A centered modal with backdrop blur, using monospaced shortcuts.
    - *Status Indicators:* Small 8px dots using the muted semantic palette.