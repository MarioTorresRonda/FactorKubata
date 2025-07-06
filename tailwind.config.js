const { transform } = require('next/dist/build/swc');
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./util/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'fira' : ['"Fira Code"', "serif"]
    },
    extend: {
      textShadow: {
        sm: '0px 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0px 2px 4px var(--tw-shadow-color)',
        lg: '0px 8px 16px var(--tw-shadow-color)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'xl-h': { 'raw': '(min-height: 700px)' },
      },
      keyframes: {
        opacityLoad: {
          '0%': { "z-index": 20 },
          '75%': { "z-index": 20, "transform": "translateY(0)"},
          '100%': { "z-index": 20, "transform": "translateY(-100%)"},
        },
        overflowLoad: {
          '0%': { "overflow": "hidden" },
          '100%': { "overflow": "unset" },
        },
        fromTop: {
          '0%': { "opacity": "0%", "transform": "translateY(-30%)" },
          '100%': { "opacity": "100%", "transform": "translateY(0)" },
        },
        toBottom: {
          '0%': { "opacity": "100%", "transform": "translateY(0)" },
          '100%': { "opacity": "0%", "transform": "translateY(30%)" },
        },
        highlight: {
          '0%': { "background-color" : "transparent", "transform": "scale(1)" },
          '25%': { "background-color" : "var(--myColorStartSimple)", "transform": "scale(103%)" },
          '50%': { "background-color" : "var(--myColorStartSimple)", "transform": "scale(1)"},
          '100%': { "background-color" : "transparent", "transform": "scale(1)" }
        },
        tooltipAnimation: {
          '0%': { "transform": "scale(0)" },
          '70%': { "transform": "scale(0)" },
          '90%': { "transform": "scale(105%)" },
          '100%': { "transform": "scale(1)" }
        },
      },
      animation: {
        opacityLoad: 'opacityLoad 4s',
        overflowLoad: 'overflowLoad 4s',
        fromTop: 'fromTop 300ms ease-out',
        toBottom: 'toBottom 200ms',
        highlight : 'highlight 1200ms',
        tooltipAnimation : 'tooltipAnimation 800ms',
      }
    },
    variants: {
      extend: {
        animation: ['group-hover'],
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
};
