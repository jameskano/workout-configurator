import { createContext, useContext } from "react";
import { ExerciseType } from "utils/types/exercise.types";

interface ExerciseContextTypes {
    exerciseList: ExerciseType[];
    exerciseItem: ExerciseType;
}

export const AppContext = createContext({} as ExerciseContextTypes);

export const useExerciseContext = () => {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error(
            "useExerciseContext must be used within an ExerciseProvider"
        );
    }
    return context;
};
