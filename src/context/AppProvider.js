import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";

import theme from "../styles/Theme";

export const AppContext = createContext();

function AppProvider({ children }) {
    
    const [themeMode, setThemeMode] = useState(
        localStorage.getItem("theme") || "lightTheme"
    );

    useEffect(() => {
        localStorage.setItem("theme", themeMode)
    }, [themeMode])

    const toggleTheme = () => {
        setThemeMode(prevState => {
            if (prevState === "lightTheme") {
                return "darkTheme"
            } else {
                return "lightTheme"
            }
        })
    }

    const value = { toggleTheme, themeMode };
    const customTheme = theme[themeMode];

    return (
        <AppContext.Provider value={value}>
            <ThemeProvider theme={customTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export default AppProvider;