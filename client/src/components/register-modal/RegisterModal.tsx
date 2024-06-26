import { useRegisterContext } from '../../store/context/register-context/register-context';
import { RegisterModalType } from './register-modal.types';
import { Button, TextField } from '@mui/material';
import './RegisterModal.scss';
import { ArrowBack } from '@mui/icons-material';

const RegisterModal = ({ showRegister, setShowRegister }: RegisterModalType) => {
	const { registerData, setRegisterDataHandler } = useRegisterContext();

	const registerHandler = () => {};

	const changeFieldHandler = (value: string, name: string) => {
		setRegisterDataHandler({ ...registerData, [name]: value });
	};

	const closeModalHandler = () => {
		setShowRegister(false);
		setRegisterDataHandler();
	};

	return (
		<section className={`register-modal${showRegister ? ' register-modal--open' : ''}`}>
			<div className='login-modal__header'>
				<div onClick={closeModalHandler}>
					<ArrowBack />
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
					className='logiregister-modal__input'
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
			<div className='register-modal__bottom'></div>
		</section>
	);
};

export default RegisterModal;
