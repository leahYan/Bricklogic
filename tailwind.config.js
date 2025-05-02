/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors from original theme
        background: '#000000',
        text: '#FFFFFF',
        accent: '#FFD700',
        'accent-dark': '#D4AF37',
        
        // UI element colors
        'input-bg': '#1A1A1A',
        'input-text': '#CCCCCC',
        'input-placeholder': '#666666',
        
        // Status colors
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FFC107',
        info: '#2196F3',
        
        // Progress indicators
        'progress-track': '#333333',
        'progress-fill': '#FFD700',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'pill': '9999px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      fontSize: {
        'sm': '12px',
        'base': '16px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'sm': '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        'lg': '0 6px 10px -2px rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};