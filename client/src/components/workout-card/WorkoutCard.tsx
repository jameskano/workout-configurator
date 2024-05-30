import { Tooltip } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { WorkoutCardType } from './WorkoutCard.types';
import { useWorkoutContext } from '../../store/context/workout-context/workout-context';
import { updateWorkout } from '../../services/workouts';
import { useQueryClient } from '@tanstack/react-query';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { memo } from 'react';
import './WorkoutCard.scss';
import { useModalContext } from '../../store/context/modal-context/modal-context';
import useToast from '../../utils/hooks/toast-hook/use-toast';
import { toastConstants } from '../../utils/constants/toast';
import { toastMessages } from '../../utils/constants/toast-messages';
import { useCircularLoaderContext } from '../../store/context/circular-loader-context/circular-loader-context';

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
	const { setShowDeleteModal, setDeleteIds, setTriggerFunctions } = useModalContext();
	const { openToastHandler } = useToast();
	const { setOpenLoader } = useCircularLoaderContext();

	const editWorkoutHandler = () => {
		setIsEditWorkoutMode(true);
		setShowWorkoutModal(true);
		setWorkoutItemDisp({ title, favourite, metadata, _id, exercises });
	};

	const deleteWorkoutHandler = async () => {
		if (!_id) return;
		setShowDeleteModal(true);
		setDeleteIds([_id]);
		setTriggerFunctions({
			onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workouts'] }),
		});
	};

	const favWorkoutHandler = async () => {
		setOpenLoader(true);
		try {
			await updateWorkout({ title, metadata, _id, exercises, favourite: !favourite });
			queryClient.invalidateQueries({ queryKey: ['workouts'] });
		} catch (error) {
			openToastHandler(toastMessages.WORKOUT_UPDATE_ERROR, toastConstants.TYPES.ERROR);
		} finally {
			setOpenLoader(false);
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

			{/* <div className='workout-card__extended'>
				<div className='workout-card__content'></div>

				<div className='workout-card__metadata'>
					<h3>Notes</h3>
					<span>{metadata}</span>
				</div>
			</div> */}
		</div>
	);
};

export default memo(WorkoutCard);
