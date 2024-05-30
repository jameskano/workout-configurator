import { Box, Button, Modal } from '@mui/material';
import { GenericModalButtonType, GenericPopupType } from './GenericPopup.types';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Tooltip } from '@mui/material';

const GenericPopup = ({
	onClose,
	showModal,
	setShowModal,
	classes,
	showHeader,
	headerText,
	text,
	buttons,
}: GenericPopupType) => {
	const closeModalHandler = () => {
		setShowModal(false);
		onClose && onClose();
	};

	return (
		<Modal
			open={showModal}
			disablePortal
			onClose={closeModalHandler}
			className={`modal ${classes}`}>
			<Box component='section' className='modal__container'>
				{showHeader && <div className='modal__header'>{headerText}</div>}
				<div className='modal__content'>{text}</div>
				{buttons?.length && (
					<div className='modal__buttons'>
						{buttons.map((button: GenericModalButtonType, index) => (
							<Button {...button} key={index}>
								{button.text}
							</Button>
						))}
					</div>
				)}
				<div className='modal__close-icon' onClick={onClose}>
					<CloseRoundedIcon />
				</div>
			</Box>
		</Modal>
	);
};

export default GenericPopup;
