import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { WorkoutType } from 'utils/types/workout.types';

export interface WorkoutCardType extends WorkoutType {
	setShowWorkoutModal: (value: boolean) => void;
	setIsEditWorkoutMode: (value: boolean) => void;
	refetchWorkouts: (
		options?: RefetchOptions | undefined,
	) => Promise<QueryObserverResult<any, Error>>;
}
