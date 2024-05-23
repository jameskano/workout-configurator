export const noDataValidation = (data: any[], isLoading: boolean) => {
	return !data?.length && !isLoading;
};
