import { memo, useEffect, useRef, useState } from 'react';
import GenericFilters from '../../components/generic-filters/GenericFilters';
import { createPortal } from 'react-dom';
import ExerciseModal from '../../components/exercise-modal/ExerciseModal';
import './ExercisesPage.scss';
import AddButton from '../../UI/add-button/AddButton';
import { useQuery } from '@tanstack/react-query';
import { ExerciseType } from '../../utils/types/exercise.types';
import ExerciseCard from '../../components/exercise-card/ExerciseCard';
import { getAllExercisesFn } from './functions/services';
import { useFiltersContext } from '../../store/context/filters-context/filters-context';
import { getFilteredExercises } from '../../services/exercises';

const ExercisesPage = () => {
	const { textFilter } = useFiltersContext();

	const firstRenderRef = useRef(true);

	const [filteredQueryEnabled, setFilteredQueryEnabled] = useState(false);

	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['exercises'],
		queryFn: getAllExercisesFn,
	});

	const {
		isLoading: isFilteredLoading,
		isError: isFilteredError,
		data: filteredData,
		error: filteredError,
	} = useQuery({
		queryKey: ['exercises', textFilter],
		queryFn: () => getFilteredExercises(textFilter),
		enabled: filteredQueryEnabled,
	});

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}
		const timeout = setTimeout(() => {
			setFilteredQueryEnabled(true);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [textFilter]);

	const [showExerciseModal, setShowExerciseModal] = useState(false);
	const [isEditExerciseMode, setIsEditExerciseMode] = useState(false);

	const newExerciseHandler = () => {
		setShowExerciseModal(true);
		setIsEditExerciseMode(false);
	};

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
						/>
					);
				})}
			</div>

			{createPortal(
				<ExerciseModal
					showModal={showExerciseModal}
					setShowModal={setShowExerciseModal}
					isEditMode={isEditExerciseMode}
				/>,
				document.querySelector('#modal-root')!,
			)}
		</section>
	);
};

export default memo(ExercisesPage);
