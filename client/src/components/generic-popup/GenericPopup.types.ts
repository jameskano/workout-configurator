export interface GenericPopupType {
	showModal: boolean;
	setShowModal: (value: boolean) => void;
	classes?: string;
	onClose: () => void;
	showHeader?: boolean;
	headerText?: string;
	text: string;
	buttons?: GenericModalButtonType[];
}

export interface GenericModalButtonType {
	classeName?: string;
	text: string;
	onClick: () => void;
	variant: 'text' | 'outlined' | 'contained';
}
