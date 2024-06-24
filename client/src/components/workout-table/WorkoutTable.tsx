import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { WorkoutTableType } from './WorkoutTable.types';
import useCustomQuery from '../../utils/hooks/custom-query-hook/use-custom-query';
import { ExerciseType } from '../../utils/types/exercise.types';
import './WorkoutTable.scss';
import { usePopoverContext } from '../../store/context/popover-context/popover-context';
import useGetExerciseTable from './hooks/use-get-exercise-table';
import { useEffect } from 'react';
import { useWorkoutContext } from '../../store/context/workout-context/workout-context';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import { createPortal } from 'react-dom';
import BackdropLoader from '../../UI/backdrop-loader/BackdropLoader';
import { backdropConstants } from '../../utils/constants/backdrop';
import { toastMessages } from '../../utils/constants/toast-messages';
import { toastConstants } from '../../utils/constants/toast';
import useToast from '../../utils/hooks/toast-hook/use-toast';
import { miscellaneous } from '../../utils/constants/app-constants';

const WorkoutTable = ({ exercises, workoutId, expandedCard }: WorkoutTableType) => {
	const { openPopoverHandler } = usePopoverContext();
	const { getExercisesByIdsFn } = useGetExerciseTable();
	const { openToastHandler } = useToast();
	const { workoutId: workoutIdToRefetch, setWorkoutId } = useWorkoutContext();

	const { isLoading, isError, data, refetch } = useCustomQuery({
		queryKey: [`card-exercises-${workoutId}`],
		queryFn: () => getExercisesByIdsFn(exercises),
		enabled: expandedCard,
	});

	useEffect(() => {
		if (workoutIdToRefetch === workoutId) {
			refetch();
			console.log('yesso');
			setWorkoutId('');
		}
	}, [exercises]);

	useEffect(() => {
		if (isError)
			openToastHandler(toastMessages.GENERIC_REQUEST_ERROR, toastConstants.TYPES.ERROR);
	}, [isError]);

	const showFullTextHandler = (e: React.MouseEvent, text: string | number) =>
		openPopoverHandler(e.target as Element, text.toString());

	const showMetadataHandler = (e: React.MouseEvent, metadata: string) =>
		openPopoverHandler(e.target as Element, metadata);

	return (
		<div className='workout-table' id={`workout-table-${workoutId}`}>
			<TableContainer component={Paper}>
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell align='left'></TableCell>
							<TableCell align='center'>Reps</TableCell>
							<TableCell align='center'>Sets</TableCell>
							<TableCell align='center'>RPE</TableCell>
							<TableCell align='center'></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map((exercise: ExerciseType) => {
							const { title, reps, sets, RPE, _id, metadata } = exercise;
							return (
								<TableRow key={_id}>
									<TableCell
										onClick={(e) => showFullTextHandler(e, title)}
										align='left'>
										{title}
									</TableCell>
									<TableCell
										onClick={(e) => showFullTextHandler(e, reps)}
										align='center'>
										{reps}
									</TableCell>
									<TableCell
										onClick={(e) => showFullTextHandler(e, sets)}
										align='center'>
										{sets}
									</TableCell>
									<TableCell
										onClick={(e) => showFullTextHandler(e, RPE)}
										align='center'>
										{RPE}
									</TableCell>
									<TableCell
										onClick={(e) => showMetadataHandler(e, metadata)}
										align='right'>
										{metadata && <CommentRoundedIcon fontSize='inherit' />}
									</TableCell>
								</TableRow>
							);
						})}

						{!data?.length && !isLoading && (
							<span className='no-data-text'>{miscellaneous.NO_DATA_TEXT}</span>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{createPortal(
				<BackdropLoader open={isLoading} position={backdropConstants.POSITION.ABSOLUTE} />,
				document.querySelector(`#workout-table-${workoutId} .MuiTable-root`) !== null
					? document.querySelector(`#workout-table-${workoutId} .MuiTable-root`)!
					: document.querySelector('#modal-root')!,
			)}
		</div>
	);
};

export default WorkoutTable;
