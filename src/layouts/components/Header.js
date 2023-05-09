import React from 'react';
import styled from 'styled-components';
import { Row, Col, Input } from 'antd';
import Menu from './Menu';

const { Search } = Input;

const WrapperStyled = styled.header`
	width: 100%;
	display: flex;
	justify-content: center;
	position: fixed;
	top: 0;

	height: var(--default-layout-header-height);
	z-index: 1000;
	background-color: var(--background);
	box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.046);
`;
const ContainerStyled = styled(Row)`
	width: 100%;
	max-width: var(--default-layout-max-width);
	margin: 0 var(--default-layout-horizontal-space);

	background-color: var(--background);
`;
const LogoStyled = styled.div`
	display: inline;
	border-radius: 60px 10px;
	padding: 0.25rem 1rem;

	font-size: 2rem;
	font-weight: 500;
	color: var(--white);

	background-color: var(--primary);
`;

const Header = () => {
	const onSearch = () => {};

	return (
		<WrapperStyled>
			<ContainerStyled align="middle" justify="space-between">
				<Col span={6}>
					<LogoStyled>S-phone</LogoStyled>
				</Col>
				<Col span={6}>
					<Search
						placeholder="input search text"
						allowClear
						enterButton="Search"
						size="middle"
						onSearch={onSearch}
					/>
				</Col>
				<Col span={12}>
					<Menu />
				</Col>
			</ContainerStyled>
		</WrapperStyled>
	);
};

export default Header;
