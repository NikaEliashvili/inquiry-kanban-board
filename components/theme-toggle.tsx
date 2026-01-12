"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = () => {
    localStorage.setItem("theme", isDark ? "light" : "dark");

    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && theme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      return;
    }
    if (theme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      return;
    }
  }, []);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div>
      <button
        aria-label="Change Theme"
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
