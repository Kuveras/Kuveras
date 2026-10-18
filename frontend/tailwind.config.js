/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kuveras: {
          bg: '#FFFDF8',
          'bg-secondary': '#FAF7F0',
          cream: '#F5EFE5',
          beige: '#EDE3D4',
          text: '#171512',
          muted: '#6F675E',
          gold: '#C89B3C',
          'gold-luxury': '#D4AF37',
          champagne: '#E7C982',
          emerald: '#0B5D3B',
          'emerald-deep': '#06452F',
          blue: '#173B7A',
          'blue-deep': '#0B214A',
          maroon: '#7A1010',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury-sm': '0 4px 20px -5px rgba(200, 155, 60, 0.08)',
        'luxury': '0 10px 30px -10px rgba(11, 93, 59, 0.08)',
        'luxury-lg': '0 20px 40px -15px rgba(200, 155, 60, 0.15)',
      }
    },
  },
  plugins: [],
}
