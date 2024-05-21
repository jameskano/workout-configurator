import { useCallback, useEffect, useRef, useState } from 'react';
import GenericFilters from '../../components/generic-filters/GenericFilters';
import AddButton from '../../UI/add-button/AddButton';
import { createPortal } from 'react-dom';
import WorkoutModal from '../../components/workout-modal/WorkoutModal';
import { useQuery } from '@tanstack/react-query';
import WorkoutCard from '../../components/workout-card/WorkoutCard';
import { WorkoutType } from '../../utils/types/workout.types';
import { getAllWorkoutsFn } from './functions/services';
import './WorkoutPage.scss';
import { useFiltersContext } from '../../store/context/filters-context/filters-context';
import { getFilteredWorkouts } from '../../services/workouts';
import useToast from '../../utils/hooks/toast-hook/use-toast';
import { toastConstants } from '../../utils/constants/toast';
import BackdropLoader from '../../UI/backdrop-loader/BackdropLoader';
import { debounce } from '../../utils/functions/debounce';
import { backdropConstants } from '../../utils/constants/backdrop';
import { toastMessages } from '../../utils/toast-messages';

const WorkoutsPage = () => {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['workouts'],
		queryFn: getAllWorkoutsFn,
		refetchOnWindowFocus: false,
	});
	const { textFilter } = useFiltersContext();
	const { openToastHandler } = useToast();

	const firstRenderRef = useRef(true);

	const [showWorkoutModal, setShowWorkoutModal] = useState(false);
	const [isEditWorkoutMode, setIsEditWorkoutMode] = useState(false);
	const [showFavourites, setShowFavourites] = useState(true);
	const [filteredWorkouts, setFilteredWorkouts] = useState<WorkoutType[]>([]);
	const [debouncedFilter, setDebouncedFilter] = useState<string | null>(null);

	// Old filtered workouts request
	// useEffect(() => {
	// 	if (firstRenderRef.current) {
	// 		firstRenderRef.current = false;
	// 		return;
	// 	}
	// 	const timeout = setTimeout(async () => {
	// 		setShowLoader(true);
	// 		try {
	// 			const res = await getFilteredWorkouts(textFilter); // use react query
	// 			setFilteredWorkouts(updatedFilteredWorkouts(res.data));
	// 		} catch (error) {
	// 			openToastHandler('Error. Workouts could not be loaded', toastConstants.TYPES.ERROR);
	// 		} finally {
	// 			setShowLoader(false);
	// 		}
	// 	}, 1000);

	// 	return () => clearTimeout(timeout);
	// }, [textFilter]);

	// New filtered workouts request
	useEffect(() => {
		if (!firstRenderRef.current) updateDebouncedFilter(textFilter);
	}, [textFilter]);

	const {
		data: filteredData,
		isLoading: isFiltering,
		error: filteringError,
	} = useQuery({
		queryKey: ['filteredWorkouts', debouncedFilter],
		queryFn: () => getFilteredWorkouts(debouncedFilter!),
		enabled: debouncedFilter !== undefined && debouncedFilter !== null,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}

		if (filteredData) {
			setFilteredWorkouts(updatedFilteredWorkouts(filteredData.data));
		}
	}, [filteredData]);
	// End of new filtered workouts request

	useEffect(() => {
		if (!firstRenderRef.current && (error || filteringError))
			openToastHandler(toastMessages.WORKOUT_GET_ERROR, toastConstants.TYPES.ERROR);
	}, [error, filteringError]);

	useEffect(() => {
		setFilteredWorkouts(updatedFilteredWorkouts(data));
	}, [data, showFavourites]);

	const updateDebouncedFilter = useCallback(
		debounce((filter: string) => {
			setDebouncedFilter(filter);
		}, 1000),
		[],
	);

	const updatedFilteredWorkouts = (workoutData: WorkoutType[]): WorkoutType[] =>
		showFavourites
			? workoutData?.filter((workout: WorkoutType) => workout.favourite)
			: workoutData;

	const newWorkoutHandler = () => {
		setShowWorkoutModal(true);
		setIsEditWorkoutMode(false);
	};

	return (
		<section className='workouts'>
			<div className='workouts__new'>
				<AddButton text='New workout' onClickHandler={newWorkoutHandler} />
			</div>

			<GenericFilters setShowFavourites={setShowFavourites} showFavourites={showFavourites} />

			<div className='workouts__list'>
				{filteredWorkouts?.map((workout: WorkoutType) => (
					<WorkoutCard
						{...workout}
						key={workout._id}
						setShowWorkoutModal={setShowWorkoutModal}
						setIsEditWorkoutMode={setIsEditWorkoutMode}
					/>
				))}

				{!data && !isLoading && <span className='workouts__feedback'>No content</span>}
			</div>

			{createPortal(
				<BackdropLoader
					open={isLoading || isFiltering}
					position={backdropConstants.POSITION.ABSOLUTE}
				/>,
				document.querySelector('.workouts__list') !== null
					? document.querySelector('.workouts__list')!
					: document.querySelector('#modal-root')!,
			)}

			{createPortal(
				<WorkoutModal
					showModal={showWorkoutModal}
					setShowModal={setShowWorkoutModal}
					isEditMode={isEditWorkoutMode}
				/>,
				document.querySelector('#modal-root')!,
			)}
		</section>
	);
};

export default WorkoutsPage;
