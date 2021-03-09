import React, { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { Switch } from "@material-ui/core";
import { Brightness3 as DarkIcon, WbSunny as LightIcon } from "@material-ui/icons";

function ThemeToggle() {
    const { toggleTheme, themeMode } = useContext(AppContext);

    const handleThemeChange = (e) => {
        toggleTheme();
    }

    return (
        <>
            {themeMode === "darkTheme" ? <DarkIcon fontSize="small" /> : <LightIcon fontSize="small" />}
            <Switch 
                size="small" 
                checked={themeMode === "darkTheme" ? true : false}
                onChange={handleThemeChange}
            />
        </>
    );
}

export default ThemeToggle;