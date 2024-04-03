import { createContext, useContext } from "react";
import { WorkoutType } from "utils/types/workout.types";

interface WorkoutContextTypes {
	workoutItem: WorkoutType;
	setWorkoutItemDisp: (value?: WorkoutType) => void;
}

export const WorkoutContext = createContext({} as WorkoutContextTypes);

export const useWorkoutContext = () => {
	const context = useContext(WorkoutContext);
	if (context === null) {
		throw new Error("useWorkoutContext must be used within an WorkoutProvider");
	}
	return context;
};
