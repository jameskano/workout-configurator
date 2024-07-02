import axios from 'axios';

export const loginUser = (email: string, password: string) => {
	const config = {
		method: 'POST',
		url: `${import.meta.env.VITE_WORKOUT_API}/user/login`,
		data: { email, password },
	};

	return axios(config);
};

export const registerUser = (username: string, email: string, password: string) => {
	const config = {
		method: 'POST',
		url: `${import.meta.env.VITE_WORKOUT_API}/user/register`,
		data: { username, email, password },
	};

	return axios(config);
};
