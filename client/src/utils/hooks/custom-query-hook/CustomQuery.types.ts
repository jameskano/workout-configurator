export interface CustomQueryType {
	queryKey: (string | boolean)[];
	queryFn: (...args: any[]) => any;
	staleTime?: number;
	cacheTime?: number;
	fetchOnFocus?: boolean;
	enabled?: boolean;
}
