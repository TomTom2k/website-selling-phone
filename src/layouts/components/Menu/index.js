import React, { useContext } from 'react';
import styled from 'styled-components';
import { Menu as MenuAntd } from 'antd';

import configs from '../../../configs';
import MenuItem from './MenuItem';
import { AuthToken } from '../../../AuthToken/AuthToken';

const MenuStyled = styled(MenuAntd)`
	justify-content: end;
	background-color: var(--background) !important;

	.ant-menu-item {
		background-color: var(--background) !important;
	}
`;

const Menu = () => {
	let { role, user } = useContext(AuthToken);
	const MENUITEMS = [
		{
			label: 'Trang Chủ',
			path: configs.routes.home,
		},
		{
			label: 'Sản Phẩm',
			path: configs.routes.listProduct,
		},
		{
			label: 'Đăng Nhập',
			path: configs.routes.login,
			role: null,
		},
		{
			label: 'Giỏ Hàng',
			path: configs.routes.cart,
			role: [
				configs.roles.user,
				configs.roles.admin,
				configs.roles.staff,
			],
		},
		{
			label: user?.username,
			path: configs.routes.profile,
			role: [
				configs.roles.user,
				configs.roles.admin,
				configs.roles.staff,
			],
		},
	];
	const items = MENUITEMS.map((item, index) => {
		if (item.role === null) if (role) return;
		if (item.role) {
			if (role) {
				if (!item.role.includes(role)) return;
			} else return;
		}

		return {
			label: <MenuItem key={index} item={item} />,
		};
	});
	return <MenuStyled mode="horizontal" items={items} />;
};

export default Menu;
