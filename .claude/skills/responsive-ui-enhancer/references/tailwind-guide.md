# Tailwind CSS Responsive Guide

## Table of Contents
- [Responsive Utilities](#responsive-utilities)
- [Custom Breakpoints](#custom-breakpoints)
- [Container Usage](#container-usage)
- [Display Utilities](#display-utilities)
- [Layout Utilities](#layout-utilities)
- [Spacing Utilities](#spacing-utilities)
- [Container Queries](#container-queries)
- [Common Patterns](#common-patterns)

## Responsive Utilities

### Default Breakpoints
```
sm:  640px   - Large phones, small tablets
md:  768px   - Tablets
lg:  1024px  - Laptops, large tablets
xl:  1280px  - Desktops
2xl: 1536px  - Large desktops
```

### Prefix System
All utilities can be prefixed with breakpoint (mobile-first):
```html
<div class="text-base md:text-lg lg:text-xl xl:text-2xl">
```

### Multiple Breakpoints
```html
<div class="
  w-full       /* 0px+ (mobile) */
  sm:w-1/2     /* 640px+ */
  md:w-1/3     /* 768px+ */
  lg:w-1/4     /* 1024px+ */
  xl:w-1/5     /* 1280px+ */
  2xl:w-1/6    /* 1536px+ */
">
```

## Custom Breakpoints

### Extended Configuration
Add to `tailwind.config.js` for comprehensive device support:

```javascript
module.exports = {
  theme: {
    screens: {
      'xs': '320px',    // Extra small phones
      'sm': '640px',    // Large phones
      'md': '768px',    // Tablets
      'lg': '1024px',   // Laptops
      'xl': '1280px',   // Desktops
      '2xl': '1536px',  // Large desktops
      '3xl': '1920px',  // Full HD

      // Max-width breakpoints (desktop-first)
      'max-sm': {'max': '639px'},
      'max-md': {'max': '767px'},
      'max-lg': {'max': '1023px'},

      // Range breakpoints
      'sm-only': {'min': '640px', 'max': '767px'},
      'md-only': {'min': '768px', 'max': '1023px'},
      'lg-only': {'min': '1024px', 'max': '1279px'},

      // Device-specific
      'touch': {'raw': '(hover: none)'},
      'mouse': {'raw': '(hover: hover)'},
      'portrait': {'raw': '(orientation: portrait)'},
      'landscape': {'raw': '(orientation: landscape)'},
    }
  }
}
```

### Usage Examples
```html
<!-- Extra small phones -->
<p class="text-sm xs:text-base">Scales up from extra small</p>

<!-- Mobile only (max-width) -->
<div class="max-sm:flex-col max-sm:text-center">Mobile layout</div>

<!-- Tablet only -->
<div class="hidden sm-only:block">Tablet only content</div>

<!-- Touch vs Mouse -->
<button class="touch:min-h-[48px] mouse:min-h-[36px]">Adaptive button</button>

<!-- Orientation -->
<div class="portrait:flex-col landscape:flex-row">Orientation-aware</div>
```

## Container Usage

### Centered Container
```html
<div class="container mx-auto px-4">
  <!-- Content -->
</div>
```

### Constrained Width
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Full-Width Sections
```html
<section class="w-full bg-gray-100">
  <div class="max-w-7xl mx-auto px-4 py-12">
    <!-- Constrained content -->
  </div>
</section>
```

## Display Utilities

### Responsive Visibility
```html
<!-- Hide on mobile -->
<div class="hidden md:block">

<!-- Show only on mobile -->
<div class="block md:hidden">

<!-- Complex visibility -->
<div class="hidden sm:block lg:hidden xl:block">
```

### Responsive Flex/Grid
```html
<!-- Stack mobile, row desktop -->
<div class="flex flex-col md:flex-row">

<!-- 1 col mobile, 2 cols tablet, 3 cols desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## Layout Utilities

### Flexbox Patterns
```html
<!-- Vertical mobile, horizontal desktop -->
<div class="flex flex-col md:flex-row gap-4">
  <div class="w-full md:w-64 shrink-0">Sidebar</div>
  <div class="flex-1">Main</div>
</div>

<!-- Center mobile, space-between desktop -->
<div class="flex flex-col md:flex-row items-center md:justify-between">
```

### Grid Patterns
```html
<!-- Responsive columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

<!-- Auto-fit responsive grid -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">

<!-- Responsive column span -->
<div class="col-span-1 md:col-span-2 lg:col-span-3">
```

## Spacing Utilities

### Responsive Padding
```html
<!-- Tighter mobile, looser desktop -->
<div class="p-4 md:p-6 lg:p-8 xl:p-12">

<!-- Horizontal padding only -->
<div class="px-4 sm:px-6 lg:px-8">

<!-- Vertical padding only -->
<div class="py-8 md:py-12 lg:py-16">
```

### Responsive Margin
```html
<!-- Stack spacing -->
<div class="space-y-4 md:space-y-6 lg:space-y-8">

<!-- Horizontal spacing -->
<div class="space-x-2 md:space-x-4">

<!-- Responsive gaps -->
<div class="grid gap-4 md:gap-6 lg:gap-8">
```

## Common Patterns

### Responsive Cards
```html
<div class="
  rounded-lg
  overflow-hidden
  shadow-md
  hover:shadow-xl
  transition-shadow
  flex flex-col
  md:flex-row
">
  <img src="..." class="w-full md:w-48 h-48 md:h-auto object-cover" />
  <div class="p-4 md:p-6 flex-1">
    <h3 class="text-lg md:text-xl font-bold mb-2">Title</h3>
    <p class="text-sm md:text-base text-gray-600">Description</p>
  </div>
</div>
```

### Responsive Hero Section
```html
<section class="
  py-12 md:py-16 lg:py-24
  px-4 sm:px-6 lg:px-8
">
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      <div class="flex-1 text-center lg:text-left">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Hero Title
        </h1>
        <p class="text-base md:text-lg lg:text-xl text-gray-600 mb-6">
          Description text
        </p>
        <button class="px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white rounded-lg">
          CTA Button
        </button>
      </div>
      <div class="flex-1 w-full max-w-lg">
        <img src="..." class="w-full h-auto" />
      </div>
    </div>
  </div>
</section>
```

### Responsive Navigation
```html
<nav class="bg-white shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <img class="h-8 w-auto" src="logo.svg" alt="Logo" />
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-8">
        <a href="#" class="text-gray-700 hover:text-blue-600">Link</a>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden p-2">
        <svg class="h-6 w-6"><!-- Icon --></svg>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class="md:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <a href="#" class="block px-3 py-2 rounded-md">Link</a>
    </div>
  </div>
</nav>
```

### Responsive Footer
```html
<footer class="bg-gray-900 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">Column 1</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-gray-400 hover:text-white">Link</a></li>
        </ul>
      </div>
      <!-- Repeat columns -->
    </div>
    <div class="mt-8 pt-8 border-t border-gray-800 text-center md:text-left">
      <p class="text-gray-400 text-sm">&copy; 2024 Company. All rights reserved.</p>
    </div>
  </div>
</footer>
```

### Responsive Form
```html
<form class="max-w-2xl mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
    <div class="md:col-span-1">
      <label class="block text-sm font-medium mb-2">First Name</label>
      <input type="text" class="w-full px-4 py-2 border rounded-lg" />
    </div>
    <div class="md:col-span-1">
      <label class="block text-sm font-medium mb-2">Last Name</label>
      <input type="text" class="w-full px-4 py-2 border rounded-lg" />
    </div>
    <div class="md:col-span-2">
      <label class="block text-sm font-medium mb-2">Email</label>
      <input type="email" class="w-full px-4 py-2 border rounded-lg" />
    </div>
  </div>
  <button class="w-full md:w-auto mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg">
    Submit
  </button>
</form>
```

## Container Queries

Container queries allow components to respond to their container size, not viewport size. Useful for reusable components.

### Setup
Enable in `tailwind.config.js`:
```javascript
module.exports = {
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
```

### Usage
```html
<!-- Define container -->
<div class="@container">
  <!-- Responsive to container width -->
  <div class="@sm:flex @md:grid @md:grid-cols-2 @lg:grid-cols-3">
    <div class="@sm:w-1/2 @md:w-full">Card 1</div>
    <div class="@sm:w-1/2 @md:w-full">Card 2</div>
  </div>
</div>
```

### Container Breakpoints
```
@xs:  20rem (320px)
@sm:  24rem (384px)
@md:  28rem (448px)
@lg:  32rem (512px)
@xl:  36rem (576px)
@2xl: 42rem (672px)
@3xl: 48rem (768px)
@4xl: 56rem (896px)
@5xl: 64rem (1024px)
@6xl: 72rem (1152px)
@7xl: 80rem (1280px)
```

### Practical Example
```html
<!-- Card that adapts to sidebar or main content -->
<article class="@container bg-white rounded-xl shadow-md overflow-hidden">
  <div class="flex flex-col @md:flex-row">
    <img
      class="w-full h-48 @md:w-48 @md:h-auto object-cover"
      src="image.jpg"
      alt=""
    />
    <div class="p-4 @md:p-6">
      <h3 class="text-lg @md:text-xl font-bold">Card Title</h3>
      <p class="text-sm @md:text-base text-gray-600 mt-2">
        Description text that expands on larger containers
      </p>
      <button class="mt-4 hidden @lg:block px-4 py-2 bg-blue-600 text-white rounded">
        Action (only on large containers)
      </button>
    </div>
  </div>
</article>
```

## Responsive Utility Quick Reference

### Width & Sizing
```html
w-full sm:w-1/2 md:w-1/3 lg:w-1/4
max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl
min-w-0 sm:min-w-full
h-48 md:h-64 lg:h-96
aspect-video md:aspect-square
```

### Typography
```html
text-sm sm:text-base md:text-lg lg:text-xl
font-normal md:font-medium lg:font-bold
leading-tight md:leading-normal lg:leading-relaxed
tracking-tight md:tracking-normal
```

### Flexbox
```html
flex flex-col md:flex-row
items-center md:items-start lg:items-stretch
justify-center md:justify-between
gap-2 sm:gap-4 md:gap-6 lg:gap-8
flex-wrap md:flex-nowrap
order-2 md:order-1
```

### Grid
```html
grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
gap-4 md:gap-6 lg:gap-8
col-span-1 md:col-span-2 lg:col-span-3
row-span-1 md:row-span-2
```

### Spacing
```html
p-2 sm:p-4 md:p-6 lg:p-8
px-4 sm:px-6 lg:px-8
py-8 md:py-12 lg:py-16
m-2 sm:m-4 md:m-6
space-y-2 md:space-y-4 lg:space-y-6
```

### Display & Visibility
```html
block sm:hidden          /* Mobile only */
hidden sm:block          /* Tablet+ */
hidden md:flex           /* Tablet+ flex */
invisible lg:visible     /* Hidden until desktop */
```

### Position & Layout
```html
static md:relative lg:absolute
sticky top-0 md:top-4
z-10 md:z-20
overflow-auto md:overflow-visible
```
