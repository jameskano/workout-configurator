import Backdrop from '@mui/material/Backdrop';

const BackdropComponent = ({ open, position }: BackdropComponentTypes) => {
	return <Backdrop open={open} sx={{ position: position }} />;
};

export default BackdropComponent;
