import { useCallback, useEffect, useState } from "react";
import {
  applyThemeToDocument,
  getSystemTheme,
  getStoredTheme,
  persistTheme,
  resolveTheme,
} from "@/utils/theme";

const useTheme = () => {
  const [theme, setTheme] = useState(() => resolveTheme());

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const syncTheme = () => {
      const storedTheme = getStoredTheme();
      if (storedTheme) {
        setTheme(storedTheme);
        return;
      }

      const systemTheme = getSystemTheme();
      setTheme((currentTheme) => (currentTheme === systemTheme ? currentTheme : systemTheme));
    };

    syncTheme();
    window.addEventListener("storage", syncTheme);

    const mediaQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    if (mediaQuery && typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncTheme);
    } else if (mediaQuery && typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(syncTheme);
    }

    return () => {
      window.removeEventListener("storage", syncTheme);
      if (mediaQuery && typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", syncTheme);
      } else if (mediaQuery && typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(syncTheme);
      }
    };
  }, []);

  const setThemeMode = useCallback((nextTheme) => {
    if (nextTheme !== "light" && nextTheme !== "dark") return;

    persistTheme(nextTheme);
    setTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";
      persistTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  return {
    theme,
    isDark: theme === "dark",
    setTheme: setThemeMode,
    toggleTheme,
  };
};

export default useTheme;
