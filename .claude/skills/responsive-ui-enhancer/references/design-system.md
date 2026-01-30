# Design System Guidelines

## Table of Contents
- [Color Systems](#color-systems)
- [Typography](#typography)
- [Spacing Scale](#spacing-scale)
- [Shadows and Depth](#shadows-and-depth)
- [Border Radius](#border-radius)
- [Visual Hierarchy](#visual-hierarchy)

## Color Systems

### Primary Color Palette
Choose one primary brand color and use Tailwind's scale (50-950):

```html
<!-- Example with blue as primary -->
<button class="bg-blue-600 hover:bg-blue-700 text-white">
  Primary Action
</button>

<!-- Lighter variants for backgrounds -->
<div class="bg-blue-50 border border-blue-200">
  Info box
</div>
```

### Semantic Colors
```html
<!-- Success: Green -->
<div class="bg-green-50 text-green-800 border border-green-200">
  Success message
</div>

<!-- Warning: Yellow/Amber -->
<div class="bg-yellow-50 text-yellow-800 border border-yellow-200">
  Warning message
</div>

<!-- Error: Red -->
<div class="bg-red-50 text-red-800 border border-red-200">
  Error message
</div>

<!-- Info: Blue -->
<div class="bg-blue-50 text-blue-800 border border-blue-200">
  Info message
</div>
```

### Neutral Grays
Use for text, backgrounds, borders:

```html
<!-- Text colors -->
<h1 class="text-gray-900">Heading</h1>
<p class="text-gray-700">Body text</p>
<span class="text-gray-500">Secondary text</span>
<span class="text-gray-400">Disabled text</span>

<!-- Background colors -->
<div class="bg-white">Main content</div>
<div class="bg-gray-50">Subtle background</div>
<div class="bg-gray-100">Card background</div>
<div class="bg-gray-900">Dark footer</div>

<!-- Border colors -->
<div class="border border-gray-200">Light border</div>
<div class="border border-gray-300">Default border</div>
```

### Color Combinations
```html
<!-- Light mode -->
<div class="bg-white text-gray-900">

<!-- Dark mode -->
<div class="bg-gray-900 text-white">

<!-- Accent sections -->
<section class="bg-blue-600 text-white">

<!-- Subtle sections -->
<section class="bg-gray-50 text-gray-900">
```

### Gradient Examples
```html
<!-- Subtle gradient -->
<div class="bg-gradient-to-r from-gray-50 to-gray-100">

<!-- Brand gradient -->
<div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white">

<!-- Hero gradient -->
<div class="bg-gradient-to-br from-blue-50 via-white to-purple-50">
```

## Typography

### Font Sizes
```html
<!-- Headings -->
<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold">Hero Title</h1>
<h2 class="text-3xl md:text-4xl font-bold">Section Title</h2>
<h3 class="text-2xl md:text-3xl font-semibold">Subsection</h3>
<h4 class="text-xl md:text-2xl font-semibold">Card Title</h4>
<h5 class="text-lg md:text-xl font-medium">Small Heading</h5>

<!-- Body text -->
<p class="text-base md:text-lg">Default body text</p>
<p class="text-sm">Secondary text</p>
<p class="text-xs">Caption or label</p>

<!-- Large text -->
<p class="text-lg md:text-xl">Lead paragraph</p>
```

### Font Weights
```html
<span class="font-light">Light (300)</span>
<span class="font-normal">Normal (400)</span>
<span class="font-medium">Medium (500)</span>
<span class="font-semibold">Semibold (600)</span>
<span class="font-bold">Bold (700)</span>
<span class="font-extrabold">Extrabold (800)</span>
```

### Line Height
```html
<!-- Tight for headings -->
<h1 class="leading-tight">Heading</h1>

<!-- Normal for body -->
<p class="leading-normal">Body text</p>

<!-- Relaxed for readability -->
<p class="leading-relaxed">Long-form content</p>

<!-- Loose for emphasis -->
<p class="leading-loose">Spaced content</p>
```

### Letter Spacing
```html
<h1 class="tracking-tight">Tight headings</h1>
<p class="tracking-normal">Normal text</p>
<span class="tracking-wide uppercase text-sm">Labels</span>
```

### Text Styles
```html
<!-- Uppercase labels -->
<span class="uppercase text-xs font-semibold tracking-wide text-gray-500">
  Category
</span>

<!-- Links -->
<a href="#" class="text-blue-600 hover:text-blue-700 underline">Link</a>

<!-- Muted text -->
<p class="text-gray-600">Secondary information</p>

<!-- Emphasized -->
<p class="font-semibold text-gray-900">Important text</p>
```

## Spacing Scale

### Padding Scale
```html
<!-- Extra small -->
<div class="p-2">8px all around</div>

<!-- Small -->
<div class="p-4">16px all around</div>

<!-- Medium (default for most components) -->
<div class="p-6">24px all around</div>

<!-- Large -->
<div class="p-8">32px all around</div>

<!-- Extra large -->
<div class="p-12">48px all around</div>
```

### Margin/Gap Scale
```html
<!-- Tight spacing -->
<div class="space-y-2">8px vertical gap</div>

<!-- Normal spacing -->
<div class="space-y-4">16px vertical gap</div>

<!-- Comfortable spacing -->
<div class="space-y-6">24px vertical gap</div>

<!-- Loose spacing -->
<div class="space-y-8">32px vertical gap</div>

<!-- Section spacing -->
<div class="space-y-12 md:space-y-16">48-64px vertical gap</div>
```

### Container Padding
```html
<!-- Mobile-friendly container -->
<div class="px-4 sm:px-6 lg:px-8">
  Content with responsive horizontal padding
</div>

<!-- Section padding -->
<section class="py-12 md:py-16 lg:py-24">
  Section with responsive vertical padding
</section>
```

## Shadows and Depth

### Shadow Scale
```html
<!-- Subtle shadow (cards) -->
<div class="shadow-sm">

<!-- Default shadow (raised cards) -->
<div class="shadow">

<!-- Medium shadow (dropdowns) -->
<div class="shadow-md">

<!-- Large shadow (modals) -->
<div class="shadow-lg">

<!-- Extra large shadow (sticky headers) -->
<div class="shadow-xl">

<!-- 2XL shadow (hero cards) -->
<div class="shadow-2xl">
```

### Hover Shadows
```html
<!-- Lift on hover -->
<div class="shadow-md hover:shadow-xl transition-shadow duration-300">
  Interactive card
</div>
```

### Inner Shadows
```html
<!-- Inset effect -->
<div class="shadow-inner bg-gray-50">
  Inset container
</div>
```

### No Shadow
```html
<div class="shadow-none">
  Flat element
</div>
```

## Border Radius

### Radius Scale
```html
<!-- Small radius (buttons, inputs) -->
<button class="rounded-md">Button</button>

<!-- Default radius (cards) -->
<div class="rounded-lg">Card</div>

<!-- Large radius (hero images) -->
<div class="rounded-xl">Large card</div>

<!-- Extra large radius -->
<div class="rounded-2xl">Premium card</div>

<!-- Full rounded (pills, avatars) -->
<button class="rounded-full">Pill Button</button>
<img class="rounded-full" src="avatar.jpg" />
```

### Directional Radius
```html
<!-- Top rounded -->
<div class="rounded-t-lg">

<!-- Bottom rounded -->
<div class="rounded-b-lg">

<!-- Left rounded -->
<div class="rounded-l-lg">

<!-- Right rounded -->
<div class="rounded-r-lg">
```

## Visual Hierarchy

### Card Hierarchy
```html
<div class="bg-white rounded-lg shadow-md p-6 space-y-4">
  <!-- Primary heading -->
  <h3 class="text-2xl font-bold text-gray-900">Card Title</h3>

  <!-- Supporting text -->
  <p class="text-gray-600 leading-relaxed">
    Card description with comfortable line height
  </p>

  <!-- Meta information -->
  <div class="flex items-center space-x-2 text-sm text-gray-500">
    <span>Author</span>
    <span>•</span>
    <span>Date</span>
  </div>

  <!-- Call to action -->
  <button class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
    Read More
  </button>
</div>
```

### Section Hierarchy
```html
<section class="py-16">
  <div class="max-w-7xl mx-auto px-4">
    <!-- Section label -->
    <span class="text-blue-600 font-semibold text-sm uppercase tracking-wide">
      Features
    </span>

    <!-- Section heading -->
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
      Main Section Heading
    </h2>

    <!-- Section description -->
    <p class="text-lg text-gray-600 max-w-2xl">
      Supporting description text
    </p>
  </div>
</section>
```

### Button Hierarchy
```html
<!-- Primary action -->
<button class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
  Primary
</button>

<!-- Secondary action -->
<button class="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300">
  Secondary
</button>

<!-- Tertiary action -->
<button class="text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
  Tertiary
</button>

<!-- Danger action -->
<button class="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700">
  Delete
</button>
```

## Common Patterns

### Feature Card
```html
<div class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
    <svg class="w-6 h-6 text-blue-600"><!-- Icon --></svg>
  </div>
  <h3 class="text-xl font-bold text-gray-900 mb-2">Feature Title</h3>
  <p class="text-gray-600">Feature description</p>
</div>
```

### Testimonial Card
```html
<div class="bg-white rounded-lg shadow-md p-6">
  <div class="flex items-center mb-4">
    <img src="avatar.jpg" class="w-12 h-12 rounded-full mr-4" />
    <div>
      <p class="font-semibold text-gray-900">Name</p>
      <p class="text-sm text-gray-500">Title</p>
    </div>
  </div>
  <p class="text-gray-700 italic">"Testimonial text here"</p>
</div>
```

### Stat Display
```html
<div class="text-center">
  <p class="text-4xl md:text-5xl font-bold text-blue-600">99%</p>
  <p class="text-gray-600 mt-2">Customer Satisfaction</p>
</div>
```
