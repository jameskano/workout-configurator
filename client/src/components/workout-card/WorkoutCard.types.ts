import { WorkoutType } from "utils/types/workout.types";

export interface WorkoutCardType extends WorkoutType {
	setShowWorkoutModal: (value: boolean) => void;
	setIsEditWorkoutMode: (value: boolean) => void;
}
