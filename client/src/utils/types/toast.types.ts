import { toastConstants } from '../../utils/constants/toast';

export type ToastTypesType =
	| typeof toastConstants.TYPES.ERROR
	| typeof toastConstants.TYPES.INFO
	| typeof toastConstants.TYPES.SUCCESS
	| typeof toastConstants.TYPES.WARNING;
