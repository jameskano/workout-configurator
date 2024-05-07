import { Autocomplete, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { bodyParts } from '../../utils/constants/app-constants';
import { useLocation } from 'react-router';
import './GenericFilters.scss';
import { GenericFiltersType } from './GenericFilters.types';

const GenericFilters = ({ setShowFavourites, showFavourites }: GenericFiltersType) => {
	const { pathname } = useLocation();

	return (
		<section className='generic-filters'>
			<span>Search</span>
			<TextField
				label='Name'
				type='text'
				variant='outlined'
				className='generic-filters__input'
				size='small'
			/>
			{pathname === '/exercises' && (
				<Autocomplete
					disablePortal
					// value={}
					options={Object.values(bodyParts)}
					// onChange={}
					// onInputChange={}
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
