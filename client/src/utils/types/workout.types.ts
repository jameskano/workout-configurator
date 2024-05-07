import { ExerciseType } from "./exercise.types";

export interface WorkoutType {
	title: string;
	_id?: string;
	favourite: boolean;
	exercises: string[];
	metadata?: string;
}
