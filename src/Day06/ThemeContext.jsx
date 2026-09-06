import { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });


    const toggleTheme = () => {

        setTheme((prevTheme) =>
            prevTheme === "light"
                ? "dark"
                : "light"
        );

    };


    useEffect(() => {

        localStorage.setItem("theme", theme);

    }, [theme]);


    return (

        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme
            }}
        >

            {children}

        </ThemeContext.Provider>

    );

};


export const useTheme = () => {

    return useContext(ThemeContext);

};