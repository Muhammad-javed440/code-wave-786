# Device Breakpoints & Screen Sizes — Full 17-Device Matrix

## Table of Contents
- [17 Target Devices — Master Reference](#17-target-devices--master-reference)
- [Device Width Clusters](#device-width-clusters)
- [Exact Device Media Queries](#exact-device-media-queries)
- [Custom Tailwind Breakpoints](#custom-tailwind-breakpoints)
- [Device-Specific Patterns](#device-specific-patterns)
- [Safe Area & Notch Handling](#safe-area--notch-handling)
- [Foldable Device Patterns](#foldable-device-patterns)
- [Smart Display Patterns](#smart-display-patterns)
- [Universal Responsive Component](#universal-responsive-component)
- [Testing Checklist — All 17 Devices](#testing-checklist--all-17-devices)

---

## 17 Target Devices — Master Reference

### Complete Device Specs

| # | Device | Viewport (W×H) | DPR | CSS Category | Physical PPI |
|---|--------|----------------|-----|-------------|-------------|
| 1 | iPhone SE | 375×667 | 2x | Small Phone | 326 |
| 2 | iPhone XR | 414×896 | 2x | Standard Phone | 326 |
| 3 | iPhone 12 Pro | 390×844 | 3x | Standard Phone | 460 |
| 4 | iPhone 14 Pro | 393×852 | 3x | Standard Phone | 460 |
| 5 | Pixel 7 | 412×915 | 2.625x | Standard Phone | 416 |
| 6 | Samsung Galaxy S8+ | 360×740 | 4x | Small Phone | 529 |
| 7 | Samsung Galaxy S20 Ultra | 412×915 | 3.5x | Standard Phone | 511 |
| 8 | iPad Mini | 768×1024 | 2x | Small Tablet | 326 |
| 9 | iPad Air | 820×1180 | 2x | Standard Tablet | 264 |
| 10 | iPad Pro 12.9" | 1024×1366 | 2x | Large Tablet | 264 |
| 11 | Surface Pro 7 | 912×1368 | 2x | Large Tablet | 267 |
| 12 | Surface Duo | 540×720 (single) / 1080×720 (dual) | 2.5x | Foldable | 401 |
| 13 | Galaxy Z Fold 5 | 344×882 (cover) / 882×1104 (inner) | 3x | Foldable | 425 |
| 14 | Asus Zenbook Fold | 853×1280 (tablet) / 1280×853 (laptop) | 2x | Foldable Laptop | 278 |
| 15 | Samsung Galaxy A51/71 | 412×914 | 2.625x | Standard Phone | 411 |
| 16 | Nest Hub | 1024×600 | 2x | Smart Display | 229 |
| 17 | Nest Hub Max | 1280×800 | 2x | Smart Display | 214 |

### Portrait vs Landscape — All Devices

#### Phones (Portrait)

| Device | Portrait W×H | Landscape W×H | DPR |
|--------|-------------|--------------|-----|
| Galaxy Z Fold 5 (cover) | 344×882 | 882×344 | 3x |
| Samsung Galaxy S8+ | 360×740 | 740×360 | 4x |
| iPhone SE | 375×667 | 667×375 | 2x |
| iPhone 12 Pro | 390×844 | 844×390 | 3x |
| iPhone 14 Pro | 393×852 | 852×393 | 3x |
| Pixel 7 | 412×915 | 915×412 | 2.625x |
| Samsung Galaxy S20 Ultra | 412×915 | 915×412 | 3.5x |
| Samsung Galaxy A51/71 | 412×914 | 914×412 | 2.625x |
| iPhone XR | 414×896 | 896×414 | 2x |

#### Tablets (Portrait & Landscape)

| Device | Portrait W×H | Landscape W×H | DPR |
|--------|-------------|--------------|-----|
| Surface Duo (single) | 540×720 | 720×540 | 2.5x |
| iPad Mini | 768×1024 | 1024×768 | 2x |
| iPad Air | 820×1180 | 1180×820 | 2x |
| Asus Zenbook Fold | 853×1280 | 1280×853 | 2x |
| Galaxy Z Fold 5 (inner) | 882×1104 | 1104×882 | 3x |
| Surface Pro 7 | 912×1368 | 1368×912 | 2x |
| iPad Pro 12.9" | 1024×1366 | 1366×1024 | 2x |

#### Smart Displays (Always Landscape)

| Device | Width×Height | DPR |
|--------|-------------|-----|
| Nest Hub | 1024×600 | 2x |
| Nest Hub Max | 1280×800 | 2x |

---

## Device Width Clusters

Understanding width clusters helps decide where breakpoints matter most:

```
WIDTH CLUSTER MAP (portrait widths sorted)
──────────────────────────────────────────

344px  ── Galaxy Z Fold 5 (cover)          ┐
                                            ├─ Narrow phones (344-359px)
360px  ── Samsung Galaxy S8+               ┘

375px  ── iPhone SE                        ┐
390px  ── iPhone 12 Pro                    ├─ Small phones (375-399px)
393px  ── iPhone 14 Pro                    ┘

412px  ── Pixel 7                          ┐
412px  ── Samsung Galaxy S20 Ultra         ├─ Standard phones (400-430px)
412px  ── Samsung Galaxy A51/71            │
414px  ── iPhone XR                        ┘

540px  ── Surface Duo (single screen)      ── Phablet / compact tablet

768px  ── iPad Mini                        ┐
820px  ── iPad Air                         ├─ Standard tablets (768-860px)
853px  ── Asus Zenbook Fold (tablet mode)  │
882px  ── Galaxy Z Fold 5 (inner)          ┘

912px  ── Surface Pro 7                    ┐
1024px ── iPad Pro 12.9"                   ├─ Large tablets (900-1024px)
1024px ── Nest Hub (landscape)             ┘

1080px ── Surface Duo (dual screen)        ┐
1280px ── Nest Hub Max (landscape)         ├─ Small desktop (1080-1280px)
1280px ── Asus Zenbook Fold (laptop mode)  ┘
```

### Key Breakpoint Decision Points

| Breakpoint | Devices Affected | Layout Change |
|-----------|-----------------|---------------|
| 344px | Z Fold 5 cover | Ultra-compact single column, smallest possible |
| 360px | Galaxy S8+ | Small phone, slightly more room |
| 375px | iPhone SE | Classic small phone width |
| 390px | iPhone 12/14 Pro | Modern standard phone |
| 412px | Pixel 7, Galaxy S20 Ultra, Galaxy A51/71 | Standard Android |
| 414px | iPhone XR | Largest standard phone |
| 540px | Surface Duo (single) | Compact tablet, possible 2-col |
| 768px | iPad Mini | Tablet layout begins, sidebar viable |
| 820px | iPad Air | Comfortable tablet, 2-3 columns |
| 853px | Zenbook Fold | Foldable tablet mode |
| 882px | Z Fold 5 (inner) | Foldable unfolded, tablet-class |
| 912px | Surface Pro 7 | Large tablet / laptop hybrid |
| 1024px | iPad Pro, Nest Hub | Full desktop nav, 3+ columns |
| 1080px | Surface Duo (dual) | Dual-screen layout |
| 1280px | Nest Hub Max, Zenbook Fold (laptop) | Desktop layout |

---

## Exact Device Media Queries

Use these to target specific devices precisely when needed:

### iPhone SE (375×667 @2x)
```css
/* Portrait */
@media only screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) { }
/* Landscape */
@media only screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) { }
/* Both orientations */
@media only screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) { }
```

### iPhone XR (414×896 @2x)
```css
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) { }
```

### iPhone 12 Pro (390×844 @3x)
```css
@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) { }
```

### iPhone 14 Pro (393×852 @3x)
```css
@media only screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) { }
```

### Pixel 7 (412×915 @2.625x)
```css
@media only screen and (device-width: 412px) and (device-height: 915px) and (-webkit-min-device-pixel-ratio: 2.625) { }
```

### Samsung Galaxy S8+ (360×740 @4x)
```css
@media only screen and (device-width: 360px) and (device-height: 740px) and (-webkit-min-device-pixel-ratio: 4) { }
```

### Samsung Galaxy S20 Ultra (412×915 @3.5x)
```css
@media only screen and (device-width: 412px) and (device-height: 915px) and (-webkit-min-device-pixel-ratio: 3.5) { }
```

### Samsung Galaxy A51/71 (412×914 @2.625x)
```css
@media only screen and (device-width: 412px) and (device-height: 914px) and (-webkit-min-device-pixel-ratio: 2.625) { }
```

### iPad Mini (768×1024 @2x)
```css
@media only screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) { }
```

### iPad Air (820×1180 @2x)
```css
@media only screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) { }
```

### iPad Pro 12.9" (1024×1366 @2x)
```css
@media only screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) { }
```

### Surface Pro 7 (912×1368 @2x)
```css
@media only screen and (min-width: 912px) and (max-width: 912px) and (min-height: 1368px) { }
/* Landscape */
@media only screen and (min-width: 1368px) and (max-height: 912px) { }
```

### Surface Duo — Single Screen (540×720 @2.5x)
```css
@media only screen and (device-width: 540px) and (device-height: 720px) { }
/* Dual Screen (spanning) */
@media only screen and (min-width: 1080px) and (max-width: 1080px) and (horizontal-viewport-segments: 2) { }
```

### Galaxy Z Fold 5 — Cover (344×882 @3x)
```css
/* Cover screen */
@media only screen and (device-width: 344px) and (device-height: 882px) and (-webkit-device-pixel-ratio: 3) { }
/* Inner unfolded screen */
@media only screen and (device-width: 882px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3) { }
```

### Asus Zenbook Fold — Tablet Mode (853×1280 @2x)
```css
/* Tablet mode (portrait) */
@media only screen and (device-width: 853px) and (device-height: 1280px) and (-webkit-device-pixel-ratio: 2) { }
/* Laptop mode (landscape) */
@media only screen and (min-width: 1280px) and (max-height: 853px) and (-webkit-device-pixel-ratio: 2) { }
```

### Nest Hub (1024×600 @2x)
```css
@media only screen and (min-width: 1024px) and (max-height: 600px) and (-webkit-device-pixel-ratio: 2) { }
```

### Nest Hub Max (1280×800 @2x)
```css
@media only screen and (min-width: 1280px) and (max-height: 800px) and (-webkit-device-pixel-ratio: 2) { }
```

---

## Custom Tailwind Breakpoints

### Complete Configuration for All 17 Devices

Add to `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    screens: {
      // ═══════════════════════════════════════════════
      // CORE BREAKPOINTS (mobile-first, min-width)
      // ═══════════════════════════════════════════════
      'xs': '344px',      // Galaxy Z Fold 5 cover screen
      '2xs': '360px',     // Samsung Galaxy S8+
      'sm': '640px',      // Large phones landscape / phablets
      'md': '768px',      // iPad Mini, standard tablets
      'md-lg': '820px',   // iPad Air
      'lg': '1024px',     // iPad Pro, Nest Hub, laptops
      'xl': '1280px',     // Nest Hub Max, desktops, Zenbook Fold laptop
      '2xl': '1536px',    // Large desktops
      '3xl': '1920px',    // Full HD monitors
      '4xl': '2560px',    // QHD/2K monitors

      // ═══════════════════════════════════════════════
      // DEVICE CATEGORY BREAKPOINTS
      // ═══════════════════════════════════════════════
      // Max-width (desktop-first)
      'mobile': { 'max': '639px' },                          // All phones portrait
      'tablet': { 'min': '640px', 'max': '1023px' },         // All tablets
      'laptop': { 'min': '1024px', 'max': '1279px' },        // Laptops
      'desktop': { 'min': '1280px' },                        // Desktop and up

      // ═══════════════════════════════════════════════
      // PHONE-SPECIFIC RANGES (9 phones covered)
      // ═══════════════════════════════════════════════
      'phone-narrow': { 'min': '344px', 'max': '359px' },    // Z Fold 5 cover (344px)
      'phone-small': { 'min': '360px', 'max': '379px' },     // Galaxy S8+ (360px), iPhone SE (375px)
      'phone-mid': { 'min': '380px', 'max': '399px' },       // iPhone 12 Pro (390px), iPhone 14 Pro (393px)
      'phone-standard': { 'min': '400px', 'max': '430px' },  // Pixel 7 (412px), Galaxy S20 Ultra (412px), Galaxy A51/71 (412px), iPhone XR (414px)

      // ═══════════════════════════════════════════════
      // TABLET-SPECIFIC RANGES (6 tablets covered)
      // ═══════════════════════════════════════════════
      'tablet-compact': { 'min': '540px', 'max': '639px' },  // Surface Duo single (540px)
      'tablet-small': { 'min': '768px', 'max': '819px' },    // iPad Mini (768px)
      'tablet-medium': { 'min': '820px', 'max': '899px' },   // iPad Air (820px), Zenbook Fold (853px), Z Fold 5 inner (882px)
      'tablet-large': { 'min': '900px', 'max': '1023px' },   // Surface Pro 7 (912px)
      'tablet-xl': { 'min': '1024px', 'max': '1100px' },     // iPad Pro (1024px)

      // ═══════════════════════════════════════════════
      // FOLDABLE DEVICE BREAKPOINTS (3 foldables)
      // ═══════════════════════════════════════════════
      'fold-cover': { 'min': '344px', 'max': '359px' },      // Z Fold 5 cover (344px)
      'fold-single': { 'min': '540px', 'max': '560px' },     // Surface Duo single screen (540px)
      'fold-inner': { 'min': '853px', 'max': '900px' },      // Z Fold 5 inner (882px), Zenbook Fold tablet (853px)
      'fold-dual': { 'min': '1060px', 'max': '1100px' },     // Surface Duo dual (1080px)
      'fold-laptop': { 'min': '1260px', 'max': '1300px' },   // Zenbook Fold laptop (1280px)

      // ═══════════════════════════════════════════════
      // SMART DISPLAY BREAKPOINTS (2 smart displays)
      // ═══════════════════════════════════════════════
      'nest-hub': { 'raw': '(min-width: 1024px) and (max-height: 600px)' },
      'nest-hub-max': { 'raw': '(min-width: 1280px) and (max-height: 800px)' },
      'smart-display': { 'raw': '(min-width: 1024px) and (max-height: 800px)' },

      // ═══════════════════════════════════════════════
      // ORIENTATION & INPUT DETECTION
      // ═══════════════════════════════════════════════
      'portrait': { 'raw': '(orientation: portrait)' },
      'landscape': { 'raw': '(orientation: landscape)' },
      'touch': { 'raw': '(hover: none) and (pointer: coarse)' },
      'stylus': { 'raw': '(hover: none) and (pointer: fine)' },
      'mouse': { 'raw': '(hover: hover) and (pointer: fine)' },

      // ═══════════════════════════════════════════════
      // HIGH DPI / RETINA DETECTION
      // ═══════════════════════════════════════════════
      'retina': { 'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)' },
      'retina-3x': { 'raw': '(-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi)' },
      'retina-4x': { 'raw': '(-webkit-min-device-pixel-ratio: 4), (min-resolution: 384dpi)' },

      // ═══════════════════════════════════════════════
      // FOLDABLE SCREEN SPANNING (CSS Foldable APIs)
      // ═══════════════════════════════════════════════
      'dual-horizontal': { 'raw': '(horizontal-viewport-segments: 2)' },
      'dual-vertical': { 'raw': '(vertical-viewport-segments: 2)' },

      // ═══════════════════════════════════════════════
      // SHORT VIEWPORT DETECTION
      // ═══════════════════════════════════════════════
      'short': { 'raw': '(max-height: 700px)' },             // iPhone SE (667px), Nest Hub (600px)
      'tall': { 'raw': '(min-height: 900px)' },              // Tall phones, tablets
    }
  }
}
```

### Usage Examples — By Device

```html
<!-- ============================================ -->
<!-- PHONE TARGETING                              -->
<!-- ============================================ -->

<!-- Galaxy Z Fold 5 cover (344px): ultra-compact -->
<div class="phone-narrow:px-1 phone-narrow:text-xs phone-narrow:grid-cols-1">

<!-- Galaxy S8+ (360px) & iPhone SE (375px): small phones -->
<div class="phone-small:px-3 phone-small:text-sm phone-small:gap-2">

<!-- iPhone 12 Pro (390px) & iPhone 14 Pro (393px) -->
<div class="phone-mid:px-4 phone-mid:text-base phone-mid:gap-3">

<!-- Pixel 7, Galaxy S20 Ultra, Galaxy A51/71, iPhone XR (412-414px) -->
<div class="phone-standard:grid-cols-2 phone-standard:px-4 phone-standard:gap-3">

<!-- ============================================ -->
<!-- TABLET TARGETING                             -->
<!-- ============================================ -->

<!-- Surface Duo single (540px): compact tablet -->
<div class="tablet-compact:grid-cols-2 tablet-compact:px-4">

<!-- iPad Mini (768px) -->
<div class="tablet-small:grid-cols-2 tablet-small:px-6 tablet-small:gap-4">

<!-- iPad Air (820px), Zenbook Fold tablet, Z Fold 5 inner -->
<div class="tablet-medium:grid-cols-3 tablet-medium:px-6">

<!-- Surface Pro 7 (912px) -->
<div class="tablet-large:grid-cols-3 tablet-large:px-8">

<!-- iPad Pro (1024px) -->
<div class="tablet-xl:grid-cols-4 tablet-xl:px-8">

<!-- ============================================ -->
<!-- FOLDABLE TARGETING                           -->
<!-- ============================================ -->

<!-- Z Fold 5: different layout folded vs unfolded -->
<div class="fold-cover:flex-col fold-cover:text-xs fold-inner:flex-row fold-inner:text-base">

<!-- Surface Duo: single vs dual screen -->
<div class="fold-single:grid-cols-1 fold-dual:grid-cols-2 fold-dual:gap-[28px]">

<!-- Zenbook Fold: tablet vs laptop mode -->
<div class="fold-inner:grid-cols-2 fold-laptop:grid-cols-3">

<!-- Detect dual-screen spanning (Surface Duo / Z Fold 5 tabletop) -->
<div class="dual-horizontal:grid dual-horizontal:grid-cols-2">

<!-- ============================================ -->
<!-- SMART DISPLAY TARGETING                      -->
<!-- ============================================ -->

<!-- Nest Hub (1024×600): glanceable, no scroll -->
<div class="nest-hub:h-screen nest-hub:overflow-hidden nest-hub:text-xl">

<!-- Nest Hub Max (1280×800): larger smart display -->
<div class="nest-hub-max:text-2xl nest-hub-max:p-8">

<!-- Any smart display -->
<div class="smart-display:flex-row smart-display:h-screen smart-display:items-center">

<!-- ============================================ -->
<!-- ORIENTATION & INPUT                          -->
<!-- ============================================ -->

<!-- Orientation-aware layouts -->
<div class="portrait:flex-col landscape:flex-row">

<!-- Touch vs mouse optimization -->
<button class="touch:min-h-[48px] touch:min-w-[48px] touch:text-base mouse:min-h-[36px] mouse:text-sm">

<!-- Short viewport (iPhone SE portrait, Nest Hub) -->
<div class="short:py-2 short:gap-2 tall:py-6 tall:gap-4">

<!-- Retina display optimization -->
<img class="retina:hidden" src="low-res.jpg">
<img class="hidden retina:block" src="high-res.jpg">
<img class="hidden retina-3x:block" src="ultra-hd.jpg">
<!-- Galaxy S8+ has 4x DPR -->
<img class="hidden retina-4x:block" src="super-hd.jpg">
```

---

## Device-Specific Patterns

### 1. Galaxy Z Fold 5 Cover — 344px (Narrowest Device)

The narrowest device in the matrix. Every pixel counts.

```html
<!-- Ultra-compact navigation -->
<nav class="flex justify-between items-center px-2 py-2 phone-narrow:px-1">
  <img class="h-5 w-auto" src="logo.svg" alt="Logo">
  <button class="p-2 min-h-[44px] min-w-[44px]" aria-label="Menu">
    <svg class="h-5 w-5"><!-- Hamburger --></svg>
  </button>
</nav>

<!-- Single column, no horizontal padding waste -->
<div class="flex flex-col gap-2 px-2 phone-narrow:px-1">
  <h1 class="text-lg leading-tight font-bold">Headline</h1>
  <p class="text-xs leading-relaxed">Body text needs generous line-height</p>
</div>

<!-- Full-width buttons, stacked, large touch targets -->
<div class="flex flex-col gap-2 px-2">
  <button class="w-full py-3 text-sm min-h-[48px] rounded-lg bg-blue-600 text-white">
    Primary Action
  </button>
  <button class="w-full py-3 text-sm min-h-[48px] rounded-lg border border-gray-300">
    Secondary
  </button>
</div>

<!-- Cards: flush edges, minimal padding -->
<div class="mx-1 rounded-lg overflow-hidden shadow-sm">
  <img class="w-full h-28 object-cover" src="image.jpg" alt="">
  <div class="p-2">
    <h3 class="text-sm font-semibold truncate">Card Title</h3>
    <p class="text-xs text-gray-600 line-clamp-2">Description</p>
  </div>
</div>
```

### 2. Samsung Galaxy S8+ — 360px

```html
<!-- Small phone layout: tight but not ultra-compact -->
<div class="p-3 space-y-3">
  <h1 class="text-xl font-bold leading-snug">Headline</h1>
  <p class="text-sm leading-relaxed text-gray-600">Body text</p>
</div>

<!-- Two-column grid for small items -->
<div class="grid grid-cols-2 gap-2 px-3">
  <div class="p-2 bg-white rounded-lg shadow text-center">
    <span class="text-xs font-medium">Item</span>
  </div>
</div>

<!-- Full-width stacked buttons -->
<div class="flex flex-col gap-2 px-3">
  <button class="w-full py-3 text-sm bg-blue-600 text-white rounded-lg min-h-[48px]">
    Primary
  </button>
  <button class="w-full py-3 text-sm border border-gray-300 rounded-lg min-h-[48px]">
    Secondary
  </button>
</div>
```

### 3. iPhone SE — 375×667 (Short Viewport)

iPhone SE has the **shortest viewport** (667px) of any phone. Vertical space is critical.

```html
<!-- Account for short viewport height -->
<div class="p-3 short:py-2">
  <h1 class="text-xl font-bold">Headline</h1>
  <p class="text-sm text-gray-600">Compact body text</p>
</div>

<!-- Reduce vertical spacing on short viewports -->
<div class="space-y-4 short:space-y-2">
  <section class="py-6 short:py-3">Content section</section>
  <section class="py-6 short:py-3">Content section</section>
</div>

<!-- Hero: less vertical padding on SE -->
<section class="py-12 short:py-6 px-4">
  <h1 class="text-2xl font-bold mb-3 short:mb-2">Hero Title</h1>
  <p class="text-sm mb-4 short:mb-2">Subtitle</p>
  <button class="w-full py-3 bg-blue-600 text-white rounded-lg">CTA</button>
</section>

<!-- Bottom navigation needs to be reachable with thumb -->
<nav class="fixed bottom-0 left-0 right-0 flex justify-around py-2 bg-white border-t safe-area-bottom">
  <!-- Tab items -->
</nav>
```

### 4. iPhone 12 Pro (390px) & iPhone 14 Pro (393px)

Modern iPhones with Dynamic Island / notch. Safe areas are critical.

```html
<!-- Safe area padding for notch/Dynamic Island -->
<div class="pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
  <header class="px-4 py-3 flex items-center justify-between">
    <img class="h-7 w-auto" src="logo.svg" alt="Logo">
    <button class="p-2 min-h-[44px]" aria-label="Menu">
      <svg class="h-6 w-6"><!-- Menu --></svg>
    </button>
  </header>
</div>

<!-- Standard phone layout with comfortable spacing -->
<div class="p-4 space-y-4">
  <h1 class="text-2xl font-bold">Headline</h1>
  <p class="text-base text-gray-600 dark:text-gray-300">Body text</p>
</div>

<!-- Two-column compact grid -->
<div class="grid grid-cols-2 gap-3 px-4">
  <div class="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <h3 class="text-sm font-semibold">Item</h3>
  </div>
</div>

<!-- Side-by-side buttons (fits at 390px+) -->
<div class="flex gap-3 px-4">
  <button class="flex-1 py-3 bg-blue-600 text-white rounded-lg min-h-[48px]">Primary</button>
  <button class="flex-1 py-3 border border-gray-300 rounded-lg min-h-[48px]">Secondary</button>
</div>
```

### 5. Pixel 7 (412px), Galaxy S20 Ultra (412px), Galaxy A51/71 (412px)

Standard Android width cluster. Most Android traffic lands here.

```html
<!-- Standard mobile: comfortable room for 2-col -->
<div class="p-4 space-y-4">
  <h1 class="text-2xl font-bold">Headline</h1>
  <p class="text-base text-gray-600">Body text with comfortable reading width</p>
</div>

<!-- 2-column grid with good spacing -->
<div class="grid grid-cols-2 gap-3 px-4">
  <div class="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <img class="w-full h-32 object-cover rounded-lg mb-2" src="img.jpg" alt="">
    <h3 class="text-sm font-semibold">Card Title</h3>
    <p class="text-xs text-gray-500">Description</p>
  </div>
</div>

<!-- Full-width card -->
<div class="mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
  <img class="w-full h-44 object-cover" src="image.jpg" alt="">
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-1">Card Title</h3>
    <p class="text-sm text-gray-600 dark:text-gray-400">Description text</p>
  </div>
</div>

<!-- Android system nav bar spacing -->
<div class="pb-[env(safe-area-inset-bottom,16px)]">
  <!-- Content above system navigation -->
</div>
```

### 6. iPhone XR — 414px (Largest Standard Phone)

```html
<!-- Slightly more room than 412px devices -->
<div class="p-4 space-y-4">
  <h1 class="text-2xl font-bold">Headline</h1>
  <p class="text-base text-gray-600">Body with optimal reading width</p>
</div>

<!-- 2-col grid with comfortable spacing -->
<div class="grid grid-cols-2 gap-4 px-4">
  <div class="p-4 bg-white rounded-xl shadow-md">Item</div>
</div>

<!-- Side-by-side buttons easily fit -->
<div class="flex gap-3 px-4">
  <button class="flex-1 py-3 bg-blue-600 text-white rounded-lg">Primary</button>
  <button class="flex-1 py-3 border border-gray-300 rounded-lg">Secondary</button>
</div>
```

### 7. iPad Mini — 768px (Tablet Breakpoint)

```html
<!-- Two-column layout kicks in -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-bold mb-4">Section 1</h2>
    <p>Content here</p>
  </div>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-bold mb-4">Section 2</h2>
    <p>Content here</p>
  </div>
</div>

<!-- Horizontal nav becomes visible -->
<nav class="hidden md:flex space-x-6 p-4">
  <a href="#" class="text-gray-700 hover:text-blue-600">Home</a>
  <a href="#" class="text-gray-700 hover:text-blue-600">About</a>
  <a href="#" class="text-gray-700 hover:text-blue-600">Services</a>
  <a href="#" class="text-gray-700 hover:text-blue-600">Contact</a>
</nav>

<!-- Card grid: 2 columns -->
<div class="grid grid-cols-2 gap-4 p-6">
  <article class="bg-white rounded-xl shadow-md overflow-hidden">
    <img class="w-full h-48 object-cover" src="img.jpg" alt="">
    <div class="p-4">
      <h3 class="text-lg font-semibold">Title</h3>
      <p class="text-sm text-gray-600">Description</p>
    </div>
  </article>
</div>
```

### 8. iPad Air — 820px

```html
<!-- 2-3 column layout, sidebar becomes viable -->
<div class="flex flex-col md:flex-row gap-6 p-6">
  <aside class="w-full md:w-64 shrink-0">
    <nav class="bg-white rounded-lg shadow p-4">
      <ul class="space-y-2">
        <li><a href="#" class="block px-3 py-2 rounded hover:bg-gray-100">Nav Item</a></li>
      </ul>
    </nav>
  </aside>
  <main class="flex-1">
    <div class="grid grid-cols-2 md-lg:grid-cols-3 gap-4">
      <!-- Cards -->
    </div>
  </main>
</div>

<!-- Three-column card grid at iPad Air width -->
<div class="grid grid-cols-2 md:grid-cols-2 md-lg:grid-cols-3 gap-4 p-6">
  <div class="bg-white rounded-xl shadow-lg p-4">Card</div>
</div>
```

### 9. Surface Pro 7 — 912px (Tablet-Laptop Hybrid)

```html
<!-- Between tablet and laptop — optimize for stylus + touch -->
<div class="grid grid-cols-2 tablet-large:grid-cols-3 gap-4 p-6 tablet-large:p-8">
  <div class="bg-white rounded-xl shadow-lg p-4 tablet-large:p-6">
    <h3 class="text-lg font-semibold">Card</h3>
    <p class="text-sm text-gray-600">Description</p>
  </div>
</div>

<!-- Full navigation visible -->
<nav class="flex items-center justify-between px-6 py-4">
  <div class="flex items-center space-x-6">
    <img class="h-8" src="logo.svg" alt="Logo">
    <div class="flex space-x-4">
      <a href="#" class="text-gray-700 hover:text-blue-600">Home</a>
      <a href="#" class="text-gray-700 hover:text-blue-600">Products</a>
      <a href="#" class="text-gray-700 hover:text-blue-600">About</a>
    </div>
  </div>
  <div class="flex items-center space-x-3">
    <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Sign In</button>
    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg">Get Started</button>
  </div>
</nav>

<!-- Stylus-friendly touch targets (Surface Pro supports stylus) -->
<button class="stylus:min-h-[40px] touch:min-h-[48px] px-4 py-2 rounded-lg">
  Adaptive Button
</button>
```

### 10. iPad Pro 12.9" — 1024px (Desktop-Class Tablet)

```html
<!-- Three to four column layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
  <div class="bg-white rounded-xl shadow-lg p-6">Card</div>
</div>

<!-- Sidebar + Content + Optional Secondary Sidebar -->
<div class="flex gap-6 p-6">
  <aside class="w-64 shrink-0 hidden lg:block">
    <nav class="bg-white rounded-lg shadow p-4">Left sidebar</nav>
  </aside>
  <main class="flex-1 min-w-0">Main content</main>
  <aside class="w-56 shrink-0 hidden xl:block">Right sidebar</aside>
</div>

<!-- Full desktop-style navigation -->
<nav class="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
  <div class="flex items-center space-x-8">
    <img class="h-8" src="logo.svg" alt="Logo">
    <div class="hidden lg:flex space-x-6">
      <a href="#" class="text-gray-700 hover:text-blue-600">Products</a>
      <a href="#" class="text-gray-700 hover:text-blue-600">Solutions</a>
      <a href="#" class="text-gray-700 hover:text-blue-600">Pricing</a>
      <a href="#" class="text-gray-700 hover:text-blue-600">Resources</a>
    </div>
  </div>
  <div class="flex items-center space-x-4">
    <button class="px-4 py-2 text-gray-700">Sign In</button>
    <button class="px-5 py-2.5 bg-blue-600 text-white rounded-lg">Get Started</button>
  </div>
</nav>
```

### 11. Desktops & Large Screens (1280px+)

```html
<!-- Four-column layout with generous spacing -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
  <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">Card</div>
</div>

<!-- Wide hero with side-by-side layout -->
<section class="py-24 px-8">
  <div class="max-w-7xl mx-auto flex items-center gap-16">
    <div class="flex-1">
      <h1 class="text-5xl xl:text-6xl font-bold mb-6">Hero Headline</h1>
      <p class="text-xl text-gray-600 mb-8 max-w-xl">Subheadline</p>
      <div class="flex gap-4">
        <button class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Primary</button>
        <button class="px-8 py-4 border border-gray-300 rounded-lg hover:bg-gray-50">Secondary</button>
      </div>
    </div>
    <div class="flex-1">
      <img class="w-full rounded-2xl shadow-2xl" src="hero.jpg" alt="">
    </div>
  </div>
</section>

<!-- Ultra-wide prevention -->
<div class="max-w-screen-2xl mx-auto px-8 2xl:px-16">
  <!-- Content stays readable -->
</div>
```

---

## Safe Area & Notch Handling

### iOS Safe Areas (iPhone SE, XR, 12 Pro, 14 Pro)

```html
<!-- Add viewport-fit=cover to enable safe areas -->
<!-- In index.html: <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"> -->

<!-- Top safe area (notch / Dynamic Island) -->
<header class="pt-[env(safe-area-inset-top)]">
  <div class="px-4 py-3">Navigation content</div>
</header>

<!-- Bottom safe area (home indicator bar) -->
<nav class="fixed bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)]">
  <div class="flex justify-around py-2 bg-white border-t">
    <!-- Tab items -->
  </div>
</nav>

<!-- All safe areas -->
<div class="
  pt-[env(safe-area-inset-top)]
  pr-[env(safe-area-inset-right)]
  pb-[env(safe-area-inset-bottom)]
  pl-[env(safe-area-inset-left)]
">
  Content respects all safe areas
</div>

<!-- Landscape safe areas (notch on left/right) -->
<div class="landscape:pl-[env(safe-area-inset-left)] landscape:pr-[env(safe-area-inset-right)]">
  Content avoids landscape notch
</div>
```

### Device-Specific Safe Area Notes

| Device | Top Inset | Bottom Inset | Side Insets (Landscape) |
|--------|-----------|-------------|------------------------|
| iPhone SE | 20px (status bar) | 0px | 0px |
| iPhone XR | 44px (notch) | 34px (home indicator) | 44px left/right |
| iPhone 12 Pro | 47px (notch) | 34px (home indicator) | 47px left/right |
| iPhone 14 Pro | 59px (Dynamic Island) | 34px (home indicator) | 59px left/right |
| Pixel 7 | 24px (status bar) | 0-48px (gesture nav) | 0px |
| Galaxy S8+ | 24px (status bar) | 0px | 0px |
| Galaxy S20 Ultra | 24px (punch-hole) | 0-48px (gesture nav) | 0px |
| Galaxy A51/71 | 24px (punch-hole) | 0-48px (gesture nav) | 0px |
| iPad Mini/Air/Pro | 24px (status bar) | 20px (home indicator) | 0px |
| Surface Pro 7 | 0px | 0px (taskbar separate) | 0px |

### Android System Navigation Spacing

```html
<!-- For Android gesture navigation (Pixel 7, Galaxy S20 Ultra, A51/71) -->
<div class="pb-safe">
  <!-- OR use env() -->
</div>

<!-- Fixed bottom elements need extra spacing -->
<div class="fixed bottom-0 left-0 right-0">
  <div class="pb-[env(safe-area-inset-bottom,16px)] bg-white border-t">
    Bottom bar content
  </div>
</div>
```

---

## Foldable Device Patterns

### Galaxy Z Fold 5 — Dual-State Responsive

```html
<!-- COVER SCREEN (344px) → INNER SCREEN (882px) -->
<!-- The Z Fold 5 transitions between two completely different viewport sizes -->

<!-- Adaptive grid: 1 col folded → 2 col unfolded -->
<div class="grid grid-cols-1 fold-inner:grid-cols-2 gap-2 fold-inner:gap-6 p-2 fold-inner:p-6">
  <div class="bg-white rounded-lg shadow p-3 fold-inner:p-6">
    <h3 class="text-sm fold-inner:text-lg font-semibold">Card Title</h3>
    <p class="text-xs fold-inner:text-base text-gray-600">Description</p>
  </div>
</div>

<!-- Navigation: hamburger on cover → horizontal on inner -->
<nav class="px-2 fold-inner:px-6 py-2 fold-inner:py-4">
  <div class="flex items-center justify-between">
    <img class="h-5 fold-inner:h-8 w-auto" src="logo.svg" alt="Logo">
    <!-- Horizontal nav (inner screen only) -->
    <div class="hidden fold-inner:flex space-x-4">
      <a href="#" class="text-gray-700 hover:text-blue-600">Home</a>
      <a href="#" class="text-gray-700 hover:text-blue-600">About</a>
      <a href="#" class="text-gray-700 hover:text-blue-600">Contact</a>
    </div>
    <!-- Hamburger (cover screen only) -->
    <button class="fold-inner:hidden p-2 min-h-[44px] min-w-[44px]" aria-label="Menu">
      <svg class="h-5 w-5"><!-- Hamburger --></svg>
    </button>
  </div>
</nav>

<!-- Typography scales with fold state -->
<h1 class="text-lg fold-inner:text-3xl font-bold px-2 fold-inner:px-6">
  Adaptive Heading
</h1>
<p class="text-xs fold-inner:text-base px-2 fold-inner:px-6 text-gray-600">
  Body text scales up when unfolded
</p>

<!-- Hero section adapts -->
<section class="py-4 fold-inner:py-12 px-2 fold-inner:px-8">
  <div class="flex flex-col fold-inner:flex-row fold-inner:items-center gap-4 fold-inner:gap-8">
    <div class="fold-inner:flex-1">
      <h1 class="text-xl fold-inner:text-4xl font-bold">Hero</h1>
      <p class="text-xs fold-inner:text-lg text-gray-600 mt-2">Subtitle</p>
    </div>
    <div class="fold-inner:flex-1">
      <img class="w-full rounded-lg fold-inner:rounded-xl" src="hero.jpg" alt="">
    </div>
  </div>
</section>
```

### Surface Duo — Dual Screen Layout

```html
<!-- SINGLE SCREEN (540px) → DUAL SCREEN (1080px with hinge gap) -->

<!-- Master-detail pattern: list on left, detail on right -->
<div class="flex flex-col fold-dual:flex-row fold-dual:gap-[28px]">
  <div class="flex-1 p-4 overflow-y-auto">
    <!-- Left screen: Navigation / List -->
    <h2 class="text-xl font-bold mb-4">Items</h2>
    <ul class="space-y-2">
      <li class="p-3 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50">Item 1</li>
      <li class="p-3 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50">Item 2</li>
    </ul>
  </div>
  <div class="flex-1 p-4">
    <!-- Right screen: Detail View -->
    <h2 class="text-xl font-bold mb-4">Detail</h2>
    <p class="text-gray-600">Selected item details appear here</p>
  </div>
</div>

<!-- Using CSS Viewport Segments API for precise hinge detection -->
<style>
  @media (horizontal-viewport-segments: 2) {
    .duo-layout {
      display: grid;
      grid-template-columns: env(viewport-segment-width 0 0) env(viewport-segment-width 1 0);
      gap: env(viewport-segment-left 1 0) - env(viewport-segment-right 0 0);
    }
  }
</style>

<!-- Using Tailwind dual-screen utility -->
<div class="dual-horizontal:grid dual-horizontal:grid-cols-2">
  <div class="p-4">Left pane (540px)</div>
  <div class="p-4">Right pane (540px)</div>
</div>
```

### Asus Zenbook Fold — Tablet/Laptop Hybrid

```html
<!-- TABLET MODE (853×1280) → LAPTOP MODE (1280×853) -->

<!-- Tablet mode: standard tablet layout -->
<div class="grid grid-cols-1 fold-inner:grid-cols-2 fold-laptop:grid-cols-3 gap-6 p-6">
  <div class="bg-white rounded-xl shadow-lg p-6">Content 1</div>
  <div class="bg-white rounded-xl shadow-lg p-6">Content 2</div>
  <div class="bg-white rounded-xl shadow-lg p-6">Content 3</div>
</div>

<!-- Laptop mode: landscape, content in upper half (~853×640) -->
<div class="fold-laptop:max-w-5xl fold-laptop:mx-auto fold-laptop:px-8">
  <div class="grid grid-cols-2 fold-laptop:grid-cols-3 gap-4">
    <!-- Keep content compact for upper display half -->
  </div>
</div>

<!-- Navigation adapts to form factor -->
<nav class="flex items-center justify-between px-4 fold-inner:px-6 fold-laptop:px-8 py-3">
  <img class="h-6 fold-inner:h-7 fold-laptop:h-8" src="logo.svg" alt="Logo">
  <div class="hidden fold-inner:flex space-x-4 fold-laptop:space-x-6">
    <a href="#">Home</a>
    <a href="#">Products</a>
    <a href="#">About</a>
  </div>
</nav>
```

---

## Smart Display Patterns

### Nest Hub (1024×600) & Nest Hub Max (1280×800)

**Key constraints:**
- Always landscape orientation
- Very limited vertical space (600px / 800px)
- Touch input but minimal scrolling expected
- Glanceable UI — instant readability from 3-6 feet away
- No keyboard — avoid text input
- Large text and touch targets required

```html
<!-- Nest Hub: full viewport, no scroll layout -->
<div class="nest-hub:flex nest-hub:flex-row nest-hub:h-screen nest-hub:overflow-hidden">
  <!-- Left: Primary content (60-70% width) -->
  <div class="nest-hub:w-2/3 nest-hub:p-6 nest-hub:flex nest-hub:flex-col nest-hub:justify-center">
    <h1 class="nest-hub:text-4xl nest-hub:font-bold nest-hub:mb-4">
      Main Heading
    </h1>
    <p class="nest-hub:text-xl nest-hub:text-gray-600 nest-hub:leading-relaxed">
      Key information displayed prominently for distance reading
    </p>
  </div>
  <!-- Right: Visual content (30-40% width) -->
  <div class="nest-hub:w-1/3 nest-hub:flex nest-hub:items-center nest-hub:justify-center nest-hub:p-4">
    <img class="nest-hub:max-h-[80vh] nest-hub:w-auto nest-hub:rounded-xl" src="image.jpg" alt="">
  </div>
</div>

<!-- Nest Hub Max: more room, richer layout -->
<div class="nest-hub-max:grid nest-hub-max:grid-cols-3 nest-hub-max:gap-6 nest-hub-max:p-8 nest-hub-max:h-screen">
  <div class="nest-hub-max:col-span-2 nest-hub-max:flex nest-hub-max:flex-col nest-hub-max:justify-center">
    <h1 class="nest-hub-max:text-5xl font-bold">Welcome</h1>
    <p class="nest-hub-max:text-2xl mt-4 text-gray-600">Key information here</p>
  </div>
  <div class="nest-hub-max:flex nest-hub-max:items-center nest-hub-max:justify-center">
    <!-- Status widgets, weather, etc. -->
  </div>
</div>

<!-- Card grid: fits viewport without scrolling -->
<div class="
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  smart-display:grid-cols-3 smart-display:h-screen smart-display:p-4 smart-display:gap-3
  nest-hub-max:grid-cols-4 nest-hub-max:p-6 nest-hub-max:gap-4
">
  <div class="bg-white rounded-xl shadow-lg p-4 smart-display:p-3 flex flex-col justify-center">
    <h3 class="text-lg smart-display:text-xl font-bold">Card</h3>
    <p class="text-sm smart-display:text-base">Concise content</p>
  </div>
</div>

<!-- Smart display typography: larger for distance viewing -->
<style>
  @media (min-width: 1024px) and (max-height: 600px) {
    /* Nest Hub */
    body { font-size: 18px; }
    h1 { font-size: 2.5rem; }
    h2 { font-size: 2rem; }
    h3 { font-size: 1.5rem; }
    p { font-size: 1.125rem; line-height: 1.6; }
  }
  @media (min-width: 1280px) and (max-height: 800px) {
    /* Nest Hub Max */
    body { font-size: 20px; }
    h1 { font-size: 3rem; }
    h2 { font-size: 2.25rem; }
    h3 { font-size: 1.75rem; }
    p { font-size: 1.25rem; line-height: 1.6; }
  }
</style>
```

### Smart Display Best Practices

```html
<!-- DO: Large touch targets (tapped from distance) -->
<button class="smart-display:min-h-[64px] smart-display:min-w-[64px] smart-display:text-lg smart-display:px-8 smart-display:rounded-xl">
  Big Tap Target
</button>

<!-- DO: Fit everything in viewport -->
<div class="smart-display:h-screen smart-display:overflow-hidden smart-display:flex smart-display:flex-col smart-display:justify-between">
  <header class="smart-display:py-4">Top</header>
  <main class="flex-1 flex items-center">Content</main>
  <footer class="smart-display:py-4">Bottom</footer>
</div>

<!-- DO: High contrast for distance readability -->
<div class="smart-display:bg-white smart-display:text-gray-900">
  <h1 class="smart-display:text-4xl smart-display:font-bold">Clear Heading</h1>
  <p class="smart-display:text-xl">Readable from across the room</p>
</div>

<!-- DON'T on smart displays:
  - Small interactive elements
  - Long forms or text input
  - Infinite scroll or long lists
  - Complex multi-level navigation
  - Small font sizes (< 18px)
-->
```

---

## Universal Responsive Component

This pattern handles **all 17 devices** with a single set of classes:

### Universal Container

```html
<div class="
  w-full
  max-w-screen-2xl
  mx-auto
  px-2 phone-small:px-3 phone-mid:px-4 md:px-6 lg:px-8 xl:px-12
  fold-cover:px-1
  smart-display:px-6
">
  <!-- Content adapts to every device -->
</div>
```

### Universal Grid

```html
<div class="
  grid gap-2
  grid-cols-1
  phone-standard:grid-cols-2
  phone-standard:gap-3
  tablet-compact:grid-cols-2
  md:grid-cols-2 md:gap-4
  md-lg:grid-cols-3
  lg:grid-cols-3 lg:gap-6
  xl:grid-cols-4 xl:gap-8
  fold-cover:grid-cols-1 fold-cover:gap-2
  fold-inner:grid-cols-2 fold-inner:gap-4
  fold-dual:grid-cols-2 fold-dual:gap-[28px]
  fold-laptop:grid-cols-3
  smart-display:grid-cols-3 smart-display:gap-3
  nest-hub-max:grid-cols-4
">
  <!-- Cards or items -->
</div>
```

### Universal Typography

```html
<!-- Display / Hero heading -->
<h1 class="
  text-xl phone-small:text-2xl phone-mid:text-2xl phone-standard:text-2xl
  md:text-3xl md-lg:text-4xl lg:text-5xl xl:text-6xl
  fold-cover:text-lg fold-inner:text-3xl
  smart-display:text-4xl nest-hub-max:text-5xl
  font-bold leading-tight
">

<!-- Section heading -->
<h2 class="
  text-lg phone-small:text-xl phone-standard:text-xl
  md:text-2xl lg:text-3xl xl:text-4xl
  fold-cover:text-base fold-inner:text-2xl
  smart-display:text-3xl
  font-semibold
">

<!-- Body text -->
<p class="
  text-sm phone-small:text-sm phone-mid:text-base phone-standard:text-base
  md:text-base lg:text-lg
  fold-cover:text-xs fold-inner:text-base
  smart-display:text-lg nest-hub-max:text-xl
  leading-relaxed
">

<!-- Caption / Small text -->
<span class="
  text-xs phone-standard:text-xs
  md:text-sm lg:text-sm
  fold-cover:text-[10px]
  smart-display:text-base
">
```

### Universal Navigation

```html
<nav class="
  sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm
  pt-[env(safe-area-inset-top)]
">
  <div class="
    max-w-screen-2xl mx-auto
    flex items-center justify-between
    px-2 phone-small:px-3 md:px-6 lg:px-8
    py-2 md:py-3
    fold-cover:px-1
  ">
    <!-- Logo -->
    <img class="
      h-6 phone-small:h-6 md:h-7 lg:h-8
      fold-cover:h-5
      w-auto
    " src="logo.svg" alt="Logo">

    <!-- Desktop nav (hidden on phones, visible on tablets+) -->
    <div class="
      hidden md:flex
      fold-cover:hidden fold-inner:flex
      items-center space-x-2 lg:space-x-4
    ">
      <a href="#" class="px-3 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 rounded-lg">Home</a>
      <a href="#" class="px-3 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 rounded-lg">About</a>
      <a href="#" class="px-3 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 rounded-lg">Projects</a>
      <button class="ml-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
        Get Started
      </button>
    </div>

    <!-- Mobile hamburger (visible on phones, hidden on tablets+) -->
    <button class="
      md:hidden
      fold-inner:hidden
      p-2 min-h-[44px] min-w-[44px]
      rounded-lg hover:bg-gray-100
    " aria-label="Toggle menu">
      <svg class="h-6 w-6 fold-cover:h-5 fold-cover:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </div>
</nav>
```

### Universal Card

```html
<article class="
  bg-white dark:bg-gray-800
  rounded-lg phone-standard:rounded-xl md:rounded-xl
  shadow-md hover:shadow-xl
  transition-shadow duration-300
  overflow-hidden
">
  <img class="
    w-full object-cover
    h-32 phone-small:h-36 phone-standard:h-40 md:h-48 lg:h-56
    fold-cover:h-28 fold-inner:h-44
    smart-display:h-32
  " src="image.jpg" alt="Card image">
  <div class="
    p-3 phone-standard:p-4 md:p-5 lg:p-6
    fold-cover:p-2
    smart-display:p-3
  ">
    <h3 class="
      text-sm phone-standard:text-base md:text-lg lg:text-xl
      fold-cover:text-xs fold-inner:text-lg
      smart-display:text-lg
      font-semibold mb-1 md:mb-2
    ">Card Title</h3>
    <p class="
      text-xs phone-standard:text-sm md:text-sm lg:text-base
      fold-cover:text-[10px] fold-inner:text-sm
      smart-display:text-base
      text-gray-600 dark:text-gray-400
      line-clamp-2 md:line-clamp-3
    ">Card description text that adapts to every device.</p>
  </div>
</article>
```

### Universal Button

```html
<button class="
  inline-flex items-center justify-center
  min-h-[44px] touch:min-h-[48px] smart-display:min-h-[64px]
  px-4 phone-small:px-4 md:px-6 lg:px-8
  py-2.5 md:py-3
  text-sm phone-standard:text-sm md:text-base lg:text-base
  fold-cover:text-xs fold-cover:px-3 fold-cover:py-2
  smart-display:text-lg smart-display:px-8 smart-display:py-4
  bg-blue-600 text-white
  rounded-lg md:rounded-lg
  hover:bg-blue-700 active:scale-95
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
">
  Button Text
</button>
```

---

## Testing Checklist — All 17 Devices

### Phone Testing (9 devices)

| # | Device | Width | Key Checks |
|---|--------|-------|------------|
| 1 | Galaxy Z Fold 5 (cover) | 344px | Ultra-compact single column, text truncation, no overflow, 48px touch targets |
| 2 | Samsung Galaxy S8+ | 360px | Small phone layout, 2-col grid only for tiny items, stacked buttons |
| 3 | iPhone SE | 375px | **Short viewport (667px)**, bottom nav reachability, no wasted vertical space |
| 4 | iPhone 12 Pro | 390px | Notch safe areas, side-by-side buttons, Dynamic Island spacing |
| 5 | iPhone 14 Pro | 393px | Dynamic Island (59px inset), safe areas, gesture nav spacing |
| 6 | Pixel 7 | 412px | Standard Android, gesture nav bar, 2-col grid, material ripples |
| 7 | Samsung Galaxy S20 Ultra | 412px | Same as Pixel 7 width, check punch-hole camera safe area |
| 8 | Samsung Galaxy A51/71 | 412px | Same width cluster, verify Android nav bar spacing |
| 9 | iPhone XR | 414px | Largest phone, 2-col grids, notch safe areas (44px inset) |

### Tablet Testing (4 devices)

| # | Device | Portrait | Landscape | Key Checks |
|---|--------|----------|-----------|------------|
| 10 | iPad Mini | 768px | 1024px | 2-col layout trigger, nav switch to horizontal, sidebar optional |
| 11 | iPad Air | 820px | 1180px | 2-3 column layout, sidebar viable, comfortable spacing |
| 12 | Surface Pro 7 | 912px | 1368px | Tablet-laptop hybrid, stylus support, 3-col grid |
| 13 | iPad Pro 12.9" | 1024px | 1366px | Desktop-class layout, 3-4 columns, full navigation |

### Foldable Testing (3 devices, 6 states)

| # | Device | State | Width | Key Checks |
|---|--------|-------|-------|------------|
| 14a | Galaxy Z Fold 5 | Cover | 344px | Same as narrowest phone, seamless fold transition |
| 14b | Galaxy Z Fold 5 | Inner | 882px | Tablet layout, content reflows from cover layout |
| 15a | Surface Duo | Single | 540px | Compact tablet, between phone and iPad Mini |
| 15b | Surface Duo | Dual | 1080px | Content splits across hinge, 28px gap handling |
| 16a | Asus Zenbook Fold | Tablet | 853px | Standard tablet, portrait orientation |
| 16b | Asus Zenbook Fold | Laptop | 1280px | Landscape, content in upper half |

### Smart Display Testing (2 devices)

| # | Device | Dimensions | Key Checks |
|---|--------|-----------|------------|
| 17 | Nest Hub | 1024×600 | Landscape ONLY, no scroll, 18px+ font, 64px+ touch targets, high contrast |
| 18 | Nest Hub Max | 1280×800 | Same but more room, 20px+ font, glanceable layout |

### Cross-Device Verification Checklist

At **every** breakpoint, verify these 15 items:

1. **No horizontal scrolling** — Test at exact device width, no overflow
2. **Text readable** — Min 14px on narrow phones, 16px on standard, 18px+ on smart displays
3. **Images scale** — No overflow, proper aspect ratios, `object-cover` or `object-contain`
4. **Navigation works** — Hamburger on phones, horizontal on tablets+, full on desktop
5. **Touch targets** — 44px minimum on phones, 48px on touch tablets, 64px on smart displays
6. **Spacing appropriate** — Tight on narrow, comfortable on standard, generous on desktop
7. **Grid columns** — 1→2→3→4 progression matching device width
8. **Max-width containers** — Content doesn't stretch on ultra-wide
9. **Text overflow** — Proper truncation with `line-clamp` or `truncate`, no clipping
10. **Safe areas** — iPhone notch/Dynamic Island, Android nav bar, foldable hinge gaps
11. **Fold transitions** — Content reflows gracefully between folded/unfolded states
12. **Smart display** — Visible without scrolling, readable from distance
13. **Dark mode** — All breakpoints work in both light and dark mode
14. **Orientation** — Portrait and landscape tested for all phones and tablets
15. **Input method** — Touch targets for touch devices, hover states for mouse

### Testing Priority Order (Highest Impact First)

1. **iPhone 14 Pro** (393px) — #1 iOS phone globally
2. **Pixel 7 / Galaxy S20 Ultra** (412px) — Most common Android width
3. **iPad Air** (820px) — Most popular tablet
4. **Desktop 1920px** — Most common desktop resolution
5. **iPhone SE** (375px) — Smallest mainstream phone + short viewport
6. **Samsung Galaxy S8+** (360px) — Small Android phones
7. **Galaxy Z Fold 5 cover** (344px) — Narrowest modern device
8. **iPhone XR** (414px) — Widest standard phone
9. **iPad Mini** (768px) — Smallest tablet
10. **iPad Pro** (1024px) — Desktop-class tablet
11. **Surface Pro 7** (912px) — Tablet-laptop hybrid
12. **Galaxy A51/71** (412px) — Budget Android validation
13. **iPhone 12 Pro** (390px) — Mid-gen iPhone
14. **Asus Zenbook Fold** (853px/1280px) — Foldable laptop
15. **Surface Duo** (540px/1080px) — Dual-screen
16. **Nest Hub** (1024×600) — Smart display
17. **Nest Hub Max** (1280×800) — Large smart display
