import React, { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { Switch } from "@material-ui/core";

function ThemeToggle() {
    const { toggleTheme, themeMode } = useContext(AppContext);

    const handleThemeChange = (e) => {
        toggleTheme();
    }

    return (
        <Switch 
            size="small" 
            checked={themeMode === "darkTheme" ? true : false}
            onChange={handleThemeChange}
        />
    );
}

export default ThemeToggle;