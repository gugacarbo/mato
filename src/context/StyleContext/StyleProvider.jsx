import { useEffect, useState } from "react";

import { ThemeProvider } from "styled-components";
import StyleContext from "./index";
import Themes from "../../Style/Themes";
import GlobalStyle from "../../Style/GlobalStyle";

const StyleProvider = ({ children }) => {

  const [theme, setTheme] = useState('');
  const [currentTheme, setCurrentTheme] = useState(Themes.dark)
  const themeLocalKey = import.meta.env.VITE_SITE_SHORTNAME;


  const handleSetTheme = (newTheme = null) => {

    if (newTheme === null) {
      const currThemeIndex = Object.keys(Themes).indexOf(theme)
      const themesCount = Object.keys(Themes).length

      let newIndex = currThemeIndex;

      if (currThemeIndex < themesCount - 1) {
        newIndex++
      } else {
        newIndex = 0;
      }
      setTheme(Object.keys(Themes)[newIndex])


    } else {

      if (!Themes[newTheme]) {
        setTheme(Object.keys(Themes)[0])
      } else {
        setTheme(Themes[newTheme])
      }
    }
  };


  useEffect(() => {
    const localTheme = localStorage.getItem(themeLocalKey);
    if (localTheme) {
      setTheme(localTheme);
    } else {
      const prefersColorScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      if (prefersColorScheme.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

  useEffect(() => {
    if (Themes[theme] && theme) {
      localStorage.setItem(themeLocalKey, theme);

      setCurrentTheme(Themes[theme])
    }
  }, [theme])

  return (
    <StyleContext.Provider
      value={{
        theme: currentTheme,
        setTheme: handleSetTheme,
      }}
    >
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />

        {children}
      </ThemeProvider>
    </StyleContext.Provider>
  );
};


export default StyleProvider