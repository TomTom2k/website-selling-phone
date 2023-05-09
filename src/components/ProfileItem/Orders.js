import React, { useEffect, useState } from 'react';
import { Col, List, Row, Tag } from 'antd';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

const data = [
	{
		orderDate: '28-20-2022',
		totalPrice: 2340000,
		address: 'qwer phuong 123, tp Hồ Chí Minh',
		status: 0,
	},
	{
		orderDate: '28-20-2022',
		totalPrice: 2340000,
		address: 'qwer phuong 123, tp Hồ Chí Minh',
		status: 1,
	},
	{
		orderDate: '28-20-2022',
		totalPrice: 2340000,
		address:
			'qwer phuong 123, tp Hồ Chí Minh sadffffffffffffffffff ffffff adsf aasdfasdfasdf  asdfasdfasd asdffasdfas  asdfasdasdfasd asdf asdf fs',
		status: 2,
	},
	{
		orderDate: '28-20-2022',
		totalPrice: 2340000,
		address: 'qwer phuong 123, tp Hồ Chí Minh',
		status: 3,
	},
];
let status = [
	<Tag color="#f50">Chờ xác nhận</Tag>,
	<Tag color="#2db7f5">Đã xác nhận</Tag>,
	<Tag color="#108ee9">Đang giao</Tag>,
	<Tag color="#87d068">Đã giao</Tag>,
];
let ListItemStyled = styled(List.Item)`
	:hover {
		background-color: var(--background);
		box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.03);
	}
`;
let RowStyled = styled(Row)`
	width: 100%;
`;
let AddressTextStyled = styled.p`
	font-size: 1.25rem;
	font-weight: 400;
`;
let TextStyled = styled.p`
	color: var(--gray);
	border-left: 1px solid var(--gray);
	padding-left: 1rem;
`;

const Orders = () => {
	const [cookies] = useCookies(['user']);
	const [listOrder, setListOrder] = useState([]);

	useEffect(() => {
		getAllOrderOfUser();
	}, []);
	let getAllOrderOfUser = async () => {
		let res = await fetch(process.env.REACT_APP_API_URL + 'order/detail', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${cookies?.token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setListOrder(data);
			});
	};
	return (
		<>
			<List
				dataSource={listOrder}
				bordered
				renderItem={(item) => {
					const tag = status[item.status];
					const d = new Date(item.orderDate);
					return (
						<ListItemStyled>
							<RowStyled gutter={10}>
								<Col span={18}>
									{tag}
									<AddressTextStyled>
										{[
											item.address.streeet,
											item.address.district,
											item.address.city,
											item.address.coutry,
										].join(', ')}
									</AddressTextStyled>
								</Col>
								<Col span={6}>
									<TextStyled>
										{Intl.NumberFormat().format(
											item?.totalPrice
										)}
										&ensp;VND
									</TextStyled>
									<TextStyled>
										{d.toLocaleString()}
									</TextStyled>
								</Col>
							</RowStyled>
						</ListItemStyled>
					);
				}}
			/>
		</>
	);
};

export default Orders;
