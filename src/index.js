import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AuthProvide from './AuthToken/AuthToken';
import GlobalStyled from './components/GlobalStyled';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Router>
			<GlobalStyled>
				<CookiesProvider>
					<AuthProvide>
						<App />
					</AuthProvide>
				</CookiesProvider>
			</GlobalStyled>
		</Router>
	</React.StrictMode>
);
