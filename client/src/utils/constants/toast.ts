import Slide from '@mui/material/Slide';

export const toastConstants = {
	DELAY: 4000,
	TRANSITION: Slide,
	POSITION: {
		VERTICAL: 'bottom' as 'bottom' | 'top',
		HORIZONTAL: 'center' as 'center' | 'left' | 'right',
	},
	TYPES: {
		SUCCESS: '#2ab757',
		WARNING: '#ddbb24',
		INFO: '#1e9be2',
		ERROR: '#d04b4b',
	},
	WIDTH: 300,
};
