import SideNavBar from '../side-navbar/SideNavBar';
import { LayoutTypes } from './Layout.types';
import './Layout.scss';
import { useLocation } from 'react-router';
import { useState } from 'react';
import { pageTitle } from '../../utils/constants/page-title';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Toast from '../../UI/toast/Toast';
import { createPortal } from 'react-dom';
import BackdropLoader from '../../UI/backdrop-loader/BackdropLoader';
import { backdropConstants } from '../../utils/constants/backdrop';
import { useCircularLoaderContext } from '../../store/context/circular-loader-context/circular-loader-context';
import DeletePopup from 'components/delete-popup/DeletePopup';

const Layout = ({ currentPageComponent }: LayoutTypes) => {
	const location = useLocation();
	const { openLoader } = useCircularLoaderContext();

	const [isSideNavbarShown, setIsSideNavbarShown] = useState(false);

	const sideNavbarHandler = () => setIsSideNavbarShown((prevState) => !prevState);

	return (
		<section className='layout'>
			<div className='layout__header'>
				{isSideNavbarShown ? (
					<CloseRoundedIcon onClick={sideNavbarHandler} />
				) : (
					<MenuRoundedIcon onClick={sideNavbarHandler} />
				)}
				<h1 className='exercises__title'>
					{(pageTitle as any)[location.pathname.slice(1).toUpperCase()]}
				</h1>
			</div>

			<div className='layout__body'>
				<SideNavBar
					showSideNavbar={isSideNavbarShown}
					setIsSideNavbarShown={setIsSideNavbarShown}
				/>
				<div className='layout__main-content'>{currentPageComponent}</div>
			</div>

			<Toast />
			{createPortal(
				<BackdropLoader open={openLoader} position={backdropConstants.POSITION.FIXED} />,
				document.querySelector('#modal-root')!,
			)}

			{createPortal(<DeletePopup />, document.querySelector('#modal-root')!)}
		</section>
	);
};

export default Layout;
