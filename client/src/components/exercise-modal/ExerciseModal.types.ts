import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export interface ExerciseModalTypes {
	showModal: boolean;
	setShowModal: (value: boolean) => void;
	isEditMode: boolean;
	refetchExercises: (
		options?: RefetchOptions | undefined,
	) => Promise<QueryObserverResult<any, Error>>;
}
