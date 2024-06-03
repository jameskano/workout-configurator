import { Box, Button, Modal } from '@mui/material';
import { GenericModalButtonType, GenericPopupType } from './GenericPopup.types';
import './GenericPopup.scss';

const GenericPopup = ({
	onClose,
	showModal = false,
	setShowModal,
	classes,
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
			<div className='modal__main-container'>
				{headerText && <div className='modal__header'>{headerText}</div>}
				<div className={`modal__container ${headerText ? 'modal__container--header' : ''}`}>
					<div className='modal__content'>{text}</div>
					{buttons?.length && (
						<div className='modal__buttons'>
							{buttons.map((button: GenericModalButtonType, index) => (
								<Button {...button} key={index} className={button.className}>
									{button.text}
								</Button>
							))}
						</div>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default GenericPopup;
