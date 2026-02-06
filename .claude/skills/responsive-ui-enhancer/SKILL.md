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

### Step 3: Make Responsive (All 17 Target Devices)

Apply mobile-first responsive design for all 17 target devices. Reference `references/device-breakpoints.md` for:
- Complete device specs (9 phones, 4 tablets, 3 foldables, 2 smart displays)
- Custom Tailwind breakpoint configuration
- Device-specific patterns and safe area handling
- Universal responsive component patterns

Reference `references/responsive-patterns.md` for:
- Layout patterns (fluid grids, responsive flexbox)
- Common responsive issues and fixes

Reference `references/tailwind-guide.md` for:
- Responsive utility classes and container patterns

**17 Target Devices:**
| Category | Devices | Widths |
|----------|---------|--------|
| Narrow Phone | Galaxy Z Fold 5 (cover) | 344px |
| Small Phones | Galaxy S8+, iPhone SE | 360px, 375px |
| Mid Phones | iPhone 12 Pro, iPhone 14 Pro | 390px, 393px |
| Standard Phones | Pixel 7, Galaxy S20 Ultra, Galaxy A51/71, iPhone XR | 412-414px |
| Tablets | iPad Mini, iPad Air, Surface Pro 7, iPad Pro | 768-1024px |
| Foldables | Galaxy Z Fold 5, Surface Duo, Asus Zenbook Fold | 344-1280px |
| Smart Displays | Nest Hub, Nest Hub Max | 1024×600, 1280×800 |

**Priority fixes:**
1. **Navigation**: Mobile hamburger → tablet horizontal → desktop full nav
2. **Images**: `w-full h-auto` or `object-cover` with constrained heights
3. **Typography**: Scale across all breakpoints (`text-xl phone-standard:text-2xl md:text-3xl lg:text-4xl`)
4. **Spacing**: Tight on narrow → comfortable on standard → generous on desktop
5. **Layouts**: 1 col → 2 col → 3 col → 4 col grid progression
6. **Touch targets**: 44px phones, 48px touch tablets, 64px smart displays
7. **Safe areas**: iPhone notch/Dynamic Island, Android gesture nav, foldable hinges
8. **Smart displays**: No-scroll layouts, large text (18px+), distance readability

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

### Step 7: Test Across All 17 Target Devices

Reference `references/device-breakpoints.md` for complete device specs, exact media queries, and testing checklist.

**All 17 device test points:**

| # | Device | Width | Category |
|---|--------|-------|----------|
| 1 | Galaxy Z Fold 5 (cover) | 344px | Narrow Phone |
| 2 | Samsung Galaxy S8+ | 360px | Small Phone |
| 3 | iPhone SE | 375×667 | Small Phone (short viewport) |
| 4 | iPhone 12 Pro | 390px | Mid Phone |
| 5 | iPhone 14 Pro | 393px | Mid Phone |
| 6 | Pixel 7 | 412px | Standard Phone |
| 7 | Samsung Galaxy S20 Ultra | 412px | Standard Phone |
| 8 | Samsung Galaxy A51/71 | 412px | Standard Phone |
| 9 | iPhone XR | 414px | Standard Phone |
| 10 | iPad Mini | 768px | Small Tablet |
| 11 | iPad Air | 820px | Standard Tablet |
| 12 | Surface Pro 7 | 912px | Large Tablet |
| 13 | iPad Pro | 1024px | Large Tablet |
| 14 | Surface Duo | 540px / 1080px | Foldable |
| 15 | Galaxy Z Fold 5 (inner) | 882px | Foldable |
| 16 | Asus Zenbook Fold | 853px / 1280px | Foldable Laptop |
| 17a | Nest Hub | 1024×600 | Smart Display |
| 17b | Nest Hub Max | 1280×800 | Smart Display |

**15-point verification at each breakpoint:**
- [ ] No horizontal scrolling
- [ ] Text readable (14px narrow, 16px standard, 18px+ smart displays)
- [ ] Images scale properly (no overflow, correct aspect ratios)
- [ ] Navigation works (hamburger → horizontal → full nav)
- [ ] Touch targets ≥ 44px phones, ≥ 48px tablets, ≥ 64px smart displays
- [ ] Spacing appropriate (tight narrow, comfortable standard, generous desktop)
- [ ] Grid columns adjust (1→2→3→4 progression)
- [ ] Content constrained on ultra-wide (max-w-7xl or max-w-screen-2xl)
- [ ] Text overflow handled (line-clamp, truncate)
- [ ] Safe areas respected (iPhone notch/Dynamic Island, Android nav, hinges)
- [ ] Fold transitions smooth (cover→inner content reflow)
- [ ] Smart displays: no scroll, distance-readable, glanceable
- [ ] Dark mode works at all breakpoints
- [ ] Both portrait and landscape tested
- [ ] Touch vs mouse input handled

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

1. **Add responsive navigation** (hamburger on phones, horizontal on tablets+)
2. **Make images responsive** (`w-full h-auto object-cover`)
3. **Add container constraints** (`max-w-7xl mx-auto px-2 phone-small:px-3 md:px-6 lg:px-8`)
4. **Responsive text sizes** (`text-sm phone-mid:text-base md:text-lg lg:text-xl`)
5. **Stack layouts on mobile** (`flex flex-col md:flex-row`, `grid grid-cols-1 phone-standard:grid-cols-2 md:grid-cols-3`)
6. **Responsive spacing** (`p-2 phone-small:p-3 md:p-6 lg:p-8`)
7. **Add hover effects** (`hover:shadow-xl transition-shadow`)
8. **Fix touch targets** (`min-h-[44px] touch:min-h-[48px]`)
9. **Add safe areas** (`pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]`)
10. **Fix color contrast** (minimum 4.5:1)

## Common Patterns

### Responsive Container (All 17 Devices)
```html
<div class="max-w-7xl mx-auto px-2 phone-small:px-3 phone-mid:px-4 md:px-6 lg:px-8 xl:px-12 fold-cover:px-1 smart-display:px-6">
  <!-- Content adapts from Z Fold 5 cover (344px) to 4K desktop -->
</div>
```

### Responsive Grid (All 17 Devices)
```html
<div class="grid grid-cols-1 phone-standard:grid-cols-2 md:grid-cols-2 md-lg:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 phone-standard:gap-3 md:gap-4 lg:gap-6 xl:gap-8 fold-cover:grid-cols-1 fold-inner:grid-cols-2 smart-display:grid-cols-3 nest-hub-max:grid-cols-4">
  <!-- Items -->
</div>
```

### Responsive Section (All 17 Devices)
```html
<section class="py-6 phone-standard:py-8 md:py-12 lg:py-16 xl:py-24 px-2 phone-small:px-3 md:px-6 lg:px-8 short:py-4 smart-display:py-4">
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
