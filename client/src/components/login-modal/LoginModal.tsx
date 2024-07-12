import { Button, TextField } from '@mui/material';
import { useLoginContext } from '../../store/context/login-context/login-context';
import { LoginModalType } from './login-modal.types';
import './LoginModal.scss';
import { ArrowBack } from '@mui/icons-material';
import { loginUser } from '../../services/users';
import { useAuth } from '../../utils/hooks/auth-hook/use-auth';
import useToast from '../../utils/hooks/toast-hook/use-toast';
import { signError } from '../../utils/functions/errors';
import { toastConstants } from '../../utils/constants/toast';

const LoginModal = ({ showLogin, setShowLogin, setShowRegister }: LoginModalType) => {
	const { loginData, setLoginDataHandler } = useLoginContext();
	const { saveAuthData } = useAuth();
	const { openToastHandler } = useToast();

	const loginHandler = async () => {
		const { email, password } = loginData;

		try {
			const response = await loginUser(email, password);
			saveAuthData(response.data.accessToken, response.data.userId);
			setLoginDataHandler();
		} catch (error) {
			const errorMessage = (error as any).response.data.error;
			const errorStatus = (error as any).response.status;
			const toastMessage = signError(errorStatus, errorMessage);
			openToastHandler(toastMessage, toastConstants.TYPES.ERROR);
		}
	};

	const changeFieldHandler = (value: string, name: string) => {
		setLoginDataHandler({ ...loginData, [name]: value });
	};

	const closeModalHandler = () => {
		setShowLogin(false);
		setLoginDataHandler();
	};

	const changeToRegisterHandler = () => {
		setShowLogin(false);
		setShowRegister(true);
	};

	return (
		<section className={`login-modal${showLogin ? ' login-modal--open' : ''}`}>
			<div className='login-modal__header'>
				<div onClick={closeModalHandler}>
					<ArrowBack fontSize='medium' />
				</div>
			</div>
			<div className='login-modal__logo'>
				<img src='src/assets/workout-configurator-logo-light.png' alt='' />
			</div>
			<div className='login-modal__form'>
				<TextField
					label='Email'
					type='text'
					variant='outlined'
					className='login-modal__input'
					size='small'
					fullWidth={false}
					value={loginData.email}
					onChange={(e) => changeFieldHandler(e.target.value, 'email')}
					required
				/>
				<TextField
					label='Password'
					type='password'
					variant='outlined'
					className='login-modal__input'
					size='small'
					fullWidth={false}
					value={loginData.password}
					onChange={(e) => changeFieldHandler(e.target.value, 'password')}
					required
				/>
				<Button variant='contained' onClick={loginHandler}>
					Sign In
				</Button>
			</div>
			<div className='login-modal__register'>
				<span>New user?</span>
				<span onClick={changeToRegisterHandler}>Register now</span>
			</div>
			<div className='login-modal__bottom'></div>
		</section>
	);
};

export default LoginModal;
