 /**
  * Theme Context
  * This context manages the application's theme settings,
  * including light and dark modes, and provides a way to
  * toggle between them.
  *
  * - Dark/Light Mode Override (default is system setting) - 
  * // TODO: Dark Mode colour scheme needed, and base colour theme
  */

// import { ThemeContext } from "@react-navigation/native";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";

export interface ThemeStyles {
  light: boolean;
  dark: boolean;
  sysDefault: boolean;
}

interface ThemeContextType {
  themeStyle: ThemeStyles;
  setThemeStyle: React.Dispatch<React.SetStateAction<ThemeStyles>>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [themeStyle, setThemeStyle] = useState({
    light: false, dark: false, sysDefault: true
  });

  return(
    <ThemeContext.Provider value={{themeStyle, setThemeStyle}}>
    {children}
    </ThemeContext.Provider>
  )
}

export const useThemeStyles = () => {
  const context = useContext(ThemeContext);
  if(!context){
    throw new Error("useThemeStlyes must be used with a ThemeStyleProvider");
  }
  return context;
}