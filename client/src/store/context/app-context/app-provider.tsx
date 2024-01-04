import { useMemo, useState } from "react";
import { AppContext } from "./app-context";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const [logged, setLogged] = useState(false);

    const setThemeHandler = (value: "light" | "dark") => setTheme(value);

    const setLoggedHandler = (value: boolean) => setLogged(value);

    const value = useMemo(
        () => ({
            theme,
            logged,
            setThemeHandler,
            setLoggedHandler,
        }),
        [theme, logged]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
