import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const CircularLoader = () => {
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
				size={40}
				thickness={4}
				sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
			/>
		</React.Fragment>
	);
};

export default CircularLoader;
