import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export interface WorkoutModalTypes {
	showModal: boolean;
	setShowModal: (value: boolean) => void;
	isEditMode: boolean;
	refetchWorkouts: (
		options?: RefetchOptions | undefined,
	) => Promise<QueryObserverResult<any, Error>>;
}
