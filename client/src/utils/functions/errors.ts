export const signError = (status: number, message: string) => {
	if (status === 400) return message;
	else return 'An error occurred whit your request. Please try again.';
};
