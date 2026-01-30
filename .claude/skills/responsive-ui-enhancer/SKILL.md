---
name: responsive-ui-enhancer
description: Transform websites into responsive, beautiful, and accessible experiences using Tailwind CSS. Use when working with (1) Non-responsive websites that need mobile optimization, (2) Websites requiring UI improvements (visual polish, modern design, better spacing/typography), (3) Landing pages needing animations and micro-interactions, (4) Websites lacking accessibility features, (5) Plain HTML/CSS or React/Next.js projects, or (6) Any request to "make this responsive", "improve the UI", "make it mobile-friendly", "add animations", or "make it look modern".
---

# Responsive UI Enhancer

Transform any website into a responsive, beautiful, and accessible experience using modern design principles and Tailwind CSS.

## Workflow

### Step 1: Analyze Current State

Read the existing HTML/CSS/React files to understand:
- Current layout structure
- Existing styles and frameworks
- Responsive breakpoints (if any)
- Component architecture (for React)
- Accessibility issues

**Quick checks:**
- Are images responsive? (`w-full h-auto` or similar)
- Do containers have max-width constraints?
- Is navigation mobile-friendly?
- Are touch targets at least 44×44px?
- Does text scale on different screens?

### Step 2: Choose Approach

**For plain HTML/CSS projects:**
- Add Tailwind CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Or install Tailwind properly for production

**For React/Next.js projects:**
- Ensure Tailwind is installed and configured
- Use component templates from `assets/react-templates/`
- Build modular, reusable components

**Use pre-built templates when:**
- Building from scratch or major redesign
- User wants modern, professional components
- Templates in `assets/html-templates/` or `assets/react-templates/` match needs

### Step 3: Make Responsive

Apply mobile-first responsive design patterns. Reference `references/responsive-patterns.md` for:
- Standard breakpoints (sm, md, lg, xl, 2xl)
- Layout patterns (fluid grids, responsive flexbox)
- Common responsive issues and fixes

Reference `references/tailwind-guide.md` for:
- Responsive utility classes
- Container patterns
- Common component patterns (navigation, hero, cards, footer)

**Priority fixes:**
1. **Navigation**: Mobile hamburger menu, desktop horizontal nav
2. **Images**: `w-full h-auto` or `object-cover` with constrained heights
3. **Typography**: Responsive text sizes (`text-2xl md:text-3xl lg:text-4xl`)
4. **Spacing**: Responsive padding/margin (`p-4 md:p-6 lg:p-8`)
5. **Layouts**: Stack on mobile, grid/flex on desktop
6. **Touch targets**: Minimum 44×44px for buttons/links on mobile

### Step 4: Enhance Visual Design

Apply modern design system principles. Reference `references/design-system.md` for:
- Color systems (primary, semantic, neutrals)
- Typography scale and hierarchy
- Spacing scale (padding, margin, gaps)
- Shadows and depth
- Border radius guidelines

**Key improvements:**
- Consistent color palette with proper contrast
- Clear visual hierarchy (headings, body, secondary text)
- Comfortable spacing (not too dense on mobile)
- Subtle shadows for depth
- Modern border radius (`rounded-lg`, `rounded-xl`)
- Professional gradients when appropriate

### Step 5: Add Animations

Reference `references/animations.md` for:
- Tailwind animation utilities (spin, pulse, bounce)
- Transition patterns (hover, focus, active states)
- Scroll animations with Intersection Observer
- Loading states (skeleton, spinner)
- Micro-interactions (button feedback, tooltips)

**Animation guidelines:**
- Use transforms and opacity (GPU-accelerated)
- Keep durations 200-500ms for UI transitions
- Add `motion-reduce:transition-none` for accessibility
- Smooth hover effects on interactive elements
- Fade-in animations for sections on scroll

**Common patterns:**
```html
<!-- Hover lift -->
<div class="transform hover:scale-105 hover:shadow-xl transition-all duration-300">

<!-- Fade in on scroll (requires JS) -->
<div class="opacity-0 translate-y-4 transition-all duration-700 scroll-fade-in">

<!-- Button feedback -->
<button class="transform active:scale-95 transition-transform">
```

### Step 6: Ensure Accessibility

Reference `references/accessibility.md` for comprehensive guidelines. Check:

**Required (WCAG Level A/AA):**
- [ ] All images have descriptive alt text
- [ ] Form inputs have associated labels
- [ ] Buttons have accessible names
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Semantic HTML (header, nav, main, footer)
- [ ] Heading hierarchy logical (h1 → h2 → h3)
- [ ] Touch targets ≥ 44×44px
- [ ] Skip links for screen readers
- [ ] ARIA attributes where needed

