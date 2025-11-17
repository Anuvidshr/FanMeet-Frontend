import { useTheme } from "../utils/ThemeContext";

const ComponentName = () => {
  const { theme } = useTheme();

  // Theme-specific styles
  const themeStyles = {
    dark: {
      background: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
      text: "text-white",
      subtext: "text-gray-400",
      card: "bg-gray-800/50",
      cardHover: "hover:bg-gray-800/70",
      // ...existing dark theme styles...
    },
    light: {
      background: "bg-gradient-to-br from-green-300 via-purple-200 to-pink-200",
      text: "text-gray-900",
      subtext: "text-purple-700",
      card: "bg-white/80 shadow-lg",
      cardHover: "hover:bg-white",
      // ...new light theme styles matching homepage...
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.dark;

  return (
    <div className={`min-h-screen ${currentTheme.background} p-6`}>
      {/* ...rest of component... */}
    </div>
  );
};
