import { createContext, useContext } from 'react';

interface FiltersContextType {
	exerciseTitle: string;
	workoutTitle: string;
	bodyPartFilter: string;
	setExerciseTitle: (value: string) => void;
	setWorkoutTitle: (value: string) => void;
	setBodyPartFilter: (value: string) => void;
	storedPathname: string;
	setStoredPathname: (value: string) => void;
}

export const FiltersContext = createContext({} as FiltersContextType);

export const useFiltersContext = () => {
	const context = useContext(FiltersContext);
	if (context === null) {
		throw new Error('useFiltersContext must be used within an FiltersProvider');
	}
	return context;
};
