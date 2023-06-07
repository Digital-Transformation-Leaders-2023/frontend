import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { ThemeProvider, ThemeType } from "@gravity-ui/uikit";

type Theme = ThemeType;

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const AppThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeManager: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>((localStorage.getItem("theme") as Theme) || "light");

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (!rootElement) return;

    localStorage.setItem("theme", theme);
    document.body.dataset.theme = theme;
    rootElement.classList.remove("yc-root_theme_light", "yc-root_theme_dark");
    rootElement.classList.add(`yc-root_theme_${theme}`);
  }, [theme]);

  return (
    <AppThemeContext.Provider value={{
      theme,
      setTheme,
    }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useTheme = () => useContext(AppThemeContext);
