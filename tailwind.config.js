/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F2C94C', // Amarelo dourado
          foreground: '#1C1C1C', // Preto fosco
          light: '#F5D77B',
          dark: '#D9B035',
        },
        secondary: {
          DEFAULT: '#C0392B', // Vermelho telhado
          foreground: '#FFFFFF', // Branco
          light: '#D15B4E',
          dark: '#962D22',
        },
        background: {
            DEFAULT: '#FAF3E0', // Creme
            paper: '#FFFFFF',
        },
        foreground: {
            DEFAULT: '#1C1C1C', // Preto fosco
            muted: '#6B4F3F', // Marrom madeira
        },
        roma: {
            brown: '#6B4F3F', // Marrom madeira
            cream: '#FAF3E0', // Creme
            black: '#1C1C1C', // Preto fosco
        }
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
