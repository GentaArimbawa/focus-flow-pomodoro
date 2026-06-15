---
name: Zenith Focus
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#320008'
  on-tertiary: '#ffffff'
  tertiary-container: '#590015'
  on-tertiary-container: '#ff4e67'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffdada'
  tertiary-fixed-dim: '#ffb3b6'
  on-tertiary-fixed: '#40000c'
  on-tertiary-fixed-variant: '#920028'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-timer:
    fontFamily: Hanken Grotesk
    fontSize: 120px
    fontWeight: '600'
    lineHeight: 110px
    letterSpacing: -0.04em
  display-timer-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 80px
    fontWeight: '600'
    lineHeight: 80px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1120px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
  section-gap: 80px
---

## Brand & Style

The design system is centered on **Functional Minimalism** with a focus on cognitive ease. It targets knowledge workers, students, and creative professionals who need a digital environment that recedes into the background, allowing their work to take center stage.

The aesthetic combines high-utility Swiss design principles with a soft, modern touch. It avoids unnecessary decoration, using generous whitespace and a restricted color palette to signal a state of calm and intentionality. The emotional response should be one of "quiet productivity"—reducing the anxiety often associated with ticking clocks and replaced by a sense of controlled flow.

## Colors

The palette utilizes "Environmental Tones" to signal the current state of the user's flow without requiring them to read text. 

- **Focus State:** Uses deep, ink-like blues and slates to create a sense of depth and seriousness.
- **Short Break:** Shifts toward soft teals and botanical greens to signal a moment of refreshment.
- **Long Break:** Employs a cooler, more expansive blue to encourage a mental disconnect from the immediate task.
- **Accent/Alert:** A soft, warm red is reserved strictly for the timer countdown and critical actions, ensuring it draws attention without inducing panic.

Backgrounds should remain near-white or very light gray to maintain a high level of perceived cleanliness.

## Typography

This design system uses a precise typographic hierarchy to organize information without the need for heavy containers. 

- **Hanken Grotesk** is used for primary headings and the main timer display; its contemporary, geometric cuts feel efficient and modern.
- **Inter** handles all body copy and UI labels, ensuring maximum legibility at smaller sizes.
- **JetBrains Mono** is introduced sparingly for secondary labels and metadata (like session counts or time intervals), providing a subtle technical/systemic feel that aligns with productivity workflows.

The `display-timer` should be the undeniable focal point of the interface.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to prevent the interface from feeling overextended, keeping all controls within a tight, central field of vision. 

- **Desktop:** 12-column grid centered, with a max-width of 1120px.
- **Mobile:** Single column with 16px side margins. 
- **Vertical Rhythm:** Use an 8px base unit. Component spacing should lean towards `stack-lg` (48px) to provide elements room to "breathe," reducing the user's visual clutter.

The timer component should always be vertically centered or placed in the upper third of the viewport to maintain ergonomic viewing.

## Elevation & Depth

To maintain the minimalist narrative, the design system avoids heavy shadows. Instead, it uses **Tonal Layers** and **Ambient Depth**:

- **Level 0 (Base):** The main background, using the neutral color.
- **Level 1 (Cards/Containers):** Pure white background with a very soft, 10% opacity slate shadow (0px 4px 20px). This is used for the main timer card and settings panels.
- **Level 2 (Modals/Popovers):** Higher contrast shadows (15% opacity) and a subtle 1px border using a lightened version of the primary color.

Subtle backdrop blurs (8px to 12px) should be used on overlay elements to maintain a sense of context with the underlying timer.

## Shapes

The shape language is "Rounded" to soften the clinical nature of productivity tools. 

- Default elements (buttons, inputs) use a **0.5rem (8px)** radius.
- Large containers (the timer card) use a **1rem (16px)** radius.
- Interactive states (hover/active) should never change the shape, only the background color or shadow depth.

## Components

### Buttons
- **Primary:** Solid `state_colors` (based on current mode) with white text. High-contrast, 0.5rem rounded corners.
- **Secondary:** Ghost style with a 1px border. Used for "Reset" or "Settings" to keep them visually subordinate to the "Start/Pause" action.

### Timer Display
The central component. It should not be enclosed in a heavy box; rather, it should sit on a Level 1 surface. The numbers should have a slight tabular-lining feature to prevent jittering during countdown.

### Progress Ring
A thin (4px - 6px) circular stroke surrounding the timer. Use a low-opacity version of the active state color for the track, and the full-saturation state color for the progress indicator.

### Session Chips
Small, `label-caps` styled indicators that show "Session 1/4". These use a light-gray background with no border to appear lightweight and non-intrusive.

### Settings Inputs
Range sliders for time duration should be custom-styled to be ultra-thin with a circular handle, adhering to the minimalist aesthetic. Avoid standard browser-default form styling.