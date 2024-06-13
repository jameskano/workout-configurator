import { createContext, useContext } from 'react';

interface CircularLoaderContextType {
	openLoader: boolean;
	setOpenLoader: (value: boolean) => void;
}

export const CircularLoaderContext = createContext({} as CircularLoaderContextType);

export const useCircularLoaderContext = () => {
	const context = useContext(CircularLoaderContext);
	if (context === null) {
		throw new Error('useCircularLoaderContext must be used within an CircularLoaderProvider');
	}
	return context;
};
