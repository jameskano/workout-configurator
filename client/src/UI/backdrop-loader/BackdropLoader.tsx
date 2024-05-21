import CircularLoader from '../../UI/circular-loader/CircularLoader';
import BackdropComponent from '../../UI/backdrop-component/BackdropComponent';
import './BackdropLoader.scss';

const BackdropLoader = ({ open, position }: BackdropComponentTypes) => {
	return (
		<div className='backdrop-loader' style={{ display: open ? 'flex' : 'none' }}>
			<BackdropComponent open={open} position={position} />
			{open && <CircularLoader />}
		</div>
	);
};

export default BackdropLoader;
