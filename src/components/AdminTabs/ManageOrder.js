import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { Table, Space, Button, Popover, Col } from 'antd';
import styled from 'styled-components';

const ActionStyled = styled.span`
	cursor: pointer;
	color: var(--primary);
	transition: all 0.1s linear;
	:hover {
		opacity: 0.5;
	}
`;

const ManageOrder = () => {
	const [cookies] = useCookies(['user']);
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		getAllOder();
	}, []);

	let getAllOder = async () => {
		let res = await fetch(process.env.REACT_APP_API_URL + 'order', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${cookies?.token}`,
			},
		});
		let data = await res.json();
		setOrders(data);
	};

	let handlerUpdateStatus = async (id, status) => {
		await fetch(
			process.env.REACT_APP_API_URL +
				`order/update-status?id=${id}&status=${status}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${cookies?.token}`,
					'Content-Type': 'application/json',
				},
			}
		);
		await getAllOder();
	};

	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Tên khách hàng',
			dataIndex: 'username',
			render: (_, record) => record.user.username,
		},
		{
			title: 'Ngày đặt hàng',
			dataIndex: 'orderDate',
			key: 'orderDate',
		},
		{
			title: 'Tổng',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'address',
			render: (_, record) =>
				[
					record.address.streeet,
					record.address.district,
					record.address.city,
					record.address.coutry,
				].join(', '),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: (_, record) => {
				let status = [
					'Chờ xác nhận',
					'Đã xác nhận',
					'Đang giao',
					'Đã giao',
				];
				return <span>{status[record.status]}</span>;
			},
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (_, record) => (
				<Space>
					<Popover
						content={
							<Space direction="vertical">
								<Button
									style={{
										background: '#f50',
										borderColor: '#f50',
									}}
									onClick={() =>
										handlerUpdateStatus(record?.id, 0)
									}
								>
									Chờ xác nhận
								</Button>
								<Button
									type="primary"
									style={{
										background: '#2db7f5',
										borderColor: '#2db7f5',
									}}
									onClick={() =>
										handlerUpdateStatus(record?.id, 1)
									}
								>
									Đã xác nhận
								</Button>
								<Button
									type="primary"
									style={{
										background: '#108ee9',
										borderColor: '#108ee9',
									}}
									onClick={() =>
										handlerUpdateStatus(record?.id, 2)
									}
								>
									Đang giao
								</Button>
								<Button
									type="primary"
									style={{
										background: '#87d068',
										borderColor: '#87d068',
									}}
									onClick={() =>
										handlerUpdateStatus(record?.id, 3)
									}
								>
									Đã giao
								</Button>
							</Space>
						}
						title="Chọn trạng thái"
					>
						<ActionStyled type="primary">Status</ActionStyled>
					</Popover>
				</Space>
			),
		},
	];
	return (
		<div>
			<Table rowKey="id" dataSource={orders} columns={columns} />
		</div>
	);
};

export default ManageOrder;
