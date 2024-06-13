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
		exerciseTitle,
		workoutTitle,
		bodyPartFilter,
		storedPathname,
		setStoredPathname,
		setExerciseTitle,
		setWorkoutTitle,
		setBodyPartFilter,
	} = useFiltersContext();

	useEffect(() => {
		switch (storedPathname) {
			case '/exercises':
				setExerciseTitle('');
				break;
			case '/workouts':
				setWorkoutTitle('');
				break;
		}
		setStoredPathname(pathname);
	}, [pathname]);

	const changeTextFilterHandler = (value: string) =>
		pathname === '/exercises' ? setExerciseTitle(value) : setWorkoutTitle(value);

	const changeBodyPartHandler = (value: string | null) =>
		value !== null ? setBodyPartFilter(value) : setBodyPartFilter('');

	return (
		<section className='generic-filters'>
			<span>Search</span>
			<TextField
				label='Name'
				type='text'
				variant='outlined'
				className='generic-filters__input'
				size='small'
				value={pathname === '/exercises' ? exerciseTitle : workoutTitle}
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
