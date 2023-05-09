import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const WrapperStyled = styled.div`
	text-align: center;
`;
const IconStyled = styled(FontAwesomeIcon)`
	font-size: 1.75rem;
	color: var(--primary);
`;
const TitleStyled = styled.h3`
	color: var(--text-color);
	font-size: 1rem;
	margin-bottom: 0.25rem;
`;
const ParagraphStyled = styled.p`
	color: var(--gray);
	font-size: 0.725rem;
`;
const Feature = ({ icon, title, paragraph }) => {
	return (
		<WrapperStyled>
			<IconStyled icon={icon} />
			<TitleStyled>{title}</TitleStyled>
			<ParagraphStyled>{paragraph}</ParagraphStyled>
		</WrapperStyled>
	);
};

export default Feature;
