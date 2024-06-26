import { Button, TextField } from '@mui/material';
import { useLoginContext } from '../../store/context/login-context/login-context';
import { LoginModalType } from './login-modal.types';
import './LoginModal.scss';
import { ArrowBack } from '@mui/icons-material';

const LoginModal = ({ showLogin, setShowLogin }: LoginModalType) => {
	const { loginData, setLoginDataHandler } = useLoginContext();

	const loginHandler = () => {};

	const changeFieldHandler = (value: string, name: string) => {
		setLoginDataHandler({ ...loginData, [name]: value });
	};

	const closeModalHandler = () => {
		setShowLogin(false);
		setLoginDataHandler();
	};

	return (
		<section className={`login-modal${showLogin ? ' login-modal--open' : ''}`}>
			<div className='login-modal__header'>
				<div onClick={closeModalHandler}>
					<ArrowBack />
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
			<div className='login-modal__bottom'></div>
		</section>
	);
};

export default LoginModal;
