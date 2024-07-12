import { axiosInstance } from '../utils/functions/axios-setup';

export const loginUser = (email: string, password: string) => {
	const config = {
		method: 'POST',
		url: `${import.meta.env.VITE_WORKOUT_API}/user/login`,
		data: { email, password },
		headers: {
			'Skip-Authorization': true,
		},
	};

	return axiosInstance(config);
};

export const registerUser = (username: string, email: string, password: string) => {
	const config = {
		method: 'POST',
		url: `${import.meta.env.VITE_WORKOUT_API}/user/register`,
		data: { username, email, password },
		headers: {
			'Skip-Authorization': true,
		},
	};

	return axiosInstance(config);
};

export const checkTokenValidity = () => {
	const config = {
		method: 'POST',
		url: `${import.meta.env.VITE_WORKOUT_API}/user/verify-token`,
		headers: {
			Authorization: `Bearer ${JSON.parse(localStorage.getItem('wcToken')!)}`,
		},
	};

	return axiosInstance(config);
};
