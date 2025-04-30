/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0fa',
          100: '#cce0f5',
          200: '#99c2eb',
          300: '#66a3e0',
          400: '#3385d6',
          500: '#0066cc',
          600: '#0052a3',
          700: '#003d7a',
          800: '#002952',
          900: '#001429',
        },
        secondary: {
          50: '#eef9fe',
          100: '#dcf3fd',
          200: '#b9e7fb',
          300: '#96dbf9',
          400: '#73cff7',
          500: '#5ac8fa',
          600: '#48a0c8',
          700: '#367896',
          800: '#245064',
          900: '#122832',
        },
        accent: {
          50: '#fff5e6',
          100: '#ffeacc',
          200: '#ffd699',
          300: '#ffc166',
          400: '#ffad33',
          500: '#ff9500',
          600: '#cc7700',
          700: '#995900',
          800: '#663c00',
          900: '#331e00',
        },
        success: {
          50: '#e9f9ef',
          100: '#d3f3df',
          200: '#a7e7be',
          300: '#7bdb9e',
          400: '#4fcf7d',
          500: '#34c759',
          600: '#299f47',
          700: '#1f7735',
          800: '#155024',
          900: '#0a2812',
        },
        warning: {
          50: '#fffbe6',
          100: '#fff8cc',
          200: '#fff099',
          300: '#ffe866',
          400: '#ffe033',
          500: '#ffcc00',
          600: '#cca300',
          700: '#997a00',
          800: '#665200',
          900: '#332900',
        },
        error: {
          50: '#ffebea',
          100: '#ffd6d5',
          200: '#ffadab',
          300: '#ff8582',
          400: '#ff5c58',
          500: '#ff3b30',
          600: '#cc2f26',
          700: '#99231d',
          800: '#661813',
          900: '#330c0a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'San Francisco',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      spacing: {
        '0': '0',
        '1': '0.25rem', // 4px
        '2': '0.5rem',  // 8px
        '3': '0.75rem', // 12px
        '4': '1rem',    // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem',  // 24px
        '8': '2rem',    // 32px
        '10': '2.5rem', // 40px
        '12': '3rem',   // 48px
        '16': '4rem',   // 64px
        '20': '5rem',   // 80px
        '24': '6rem',   // 96px
        '32': '8rem',   // 128px
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
};