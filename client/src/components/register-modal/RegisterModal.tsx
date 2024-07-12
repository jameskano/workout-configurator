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

const RegisterModal = ({ showRegister, setShowRegister, setShowLogin }: RegisterModalType) => {
	const { registerData, setRegisterDataHandler } = useRegisterContext();
	const { saveAuthData } = useAuth();
	const { openToastHandler } = useToast();

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
			<div className='register-modal__form'>
				<TextField
					label='Name'
					type='text'
					variant='outlined'
					className='register-modal__input'
					size='small'
					fullWidth={false}
					value={registerData.username}
					onChange={(e) => changeFieldHandler(e.target.value, 'username')}
					required
				/>
				<TextField
					label='Email'
					type='text'
					variant='outlined'
					className='register-modal__input'
					size='small'
					fullWidth={false}
					value={registerData.email}
					onChange={(e) => changeFieldHandler(e.target.value, 'email')}
					required
				/>
				<TextField
					label='Password'
					type='password'
					variant='outlined'
					className='register-modal__input'
					size='small'
					fullWidth={false}
					value={registerData.password}
					onChange={(e) => changeFieldHandler(e.target.value, 'password')}
					required
				/>
				<TextField
					label='Confirm password'
					type='password'
					variant='outlined'
					className='register-modal__input'
					size='small'
					fullWidth={false}
					value={registerData.checkPassword}
					onChange={(e) => changeFieldHandler(e.target.value, 'checkPassword')}
					required
				/>
				<Button variant='contained' onClick={registerHandler}>
					Sign Up
				</Button>
			</div>
			<div className='register-modal__login'>
				<span>Already a member?</span>
				<span onClick={changeToLoginHandler}>Sign in</span>
			</div>
			<div className='register-modal__bottom'></div>
		</section>
	);
};

export default RegisterModal;
