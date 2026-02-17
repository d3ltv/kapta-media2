export const THEME_STORAGE_KEY = "kapta-theme";
export const NIGHT_START_HOUR = 20;
export const DAY_START_HOUR = 8;

export const isValidTheme = (value) => value === "light" || value === "dark";

export const getTimeBasedTheme = (date = new Date()) => {
  const hour = date.getHours();
  const isNight = hour >= NIGHT_START_HOUR || hour < DAY_START_HOUR;
  return isNight ? "dark" : "light";
};

export const getStoredTheme = () => {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isValidTheme(stored) ? stored : null;
  } catch {
    return null;
  }
};

export const resolveTheme = () => getStoredTheme() || getTimeBasedTheme();

export const applyThemeToDocument = (theme) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const nextTheme = theme === "dark" ? "dark" : "light";

  root.classList.toggle("dark", nextTheme === "dark");
  root.setAttribute("data-theme", nextTheme);
  root.style.colorScheme = nextTheme;

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute("content", nextTheme === "dark" ? "#050505" : "#1c3ff9");
  }
};

export const persistTheme = (theme) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore write failures (private mode or blocked storage)
  }
};

export const initializeTheme = () => {
  const theme = resolveTheme();
  applyThemeToDocument(theme);
  return theme;
};
