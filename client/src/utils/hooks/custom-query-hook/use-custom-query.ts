import { useQuery } from '@tanstack/react-query';
import { CustomQueryType } from './CustomQuery.types';
import { useEffect, useState } from 'react';

const useCustomQuery = ({
	queryKey,
	queryFn,
	staleTime,
	cacheTime,
	fetchOnFocus,
	enabled,
}: CustomQueryType) => {
	const [useCache, setUseCache] = useState(true);

	const customQuery = useQuery({
		queryKey,
		queryFn,
		retry: false,
		refetchOnWindowFocus: fetchOnFocus || false,
		gcTime: useCache ? cacheTime || 1000 * 60 * 5 : 0,
		staleTime: useCache ? staleTime || 1000 * 60 * 5 : 0,
		enabled: enabled !== undefined ? enabled : true,
	});

	const { isSuccess, isError } = customQuery;

	useEffect(() => {
		if (isSuccess) setUseCache(false);
		if (isError) setUseCache(true);
	}, [isSuccess, isError]);

	return customQuery;
};

export default useCustomQuery;