**Quick accessibility fixes:**
```html
<!-- Icon buttons need labels -->
<button aria-label="Close menu">
  <svg>...</svg>
</button>

<!-- Form inputs need labels -->
<label for="email">Email</label>
<input type="email" id="email" />

<!-- Error messages -->
<input aria-invalid="true" aria-describedby="error-msg" />
<span id="error-msg" role="alert">Error text</span>

<!-- Skip link -->
<a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>
```

### Step 7: Test Across All Breakpoints

Reference `references/device-breakpoints.md` for comprehensive device sizes and custom Tailwind configuration.

**Essential test points:**

| Category | Widths to Test |
|----------|----------------|
| Small Phone | 320px, 360px |
| Phone | 375px, 390px, 412px |
| Large Phone | 428px, 430px |
| Tablet Portrait | 744px, 768px, 820px |
| Tablet Landscape | 1024px, 1180px |
| Laptop | 1280px, 1366px |
| Desktop | 1440px, 1920px |
| Large Desktop | 2560px+ |

**What to verify at each breakpoint:**
- [ ] No horizontal scrolling
- [ ] Text readable (min 16px body on mobile)
- [ ] Images scale properly (no overflow)
- [ ] Navigation works (hamburger on mobile, horizontal on desktop)
- [ ] Touch targets ≥ 44×44px on touch devices
- [ ] Spacing appropriate (not too dense on mobile, not too sparse on desktop)
- [ ] Grid columns adjust (1 col → 2 col → 3 col → 4 col)
- [ ] Content doesn't stretch too wide on large screens (use max-w-7xl)

## Component Templates

### HTML Templates

Located in `assets/html-templates/`:
- `components.html` - Complete responsive page with navigation, hero, features, stats, testimonials, CTA, footer

**Use when:**
- Building HTML-based landing pages
- User wants a complete page example
- Starting from scratch

### React Templates

Located in `assets/react-templates/`:
- `Navbar.tsx` - Responsive navigation with mobile menu
- `Hero.tsx` - Hero section with image and CTA
- `FeatureCard.tsx` - Feature cards and grid section
- `Footer.tsx` - Multi-column responsive footer
- `Card.tsx` - Reusable card components (base, testimonial, pricing)
- `Button.tsx` - Button components with variants and sizes

**Use when:**
- Building React/Next.js applications
- User wants modular components
- Need reusable, typed components

## Reference Files

Load these as needed for detailed guidance:

- **`references/device-breakpoints.md`**: Complete device sizes (phones, tablets, laptops, desktops), custom Tailwind breakpoint config, device-specific patterns
- **`references/responsive-patterns.md`**: Responsive design patterns, layout systems, fluid typography, common issues
- **`references/tailwind-guide.md`**: Tailwind CSS utilities, responsive patterns, common components
- **`references/animations.md`**: Animation patterns, transitions, scroll effects, loading states
- **`references/accessibility.md`**: WCAG compliance, ARIA attributes, keyboard navigation, semantic HTML
- **`references/design-system.md`**: Colors, typography, spacing, shadows, visual hierarchy

## Quick Wins

When time is limited, prioritize these high-impact changes:

1. **Add responsive navigation** (mobile hamburger menu)
2. **Make images responsive** (`w-full h-auto`)
3. **Add container constraints** (`max-w-7xl mx-auto`)
4. **Responsive text sizes** (`text-base md:text-lg lg:text-xl`)
5. **Stack layouts on mobile** (`flex flex-col md:flex-row`)
6. **Increase mobile spacing** (`p-4 md:p-6 lg:p-8`)
7. **Add hover effects** (`hover:shadow-xl transition-shadow`)
8. **Fix color contrast** (minimum 4.5:1)

## Common Patterns

### Responsive Container
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>
```

### Responsive Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Items -->
</div>
```

### Responsive Section
```html
<section class="py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <!-- Content -->
  </div>
</section>
```

### Mobile Menu Toggle (HTML + JS)
```javascript
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});
```

### Mobile Menu Toggle (React)
```tsx
const [isOpen, setIsOpen] = useState(false);
<button onClick={() => setIsOpen(!isOpen)}>Menu</button>
{isOpen && <div>Mobile menu</div>}
```

## Best Practices

- **Mobile-first**: Design for mobile, enhance for desktop
- **Performance**: Use transforms/opacity for animations (GPU-accelerated)
- **Accessibility**: Always include ARIA labels, keyboard navigation, sufficient contrast
- **Consistency**: Use design system (consistent colors, spacing, typography)
- **Touch-friendly**: 44×44px minimum touch targets on mobile
- **Progressive enhancement**: Core functionality works without JS
- **Semantic HTML**: Use proper elements (header, nav, main, article, footer)
- **Testing**: Verify on actual devices, not just browser resize
