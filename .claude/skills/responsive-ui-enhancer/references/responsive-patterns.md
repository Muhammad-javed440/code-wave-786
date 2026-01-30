# Responsive Design Patterns

## Table of Contents
- [Breakpoint Strategy](#breakpoint-strategy)
- [Layout Patterns](#layout-patterns)
- [Mobile-First Approach](#mobile-first-approach)
- [Fluid Typography](#fluid-typography)
- [Responsive Components](#responsive-components)
- [Common Responsive Issues](#common-responsive-issues)

## Breakpoint Strategy

### Standard Tailwind Breakpoints
```
xs:  320px  - Extra small phones (optional custom)
sm:  640px  - Large phones / Small tablets
md:  768px  - Tablets
lg:  1024px - Laptops / Large tablets
xl:  1280px - Desktops
2xl: 1536px - Large desktops
3xl: 1920px - Full HD (optional custom)
```

### Device Categories

| Category | Width Range | Common Devices |
|----------|-------------|----------------|
| Small Phone | 320-374px | iPhone SE, Galaxy Fold |
| Phone | 375-639px | iPhone 12-15, Pixel, Galaxy S |
| Large Phone/Phablet | 640-767px | Phone landscape, small tablets |
| Tablet | 768-1023px | iPad, Android tablets |
| Laptop | 1024-1279px | MacBook Air, small laptops |
| Desktop | 1280-1535px | Standard monitors |
| Large Desktop | 1536-1919px | Large monitors |
| Full HD+ | 1920px+ | HD, QHD, 4K monitors |

### Best Practices
- **Mobile-first**: Start with smallest screen, add complexity for larger
- **Content-driven**: Add breakpoints where content breaks, not arbitrary sizes
- **Test real devices**: Browser resize isn't enough
- **Container max-width**: Prevent content from becoming too wide
- **Fluid between breaks**: Use relative units between breakpoints

## Layout Patterns

### 1. Responsive Grid System

```html
<!-- Auto-responsive: 1 → 2 → 3 → 4 columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>

<!-- CSS Grid auto-fit (truly fluid) -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
  <!-- Items automatically fit and wrap -->
</div>

<!-- CSS Grid auto-fill (maintains minimum size) -->
<div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
  <!-- Items wrap but maintain minimum width -->
</div>
```

### 2. Responsive Flexbox

```html
<!-- Stack mobile, row desktop -->
<div class="flex flex-col md:flex-row gap-4 md:gap-8">
  <div class="w-full md:w-1/3">Sidebar</div>
  <div class="w-full md:w-2/3">Content</div>
</div>

<!-- Reverse order on mobile -->
<div class="flex flex-col-reverse md:flex-row">
  <div class="flex-1">Content (appears second on mobile)</div>
  <div class="w-full md:w-64">Sidebar (appears first on mobile)</div>
</div>

<!-- Center on mobile, space-between on desktop -->
<div class="flex flex-col items-center md:flex-row md:justify-between gap-4">
  <div>Logo</div>
  <nav>Navigation</nav>
</div>

<!-- Wrap items responsively -->
<div class="flex flex-wrap gap-2 md:gap-4">
  <span class="px-3 py-1 bg-gray-100 rounded-full">Tag 1</span>
  <span class="px-3 py-1 bg-gray-100 rounded-full">Tag 2</span>
  <span class="px-3 py-1 bg-gray-100 rounded-full">Tag 3</span>
</div>
```

### 3. Holy Grail Layout (Header, Sidebar, Content, Footer)

```html
<div class="min-h-screen flex flex-col">
  <!-- Header -->
  <header class="h-16 bg-white shadow-sm shrink-0">
    <!-- Navigation -->
  </header>

  <!-- Main area with optional sidebars -->
  <div class="flex-1 flex flex-col lg:flex-row">
    <!-- Left sidebar (hidden on mobile) -->
    <aside class="hidden lg:block w-64 bg-gray-50 shrink-0">
      <!-- Sidebar content -->
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
      <!-- Page content -->
    </main>

    <!-- Right sidebar (hidden on mobile/tablet) -->
    <aside class="hidden xl:block w-64 bg-gray-50 shrink-0">
      <!-- Secondary sidebar -->
    </aside>
  </div>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white shrink-0">
    <!-- Footer content -->
  </footer>
</div>
```

### 4. Card Layouts

```html
<!-- Responsive card grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <article class="bg-white rounded-xl shadow-md overflow-hidden">
    <img class="w-full h-48 object-cover" src="image.jpg" alt="">
    <div class="p-4 md:p-6">
      <h3 class="text-lg md:text-xl font-bold mb-2">Title</h3>
      <p class="text-gray-600 text-sm md:text-base">Description</p>
    </div>
  </article>
</div>

<!-- Horizontal card on desktop, vertical on mobile -->
<article class="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden">
  <img class="w-full md:w-48 lg:w-64 h-48 md:h-auto object-cover shrink-0" src="image.jpg" alt="">
  <div class="p-4 md:p-6 flex-1">
    <h3 class="text-lg md:text-xl font-bold mb-2">Title</h3>
    <p class="text-gray-600">Description</p>
  </div>
</article>
```

### 5. Responsive Tables

```html
<!-- Horizontal scroll on mobile -->
<div class="overflow-x-auto">
  <table class="min-w-full">
    <thead>
      <tr>
        <th class="px-4 py-2">Column 1</th>
        <th class="px-4 py-2">Column 2</th>
        <th class="px-4 py-2">Column 3</th>
      </tr>
    </thead>
    <tbody>
      <!-- Rows -->
    </tbody>
  </table>
</div>

<!-- Cards on mobile, table on desktop -->
<div class="hidden md:block">
  <table><!-- Desktop table --></table>
</div>
<div class="md:hidden space-y-4">
  <!-- Mobile card view -->
  <div class="bg-white p-4 rounded-lg shadow">
    <div class="flex justify-between mb-2">
      <span class="font-medium">Label 1:</span>
      <span>Value 1</span>
    </div>
    <div class="flex justify-between">
      <span class="font-medium">Label 2:</span>
      <span>Value 2</span>
    </div>
  </div>
</div>
```

## Mobile-First Approach

### Core Principle
Write base styles for mobile, then add complexity with breakpoint prefixes:

```html
<!-- Mobile base → Tablet → Desktop → Large Desktop -->
<div class="
  p-4          /* Mobile: 16px padding */
  md:p-6       /* Tablet: 24px padding */
  lg:p-8       /* Laptop: 32px padding */
  xl:p-12      /* Desktop: 48px padding */
">

<h1 class="
  text-2xl     /* Mobile: 24px */
  sm:text-3xl  /* Large phone: 30px */
  md:text-4xl  /* Tablet: 36px */
  lg:text-5xl  /* Laptop: 48px */
  xl:text-6xl  /* Desktop: 60px */
">
```

### Visibility Patterns

```html
<!-- Show only on mobile -->
<div class="block sm:hidden">Mobile only content</div>

<!-- Hide on mobile, show on tablet+ -->
<div class="hidden sm:block">Tablet and up</div>

<!-- Show only on tablet -->
<div class="hidden sm:block lg:hidden">Tablet only</div>

<!-- Desktop only -->
<div class="hidden lg:block">Desktop only</div>

<!-- Different content per device -->
<span class="sm:hidden">📱</span>
<span class="hidden sm:inline lg:hidden">📱💻</span>
<span class="hidden lg:inline">🖥️</span>
```

## Fluid Typography

### Clamp-based Fluid Sizing

```html
<!-- Fluid heading that scales smoothly -->
<h1 class="text-[clamp(1.5rem,5vw,3.5rem)]">
  Fluid Headline
</h1>

<!-- Fluid body text -->
<p class="text-[clamp(1rem,2vw,1.25rem)]">
  Body text that scales between 16px and 20px
</p>
```

### Step-based Typography Scale

```html
<!-- Display / Hero -->
<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">

<!-- Page Title -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">

<!-- Section Heading -->
<h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">

<!-- Subsection -->
<h3 class="text-lg sm:text-xl md:text-2xl font-semibold">

<!-- Body Large -->
<p class="text-base sm:text-lg md:text-xl">

<!-- Body -->
<p class="text-sm sm:text-base md:text-lg">

<!-- Small / Caption -->
<span class="text-xs sm:text-sm">
```

## Responsive Components

### Navigation

```html
<nav class="bg-white shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-14 sm:h-16">
      <!-- Logo -->
      <a href="/" class="flex items-center">
        <img class="h-6 sm:h-8 w-auto" src="logo.svg" alt="Logo">
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-1 lg:space-x-2">
        <a href="#" class="px-3 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">Home</a>
        <a href="#" class="px-3 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">Products</a>
        <a href="#" class="px-3 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">About</a>
        <a href="#" class="ml-2 px-4 py-2 bg-blue-600 text-white text-sm lg:text-base rounded-lg hover:bg-blue-700 transition-colors">Get Started</a>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Toggle menu">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class="md:hidden border-t" id="mobile-menu">
    <div class="px-4 py-3 space-y-1">
      <a href="#" class="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Home</a>
      <a href="#" class="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Products</a>
      <a href="#" class="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">About</a>
      <a href="#" class="block px-3 py-2 mt-2 bg-blue-600 text-white text-center rounded-lg">Get Started</a>
    </div>
  </div>
</nav>
```

### Hero Section

```html
<section class="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
      <!-- Content -->
      <div class="flex-1 text-center lg:text-left">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
          Hero Headline Here
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
          Supporting text that explains the value proposition in a clear and concise way.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
          <a href="#" class="px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center">
            Primary CTA
          </a>
          <a href="#" class="px-6 py-3 sm:px-8 sm:py-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center">
            Secondary CTA
          </a>
        </div>
      </div>
      <!-- Image -->
      <div class="flex-1 w-full max-w-lg lg:max-w-none">
        <img src="hero.jpg" alt="" class="w-full h-auto rounded-xl shadow-2xl">
      </div>
    </div>
  </div>
</section>
```

### Buttons

```html
<!-- Responsive button sizes -->
<button class="
  px-4 py-2 text-sm        /* Mobile */
  sm:px-5 sm:py-2.5        /* Tablet */
  md:px-6 md:py-3 md:text-base  /* Desktop */
  bg-blue-600 text-white rounded-lg
  hover:bg-blue-700 active:scale-95
  transition-all duration-200
  min-h-[44px] min-w-[44px]  /* Touch target */
">
  Button Text
</button>

<!-- Full width on mobile, auto on desktop -->
<button class="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg">
  Submit
</button>
```

## Common Responsive Issues

### Issue: Horizontal Scroll
**Cause**: Fixed widths, images without max-width, padding overflow
**Fix**:
```html
<body class="overflow-x-hidden">
<img class="max-w-full h-auto">
<div class="w-full max-w-full overflow-hidden">
```

### Issue: Text Overflow
**Cause**: Long unbreakable text (URLs, emails)
**Fix**:
```html
<p class="break-words">Long text that might overflow</p>
<p class="truncate">Text that will truncate with ellipsis</p>
<p class="line-clamp-2">Text limited to 2 lines</p>
```

### Issue: Touch Targets Too Small
**Cause**: Buttons/links smaller than 44×44px
**Fix**:
```html
<button class="min-h-[44px] min-w-[44px] p-3">
<a href="#" class="inline-block p-3">
```

### Issue: Content Too Dense on Mobile
**Cause**: Desktop spacing on mobile
**Fix**:
```html
<div class="space-y-3 md:space-y-6">
<div class="p-3 md:p-6 lg:p-8">
<div class="gap-2 md:gap-4 lg:gap-6">
```

### Issue: Images Not Scaling
**Cause**: Missing width constraints or fixed dimensions
**Fix**:
```html
<img class="w-full h-auto max-w-full">
<img class="w-full h-48 md:h-64 object-cover">
```

### Issue: Fixed Positioning Problems
**Cause**: Mobile browser viewport issues with `vh` units
**Fix**:
```html
<!-- Use min-height instead of height -->
<div class="min-h-screen">
<!-- Or use dvh (dynamic viewport height) -->
<div class="min-h-[100dvh]">
```

### Issue: Font Too Small on Mobile
**Cause**: Base font size too small
**Fix**:
```html
<body class="text-base"> <!-- 16px minimum -->
<p class="text-sm sm:text-base"> <!-- 14px mobile, 16px tablet+ -->
```
