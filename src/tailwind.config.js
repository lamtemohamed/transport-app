module.exports = {
  darkMode: "class", // Active le dark mode via la classe .dark
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    // Ajoutez ces chemins si vous utilisez des composants dans node_modules
    "./node_modules/flowbite/**/*.js", // Exemple pour flowbite
  ],
  theme: {
    extend: {
      colors: {
        // Ajoutez vos couleurs personnalisées pour les deux modes
        primary: {
          light: "#2563eb", // bleu-600
          dark: "#3b82f6", // bleu-500
        },
        background: {
          light: "#f3f4f6", // gray-100
          dark: "#111827", // gray-900
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Pour les styles de formulaires
    // require("flowbite/plugin"), // Décommentez si vous utilisez flowbite
  ],
};
