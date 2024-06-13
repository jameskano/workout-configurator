import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { ExerciseType } from 'utils/types/exercise.types';

export interface ExerciseCardType extends ExerciseType {
	setShowExerciseModal: (value: boolean) => void;
	setIsEditExerciseMode: (value: boolean) => void;
	refetchExercises: (
		options?: RefetchOptions | undefined,
	) => Promise<QueryObserverResult<any, Error>>;
}
