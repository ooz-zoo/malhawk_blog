import { useState } from "react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState("light");

  const buttonStyle = theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black";

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-2 rounded ${buttonStyle} hover:bg-gray-600`}
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
