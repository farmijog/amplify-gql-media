import React, { createContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { ThemeProvider, CssBaseline } from "@material-ui/core";

import theme from "../styles/Theme";

export const AppContext = createContext();

function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [themeMode, setThemeMode] = useState(
        localStorage.getItem("theme") || "lightTheme"
    );

    useEffect(() => {
        checkIfUserExists();
        localStorage.setItem("theme", themeMode)
    }, [themeMode])

    const checkIfUserExists = async () => {
        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser(currentUser);
        } catch (error) {
            
        }
    }

    const toggleTheme = () => {
        setThemeMode(prevState => {
            if (prevState === "lightTheme") {
                return "darkTheme"
            } else {
                return "lightTheme"
            }
        })
    }

    const value = { toggleTheme, themeMode, user };
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