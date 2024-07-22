import { memo, useCallback, useEffect, useRef, useState } from 'react';
import GenericFilters from '../../components/generic-filters/GenericFilters';
import AddButton from '../../UI/add-button/AddButton';
import { createPortal } from 'react-dom';
import WorkoutModal from '../../components/workout-modal/WorkoutModal';
import WorkoutCard from '../../components/workout-card/WorkoutCard';
import { WorkoutType } from '../../utils/types/workout.types';
import './WorkoutPage.scss';
import { useFiltersContext } from '../../store/context/filters-context/filters-context';
import useToast from '../../utils/hooks/toast-hook/use-toast';
import { toastConstants } from '../../utils/constants/toast';
import BackdropLoader from '../../UI/backdrop-loader/BackdropLoader';
import { debounce } from '../../utils/functions/debounce';
import { backdropConstants } from '../../utils/constants/backdrop';
import { toastMessages } from '../../utils/constants/toast-messages';
import { miscellaneous } from '../../utils/constants/app-constants';
import useCustomQuery from '../../utils/hooks/custom-query-hook/use-custom-query';
import { useWorkoutContext } from '../../store/context/workout-context/workout-context';
import { useWorkoutServices } from './hooks/use-workout-services';

const WorkoutsPage = () => {
	const { workoutTitle } = useFiltersContext();
	const { refetchWorkouts, setRefetchWorkouts } = useWorkoutContext();
	const { openToastHandler } = useToast();
	const { getFilteredWorkoutsFn } = useWorkoutServices();

	const firstRenderRef = useRef(true);

	const [showWorkoutModal, setShowWorkoutModal] = useState(false);
	const [isEditWorkoutMode, setIsEditWorkoutMode] = useState(false);
	const [showFavourites, setShowFavourites] = useState(true);
	const [filteredWorkouts, setFilteredWorkouts] = useState<WorkoutType[]>([]);
	const [debouncedFilter, setDebouncedFilter] = useState('');

	const { isLoading, isError, data, refetch } = useCustomQuery({
		queryKey: ['workouts', debouncedFilter],
		queryFn: () => getFilteredWorkoutsFn(debouncedFilter),
		enabled: !!debouncedFilter || firstRenderRef.current,
	});

	useEffect(() => {
		if (!firstRenderRef.current) updateDebouncedFilter(workoutTitle);
	}, [workoutTitle]);

	useEffect(() => {
		if (!firstRenderRef.current && isError)
			openToastHandler(toastMessages.WORKOUT_GET_ERROR, toastConstants.TYPES.ERROR);
	}, [isError]);

	useEffect(() => {
		if (data) setFilteredWorkouts(updatedFilteredWorkouts(data));
	}, [data, showFavourites]);

	useEffect(() => {
		if (showWorkoutModal) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';
	}, [showWorkoutModal]);

	useEffect(() => {
		if (refetchWorkouts) {
			refetch();
			setRefetchWorkouts(false);
		}
	}, [refetchWorkouts]);

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

	useEffect(() => {
		if (firstRenderRef.current) firstRenderRef.current = false;
	}, []);

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
						refetchWorkouts={refetch}
					/>
				))}

				{!(filteredWorkouts && filteredWorkouts.length) && !isLoading && (
					<span className='no-data-text'>{miscellaneous.NO_DATA_TEXT}</span>
				)}
			</div>

			{createPortal(
				<BackdropLoader open={isLoading} position={backdropConstants.POSITION.ABSOLUTE} />,
				document.querySelector('.workouts__list') !== null
					? document.querySelector('.workouts__list')!
					: document.querySelector('#modal-root')!,
			)}

			{createPortal(
				<WorkoutModal
					showModal={showWorkoutModal}
					setShowModal={setShowWorkoutModal}
					isEditMode={isEditWorkoutMode}
					refetchWorkouts={refetch}
				/>,
				document.querySelector('#modal-root')!,
			)}
		</section>
	);
};

export default memo(WorkoutsPage);
