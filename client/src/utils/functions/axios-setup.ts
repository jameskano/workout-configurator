import axios from 'axios';
import { useLoginContext } from '../../store/context/login-context/login-context';
import { useAuth } from '../../utils/hooks/auth-hook/use-auth';
import useToast from '../../utils/hooks/toast-hook/use-toast';
import { toastMessages } from '../../utils/constants/toast-messages';
import { toastConstants } from '../../utils/constants/toast';

const axiosInstance = axios.create();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useAxiosInterceptor = () => {
	const { token } = useLoginContext();
	const { removeAuthData } = useAuth();
	const { openToastHandler, closeToastHandler } = useToast();

	axiosInstance.interceptors.request.use(
		(config) => {
			console.log(token);
			if (token && !config.headers['Skip-Authorization']) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);

	axiosInstance.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			if (error.response && error.response.status === 401) {
				error.isHandled401 = true;
				setTimeout(
					() =>
						openToastHandler(
							toastMessages.UNAUTHORIZED_ACCESS,
							toastConstants.TYPES.ERROR,
						),
					10,
				);
				setTimeout(() => {
					removeAuthData();
					closeToastHandler();
				}, 4000);
			}
			return Promise.reject(error);
		},
	);

	return axiosInstance;
};

export { axiosInstance, useAxiosInterceptor };
