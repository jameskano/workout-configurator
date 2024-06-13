import './ExerciseCard.scss';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { ExerciseCardType } from './ExerciseCard.types';
import { useExerciseContext } from '../../store/context/exercise-context/exercise-context';
import { useQueryClient } from '@tanstack/react-query';
import { Tooltip } from '@mui/material';
import { useModalContext } from '../../store/context/modal-context/modal-context';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import { usePopoverContext } from '../../store/context/popover-context/popover-context';

const ExerciseCard = ({
	title,
	sets,
	reps,
	RPE,
	metadata,
	bodyPart,
	_id,
	setShowExerciseModal,
	setIsEditExerciseMode,
	refetchExercises,
}: ExerciseCardType) => {
	const { setExerciseItemDisp } = useExerciseContext();
	const { setShowDeleteModal, setDeleteIds, setTriggerFunctions } = useModalContext();
	const { openPopoverHandler } = usePopoverContext();
	const queryClient = useQueryClient();

	const editExerciseHandler = () => {
		setShowExerciseModal(true);
		setIsEditExerciseMode(true);
		setExerciseItemDisp({ title, sets, reps, RPE, metadata, bodyPart, _id });
	};

	const deleteExerciseHandler = () => {
		if (!_id) return;
		setShowDeleteModal(true);
		setDeleteIds([_id]);
		setTriggerFunctions({
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['exercises'] });
				refetchExercises();
			},
		});
	};

	const showMetadataHandler = (e: React.MouseEvent) =>
		openPopoverHandler(e.target as Element, metadata);

	return (
		<div className='exercise-card'>
			<div className='exercise-card__title'>
				<h2>{title}</h2>
				<div className='exercise-card__actions'>
					{metadata && (
						<div onClick={showMetadataHandler}>
							<Tooltip title='Show notes'>
								<CommentRoundedIcon />
							</Tooltip>
						</div>
					)}
					<div onClick={editExerciseHandler}>
						<Tooltip title='Edit exercise'>
							<EditRoundedIcon />
						</Tooltip>
					</div>
					<div onClick={deleteExerciseHandler}>
						<Tooltip title='Delete exercise'>
							<DeleteRoundedIcon />
						</Tooltip>
					</div>
				</div>
			</div>
			<div className='exercise-card__content'>
				<div className='exercise-card__sets'>
					<h3>Sets</h3>
					<span>{sets}</span>
				</div>
				<div className='exercise-card__reps'>
					<h3>Reps</h3>
					<span>{reps}</span>
				</div>
				<div className='exercise-card__rpe'>
					<h3>RPE</h3>
					<span>{RPE}</span>
				</div>
			</div>
		</div>
	);
};

export default ExerciseCard;
