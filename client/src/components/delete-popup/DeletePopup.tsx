import { useModalContext } from '../../store/context/modal-context/modal-context';
import GenericPopup from '../../components/generic-popup/GenericPopup';
import { GenericModalButtonType } from '../../components/generic-popup/GenericPopup.types';
import useDelete from '../../utils/hooks/delete-hook/use-delete-hook';
import { useLocation } from 'react-router';

const DeletePopup = () => {
	const { showDeleteModal, setShowDeleteModal, setDeleteIds, setTriggerFunctions } =
		useModalContext();
	const { deleteRequest } = useDelete();
	const { pathname } = useLocation();

	const DeletePopupContent = () => {
		return (
			<div>
				<span
					style={{
						display: 'block',
					}}>{`Do you want to delete these ${pathname.replace('/', '')}?`}</span>
				{pathname === '/exercises' && (
					<span>All deleted exercises also will be removed from workouts</span>
				)}
			</div>
		);
	};

	const closeHandler = () => {
		setShowDeleteModal(false);
		setTriggerFunctions({});
		setDeleteIds([]);
	};

	const deleteHandler = () => {
		setShowDeleteModal(false);
		deleteRequest();
	};

	const removeButton: GenericModalButtonType = {
		text: 'Delete',
		variant: 'contained',
		onClick: deleteHandler,
		className: 'deletePopupButton',
	};

	const cancelButton: GenericModalButtonType = {
		text: 'Cancel',
		variant: 'outlined',
		onClick: closeHandler,
		className: 'cancelPopupButton',
	};

	return (
		<GenericPopup
			onClose={closeHandler}
			content={<DeletePopupContent />}
			showModal={showDeleteModal}
			setShowModal={setShowDeleteModal}
			buttons={[cancelButton, removeButton]}
			classes='delete-popup'
		/>
	);
};

export default DeletePopup;
