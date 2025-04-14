export type TTheme = 'light' | 'dark';

export type ThemeContextType = {
  theme: TTheme;
  toggleTheme: (selectedTheme: TTheme) => void;
};
