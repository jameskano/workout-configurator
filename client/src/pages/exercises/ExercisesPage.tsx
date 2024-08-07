import { memo, useEffect, useRef, useState } from 'react';
import GenericFilters from '../../components/generic-filters/GenericFilters';
import { createPortal } from 'react-dom';
import ExerciseModal from '../../components/exercise-modal/ExerciseModal';
import './ExercisesPage.scss';
import AddButton from '../../UI/add-button/AddButton';
import { ExerciseType } from '../../utils/types/exercise.types';
import ExerciseCard from '../../components/exercise-card/ExerciseCard';
import { miscellaneous } from '../../utils/constants/app-constants';
import { useFiltersContext } from '../../store/context/filters-context/filters-context';
import useToast from '../../utils/hooks/toast-hook/use-toast';
import { toastMessages } from '../../utils/constants/toast-messages';
import { toastConstants } from '../../utils/constants/toast';
import BackdropLoader from '../../UI/backdrop-loader/BackdropLoader';
import { backdropConstants } from '../../utils/constants/backdrop';
import useCustomQuery from '../../utils/hooks/custom-query-hook/use-custom-query';
import { useExerciseServices } from './hooks/use-exercise-services';

const ExercisesPage = () => {
	const { exerciseTitle, bodyPartFilter } = useFiltersContext();
	const { openToastHandler } = useToast();
	const { getFilteredExercisesFn } = useExerciseServices();

	const firstRenderRef = useRef(true);

	const [exerciseFilter, setExerciseFilter] = useState('');
	const [showExerciseModal, setShowExerciseModal] = useState(false);
	const [isEditExerciseMode, setIsEditExerciseMode] = useState(false);

	const { isLoading, isError, data, refetch } = useCustomQuery({
		queryKey: ['exercises', exerciseFilter],
		queryFn: () => getFilteredExercisesFn(exerciseTitle, bodyPartFilter.toLocaleLowerCase()),
		enabled: !!exerciseFilter || firstRenderRef.current,
	});

	useEffect(() => {
		if (firstRenderRef.current) return;

		const timeout = setTimeout(() => {
			setExerciseFilter(exerciseTitle + bodyPartFilter);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [exerciseTitle, bodyPartFilter]);

	useEffect(() => {
		if (isError) openToastHandler(toastMessages.EXERCISE_GET_ERROR, toastConstants.TYPES.ERROR);
	}, [isError]);

	useEffect(() => {
		if (showExerciseModal) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';
	}, [showExerciseModal]);

	const newExerciseHandler = () => {
		setShowExerciseModal(true);
		setIsEditExerciseMode(false);
	};

	useEffect(() => {
		if (firstRenderRef.current) firstRenderRef.current = false;
	}, []);

	return (
		<section className='exercises'>
			<div className='exercises__new'>
				<AddButton text='New exercise' onClickHandler={newExerciseHandler} />
			</div>

			<GenericFilters />

			<div className='exercises__list'>
				{data?.map((exercise: ExerciseType) => {
					return (
						<ExerciseCard
							key={exercise._id}
							{...exercise}
							setShowExerciseModal={setShowExerciseModal}
							setIsEditExerciseMode={setIsEditExerciseMode}
							refetchExercises={refetch}
						/>
					);
				})}

				{!(data && data.length) && !isLoading && (
					<span className='no-data-text'>{miscellaneous.NO_DATA_TEXT}</span>
				)}
			</div>

			{createPortal(
				<BackdropLoader open={isLoading} position={backdropConstants.POSITION.ABSOLUTE} />,
				document.querySelector('.exercises__list') !== null
					? document.querySelector('.exercises__list')!
					: document.querySelector('#modal-root')!,
			)}

			{createPortal(
				<ExerciseModal
					showModal={showExerciseModal}
					setShowModal={setShowExerciseModal}
					isEditMode={isEditExerciseMode}
					refetchExercises={refetch}
				/>,
				document.querySelector('#modal-root')!,
			)}
		</section>
	);
};

export default memo(ExercisesPage);
