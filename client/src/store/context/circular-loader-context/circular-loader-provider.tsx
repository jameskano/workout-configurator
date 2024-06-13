import { useMemo, useState } from 'react';
import { CircularLoaderContext } from './circular-loader-context';

export const CircularLoaderProvider = ({ children }: { children: React.ReactNode }) => {
	const [openLoader, setOpenLoader] = useState(false);

	const value = useMemo(
		() => ({
			openLoader,
			setOpenLoader,
		}),
		[openLoader],
	);

	return (
		<CircularLoaderContext.Provider value={value}>{children}</CircularLoaderContext.Provider>
	);
};
