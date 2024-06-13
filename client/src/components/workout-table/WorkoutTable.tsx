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
import { getExercisesByIds } from '../../services/exercises';
import useCustomQuery from '../../utils/hooks/custom-query-hook/use-custom-query';
import { ExerciseType } from '../../utils/types/exercise.types';
import './WorkoutTable.scss';

const WorkoutTable = ({ exercises, workoutId }: WorkoutTableType) => {
	const { isLoading, isError, data } = useCustomQuery({
		queryKey: [`card-exercises-${workoutId}`],
		queryFn: () => getExercisesByIds(exercises),
		// enabled: showModal,
	});

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
						{data?.data.map((exercise: ExerciseType) => {
							const { title, reps, sets, RPE, _id } = exercise;
							return (
								<TableRow key={_id}>
									<TableCell align='left'>{title}</TableCell>
									<TableCell align='center'>{reps}</TableCell>
									<TableCell align='center'>{sets}</TableCell>
									<TableCell align='center'>{RPE}</TableCell>
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
