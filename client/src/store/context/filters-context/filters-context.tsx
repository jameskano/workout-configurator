import { createContext, useContext } from 'react';

interface FiltersContextType {
	textFilter: string;
	bodyPartFilter: string;
	setTextFilterState: (value: string) => void;
	setBodyPartFilterState: (value: string) => void;
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
