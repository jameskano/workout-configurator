import { Accordion, AccordionDetails, AccordionSummary, Tooltip } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { WorkoutCardType } from './WorkoutCard.types';
import { useWorkoutContext } from '../../store/context/workout-context/workout-context';
import { updateWorkout } from '../../services/workouts';
import { useQueryClient } from '@tanstack/react-query';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { memo, useState } from 'react';
import './WorkoutCard.scss';
import { useModalContext } from '../../store/context/modal-context/modal-context';
import useToast from '../../utils/hooks/toast-hook/use-toast';
import { toastConstants } from '../../utils/constants/toast';
import { toastMessages } from '../../utils/constants/toast-messages';
import { useCircularLoaderContext } from '../../store/context/circular-loader-context/circular-loader-context';
import { usePopoverContext } from '../../store/context/popover-context/popover-context';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import WorkoutTable from '../../components/workout-table/WorkoutTable';

const WorkoutCard = ({
	title,
	favourite,
	metadata,
	_id,
	exercises,
	setIsEditWorkoutMode,
	setShowWorkoutModal,
	refetchWorkouts,
}: WorkoutCardType) => {
	const queryClient = useQueryClient();
	const { setWorkoutItemDisp } = useWorkoutContext();
	const { setShowDeleteModal, setDeleteIds, setTriggerFunctions } = useModalContext();
	const { openToastHandler } = useToast();
	const { setOpenLoader } = useCircularLoaderContext();
	const { openPopoverHandler } = usePopoverContext();

	const editWorkoutHandler = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsEditWorkoutMode(true);
		setShowWorkoutModal(true);
		setWorkoutItemDisp({ title, favourite, metadata, _id, exercises });
	};

	const successWorkoutHandler = () => {
		queryClient.invalidateQueries({ queryKey: ['workouts'] });
		refetchWorkouts();
	};

	const deleteWorkoutHandler = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!_id) return;
		setShowDeleteModal(true);
		setDeleteIds([_id]);
		setTriggerFunctions({
			onSuccess: () => successWorkoutHandler(),
		});
	};

	const favWorkoutHandler = async (e: React.MouseEvent) => {
		e.stopPropagation();
		setOpenLoader(true);
		try {
			await updateWorkout({ title, metadata, _id, exercises, favourite: !favourite });
			successWorkoutHandler();
		} catch (error) {
			openToastHandler(toastMessages.WORKOUT_UPDATE_ERROR, toastConstants.TYPES.ERROR);
		} finally {
			setOpenLoader(false);
		}
	};

	const showMetadataHandler = (e: React.MouseEvent) => {
		e.stopPropagation();
		openPopoverHandler(e.target as Element, metadata);
	};

	return (
		<div className='workout-card'>
			<Accordion>
				<AccordionSummary>
					<div className='workout-card__title'>
						<h2>{title}</h2>
						<div className='workout-card__actions'>
							{metadata && (
								<div onClick={showMetadataHandler} className='workout-card__action'>
									<Tooltip title='Show notes'>
										<CommentRoundedIcon />
									</Tooltip>
								</div>
							)}
							<div onClick={favWorkoutHandler} className='workout-card__action'>
								<Tooltip
									title={
										favourite ? 'Remove to favourites' : 'Add from favourites'
									}>
									{favourite ? <StarIcon /> : <StarOutlineIcon />}
								</Tooltip>
							</div>
							<div onClick={editWorkoutHandler} className='workout-card__action'>
								<Tooltip title='Edit workout'>
									<EditRoundedIcon />
								</Tooltip>
							</div>
							<div onClick={deleteWorkoutHandler} className='workout-card__action'>
								<Tooltip title='Delete workout'>
									<DeleteRoundedIcon />
								</Tooltip>
							</div>
						</div>
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<div className='workout-card__table'>
						<WorkoutTable exercises={exercises} workoutId={_id || ''} />
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};

export default memo(WorkoutCard);
