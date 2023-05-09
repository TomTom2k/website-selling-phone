import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { Button, Form, Input, Table } from 'antd';

const columns = [
	{
		title: 'Tên',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Miêu tả',
		dataIndex: 'description',
		key: 'description',
	},
	{
		title: 'Ngày tạo',
		dataIndex: 'createdDate',
		key: 'createdDate',
	},
	{
		title: 'Ngày cập nhật',
		dataIndex: 'updatedDate',
		key: 'updatedDate',
	},
];

const ManageBrand = () => {
	const [cookies] = useCookies();
	const [brands, setBrands] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// get all brand
	useEffect(() => {
		getBrands();
	}, []);

	const getBrands = async () => {
		let res = await fetch(process.env.REACT_APP_API_URL + 'brand', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${cookies?.token}`,
			},
		});
		let data = await res.json();
		setBrands(data);
	};

	const handlerPost = async (values) => {
		setIsLoading(true);
		try {
			let res = await fetch(
				process.env.REACT_APP_API_URL + 'brand/create',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${cookies?.token}`,
					},
					body: JSON.stringify(values),
				}
			);
			getBrands();
			setIsLoading(false);
		} catch {
			console.log('Error brand page');
			setIsLoading(false);
		}
	};
	return (
		<>
			<Form
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				style={{
					maxWidth: 600,
				}}
				onFinish={handlerPost}
				disabled={isLoading}
			>
				<Form.Item
					label="Tên thương hiệu"
					name="name"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Miêu tả"
					name="description"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
					]}
				>
					<Input.TextArea rows={4} />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
						Thêm
					</Button>
				</Form.Item>
			</Form>
			<Table rowKey="id" columns={columns} dataSource={brands} />
		</>
	);
};

export default ManageBrand;
