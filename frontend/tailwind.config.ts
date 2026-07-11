import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f9f9f9',
          dim: '#dadada',
          bright: '#f9f9f9',
          container: {
            lowest: '#ffffff',
            low: '#f3f3f4',
            DEFAULT: '#eeeeee',
            high: '#e8e8e8',
            highest: '#e2e2e2',
          },
          variant: '#e2e2e2',
          tint: '#5f5e61',
        },
        'on-surface': {
          DEFAULT: '#1a1c1c',
          variant: '#47464b',
        },
        'inverse-surface': '#2f3131',
        'inverse-on-surface': '#f0f1f1',
        outline: {
          DEFAULT: '#77767b',
          variant: '#c8c5cb',
        },
        primary: {
          DEFAULT: '#18181b',
          fixed: {
            DEFAULT: '#e4e1e6',
            dim: '#c8c5ca',
          },
          container: '#1b1b1e',
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#858387',
          fixed: {
            DEFAULT: '#1b1b1e',
            variant: '#47464a',
          }
        },
        'inverse-primary': '#c8c5ca',
        secondary: {
          DEFAULT: '#64748b',
          fixed: {
            DEFAULT: '#d3e4fe',
            dim: '#b7c8e1',
          },
          container: '#d0e1fb',
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#54647a',
          fixed: {
            DEFAULT: '#0b1c30',
            variant: '#38485d',
          }
        },
        tertiary: {
          DEFAULT: '#000000',
          fixed: {
            DEFAULT: '#e0e3e5',
            dim: '#c4c7c9',
          },
          container: '#191c1e',
        },
        'on-tertiary': {
          DEFAULT: '#ffffff',
          container: '#818486',
          fixed: {
            DEFAULT: '#191c1e',
            variant: '#444749',
          }
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        'on-error': {
          DEFAULT: '#ffffff',
          container: '#93000a',
        },
        background: '#f8fafc',
        'on-background': '#1a1c1c',
        
        charcoal: '#18181b',
        'blue-gray': '#64748b',
        'zinc-50': '#f8fafc',
        'border-default': '#e2e8f0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-lg-mobile': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'title-lg': ['18px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '16px', letterSpacing: '0.01em', fontWeight: '500' }],
        'label-sm': ['11px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }],
      },
      spacing: {
        'base': '8px',
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        'container-max': '1280px',
        'gutter': '24px',
      },
      borderRadius: {
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      },
      boxShadow: {
        'subtle': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [],
};

export default config;
