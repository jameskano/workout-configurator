import './Backdrop.scss';
import { BackdropType } from './backdrop.types';

const Backdrop = ({ zIndex, opacity, type = 'normal', open }: BackdropType) => {
	return (
		<div
			className={`backdrop ${type === 'normal' ? 'backdrop--normal' : 'backdrop--blur'}${open ? ' backdrop--open' : ''}`}
			style={{ zIndex: zIndex && zIndex, opacity: opacity && opacity }}></div>
	);
};

export default Backdrop;
