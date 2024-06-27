import { useEffect, useState } from 'react';
import { useAppContext } from '../../store/context/app-context/app-context';
import { useNavigate } from 'react-router';
import './WelcomePage.scss';
import { Button } from '@mui/material';
import { timer } from '../../utils/constants/app-constants';
import { createPortal } from 'react-dom';
import LoginModal from '../../components/login-modal/LoginModal';
import RegisterModal from '../../components/register-modal/RegisterModal';

const WelcomePage = () => {
	const { logged } = useAppContext();
	const navigate = useNavigate();

	const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);

	useEffect(() => {
		if (logged) navigate('/exercises');
	}, []);

	const showRegisterHandler = () => {
		setShowRegister(true);
	};

	const showLoginHandler = () => {
		setShowLogin(true);
	};

	return (
		<section className='welcome-page'>
			<div
				className={`welcome-page__container${showLogin || showRegister ? ' welcome-page__container--close' : ''}`}>
				<div className='welcome-page__title'>
					<img src='src/assets/workout-configurator-logo-light.png' alt='' />
					<h1>Workout</h1>
					<h1>Configurator</h1>
				</div>
				<div className='welcome-page__actions'>
					<Button onClick={showLoginHandler} variant='outlined'>
						Sign In
					</Button>
					<Button onClick={showRegisterHandler} variant='contained'>
						Sign Up
					</Button>
				</div>
			</div>

			{createPortal(
				<LoginModal
					showLogin={showLogin}
					setShowLogin={setShowLogin}
					setShowRegister={setShowRegister}
				/>,
				document.querySelector('#modal-root')!,
			)}

			{createPortal(
				<RegisterModal
					showRegister={showRegister}
					setShowRegister={setShowRegister}
					setShowLogin={setShowLogin}
				/>,
				document.querySelector('#modal-root')!,
			)}
		</section>
	);
};

export default WelcomePage;
