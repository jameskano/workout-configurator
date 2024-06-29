import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SideNavBar.scss';
import { SideNavbarTypes } from './SideNavbar.types';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
// import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
// import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

const SideNavBar = ({ showSideNavbar, setIsSideNavbarShown }: SideNavbarTypes) => {
	const logOutHandler = () => {};

	const sideNavbarHandler = () => setIsSideNavbarShown(false);

	return (
		<section className={`side-navbar side-navbar--${showSideNavbar ? 'show' : 'hide'}`}>
			<div className='side-navbar__option'>
				<FitnessCenterRoundedIcon />
				<div>
					<NavLink
						to='/exercises'
						onClick={sideNavbarHandler}
						className={({ isActive }) => (isActive ? 'active' : undefined)}>
						Exercises
						<ArrowForwardIosRoundedIcon />
					</NavLink>
				</div>
			</div>
			<div className='side-navbar__option'>
				<ContentPasteRoundedIcon />
				<div>
					<NavLink
						to='/workouts'
						onClick={sideNavbarHandler}
						className={({ isActive }) => (isActive ? 'active' : undefined)}>
						Workouts
						<ArrowForwardIosRoundedIcon />
					</NavLink>
				</div>
			</div>
			{/* <div className="side-navbar__option">
                <NavLink
                    to="/planing (or something like that)"
                    onClick={sideNavbarHandler}
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    <span>Account</span>
                    <ArrowForwardIosRoundedIcon />
                </NavLink>
            </div> */}
			{/* <div className="side-navbar__option">
                <NavLink
                    to="/configuration" (account, theme, etc)
                    onClick={sideNavbarHandler}
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    <span>Configuration</span>
                    <ArrowForwardIosRoundedIcon />
                </NavLink>
            </div> */}
			<div className='side-navbar__option'>
				<LogoutRoundedIcon />
				<div>
					<Link to='/' onClick={logOutHandler}>
						Log out
						<ArrowForwardIosRoundedIcon />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default SideNavBar;
