/* eslint-disable filenames/match-exported */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [`./src/**/*.{js,ts,jsx,tsx,mdx}`],
  theme: {
    colors: {
      black: colors.black,
      blue: colors.indigo,
      current: `currentColor`,
      gray: colors.slate,
      green: colors.green,
      inherit: `inherit`,
      orange: colors.orange,
      red: colors.red,
      transparent: `transparent`,
      white: colors.white,
    },
    fontWeight: {
      light: `300`,
      normal: `400`,
      bold: `800`,
    },
    extend: {
      fontFamily: {
        sans: [`Inter var`, ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
