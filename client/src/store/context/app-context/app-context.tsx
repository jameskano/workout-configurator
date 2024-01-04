import { createContext, useContext } from "react";

interface AppContextTypes {
    logged: boolean;
    theme: "light" | "dark";
    setThemeHandler: (value: "light" | "dark") => void;
    setLoggedHandler: (value: boolean) => void;
}

export const AppContext = createContext({} as AppContextTypes);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
