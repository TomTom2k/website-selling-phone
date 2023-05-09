import React from 'react';
import styled from 'styled-components';

const WrapperStyled = styled.footer`
	width: 100%;
	text-align: center;
	background-color: var(--black);

	position: relative;
	z-index: 100000;
`;
const InnerStyled = styled.div`
	width: 100%;
	padding: 1rem;
	display: flex;
	justify-content: center;
	max-width: var(--default-layout-max-width);

	color: var(--white);
`;

const Footer = () => {
	return (
		<WrapperStyled>
			<InnerStyled>Hân hạnh được đón tiếp bạn !!!</InnerStyled>
		</WrapperStyled>
	);
};

export default Footer;
