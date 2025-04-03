export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#58CC02',
        secondary: '#FF4B4B',
        tertiary: '#CE82FF',
        background: '#FFF',
        'text-primary': '#4B4B4B',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}