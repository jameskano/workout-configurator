import { useRegisterContext } from '../../store/context/register-context/register-context';
import { RegisterModalType } from './register-modal.types';
import { Button, TextField } from '@mui/material';
import './RegisterModal.scss';
import { ArrowBackRounded } from '@mui/icons-material';
import { registerUser } from '../../services/users';
import { useAuth } from '../../utils/hooks/auth-hook/use-auth';
import { signError } from '../../utils/functions/errors';
import { toastConstants } from '../../utils/constants/toast';
import useToast from '../../utils/hooks/toast-hook/use-toast';
import { useForm, Controller } from 'react-hook-form';

const RegisterModal = ({ showRegister, setShowRegister, setShowLogin }: RegisterModalType) => {
	const { registerData, setRegisterDataHandler } = useRegisterContext();
	const { saveAuthData } = useAuth();
	const { openToastHandler } = useToast();
	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm();

	const registerHandler = async () => {
		const { username, password, email } = registerData;

		try {
			const response = await registerUser(username, email, password);
			saveAuthData(response.data.accessToken, response.data.userId);
			setRegisterDataHandler();
		} catch (error) {
			const errorMessage = (error as any).response.data.error;
			const errorStatus = (error as any).response.status;
			const toastMessage = signError(errorStatus, errorMessage);
			openToastHandler(toastMessage, toastConstants.TYPES.ERROR);
		}
	};

	const changeFieldHandler = (value: string, name: string) => {
		setRegisterDataHandler({ ...registerData, [name]: value });
		setValue(name, value);
	};

	const closeModalHandler = () => {
		setShowRegister(false);
		setRegisterDataHandler();
	};

	const changeToLoginHandler = () => {
		setShowRegister(false);
		setShowLogin(true);
	};

	return (
		<section className={`register-modal${showRegister ? ' register-modal--open' : ''}`}>
			<div className='login-modal__header'>
				<div onClick={closeModalHandler}>
					<ArrowBackRounded />
				</div>
			</div>
			<div className='register-modal__logo'>
				<img src='src/assets/workout-configurator-logo-light.png' alt='' />
			</div>
			<form className='register-modal__form' onSubmit={handleSubmit(registerHandler)}>
				<Controller
					name='username'
					control={control}
					defaultValue={registerData.username}
					rules={{
						required: 'Name is required',
						minLength: {
							value: 3,
							message: 'Name must be at least 3 characters long',
						},
						maxLength: {
							value: 25,
							message: 'Name must be no more than 25 characters long',
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label='Name'
							type='text'
							variant='outlined'
							className='register-modal__input'
							size='small'
							fullWidth={false}
							value={registerData.username}
							onChange={(e) => changeFieldHandler(e.target.value, 'username')}
							error={!!errors.username}
							helperText={errors.username ? errors.username.message?.toString() : ''}
						/>
					)}
				/>
				<Controller
					name='email'
					control={control}
					defaultValue={registerData.email}
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
							className='register-modal__input'
							size='small'
							fullWidth={false}
							value={registerData.email}
							onChange={(e) => changeFieldHandler(e.target.value, 'email')}
							error={!!errors.email}
							helperText={errors.email ? errors.email.message?.toString() : ''}
						/>
					)}
				/>
				<Controller
					name='password'
					control={control}
					defaultValue={registerData.password}
					rules={{
						required: 'Password is required',
						minLength: {
							value: 8,
							message: 'Password must be at least 8 characters long',
						},
						maxLength: {
							value: 20,
							message: 'Password must be no more than 20 characters long',
						},
						validate: {
							hasUpperCase: (value) =>
								/[A-Z]/.test(value) ||
								'Password must contain at least one uppercase letter',
							hasLowerCase: (value) =>
								/[a-z]/.test(value) ||
								'Password must contain at least one lowercase letter',
							hasNumber: (value) =>
								/\d/.test(value) || 'Password must contain at least one number',
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label='Password'
							type='password'
							variant='outlined'
							className='register-modal__input'
							size='small'
							fullWidth={false}
							value={registerData.password}
							onChange={(e) => changeFieldHandler(e.target.value, 'password')}
							error={!!errors.password}
							helperText={errors.password ? errors.password.message?.toString() : ''}
						/>
					)}
				/>
				<Controller
					name='checkPassword'
					control={control}
					defaultValue={registerData.checkPassword}
					rules={{
						required: 'This field is required',
						validate: (value) =>
							value === registerData.password || 'Passwords do not match',
					}}
					render={({ field }) => (
						<TextField
							{...field}
							label='Confirm password'
							type='password'
							variant='outlined'
							className='register-modal__input'
							size='small'
							fullWidth={true}
							value={registerData.checkPassword}
							onChange={(e) => changeFieldHandler(e.target.value, 'checkPassword')}
							error={!!errors.checkPassword}
							helperText={
								errors.checkPassword ? errors.checkPassword.message?.toString() : ''
							}
						/>
					)}
				/>
				<Button variant='contained' type='submit'>
					Sign Up
				</Button>
			</form>
			<div className='register-modal__login'>
				<span>Already a member?</span>
				<span onClick={changeToLoginHandler}>Sign in</span>
			</div>
			<div className='register-modal__bottom'></div>
		</section>
	);
};

export default RegisterModal;
