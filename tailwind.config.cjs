/** @type {import('tailwindcss').Config} */
const customColors = require("./src/constants/Colors.cjs")
const plugin = require("tailwindcss/plugin")
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "border-red-500",
    "border-blue-500",
    "border-lime-500",
    "border-green-500",
    "border-orange-500",
    "border-amber-500",
    "border-emerald-500",
    "border-teal-500",
    "border-cyan-500",
    "border-sky-500",

    "from-red-500",
    "from-blue-500",
    "from-lime-500",
    "from-green-500",
    "from-orange-500",
    "from-amber-500",
    "from-emerald-500",
    "from-teal-500",
    "from-cyan-500",
    "from-sky-500",

    "from-accentPrimary-700",

    "to-red-500",
    "to-blue-500",
    "to-lime-500",
    "to-green-500",
    "to-orange-500",
    "to-amber-500",
    "to-emerald-500",
    "to-teal-500",
    "to-cyan-500",
    "to-sky-500",

    "hover:bg-red-600",
    "hover:bg-blue-600",
    "hover:bg-lime-600",
    "hover:bg-green-600",
    "hover:bg-orange-600",
    "hover:bg-amber-600",
    "hover:bg-emerald-600",
    "hover:bg-teal-600",
    "hover:bg-cyan-600",
    "hover:bg-sky-600",

    "hover:border-red-600",
    "hover:border-blue-600",
    "hover:border-lime-600",
    "hover:border-green-600",
    "hover:border-orange-600",
    "hover:border-amber-600",
    "hover:border-emerald-600",
    "hover:border-teal-600",
    "hover:border-cyan-600",
    "hover:border-sky-600",

    "hover:text-red-600",
    "hover:text-blue-600",
    "hover:text-lime-600",
    "hover:text-green-600",
    "hover:text-orange-600",
    "hover:text-amber-600",
    "hover:text-emerald-600",
    "hover:text-teal-600",
    "hover:text-cyan-600",
    "hover:text-sky-600",

    "bg-red-500",
    "bg-blue-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",

    "text-red-500",
    "text-blue-500",
    "text-lime-500",
    "text-green-500",
    "text-orange-500",
    "text-amber-500",
    "text-emerald-500",
    "text-teal-500",
    "text-cyan-500",
    "text-sky-500",
  ],
  theme: {
    extend: {
      colors: {
        primary: customColors.WildYankees.MountainMeadow,
        secondary: customColors.IceCreamSandwich.DarkJungleGreen,
        tertiary: customColors.IceCreamSandwich.PalePink,
        quaternary: customColors.IceCreamSandwich.LanguidLavender,
        neutral: customColors.IceCreamSandwich.White,

        textPrimary: customColors.IceCreamSandwich.LanguidLavender,
        textSecondary: customColors.IceCreamSandwich.DarkJungleGreen,

        accentPrimary: customColors.IceCreamSandwich.TiffanyBlue,
        accentSecondary: customColors.IceCreamSandwich.Ruby,
        accentTertiary: customColors.IceCreamSandwich.CinnamonSatin,
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-gradient": (angle) => ({
            "background-image": `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          values: Object.assign(theme("bgGradientDeg", {}), {
            10: "10deg",
            15: "15deg",
            20: "20deg",
            25: "25deg",
            30: "30deg",
            35: "35deg",
            40: "40deg",
            45: "45deg",
            50: "50deg",
            55: "55deg",
            60: "60deg",
            90: "90deg",
            120: "120deg",
            135: "135deg",
          }),
        }
      )
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-gradient-to-l": (step) => ({
            "background-image": `linear-gradient(to left, var(--tw-gradient-from)  ${step}, var(--tw-gradient-to) 0%)`,
          }),
          "bg-gradient-to-r": (step) => ({
            "background-image": `linear-gradient(to right, var(--tw-gradient-from)  ${step}, var(--tw-gradient-to) 0%)`,
          }),
          "bg-gradient-to-b": (step) => ({
            "background-image": `linear-gradient(to bottom, var(--tw-gradient-from)  ${step}, var(--tw-gradient-to) 0%)`,
          }),
          "bg-gradient-to-t": (step) => ({
            "background-image": `linear-gradient(to top, var(--tw-gradient-from)  ${step}, var(--tw-gradient-to) 0%)`,
          }),
        },
        {
          values: Object.assign(theme("bgGradientDeg", {}), {
            10: "10%",
            15: "15%",
            20: "20%",
            25: "25%",
            30: "30%",
            35: "35%",
            40: "40%",
            45: "45%",
            50: "50%",
            55: "55%",
            60: "60%",
            90: "90%",
            120: "120%",
            135: "135%",
          }),
        }
      )
    }),
  ],
}
