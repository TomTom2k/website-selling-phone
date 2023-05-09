import React from 'react';
import styled from 'styled-components';
import images from '../assets';

const WrapperStyled = styled.div`
	width: 100%;
	min-height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url(${images.backgroundForm});
	background-repeat: no-repeat;
	background-size: cover;

	display: flex;
	justify-content: center;
	align-items: center;
`;
const ContainerStyled = styled.div`
	width: 100%;
	max-width: var(--form-layout-max-width);
	min-height: 20rem;
	padding: 1.5rem 1rem;
	margin: var(--default-layout-horizontal-space);
	border-radius: 0.5rem;
	background-color: white;
`;
const FormLayout = ({ children }) => {
	return (
		<WrapperStyled>
			<ContainerStyled>{children}</ContainerStyled>
		</WrapperStyled>
	);
};

export default FormLayout;
