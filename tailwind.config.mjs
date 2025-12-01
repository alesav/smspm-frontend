/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // SMSPM Brand Colors
        primary: {
          light: '#26c6da',
          dark: '#0d47a1',
          50: '#e0f7ff',
          100: '#baeeff',
          200: '#7addff',
          300: '#26c6da',
          400: '#00acc1',
          500: '#0097a7',
          600: '#00838f',
          700: '#006064',
          800: '#004d40',
          900: '#0d47a1',
        },
        cyan: '#26c6da',
        blue: '#1e88e5',
        'dark-blue': '#0d47a1',
        purple: '#7c4dff',
        pink: '#ff4081',
        // Dark mode colors
        dark: {
          bg: {
            primary: '#0a0a0a',
            secondary: '#1a1a1a',
            tertiary: '#2a2a2a',
          },
          text: {
            primary: '#ffffff',
            secondary: '#e0e0e0',
            tertiary: '#bdbdbd',
            muted: '#9e9e9e',
          },
          border: {
            primary: '#3a3a3a',
            secondary: '#4a4a4a',
          },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #26c6da 0%, #0d47a1 100%)',
        'gradient-1': 'linear-gradient(135deg, #26c6da 0%, #1e88e5 100%)',
        'gradient-2': 'linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%)',
        'gradient-3': 'linear-gradient(135deg, #7c4dff 0%, #1e88e5 100%)',
        'gradient-4': 'linear-gradient(135deg, #ff4081 0%, #7c4dff 100%)',
        'gradient-5': 'linear-gradient(135deg, #26c6da 0%, #7c4dff 100%)',
        'gradient-6': 'linear-gradient(135deg, #0d47a1 0%, #212121 100%)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
