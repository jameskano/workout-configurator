import { useMemo, useState } from 'react';
import { ModalContext } from './modal-context';
import { ModalContextFunctionsType } from './moda-context.types';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteIds, setDeleteIds] = useState<string[]>([]);
	const [triggerFunctions, setTriggerFunctions] = useState<ModalContextFunctionsType>({});

	const value = useMemo(
		() => ({
			showModal,
			showDeleteModal,
			setShowModal,
			setShowDeleteModal,
			deleteIds,
			setDeleteIds,
			triggerFunctions,
			setTriggerFunctions,
		}),
		[showModal, showDeleteModal, deleteIds, triggerFunctions],
	);

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
