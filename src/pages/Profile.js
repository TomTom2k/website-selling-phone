import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button, Col, Menu, Row } from 'antd';
import styled from 'styled-components';

import { AuthToken } from '../AuthToken/AuthToken';
import { Info, Address, Orders } from '../components/ProfileItem';

const WrapperStyled = styled.div``;
const AsideStyled = styled.div`
	width: 100%;
	height: calc(
		100vh - var(--default-layout-header-height) -
			var(--default-layout-footer-height)
	);
	padding: 1rem;

	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;

	box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
`;
const NameStyled = styled.div`
	font-size: 1.5rem;
	font-weight: 600;
	color: var(--text-color);
`;
const UserNameStyled = styled.div`
	color: var(--gray);
`;
const InfoStyled = styled.div`
	margin-top: 2rem;
`;
const ButtonStyled = styled.div`
	margin-top: 5rem;
`;
const MenuStyled = styled(Menu)`
	border-inline-end: 0 !important;
	margin-top: 1rem;
`;
const MenuItem = styled.p`
	font-size: 1.25rem;
`;
const ContainerStyled = styled.div`
	padding: 2rem;
`;

const MENUITEMS = [
	{
		title: 'Thông tin cá nhân',
		component: <Info />,
	},
	{
		title: 'Địa chỉ',
		component: <Address />,
	},
	{
		title: 'Các đơn hàng',
		component: <Orders />,
	},
];

const Profile = () => {
	let { logout, user } = useContext(AuthToken);
	let [body, setBody] = useState(<Info />);

	let items = MENUITEMS.map((item, index) => {
		return {
			label: (
				<MenuItem key={index} onClick={() => setBody(item.component)}>
					{item.title}
				</MenuItem>
			),
		};
	});
	return (
		<WrapperStyled>
			<Row>
				<Col span={6}>
					<AsideStyled>
						<InfoStyled>
							<NameStyled>{user?.fullName}</NameStyled>
							<UserNameStyled>{user?.username}</UserNameStyled>
							<MenuStyled items={items} />
						</InfoStyled>
						<ButtonStyled>
							<Button type="primary" onClick={logout}>
								Đăng xuất
							</Button>
						</ButtonStyled>
					</AsideStyled>
				</Col>
				<Col span={16}>
					<ContainerStyled>{body}</ContainerStyled>
				</Col>
			</Row>
		</WrapperStyled>
	);
};

export default Profile;
