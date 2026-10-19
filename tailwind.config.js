/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          bg: "#0c0916",
          dark: "#120e24",
          card: "#171230",
          cardHover: "#1f1842",
          border: "#292152",
          borderLight: "#3d3275",
          accent: "#a855f7",
          lime: "#a3e635",
          limeHover: "#bef264",
          orange: "#f97316",
          pink: "#ec4899",
          cyan: "#06b6d4",
          yellow: "#eab308"
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Consolas', 'Monaco', 'monospace'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif']
      },
      boxShadow: {
        'glow-purple': '0 0 30px -5px rgba(168, 85, 247, 0.35)',
        'glow-lime': '0 0 30px -5px rgba(163, 230, 53, 0.35)',
        'glow-orange': '0 0 30px -5px rgba(249, 115, 22, 0.35)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.35)'
      }
    },
  },
  plugins: [],
}
