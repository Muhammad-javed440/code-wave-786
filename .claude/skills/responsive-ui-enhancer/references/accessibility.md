# Accessibility Guidelines

## Table of Contents
- [WCAG Compliance Checklist](#wcag-compliance-checklist)
- [Semantic HTML](#semantic-html)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Color and Contrast](#color-and-contrast)
- [Screen Reader Support](#screen-reader-support)
- [Form Accessibility](#form-accessibility)
- [Focus Management](#focus-management)

## WCAG Compliance Checklist

### Level A (Minimum)
- [ ] Text alternatives for images (alt text)
- [ ] Captions for video/audio
- [ ] Logical heading structure (h1-h6)
- [ ] Sufficient color contrast (4.5:1 for text)
- [ ] Keyboard accessible
- [ ] No keyboard traps
- [ ] Descriptive page titles
- [ ] Descriptive link text (not "click here")
- [ ] Form labels and instructions
- [ ] Error identification

### Level AA (Recommended)
- [ ] Enhanced color contrast (7:1 for body text)
- [ ] Text resizable to 200%
- [ ] Multiple ways to find pages
- [ ] Consistent navigation
- [ ] Consistent identification
- [ ] Error suggestions
- [ ] Focus visible
- [ ] Language of page declared

### Level AAA (Enhanced)
- [ ] Sign language for audio
- [ ] Extended audio descriptions
- [ ] No images of text
- [ ] Contrast ratio of 7:1 minimum

## Semantic HTML

### Use Proper Elements
```html
<!-- Good: Semantic elements -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Content</p>
  </article>
  <aside>Sidebar</aside>
</main>

<footer>Footer content</footer>

<!-- Bad: Divs for everything -->
<div class="header">
  <div class="nav">...</div>
</div>
```

### Heading Hierarchy
```html
<!-- Good: Logical hierarchy -->
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
  <h2>Another Section</h2>

<!-- Bad: Skipping levels -->
<h1>Title</h1>
  <h4>Section</h4>
```

### Landmark Regions
```html
<header role="banner">
<nav role="navigation">
<main role="main">
<aside role="complementary">
<footer role="contentinfo">
```

## ARIA Attributes

### ARIA Labels
```html
<!-- Icon button with accessible name -->
<button aria-label="Close dialog">
  <svg><!-- X icon --></svg>
</button>

<!-- When visible text exists -->
<button aria-labelledby="btn-text">
  <span id="btn-text">Submit</span>
</button>

<!-- Describe additional context -->
<button aria-describedby="btn-help">Delete</button>
<span id="btn-help" class="sr-only">This action cannot be undone</span>
```

### ARIA Live Regions
```html
<!-- Announce changes to screen readers -->
<div aria-live="polite" aria-atomic="true">
  Loading...
</div>

<!-- For urgent messages -->
<div aria-live="assertive" role="alert">
  Error: Form submission failed
</div>
```

### ARIA States
```html
<!-- Expanded/collapsed state -->
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>
<div id="menu" hidden>...</div>

<!-- Selected state -->
<button aria-pressed="false">Toggle</button>

<!-- Disabled state -->
<button aria-disabled="true" disabled>Submit</button>

<!-- Current page -->
<a href="/about" aria-current="page">About</a>
```

### ARIA Roles
```html
<!-- Dialog/Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Dialog Title</h2>
</div>

<!-- Tab interface -->
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel2">Tab 2</button>
</div>
<div role="tabpanel" id="panel1">Content 1</div>

<!-- Search -->
<div role="search">
  <input type="search" />
</div>
```

## Keyboard Navigation

### Focus Order
```html
<!-- Use tabindex appropriately -->
<button tabindex="0">Naturally focusable</button>
<div tabindex="0" role="button">Custom button</div>
<div tabindex="-1">Programmatically focusable only</div>

<!-- Never use positive tabindex -->
<!-- Bad: <button tabindex="1"> -->
```

### Keyboard Shortcuts
```html
<button accesskey="s">Save (Alt+S)</button>
```

### Skip Links
```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-4">
  Skip to main content
</a>

<main id="main-content">
  <!-- Content -->
</main>
```

### Common Keyboard Patterns
- **Tab**: Move to next focusable element
- **Shift+Tab**: Move to previous focusable element
- **Enter/Space**: Activate buttons
- **Escape**: Close dialogs/menus
- **Arrow keys**: Navigate within components (tabs, dropdowns)

## Color and Contrast

### Contrast Ratios (WCAG AA)
- Normal text (< 18pt): 4.5:1
- Large text (≥ 18pt or 14pt bold): 3:1
- UI components and graphics: 3:1

### Color-Blind Friendly
```html
<!-- Don't rely on color alone -->
<!-- Bad -->
<span class="text-red-600">Error</span>

<!-- Good: Icon + Color + Text -->
<span class="text-red-600">
  <svg><!-- Error icon --></svg>
  Error: Invalid input
</span>
```

### Safe Color Combinations
```html
<!-- High contrast combinations -->
<div class="bg-gray-900 text-white">  <!-- 15.5:1 -->
<div class="bg-blue-600 text-white">  <!-- 4.5:1 -->
<div class="bg-white text-gray-900">  <!-- 15.5:1 -->

<!-- Test at: https://webaim.org/resources/contrastchecker/ -->
```

## Screen Reader Support

### Screen Reader Only Text
```html
<!-- Tailwind utilities -->
<span class="sr-only">
  Screen reader only text
</span>

<!-- Or custom CSS -->
<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only.focus:not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
</style>
```

### Image Alternatives
```html
<!-- Informative images -->
<img src="chart.png" alt="Sales increased 25% in Q4" />

<!-- Decorative images -->
<img src="decorative.png" alt="" />

<!-- Complex images -->
<figure>
  <img src="chart.png" alt="Q4 Sales Chart" />
  <figcaption>
    Detailed description of chart data...
  </figcaption>
</figure>
```

### Link Text
```html
<!-- Bad: Non-descriptive -->
<a href="/report">Click here</a>

<!-- Good: Descriptive -->
<a href="/report">Download Q4 report (PDF, 2MB)</a>

<!-- For repeated links -->
<a href="/article1" aria-label="Read more about accessibility">
  Read more
</a>
```

## Form Accessibility

### Labels
```html
<!-- Explicit label -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" />

<!-- Implicit label (less preferred) -->
<label>
  Email Address
  <input type="email" name="email" />
</label>
```

### Required Fields
```html
<label for="name">
  Name <span aria-label="required">*</span>
</label>
<input
  type="text"
  id="name"
  name="name"
  required
  aria-required="true"
/>
```

### Error Messages
```html
<label for="email">Email</label>
<input
  type="email"
  id="email"
  aria-describedby="email-error"
  aria-invalid="true"
  class="border-red-500"
/>
<span id="email-error" class="text-red-600" role="alert">
  Please enter a valid email address
</span>
```

### Fieldset and Legend
```html
<fieldset>
  <legend>Shipping Address</legend>
  <label for="street">Street</label>
  <input type="text" id="street" />
</fieldset>
```

### Input Hints
```html
<label for="password">Password</label>
<input
  type="password"
  id="password"
  aria-describedby="password-hint"
/>
<span id="password-hint" class="text-sm text-gray-600">
  Must be at least 8 characters
</span>
```

## Focus Management

### Visible Focus Indicators
```html
<!-- Tailwind default (blue ring) -->
<button class="focus:ring-4 focus:ring-blue-500 focus:outline-none">

<!-- Custom focus styles -->
<button class="focus:outline-2 focus:outline-offset-2 focus:outline-blue-600">

<!-- High contrast focus -->
<button class="focus:ring-4 focus:ring-black focus:ring-offset-2">
```

### Focus Trapping (Modal)
```javascript
// Trap focus within modal
const modal = document.querySelector('[role="dialog"]');
const focusableElements = modal.querySelectorAll(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);
const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];

modal.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;

  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }
});
```

### Restoring Focus
```javascript
// Save focus before opening modal
const previousFocus = document.activeElement;

// Open modal and focus first element
modal.classList.remove('hidden');
modal.querySelector('button').focus();

// Close modal and restore focus
modal.classList.add('hidden');
previousFocus.focus();
```

## Quick Checklist

Before marking UI work as complete, verify:

- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Buttons have accessible names
- [ ] Color contrast meets 4.5:1 minimum
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] No keyboard traps exist
- [ ] Headings follow logical hierarchy
- [ ] ARIA attributes used correctly
- [ ] Page has descriptive title
- [ ] Links have descriptive text
- [ ] Error messages are clear
- [ ] Touch targets are at least 44×44px
- [ ] Content is responsive
- [ ] Animations respect prefers-reduced-motion
