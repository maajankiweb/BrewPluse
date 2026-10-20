/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cf: {
          forest: '#062F23',
          'forest-dark': '#05291F',
          green: '#0B5C45',
          accent: '#10B981',
          'soft-green': '#E8F6EF',
          'pale-green': '#F2FAF6',
          cream: '#FFF9F1',
          latte: '#F5EBDD',
          gold: '#F59E0B',
          'soft-gold': '#FFF4DD',
          bg: '#F8FAF8',
          card: '#FFFFFF',
          border: '#E7ECE9',
          ink: '#12201B',
          'ink-2': '#65736D',
          muted: '#8D9792',
        },
        brand: {
          dark: '#062F23',
          forest: '#0B5C45',
          primary: '#10B981',
          light: '#E8F6EF',
          crema: '#F8FAF8',
          card: '#FFFFFF',
          border: '#E7ECE9',
          borderDark: '#1E342B',
          text: '#12201B',
          muted: '#65736D',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(20, 18, 16, 0.05)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
