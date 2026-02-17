import { useCallback, useEffect, useState } from "react";
import {
  applyThemeToDocument,
  getStoredTheme,
  getTimeBasedTheme,
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

      const scheduleTheme = getTimeBasedTheme();
      setTheme((currentTheme) => (currentTheme === scheduleTheme ? currentTheme : scheduleTheme));
    };

    syncTheme();
    const interval = window.setInterval(syncTheme, 60_000);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("storage", syncTheme);
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
