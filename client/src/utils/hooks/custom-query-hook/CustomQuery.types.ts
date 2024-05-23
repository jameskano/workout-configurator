import { QueryFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export interface CustomQueryType {
	queryKey: (string | boolean)[];
	queryFn: () => any;
	staleTime?: number;
	cacheTime?: number;
	fetchOnFocus?: boolean;
	enabled?: boolean;
}
