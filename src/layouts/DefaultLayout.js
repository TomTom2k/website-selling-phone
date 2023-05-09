import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';

const WrapperStyled = styled.div``;
const ContainerStyled = styled.div`
	margin-top: var(--default-layout-header-height);
`;
const DefaultLayout = ({ children }) => {
	return (
		<WrapperStyled>
			<Header />
			<ContainerStyled>{children}</ContainerStyled>
			<Footer />
		</WrapperStyled>
	);
};

DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default DefaultLayout;
