import { useMemo, useState } from 'react';
import { FiltersContext } from './filters-context';

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
	const [textFilter, setTextFilter] = useState('');
	const [bodyPartFilter, setBodyPartFilter] = useState('');
	const [storedPathname, setStoredPathname] = useState('');

	const setTextFilterState = (value: string) => setTextFilter(value);

	const setBodyPartFilterState = (value: string) => setBodyPartFilter(value);

	const value = useMemo(
		() => ({
			textFilter,
			bodyPartFilter,
			setTextFilterState,
			setBodyPartFilterState,
			storedPathname,
			setStoredPathname,
		}),
		[textFilter, bodyPartFilter, storedPathname],
	);

	return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};
