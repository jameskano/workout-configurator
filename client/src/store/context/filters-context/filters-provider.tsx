import { useMemo, useState } from 'react';
import { FiltersContext } from './filters-context';

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
	const [exerciseTitle, setExerciseTitle] = useState('');
	const [workoutTitle, setWorkoutTitle] = useState('');
	const [bodyPartFilter, setBodyPartFilter] = useState('');
	const [storedPathname, setStoredPathname] = useState('');

	const value = useMemo(
		() => ({
			exerciseTitle,
			workoutTitle,
			bodyPartFilter,
			setBodyPartFilter,
			setExerciseTitle,
			setWorkoutTitle,
			storedPathname,
			setStoredPathname,
		}),
		[exerciseTitle, workoutTitle, bodyPartFilter, storedPathname],
	);

	return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};
