import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../ThemeContext/useTheme";

// Composant DarkModeToggle séparé
const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full ml-2 transition-colors ${
        darkMode
          ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
      aria-label={
        darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"
      }
    >
      {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
};

export default DarkModeToggle;
