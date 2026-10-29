/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./404.html",
    "./about/**/*.html",
    "./contact/**/*.html",
    "./pricing/**/*.html",
    "./faq/**/*.html",
    "./gallery/**/*.html",
    "./privacy-policy/**/*.html",
    "./terms-and-conditions/**/*.html",
    "./blog/**/*.html",
    "./house-cleaning/**/*.html",
    "./villa-cleaning/**/*.html",
    "./apartment-cleaning/**/*.html",
    "./office-cleaning/**/*.html",
    "./steam-cleaning/**/*.html",
    "./sofa-cleaning/**/*.html",
    "./carpet-cleaning/**/*.html",
    "./majlis-cleaning/**/*.html",
    "./kitchen-cleaning/**/*.html",
    "./bathroom-cleaning/**/*.html",
    "./post-construction-cleaning/**/*.html",
    "./deep-cleaning/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          900: '#0c2d29',
          800: '#123F3A', // Deep Emerald
          700: '#144c46',
          DEFAULT: '#123F3A',
        },
        teal: {
          800: '#11615d',
          700: '#167D78', // Premium Teal
          600: '#1c9892',
          500: '#23b3ac',
          DEFAULT: '#167D78',
        },
        mint: {
          50: '#f4f9f7',
          100: '#E7F3EF', // Soft Mint
          200: '#cce6de',
          300: '#9ecbbe',
          DEFAULT: '#E7F3EF',
        },
        ivory: {
          50: '#FDFCF9',
          100: '#FAF9F5', // Warm Ivory
          200: '#F2EFE8',
          DEFAULT: '#FAF9F5',
        },
        charcoal: {
          800: '#202B2A', // Charcoal
          900: '#17201f',
          DEFAULT: '#202B2A',
        },
        muted: {
          500: '#687571', // Muted Gray
          DEFAULT: '#687571',
        }
      },
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Tajawal', 'Cairo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(18, 63, 58, 0.05)',
        'card': '0 10px 30px -5px rgba(18, 63, 58, 0.08)',
        'float': '0 20px 40px -15px rgba(18, 63, 58, 0.15)',
      }
    },
  },
  plugins: [],
}
