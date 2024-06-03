export interface GenericPopupType {
	showModal: boolean;
	setShowModal: (value: boolean) => void;
	classes?: string;
	onClose: () => void;
	headerText?: string;
	text: string;
	buttons?: GenericModalButtonType[];
}

export interface GenericModalButtonType {
	className?: string;
	text: string;
	onClick: () => void;
	variant: 'text' | 'outlined' | 'contained';
}
