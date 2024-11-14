/** @type {import('tailwindcss').Config} */

function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue: string }) => {
    if (opacityValue !== undefined) {
      return `hsla(var(${variableName}), ${opacityValue})`
    }
    return `hsl(var(${variableName}))`
  }
}

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        foreground: {
          1: withOpacity('--foreground-1'),
          2: withOpacity('--foreground-2'),
          3: withOpacity('--foreground-3'),
          4: withOpacity('--foreground-4'),
          5: withOpacity('--foreground-5'),
          6: withOpacity('--foreground-6'),
          7: withOpacity('--foreground-7'),
          8: withOpacity('--foreground-8'),
          9: withOpacity('--foreground-9'),
          10: withOpacity('--foreground-10'),
        },
        overlay: {
          1: withOpacity('--overlay-1'),
          2: withOpacity('--overlay-2'),
          3: withOpacity('--overlay-3'),
          4: withOpacity('--overlay-4'),
          5: withOpacity('--overlay-5'),
          6: withOpacity('--overlay-6'),
          7: withOpacity('--overlay-7'),
          8: withOpacity('--overlay-8'),
        },
        accent: {
          1: withOpacity('--accent-1'),
          2: withOpacity('--accent-2'),
          3: withOpacity('--accent-3'),
        },
        primary: withOpacity('--primary'),
        secondary: withOpacity('--secondary'),
        teritary: withOpacity('--teritary'),
        fouritary: withOpacity('--fouritary'),
        success: {
          1: withOpacity('--success-1'),
          2: withOpacity('--success-2'),
          3: withOpacity('--success-3'),
        },
        error: withOpacity('--error'),
        gold: {
          1: withOpacity('--gold-1'),
          2: withOpacity('--gold-2'),
        },
        warning: {
          1: withOpacity('--warning-1'),
        },
      },
      fontSize: {
        xss: ['0.625rem', '1.2'],
      },
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'],
      },
      boxShadow: {
        game: '0px 0px 200px 4px hsla(var(--teritary), 1)',
        'outline-btn': '0px 4px 11.9px 0px rgba(0, 0, 0, 0.30)',
        'success-btn': '0px 4px 0px 0px #048400',
      },
      backgroundImage: {
        'ring-success': 'linear-gradient(30deg, #E9FFDF, #00D97E)',
        'ring-cyan': 'linear-gradient(180deg, #4FEAFF, #24A3FF)',
        'linear-success': 'linear-gradient(180deg, #63E227 8%, #33CB42 114%)',
        'linear-gold': 'linear-gradient(180deg, #FFD03B 0%, #FFEE79 100%)',
        'linear-top-1': 'linear-gradient(154deg, #DBB026 0%, #0E1931 45%)',
        'linear-top-2': 'linear-gradient(154deg, #93BC6C 0%, #0E1931 45%)',
        'linear-top-3': 'linear-gradient(154deg, #7688C7 0%, #0E1931 45%)',
        'linear-bottom': 'linear-gradient(0deg, #055098 0%, rgba(13, 24, 48, 0.00) 100%)',
        'linear-referal': 'linear-gradient(101deg, #1149C4 11.16%, #000469 93.94%)',
        'linear-referal-stroke': 'linear-gradient(100deg, #2E65E0 13.46%, #0D1488 96.91%)',
        'linear-task-card': 'linear-gradient(191deg, #527AD1 -0.98%, rgba(82, 122, 209, 0.00) 44.34%)',
        'linear-light': 'linear-gradient(180deg, #6D97FF 0%, #425B99 100%)',
      },
      letterSpacing: {
        wide: '.02em',
        wider: '.04em',
        tight: '-.02em',
        tighter: '-.04em',
      },
      keyframes: {
        loading: {
          '0%': { width: '10%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        loading: 'loading 2s forwards',
      },
    },
  },
  plugins: [],
}
