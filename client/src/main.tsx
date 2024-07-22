import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { LoginProvider } from './store/context/login-context/login-provider.tsx';
import { ToastProvider } from './store/context/toast-context/toast-provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<LoginProvider>
		<ToastProvider>
			<App />
		</ToastProvider>
	</LoginProvider>,
	// </React.StrictMode>
);
