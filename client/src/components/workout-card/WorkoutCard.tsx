import { Tooltip } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { WorkoutCardType } from './WorkoutCard.types';
import { useWorkoutContext } from '../../store/context/workout-context/workout-context';
import { deleteWorkouts, updateWorkout } from '../../services/workouts';
import { useQueryClient } from '@tanstack/react-query';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { memo } from 'react';

const WorkoutCard = ({
	title,
	favourite,
	metadata,
	_id,
	exercises,
	setIsEditWorkoutMode,
	setShowWorkoutModal,
}: WorkoutCardType) => {
	const queryClient = useQueryClient();
	const { setWorkoutItemDisp } = useWorkoutContext();

	const editWorkoutHandler = () => {
		setIsEditWorkoutMode(true);
		setShowWorkoutModal(true);
		setWorkoutItemDisp({ title, favourite, metadata, _id, exercises });
	};

	const deleteWorkoutHandler = async () => {
		try {
			_id && (await deleteWorkouts([_id]));
			queryClient.invalidateQueries({ queryKey: ['workouts'] });
		} catch (error) {
			// Error handling
		} finally {
			// Stop loader and whatever is needed
		}
	};

	const favWorkoutHandler = async () => {
		try {
			await updateWorkout({ title, metadata, _id, exercises, favourite: !favourite });
			queryClient.invalidateQueries({ queryKey: ['workouts'] });
		} catch (error) {
			// Error handling
		} finally {
			// Stop loader and whatever is needed
		}
	};

	return (
		<div className='workout-card'>
			<div className='workout-card__title'>
				<h2>{title}</h2>
				<div className='workout-card__actions'>
					<div onClick={favWorkoutHandler}>
						<Tooltip title={favourite ? 'Add to favourites' : 'Remove from favourites'}>
							{favourite ? <StarIcon /> : <StarOutlineIcon />}
						</Tooltip>
					</div>
					<div onClick={editWorkoutHandler}>
						<Tooltip title='Edit workout'>
							<EditRoundedIcon />
						</Tooltip>
					</div>
					<div onClick={deleteWorkoutHandler}>
						<Tooltip title='Delete workout'>
							<DeleteRoundedIcon />
						</Tooltip>
					</div>
				</div>
			</div>

			<div className='workout-card__content'></div>

			<div className='workout-card__metadata'>
				<h3>Notes</h3>
				<span>{metadata}</span>
			</div>
		</div>
	);
};

export default memo(WorkoutCard);
