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

const WorkoutTable = ({ exercises, workoutId, expandedCard }: WorkoutTableType) => {
	const { openPopoverHandler } = usePopoverContext();
	const { getExercisesByIdsFn } = useGetExerciseTable();
	const { workoutId: workoutIdToRefertch, setWorkoutId } = useWorkoutContext();

	const { isLoading, isError, data, refetch } = useCustomQuery({
		queryKey: [`card-exercises-${workoutId}`],
		queryFn: () => getExercisesByIdsFn(exercises),
		enabled: expandedCard,
	});

	useEffect(() => {
		if (workoutIdToRefertch === workoutId) {
			refetch();
			setWorkoutId('');
		}
	}, [workoutIdToRefertch]);

	const showFullTextHandler = (e: React.MouseEvent, text: string | number) => {
		openPopoverHandler(e.target as Element, text.toString());
	};

	return (
		<div className='workout-table'>
			<TableContainer component={Paper}>
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell align='left'></TableCell>
							<TableCell align='center'>Reps</TableCell>
							<TableCell align='center'>Sets</TableCell>
							<TableCell align='center'>RPE</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map((exercise: ExerciseType) => {
							const { title, reps, sets, RPE, _id } = exercise;
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
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default WorkoutTable;
