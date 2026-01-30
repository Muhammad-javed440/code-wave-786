# Device Breakpoints & Screen Sizes

## Table of Contents
- [Common Device Sizes](#common-device-sizes)
- [Custom Tailwind Breakpoints](#custom-tailwind-breakpoints)
- [Device-Specific Patterns](#device-specific-patterns)
- [Testing Checklist](#testing-checklist)

## Common Device Sizes

### Mobile Phones (Portrait)

| Device | Width | Pixel Ratio | Category |
|--------|-------|-------------|----------|
| iPhone SE | 375px | 2x | Small Phone |
| iPhone 12/13/14 | 390px | 3x | Standard Phone |
| iPhone 12/13/14 Pro Max | 428px | 3x | Large Phone |
| iPhone 15 Pro Max | 430px | 3x | Large Phone |
| Samsung Galaxy S21 | 360px | 3x | Small Phone |
| Samsung Galaxy S23 | 360px | 3x | Small Phone |
| Samsung Galaxy S23 Ultra | 384px | 3x | Standard Phone |
| Google Pixel 7 | 412px | 2.625x | Standard Phone |
| Google Pixel 7 Pro | 412px | 3.5x | Standard Phone |

### Mobile Phones (Landscape)

| Device | Width | Category |
|--------|-------|----------|
| iPhone SE | 667px | Phone Landscape |
| iPhone 12/13/14 | 844px | Phone Landscape |
| iPhone Pro Max | 926px | Phablet |
| Samsung Galaxy | 640-800px | Phone Landscape |

### Tablets

| Device | Portrait | Landscape | Category |
|--------|----------|-----------|----------|
| iPad Mini | 744px | 1133px | Small Tablet |
| iPad (10th gen) | 820px | 1180px | Standard Tablet |
| iPad Air | 820px | 1180px | Standard Tablet |
| iPad Pro 11" | 834px | 1194px | Standard Tablet |
| iPad Pro 12.9" | 1024px | 1366px | Large Tablet |
| Samsung Galaxy Tab S8 | 800px | 1280px | Standard Tablet |
| Surface Pro | 912px | 1368px | Large Tablet |

### Laptops

| Device | Width | Category |
|--------|-------|----------|
| MacBook Air 13" | 1280px | Small Laptop |
| MacBook Pro 14" | 1512px | Standard Laptop |
| MacBook Pro 16" | 1728px | Large Laptop |
| Common Laptop | 1366px | Standard Laptop |
| HD Laptop | 1920px | Large Laptop |

### Desktops

| Resolution | Width | Category |
|------------|-------|----------|
| HD | 1280px | Small Desktop |
| HD+ | 1366px | Small Desktop |
| Full HD | 1920px | Standard Desktop |
| QHD/2K | 2560px | Large Desktop |
| 4K/UHD | 3840px | Ultra-wide |

## Custom Tailwind Breakpoints

### Extended Breakpoint Configuration

Add to `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    screens: {
      'xs': '320px',    // Extra small phones
      'sm': '640px',    // Large phones / Small tablets
      'md': '768px',    // Tablets
      'lg': '1024px',   // Laptops / Large tablets
      'xl': '1280px',   // Desktops
      '2xl': '1536px',  // Large desktops
      '3xl': '1920px',  // Full HD
      '4xl': '2560px',  // QHD/2K

      // Device-specific breakpoints
      'mobile': {'max': '639px'},           // Mobile only
      'tablet': {'min': '640px', 'max': '1023px'},  // Tablet only
      'laptop': {'min': '1024px', 'max': '1279px'}, // Laptop only
      'desktop': {'min': '1280px'},         // Desktop and up

      // Orientation
      'portrait': {'raw': '(orientation: portrait)'},
      'landscape': {'raw': '(orientation: landscape)'},

      // Touch devices
      'touch': {'raw': '(hover: none) and (pointer: coarse)'},
      'stylus': {'raw': '(hover: none) and (pointer: fine)'},
      'mouse': {'raw': '(hover: hover) and (pointer: fine)'},

      // High DPI screens
      'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'},
    }
  }
}
```

### Usage Examples

```html
<!-- Extra small phones only -->
<div class="text-sm xs:text-base sm:text-lg">

<!-- Mobile only (max-width: 639px) -->
<div class="mobile:text-center mobile:p-2">

<!-- Tablet only -->
<div class="tablet:grid-cols-2">

<!-- Portrait orientation -->
<div class="portrait:flex-col landscape:flex-row">

<!-- Touch devices -->
<button class="touch:min-h-[48px] mouse:min-h-[36px]">

<!-- Retina displays -->
<img class="retina:hidden" src="low-res.jpg">
<img class="hidden retina:block" src="high-res.jpg">
```

## Device-Specific Patterns

### Small Phones (320px - 374px)

```html
<!-- Tighter spacing, smaller text -->
<div class="p-2 xs:p-3 sm:p-4">
  <h1 class="text-xl xs:text-2xl sm:text-3xl">Headline</h1>
  <p class="text-sm xs:text-base">Body text</p>
</div>

<!-- Single column, full-width buttons -->
<div class="flex flex-col gap-2">
  <button class="w-full py-3 text-sm">Action</button>
</div>

<!-- Compact navigation -->
<nav class="flex justify-between px-2 py-2">
  <img class="h-6 w-auto" src="logo.svg" alt="Logo">
  <button class="p-2" aria-label="Menu">
    <svg class="h-5 w-5"><!-- Hamburger --></svg>
  </button>
</nav>
```

### Standard Phones (375px - 639px)

```html
<!-- Standard mobile layout -->
<div class="p-4 space-y-4">
  <h1 class="text-2xl font-bold">Headline</h1>
  <p class="text-base text-gray-600">Body text</p>
</div>

<!-- Two-column grid for small items -->
<div class="grid grid-cols-2 gap-3">
  <div class="p-3 bg-white rounded-lg shadow">Item 1</div>
  <div class="p-3 bg-white rounded-lg shadow">Item 2</div>
</div>

<!-- Full-width cards -->
<div class="space-y-4">
  <div class="bg-white rounded-xl shadow-md p-4">
    <img class="w-full h-40 object-cover rounded-lg mb-3" src="image.jpg">
    <h3 class="text-lg font-semibold">Card Title</h3>
  </div>
</div>
```

### Tablets (640px - 1023px)

```html
<!-- Two-column layout -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-bold mb-4">Section 1</h2>
    <p>Content here</p>
  </div>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-bold mb-4">Section 2</h2>
    <p>Content here</p>
  </div>
</div>

<!-- Sidebar + Content layout -->
<div class="flex flex-col sm:flex-row gap-6 p-6">
  <aside class="w-full sm:w-64 shrink-0">
    <nav class="bg-white rounded-lg shadow p-4">
      <!-- Sidebar navigation -->
    </nav>
  </aside>
  <main class="flex-1">
    <!-- Main content -->
  </main>
</div>

<!-- Horizontal navigation visible -->
<nav class="hidden sm:flex space-x-6 p-4">
  <a href="#" class="text-gray-700 hover:text-blue-600">Home</a>
  <a href="#" class="text-gray-700 hover:text-blue-600">About</a>
  <a href="#" class="text-gray-700 hover:text-blue-600">Services</a>
</nav>
```

### Laptops (1024px - 1279px)

```html
<!-- Three-column layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
  <!-- Cards -->
</div>

<!-- Sidebar + Content + Aside -->
<div class="flex gap-6 p-6">
  <aside class="w-64 shrink-0 hidden lg:block">Left sidebar</aside>
  <main class="flex-1 min-w-0">Main content</main>
  <aside class="w-64 shrink-0 hidden xl:block">Right sidebar</aside>
</div>

<!-- Full navigation -->
<nav class="flex items-center justify-between px-8 py-4">
  <div class="flex items-center space-x-8">
    <img class="h-8" src="logo.svg" alt="Logo">
    <div class="hidden lg:flex space-x-6">
      <a href="#">Products</a>
      <a href="#">Solutions</a>
      <a href="#">Pricing</a>
      <a href="#">Resources</a>
    </div>
  </div>
  <div class="flex items-center space-x-4">
    <button class="px-4 py-2 text-gray-700">Sign In</button>
    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg">Get Started</button>
  </div>
</nav>
```

### Desktops (1280px+)

```html
<!-- Four-column layout -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
  <!-- Cards -->
</div>

<!-- Wide hero with side-by-side layout -->
<section class="py-24 px-8">
  <div class="max-w-7xl mx-auto flex items-center gap-16">
    <div class="flex-1">
      <h1 class="text-5xl xl:text-6xl font-bold mb-6">Hero Headline</h1>
      <p class="text-xl text-gray-600 mb-8">Subheadline text</p>
      <div class="flex gap-4">
        <button class="px-8 py-4 bg-blue-600 text-white rounded-lg">Primary CTA</button>
        <button class="px-8 py-4 border border-gray-300 rounded-lg">Secondary CTA</button>
      </div>
    </div>
    <div class="flex-1">
      <img class="w-full rounded-2xl shadow-2xl" src="hero-image.jpg" alt="">
    </div>
  </div>
</section>

<!-- Multi-column footer -->
<footer class="bg-gray-900 text-white py-16 px-8">
  <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
    <div class="col-span-2 md:col-span-1">
      <img class="h-8 mb-4" src="logo-white.svg" alt="Logo">
      <p class="text-gray-400 text-sm">Company description</p>
    </div>
    <div>
      <h4 class="font-semibold mb-4">Product</h4>
      <ul class="space-y-2 text-gray-400">
        <li><a href="#" class="hover:text-white">Features</a></li>
        <li><a href="#" class="hover:text-white">Pricing</a></li>
      </ul>
    </div>
    <!-- More columns -->
  </div>
</footer>
```

### Large Desktops & Ultra-wide (1920px+)

```html
<!-- Max-width container to prevent too-wide content -->
<div class="max-w-screen-2xl mx-auto px-8 2xl:px-16">
  <!-- Content stays readable on ultra-wide screens -->
</div>

<!-- Six-column grid for large screens -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
  <!-- Many items -->
</div>

<!-- Larger typography for big screens -->
<h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
  Massive Headline
</h1>

<!-- More generous whitespace -->
<section class="py-16 md:py-20 lg:py-24 xl:py-32 2xl:py-40">
  <!-- Content with breathing room -->
</section>
```

## Testing Checklist

### Mobile Testing Points
- [ ] 320px - Extra small phones (Galaxy Fold, older devices)
- [ ] 375px - iPhone SE, iPhone 8
- [ ] 390px - iPhone 12/13/14
- [ ] 428px - iPhone Pro Max models

### Tablet Testing Points
- [ ] 768px - iPad Mini portrait, Android tablets
- [ ] 820px - iPad portrait
- [ ] 1024px - iPad landscape, iPad Pro portrait

### Desktop Testing Points
- [ ] 1280px - Small laptops, HD monitors
- [ ] 1366px - Common laptop resolution
- [ ] 1440px - MacBook Pro 14"
- [ ] 1920px - Full HD monitors
- [ ] 2560px - QHD/2K monitors

### What to Check at Each Breakpoint
1. **Navigation**: Mobile menu vs desktop nav
2. **Layout**: Single column vs multi-column
3. **Typography**: Readable font sizes
4. **Spacing**: Appropriate padding/margins
5. **Images**: Proper scaling, no overflow
6. **Touch targets**: 44px+ on touch devices
7. **Horizontal scroll**: Should never occur
8. **Text overflow**: No clipping or truncation
