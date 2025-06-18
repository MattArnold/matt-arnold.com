module.exports = {
  darkMode: 'class',
  content: [
    "./src/_includes/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    "./src/blog/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    "./src/pages/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    "./src/index.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
  ],
  theme: {
    extend: {
      colors: {
        // Earthy, mystical palette
        'midnight': {
          50: '#f0f4ff',
          100: '#dce6ff',
          200: '#c1d4ff',
          300: '#95b8ff',
          400: '#6391ff',
          500: '#3b6bff',
          600: '#2447f5',
          700: '#1d36d8',
          800: '#1e2fb0',
          900: '#1e2b8a',
          950: '#161d54',
        },
        'moss': {
          50: '#f3f7f3',
          100: '#e4ece2',
          200: '#cadac7',
          300: '#a3c19d',
          400: '#77a06e',
          500: '#56824b',
          600: '#426739',
          700: '#35522f',
          800: '#2d4227',
          900: '#273721',
          950: '#141e12',
        },
        'parchment': {
          50: '#fefef9',
          100: '#fefcf0',
          200: '#fcf6dc',
          300: '#f9edbd',
          400: '#f4dc8f',
          500: '#eec760',
          600: '#e0b043',
          700: '#bc9337',
          800: '#967233',
          900: '#795e2e',
          950: '#433117',
        },
        // Prism colors: burnt orange, deep teal, gold ochre
        'burnt-orange': {
          50: '#fef7ed',
          100: '#fdedd4',
          200: '#fbd7a8',
          300: '#f7b871',
          400: '#f19239',
          500: '#ec7316',
          600: '#dd590c',
          700: '#b7430c',
          800: '#933512',
          900: '#772d12',
          950: '#401507',
        },
        'deep-teal': {
          50: '#edfafa',
          100: '#d5f2f2',
          200: '#afe7e7',
          300: '#7dd5d5',
          400: '#45b8b8',
          500: '#2c9b9b',
          600: '#217d7d',
          700: '#1d6565',
          800: '#1b5252',
          900: '#1a4545',
          950: '#0a2626',
        },
        'gold-ochre': {
          50: '#fefbeb',
          100: '#fef4c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        'copper': {
          50: '#fef7ed',
          100: '#fcecd4',
          200: '#f8d5a8',
          300: '#f3b771',
          400: '#ec9140',
          500: '#e6741e',
          600: '#d75d14',
          700: '#b34713',
          800: '#8f3717',
          900: '#742e15',
          950: '#3f1408',
        }
      },
      fontFamily: {
        'serif': ['Alice', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'Menlo', 'monospace'],
        'display': ['Alice', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        }
      }
    }
  }
}
