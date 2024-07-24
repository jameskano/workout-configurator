import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

const CircularLoader = () => {
	const isLargeScreen = useMediaQuery('(min-width:900px)');

	return (
		<React.Fragment>
			<svg width={0} height={0}>
				<defs>
					<linearGradient id='my_gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
						<stop offset='0%' stopColor='#a2d1ff' />
						<stop offset='100%' stopColor='#549ce3' />
					</linearGradient>
				</defs>
			</svg>
			<CircularProgress
				size={isLargeScreen ? 50 : 40}
				thickness={isLargeScreen ? 4 : 3}
				sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
			/>
		</React.Fragment>
	);
};

export default CircularLoader;
