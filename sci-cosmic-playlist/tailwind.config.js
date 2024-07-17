const plugin = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-night-200",
    "bg-night-900",
    "text-Orange-primary",
    "text-Orange-secondary",
    "text-Yellow-primary",
    "text-Yellow-secondary",
    "text-Green-primary",
    "text-Green-secondary",
    "text-Blue-primary",
    "text-Blue-secondary",
    "text-Purple-primary",
    "text-Purple-secondary",

    "bg-Orange-primary",
    "bg-Orange-secondary",
    "bg-Yellow-primary",
    "bg-Yellow-secondary",
    "bg-Green-primary",
    "bg-Green-secondary",
    "bg-Blue-primary",
    "bg-Blue-secondary",
    "bg-Purple-primary",
    "bg-Purple-secondary",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      fontFamily: {
        'meta': ['var(--font-meta)'],
        'duke': ['var(--font-duke)'],
        'dukefill': ['var(--font-dukefill)'],
        'dukeshadow': ['var(--font-dukeshadow)'],
      },
      colors: {
        star: {
          100: "#FFF09F",
          200: "#E6CE4A",
        },
        night: {
          100: "#A2BEF5",
          200: "#4C78D0",
          800: "#1E2339",
          900: "#263C68",
        },
        Purple: {
          primary: "#D959D6",
          secondary: "#E59AE3",
        },
        Orange: {
          primary: "#FF973E",
          secondary: "#FFBE43",
        },
        Yellow: {
          primary: "#FFDA14",
          secondary: "#FFF09F",
        },
        Green: {
          primary: "#89D938",
          secondary: "#B0E25F",
        },
        Blue: {
          primary: "#55E2E8",
          secondary: "#A0FBFE",
        },
      }
    },
  },
  daisyui: {
    themes: [
      {
        night: {
          ...require("daisyui/src/theming/themes")["night"],
          accent: "#A2BEF5",
        }
      }
    ],
  },
  plugins: [
    require('daisyui'),
    require("tailwindcss-text-fill"),
  ],
};
