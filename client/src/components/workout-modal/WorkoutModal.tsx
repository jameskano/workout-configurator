import { createWorkout, updateWorkout } from '../../services/workouts';
import { WorkoutModalTypes } from './WorkoutModal.types';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material';
import './WorkoutModal.scss';
import { ExerciseType } from '../../utils/types/exercise.types';
import { getAllExercisesFn } from '../../pages/exercises/functions/services';
import { useWorkoutContext } from '../../store/context/workout-context/workout-context';
import { useCircularLoaderContext } from '../../store/context/circular-loader-context/circular-loader-context';
import useToast from '../../utils/hooks/toast-hook/use-toast';
import { toastConstants } from '../../utils/constants/toast';
import { useEffect, useState } from 'react';
import { toastMessages } from '../../utils/constants/toast-messages';
import { backdropConstants } from '../../utils/constants/backdrop';
import { createPortal } from 'react-dom';
import BackdropLoader from '../../UI/backdrop-loader/BackdropLoader';
import { miscellaneous } from '../../utils/constants/app-constants';
import useCustomQuery from '../../utils/hooks/custom-query-hook/use-custom-query';
import Switch from '@mui/material/Switch';
import useDebounce from '../../utils/hooks/debounce-hook/use-debounce';

const WorkoutModal = ({
	isEditMode,
	showModal,
	setShowModal,
	refetchWorkouts,
}: WorkoutModalTypes) => {
	const queryClient = useQueryClient();

	const { isLoading, isError, data } = useCustomQuery({
		queryKey: ['exercises'],
		queryFn: getAllExercisesFn,
		enabled: showModal,
	});

	const {
		workoutItem: { title, favourite, exercises, metadata, _id },
		workoutItem,
		setWorkoutItemDisp,
		setWorkoutId,
	} = useWorkoutContext();
	const { setOpenLoader } = useCircularLoaderContext();
	const { openToastHandler } = useToast();

	const [showSelected, setShowSelected] = useState(false);
	const [exerciseFilter, setExerciseFilter] = useState('');

	const debounceExerciseFilter = useDebounce(exerciseFilter, 1000);

	useEffect(() => {
		if (isError) openToastHandler(toastMessages.EXERCISE_GET_ERROR, toastConstants.TYPES.ERROR);
	}, [isError]);

	const closeModalHandler = () => {
		setShowModal(false);
		setWorkoutItemDisp();
	};

	const saveWorkoutHandler = async () => {
		setOpenLoader(true);
		try {
			isEditMode ? await updateWorkout(workoutItem) : await createWorkout(workoutItem);
			queryClient.invalidateQueries({ queryKey: [`card-exercises-${_id}`, 'workouts'] });
			openToastHandler(
				isEditMode
					? toastMessages.WORKOUT_UPDATE_SUCCESS
					: toastMessages.WORKOUT_CREATE_SUCCESS,
				toastConstants.TYPES.SUCCESS,
			);
			_id && setWorkoutId(_id);
			refetchWorkouts();
		} catch (error) {
			openToastHandler(
				isEditMode
					? toastMessages.WORKOUT_UPDATE_ERROR
					: toastMessages.WORKOUT_CREATE_ERROR,
				toastConstants.TYPES.ERROR,
			);
		} finally {
			closeModalHandler();
			setOpenLoader(false);
		}
	};

	const changeFieldHandler = (value: string | boolean, name: string) => {
		const updateExerciseItem = { ...workoutItem, [name]: value };
		setWorkoutItemDisp(updateExerciseItem);
	};

	const changeExerciseSelectionHandler = (value: boolean, exerciseId: string) => {
		let exercisesUpdated: string[] = [];

		if (value) exercisesUpdated = [...workoutItem.exercises, exerciseId];
		else exercisesUpdated = workoutItem.exercises.filter((exercise) => exercise !== exerciseId);

		setWorkoutItemDisp({ ...workoutItem, exercises: exercisesUpdated });
	};

	const changeSelectionHandler = (checked: boolean) => setShowSelected(checked);

	const changeFilterHandler = (value: string) => setExerciseFilter(value);

	const exerciseList = () => {
		let newData: ExerciseType[] = [];
		if (showSelected)
			newData = data.filter(
				(exercise: ExerciseType) => exercise._id && exercises.includes(exercise._id),
			);
		else newData = data;

		if (exerciseFilter)
			newData = newData.filter((exercise) => exercise.title.includes(debounceExerciseFilter));

		if ((!data?.length && !isLoading) || !newData?.length) {
			return <span className='no-data-text'>{miscellaneous.NO_DATA_TEXT}</span>;
		}

		return newData?.map(({ _id, title }: ExerciseType) => {
			return (
				<FormControlLabel
					key={_id}
					control={
						<Checkbox
							checked={exercises.includes(_id!)}
							onChange={(e, value) => changeExerciseSelectionHandler(value, _id!)}
							color='info'
						/>
					}
					label={title}
				/>
			);
		});
	};

	return (
		<form className={`workout-modal ${showModal ? 'workout-modal--open' : ''}`}>
			<div className='workout-modal__header'>
				<div onClick={closeModalHandler}>
					<ArrowBackRounded />
				</div>
				<span className='workout-modal__info'>{isEditMode ? 'Edit ' : 'Add '} workout</span>
			</div>

			<div className='workout-modal__body'>
				<TextField
					label='Workout name'
					type='text'
					variant='outlined'
					className='workout-modal__name workout-modal__input'
					size='small'
					value={title}
					onChange={(e) => changeFieldHandler(e.target.value, 'title')}
					required
				/>
				<FormControlLabel
					className='workout-modal__favourites'
					control={
						<Checkbox
							checked={favourite}
							color='info'
							onChange={(e, value) => changeFieldHandler(value, 'favourite')}
						/>
					}
					label='Favourite'
				/>
				<div className='workout-modal__exercises'>
					<div className='workout-modal__exercises-header'>
						<span>Select workout exercises *</span>

						<div>
							<TextField
								label='Search exercise'
								type='text'
								variant='outlined'
								className='workout-modal__filter workout-modal__input'
								size='small'
								value={exerciseFilter}
								onChange={(e) => changeFilterHandler(e.target.value)}
							/>

							<FormControlLabel
								control={
									<Switch
										value={showSelected}
										onChange={(e, checked) => changeSelectionHandler(checked)}
									/>
								}
								label='Show selected'
							/>
						</div>
					</div>

					<div className='workout-modal__exercises-list'>{exerciseList()}</div>
				</div>
				<TextField
					className='workout-modal__metadata workout-modal__input'
					rows={3}
					multiline
					label='Additional information'
					value={metadata}
					onChange={(e) => changeFieldHandler(e.target.value, 'metadata')}
				/>
			</div>
			<div className='workout-modal__bottom'>
				<Button onClick={saveWorkoutHandler} variant='contained'>
					Save workout
				</Button>
			</div>

			{createPortal(
				<BackdropLoader open={isLoading} position={backdropConstants.POSITION.ABSOLUTE} />,
				document.querySelector('.workout-modal__exercises') !== null
					? document.querySelector('.workout-modal__exercises')!
					: document.querySelector('#modal-root')!,
			)}
		</form>
	);
};

export default WorkoutModal;
