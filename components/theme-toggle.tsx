"use client";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState<boolean>(
    typeof window !== "undefined" &&
      document?.documentElement?.className === "dark"
  );

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div>
      <button
        onClick={toggleTheme}
        className="rounded bg-accent p-2 aspect-square active:scale-90"
      >
        {isDark ? (
          <Sun className="size-4 text-yellow-200" />
        ) : (
          <Moon className="size-4 text-blue-800" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
