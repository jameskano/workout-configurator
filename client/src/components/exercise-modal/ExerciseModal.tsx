import { ExerciseModalTypes } from './ExerciseModal.types';
import { Autocomplete, Button, TextField } from '@mui/material';
import './ExerciseModal.scss';
import { bodyParts } from '../../utils/constants/app-constants';
import { useExerciseContext } from '../../store/context/exercise-context/exercise-context';
import { createExercise, updateExercise } from '../../services/exercises';
import { useQueryClient } from '@tanstack/react-query';
import { bodyPartToLowerCase } from '../../utils/functions/format-body-part-value';
import { ArrowBackRounded } from '@mui/icons-material';
import useToast from '../../utils/hooks/toast-hook/use-toast';
import { toastMessages } from '../../utils/constants/toast-messages';
import { toastConstants } from '../../utils/constants/toast';
import { useCircularLoaderContext } from '../../store/context/circular-loader-context/circular-loader-context';
import { useLoginContext } from '../../store/context/login-context/login-context';
import { Controller, useForm } from 'react-hook-form';

const ExerciseModal = ({
	showModal,
	setShowModal,
	isEditMode,
	refetchExercises,
}: ExerciseModalTypes) => {
	const {
		exerciseItem: { _id, title, sets, reps, RPE, metadata, bodyPart },
		exerciseItem,
		setExerciseItemDisp,
	} = useExerciseContext();
	const queryClient = useQueryClient();

	const { openToastHandler } = useToast();
	const { setOpenLoader } = useCircularLoaderContext();
	const { userId } = useLoginContext();
	const {
		handleSubmit,
		control,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	const closeModalHandler = () => {
		setShowModal(false);
		setExerciseItemDisp();
		reset();
	};

	const changeFieldHandler = (value: string | number | null, name: string) => {
		const formattedValue = bodyPartToLowerCase(value, name);
		const updateExerciseItem = { ...exerciseItem, [name]: formattedValue };
		setExerciseItemDisp(updateExerciseItem);
		setValue(name, value);
	};

	const saveExerciseHandler = async () => {
		setOpenLoader(true);
		try {
			isEditMode
				? await updateExercise(exerciseItem)
				: await createExercise(exerciseItem, userId);
			queryClient.invalidateQueries({
				queryKey: ['exercises'],
			});
			openToastHandler(
				isEditMode
					? toastMessages.EXERCISE_UPDATE_SUCCESS
					: toastMessages.EXERCISE_CREATE_SUCCESS,
				toastConstants.TYPES.SUCCESS,
			);
			refetchExercises();
		} catch (error) {
			openToastHandler(
				isEditMode
					? toastMessages.EXERCISE_UPDATE_ERROR
					: toastMessages.EXERCISE_CREATE_ERROR,
				toastConstants.TYPES.ERROR,
			);
		} finally {
			closeModalHandler();
			setOpenLoader(false);
		}
	};

	return (
		<form
			className={`exercise-modal ${showModal ? 'exercise-modal--open' : ''}`}
			onSubmit={handleSubmit(saveExerciseHandler)}>
			<div className='exercise-modal__header'>
				<div onClick={closeModalHandler}>
					<ArrowBackRounded />
				</div>
				<span className='exercise-modal__info'>
					{isEditMode ? 'Edit ' : 'Add '} exercise
				</span>
			</div>
			<div className='exercise-modal__body'>
				<Controller
					name='title'
					control={control}
					defaultValue={title}
					rules={{
						required: 'Name is required',
						minLength: {
							value: 3,
							message: 'Name must be at least 8 characters long',
						},
						maxLength: {
							value: 20,
							message: 'Name must be no more than 20 characters long',
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label='Exercise title*'
							type='text'
							variant='outlined'
							className='exercise-modal__title exercise-modal__input'
							size='small'
							value={title}
							onChange={(e) => changeFieldHandler(e.target.value, 'title')}
							error={!!errors.title}
							helperText={errors.title ? errors.title.message?.toString() : ''}
						/>
					)}
				/>
				<Controller
					name='bodyPart'
					control={control}
					defaultValue={bodyPart || null}
					rules={{
						required: 'Body part is required',
					}}
					render={({ field }) => (
						<Autocomplete
							{...field}
							disablePortal
							value={bodyPart || null}
							options={Object.values(bodyParts)}
							onChange={(e, value) => changeFieldHandler(value, 'bodyPart')}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Body part*'
									error={!!errors.bodyPart}
									helperText={
										errors.bodyPart ? errors.bodyPart.message?.toString() : ''
									}
								/>
							)}
							className='exercise-modal__option exercise-modal__input'
							size='small'
						/>
					)}
				/>
				<Controller
					name='reps'
					control={control}
					defaultValue={reps}
					rules={{
						required: 'Reps is required',
						min: {
							value: 1,
							message: 'The value must be more than 0',
						},
						max: {
							value: 9999,
							message: 'Max value is 9999',
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label='Reps*'
							type='number'
							variant='outlined'
							className='exercise-modal__option exercise-modal__input'
							size='small'
							value={reps}
							onChange={(e) => changeFieldHandler(e.target.value, 'reps')}
							error={!!errors.reps}
							helperText={errors.reps ? errors.reps.message?.toString() : ''}
						/>
					)}
				/>
				<Controller
					name='sets'
					control={control}
					defaultValue={sets}
					rules={{
						required: 'Sets is required',
						min: {
							value: 1,
							message: 'The value must be more than 0',
						},
						max: {
							value: 100,
							message: 'Max value is 100',
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label='Sets*'
							type='number'
							variant='outlined'
							className='exercise-modal__option exercise-modal__input'
							size='small'
							value={sets}
							onChange={(e) => changeFieldHandler(e.target.value, 'sets')}
							error={!!errors.sets}
							helperText={errors.sets ? errors.sets.message?.toString() : ''}
						/>
					)}
				/>
				<Controller
					name='RPE'
					control={control}
					defaultValue={RPE}
					rules={{
						required: 'RPE is required',
						min: {
							value: 1,
							message: 'The value must be more than 0',
						},
						max: {
							value: 10,
							message: 'Max value is 10',
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label='RPE*'
							type='number'
							variant='outlined'
							className='exercise-modal__option exercise-modal__input'
							size='small'
							fullWidth={false}
							value={RPE}
							onChange={(e) => changeFieldHandler(e.target.value, 'RPE')}
							error={!!errors.RPE}
							helperText={errors.RPE ? errors.RPE.message?.toString() : ''}
						/>
					)}
				/>
				<TextField
					className='exercise-modal__metadata exercise-modal__input'
					rows={3}
					multiline
					label='Additional information'
					value={metadata}
					onChange={(e) => changeFieldHandler(e.target.value, 'metadata')}
				/>
			</div>
			<div className='exercise-modal__bottom'>
				<Button type='submit' variant='contained' onClick={() => console.log(exerciseItem)}>
					Save exercise
				</Button>
			</div>
		</form>
	);
};

export default ExerciseModal;
