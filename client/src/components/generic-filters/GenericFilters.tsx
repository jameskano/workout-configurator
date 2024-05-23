import { Autocomplete, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { bodyParts } from '../../utils/constants/app-constants';
import { useLocation } from 'react-router';
import './GenericFilters.scss';
import { GenericFiltersType } from './GenericFilters.types';
import { useFiltersContext } from '../../store/context/filters-context/filters-context';
import { useEffect } from 'react';

const GenericFilters = ({ setShowFavourites, showFavourites }: GenericFiltersType) => {
	const { pathname } = useLocation();
	const {
		textFilter,
		bodyPartFilter,
		setTextFilterState,
		setBodyPartFilterState,
		storedPathname,
		setStoredPathname,
	} = useFiltersContext();

	useEffect(() => {
		if (['/exercises', '/workouts'].includes(pathname)) {
			if (storedPathname === '') setStoredPathname(pathname);
			else if (storedPathname !== pathname) {
				setStoredPathname(pathname);
				setTextFilterState('');
				setBodyPartFilterState('');
			}
		}
	}, []);

	const changeTextFilterHandler = (value: string) => setTextFilterState(value);

	const changeBodyPartHandler = (value: string | null) =>
		value !== null ? setBodyPartFilterState(value) : setBodyPartFilterState('');

	return (
		<section className='generic-filters'>
			<span>Search</span>
			<TextField
				label='Name'
				type='text'
				variant='outlined'
				className='generic-filters__input'
				size='small'
				value={textFilter}
				onChange={(e) => changeTextFilterHandler(e.target.value)}
			/>
			{pathname === '/exercises' && (
				<Autocomplete
					disablePortal
					value={bodyPartFilter || null}
					options={Object.values(bodyParts)}
					onChange={(e, value) => changeBodyPartHandler(value)}
					renderInput={(params) => <TextField {...params} label='Body part' />}
					className='generic-filters__selector'
					size='small'
				/>
			)}
			{pathname === '/workouts' && (
				<FormControlLabel
					className='generic-filters__checkbox'
					control={
						<Checkbox
							checked={showFavourites}
							color='info'
							onChange={(e, value) => setShowFavourites && setShowFavourites(value)}
						/>
					}
					label='Show selected workouts'
				/>
			)}
		</section>
	);
};

export default GenericFilters;
