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
import { Controller, useForm } from 'react-hook-form';

const LoginModal = ({ showLogin, setShowLogin, setShowRegister }: LoginModalType) => {
	const { loginData, setLoginDataHandler } = useLoginContext();
	const { saveAuthData } = useAuth();
	const { openToastHandler } = useToast();
	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm();

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
		setValue(name, value);
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
			<form className='login-modal__form' onSubmit={handleSubmit(loginHandler)}>
				<Controller
					name='email'
					control={control}
					defaultValue={loginData.email}
					rules={{
						required: 'Email is required',
						pattern: {
							value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
							message: 'Invalid email address',
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label='Email'
							type='text'
							variant='outlined'
							className='login-modal__input'
							size='small'
							fullWidth={false}
							value={loginData.email}
							onChange={(e) => changeFieldHandler(e.target.value, 'email')}
							error={!!errors.email}
							helperText={errors.email ? errors.email.message?.toString() : ''}
						/>
					)}
				/>
				<Controller
					name='password'
					control={control}
					defaultValue={loginData.password}
					rules={{
						required: 'Password is required',
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label='Password'
							type='password'
							variant='outlined'
							className='login-modal__input'
							size='small'
							fullWidth={false}
							value={loginData.password}
							onChange={(e) => changeFieldHandler(e.target.value, 'password')}
							error={!!errors.password}
							helperText={errors.password ? errors.password.message?.toString() : ''}
						/>
					)}
				/>
				<Button variant='contained' type='submit'>
					Sign In
				</Button>
			</form>
			<div className='login-modal__register'>
				<span>New user?</span>
				<span onClick={changeToRegisterHandler}>Register now</span>
			</div>
			<div className='login-modal__bottom'></div>
		</section>
	);
};

export default LoginModal;
