/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      // Narrow phones (Galaxy Z Fold 5 cover)
      'xs': '344px',
      // Small phones (Galaxy S8+)
      '2xs': '360px',
      // Small phones (iPhone SE)
      'phone': '375px',
      // Mid phones (iPhone 12 Pro)
      'phone-mid': '390px',
      // Standard phones (Pixel 7, Galaxy S20 Ultra, iPhone XR)
      'phone-lg': '412px',
      // Small tablets / large phones
      'sm': '640px',
      // Tablets (iPad Mini)
      'md': '768px',
      // Standard tablets (iPad Air)
      'md-lg': '820px',
      // Large tablets (Surface Pro 7)
      'tablet': '912px',
      // Large tablets (iPad Pro) & smart displays
      'lg': '1024px',
      // Desktop & large smart displays
      'xl': '1280px',
      // Large desktops
      '2xl': '1536px',
    },
    extend: {
      spacing: {
        'safe-top': 'env(safe-area-inset-top, 0px)',
        'safe-bottom': 'env(safe-area-inset-bottom, 0px)',
        'safe-left': 'env(safe-area-inset-left, 0px)',
        'safe-right': 'env(safe-area-inset-right, 0px)',
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'float-slow': 'float 12s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slideUp': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
    },
  },
  plugins: [],
}
