import { createContext, useContext } from "react";
import { ExerciseType } from "utils/types/exercise.types";

interface ExerciseContextTypes {
    exerciseList: ExerciseType[];
    exerciseItem: ExerciseType;
    setExerciseItemDisp: (value: ExerciseType) => void;
    setExerciseListDisp: (value: ExerciseType[]) => void;
}

export const ExerciseContext = createContext({} as ExerciseContextTypes);

export const useExerciseContext = () => {
    const context = useContext(ExerciseContext);
    if (context === null) {
        throw new Error(
            "useExerciseContext must be used within an ExerciseProvider"
        );
    }
    return context;
};
