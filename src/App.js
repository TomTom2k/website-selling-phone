import { Fragment, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { privateRoutes, publicRoutes } from './routes';
import DefaultLayout from './layouts';
import { AuthToken } from './AuthToken/AuthToken';

const WrapperStyled = styled.div``;
function App() {
	let { role } = useContext(AuthToken);
	return (
		<WrapperStyled>
			<Routes>
				{publicRoutes.map((route, index) => {
					const Page = route.component;
					let Layout = DefaultLayout;

					if (route.layout === null) Layout = Fragment;
					else if (route.layout) Layout = route.layout;

					return (
						<Route
							key={index}
							path={route.path}
							element={
								<Layout>
									<Page />
								</Layout>
							}
						/>
					);
				})}
				{privateRoutes.map((route, index) => {
					const Page = route.component;
					let Layout = DefaultLayout;

					if (route.layout === null) Layout = Fragment;
					else if (route.layout) Layout = route.layout;

					let Element = <Navigate to={route.redirect} />;
					if (route.role.length === 0) {
						if (role === null)
							Element = (
								<Layout>
									<Page />
								</Layout>
							);
					} else {
						if (route.role.includes(role)) {
							Element = (
								<Layout>
									<Page />
								</Layout>
							);
						}
					}

					return (
						<Route
							key={index}
							path={route.path}
							element={Element}
						/>
					);
				})}
			</Routes>
		</WrapperStyled>
	);
}

export default App;
