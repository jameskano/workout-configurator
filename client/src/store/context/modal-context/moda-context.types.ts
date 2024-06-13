export interface ModalContextType {
	showModal: boolean;
	setShowModal: (value: boolean) => void;
	showDeleteModal: boolean;
	setShowDeleteModal: (value: boolean) => void;
	deleteIds: string[];
	setDeleteIds: (value: string[]) => void;
	triggerFunctions?: ModalContextFunctionsType;
	setTriggerFunctions: (value: ModalContextFunctionsType) => void;
}

export interface ModalContextFunctionsType {
	onSuccess?: () => void;
	onError?: () => void;
	onFinish?: () => void;
}
