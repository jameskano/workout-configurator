import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		// this ensures that the browser opens upon server start
		open: true,
		// this sets a default port to 3000
		port: 3000,
	},
	build: {
		rollupOptions: {
			external: ['react', 'react-router', 'react-router-dom'],
			output: {
				globals: {
					react: 'React',
				},
			},
		},
	},
});
