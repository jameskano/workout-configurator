import { useMemo, useState } from 'react';
import { WorkoutType } from 'utils/types/workout.types';
import { WorkoutContext } from './workout-context';

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
	const [workoutItem, setWorkoutItem] = useState<WorkoutType>({
		title: '',
		favourite: false,
		exercises: [],
		metadata: '',
		_id: undefined,
	});
	const [refetchWorkouts, setRefetchWorkouts] = useState(false);
	const [workoutId, setWorkoutId] = useState('');

	const setWorkoutItemDisp = (value?: WorkoutType) => {
		if (value) setWorkoutItem(value);
		else
			setWorkoutItem({
				title: '',
				favourite: false,
				exercises: [],
				metadata: '',
				_id: undefined,
			});
	};

	const value = useMemo(
		() => ({
			workoutItem,
			setWorkoutItemDisp,
			refetchWorkouts,
			setRefetchWorkouts,
			workoutId,
			setWorkoutId,
		}),
		[workoutItem, refetchWorkouts, workoutId],
	);

	return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
};
