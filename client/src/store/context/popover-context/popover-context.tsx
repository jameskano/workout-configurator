import { createContext, useContext } from 'react';
import { PopoverContextType } from './popover-context.types';

export const PopoverContext = createContext({} as PopoverContextType);

export const usePopoverContext = () => {
	const context = useContext(PopoverContext);
	if (context === null) {
		throw new Error('usePopoverContext must be used within an PopoverProvider');
	}
	return context;
};
