import {
  black as _black,
  white as _white,
  neutral,
  indigo as _indigo,
  rose,
  amber,
} from "tailwindcss/colors";

const corePlugins = { preflight: false };
const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
const theme = {
  extend: {},
  colors: {
    transparent: "transparent",
    current: "currentColor",
    black: _black,
    white: _white,
    gray: neutral,
    indigo: _indigo,
    red: rose,
    yellow: amber,
    custom: {
      indigo: "#4B5781",
      theme: "#4EA986",
    },
  },

  screens: {
    sm: "1280px",

    md: "1400px",

    lg: "1500px",
  },
};
const variants = {
  extend: {},
};
const plugins = [];

export default {
  corePlugins,
  content,
  theme,
  variants,
  plugins,
};
