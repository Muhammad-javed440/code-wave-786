# Animation Patterns

## Table of Contents
- [Tailwind Animation Utilities](#tailwind-animation-utilities)
- [Transition Patterns](#transition-patterns)
- [Scroll Animations](#scroll-animations)
- [Loading States](#loading-states)
- [Micro-Interactions](#micro-interactions)
- [Custom Animations](#custom-animations)

## Tailwind Animation Utilities

### Built-in Animations
```html
<!-- Spin (loading spinners) -->
<div class="animate-spin">↻</div>

<!-- Ping (notification dots) -->
<div class="animate-ping">●</div>

<!-- Pulse (subtle attention) -->
<div class="animate-pulse">...</div>

<!-- Bounce (call-to-action) -->
<div class="animate-bounce">↓</div>
```

### Transition Utilities
```html
<!-- Transition all properties -->
<button class="transition-all duration-300 ease-in-out">

<!-- Transition specific properties -->
<div class="transition-colors duration-200">
<div class="transition-transform duration-300">
<div class="transition-opacity duration-500">

<!-- Multiple properties -->
<div class="transition-[transform,opacity] duration-300">
```

## Transition Patterns

### Hover Effects
```html
<!-- Scale on hover -->
<div class="transform hover:scale-105 transition-transform duration-200">

<!-- Lift on hover -->
<div class="transform hover:-translate-y-1 transition-transform duration-200">

<!-- Shadow on hover -->
<div class="shadow-md hover:shadow-xl transition-shadow duration-300">

<!-- Color change -->
<button class="bg-blue-500 hover:bg-blue-600 transition-colors duration-200">

<!-- Combined effects -->
<div class="
  transform
  hover:scale-105
  hover:shadow-xl
  transition-all
  duration-300
  ease-out
">
```

### Focus States
```html
<input class="
  border-2 border-gray-300
  focus:border-blue-500
  focus:ring-4
  focus:ring-blue-200
  transition-all
  duration-200
" />
```

### Active States
```html
<button class="
  transform
  active:scale-95
  transition-transform
  duration-100
">
```

## Scroll Animations

### Fade In on Scroll (with JS)
```html
<div class="opacity-0 translate-y-4 transition-all duration-700 scroll-fade-in">
  Content appears on scroll
</div>

<script>
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('opacity-0', 'translate-y-4');
      entry.target.classList.add('opacity-100', 'translate-y-0');
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-fade-in').forEach(el => observer.observe(el));
</script>
```

### Staggered Animations
```html
<div class="space-y-4">
  <div class="opacity-0 translate-x-[-50px] transition-all duration-500 delay-0 scroll-fade-in">
  <div class="opacity-0 translate-x-[-50px] transition-all duration-500 delay-100 scroll-fade-in">
  <div class="opacity-0 translate-x-[-50px] transition-all duration-500 delay-200 scroll-fade-in">
</div>
```

### Parallax Effect (Simple)
```html
<div class="relative overflow-hidden h-screen">
  <div class="absolute inset-0 parallax-slow">
    <img src="bg.jpg" class="w-full h-full object-cover" />
  </div>
</div>

<script>
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  document.querySelectorAll('.parallax-slow').forEach(el => {
    el.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
});
</script>
```

## Loading States

### Skeleton Loader
```html
<div class="animate-pulse space-y-4">
  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
  <div class="h-4 bg-gray-200 rounded"></div>
  <div class="h-4 bg-gray-200 rounded w-5/6"></div>
</div>
```

### Spinner
```html
<div class="flex justify-center items-center">
  <div class="
    animate-spin
    rounded-full
    h-12 w-12
    border-b-2 border-blue-600
  "></div>
</div>
```

### Progress Bar
```html
<div class="w-full bg-gray-200 rounded-full h-2.5">
  <div class="
    bg-blue-600
    h-2.5
    rounded-full
    transition-all
    duration-500
    ease-out
  " style="width: 45%"></div>
</div>
```

### Shimmer Effect
```html
<div class="relative overflow-hidden bg-gray-200 rounded">
  <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white to-transparent"></div>
</div>

<style>
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
</style>
```

## Micro-Interactions

### Button Click Feedback
```html
<button class="
  transform
  active:scale-95
  transition-transform
  duration-100
  bg-blue-600
  active:bg-blue-700
  px-6 py-3
  rounded-lg
  text-white
">
  Click Me
</button>
```

### Toggle Switch
```html
<button class="
  relative
  w-14 h-8
  bg-gray-300
  rounded-full
  transition-colors
  duration-200
  focus:outline-none
  focus:ring-4
  focus:ring-blue-200
">
  <span class="
    absolute
    top-1 left-1
    w-6 h-6
    bg-white
    rounded-full
    shadow-md
    transform
    transition-transform
    duration-200
    translate-x-0
    [.active>&]:translate-x-6
  "></span>
</button>
```

### Accordion
```html
<div class="border rounded-lg overflow-hidden">
  <button class="w-full p-4 text-left flex justify-between items-center">
    <span>Item Title</span>
    <svg class="w-5 h-5 transform transition-transform duration-200 rotate-0 [.open>&]:rotate-180">
      <!-- Chevron icon -->
    </svg>
  </button>
  <div class="
    max-h-0
    overflow-hidden
    transition-all
    duration-300
    ease-in-out
    [.open>&]:max-h-96
  ">
    <div class="p-4">Content</div>
  </div>
</div>
```

### Toast Notification
```html
<div class="
  fixed top-4 right-4
  bg-white
  shadow-lg
  rounded-lg
  p-4
  transform
  translate-x-full
  transition-transform
  duration-300
  [.show>&]:translate-x-0
">
  Notification message
</div>
```

## Custom Animations

### Fade In Up
```html
<div class="animate-fadeInUp">
  Content
</div>

<style>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}
</style>
```

### Slide In From Left
```html
<div class="animate-slideInLeft">
  Content
</div>

<style>
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideInLeft {
  animation: slideInLeft 0.5s ease-out;
}
</style>
```

### Scale In
```html
<div class="animate-scaleIn">
  Content
</div>

<style>
@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease-out;
}
</style>
```

### Gradient Animation
```html
<div class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_100%] animate-gradientShift">
  Animated Gradient Background
</div>

<style>
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradientShift {
  animation: gradientShift 3s ease infinite;
}
</style>
```

## Performance Best Practices

1. **Use transforms and opacity** - These properties are GPU-accelerated
2. **Avoid animating layout properties** - width, height, margin cause reflows
3. **Use will-change sparingly** - Only for elements about to animate
4. **Reduce motion for accessibility** - Respect prefers-reduced-motion
5. **Keep duration reasonable** - 200-500ms for most UI transitions

### Reduced Motion Support
```html
<div class="
  transition-transform
  duration-300
  motion-reduce:transition-none
  motion-reduce:transform-none
">
```
