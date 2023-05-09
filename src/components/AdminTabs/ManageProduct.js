import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import {
	Button,
	Form,
	Input,
	InputNumber,
	Table,
	Select,
	Space,
	Popover,
} from 'antd';
import styled from 'styled-components';

import ModalProduct from './components/ModalProduct';
import { useForm } from 'antd/es/form/Form';

const ActionStyled = styled.span`
	cursor: pointer;
	color: var(--primary);
	transition: all 0.1s linear;
	:hover {
		opacity: 0.5;
	}
`;

const ManageProduct = () => {
	const [cookies] = useCookies(['user']);
	const [form] = useForm();
	const [products, setProducts] = useState();
	const [brands, setBrands] = useState([]);
	const [file, setFile] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [rowSelect, setRowSelect] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	let handlerUpdateStatus = async (id, status) => {
		await fetch(
			process.env.REACT_APP_API_URL +
				`product/update-status?status=${status}&id=${id}`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${cookies?.token}`,
					'Content-Type': 'application/json',
				},
			}
		);
		await getAllProduct();
	};

	let handlerDelete = async (id) => {
		await fetch(process.env.REACT_APP_API_URL + `product/delete?id=${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${cookies?.token}`,
			},
		});
		await getAllProduct();
	};

	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Thương hiệu',
			dataIndex: 'brandId',
			render: (_, record) => record.brand.name,
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Số lượng',
			dataIndex: 'stock',
			key: 'stock',
		},
		{
			title: 'Miêu tả',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: (_, record) => {
				let status = ['submit', 'accept', 'cancel'];
				return <span>{status[record.status]}</span>;
			},
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (_, record) => (
				<Space>
					<ActionStyled
						onClick={() => {
							setRowSelect(record);
							showModal();
						}}
					>
						Edit
					</ActionStyled>
					<Popover
						content={
							<Space>
								<Button
									onClick={() =>
										handlerUpdateStatus(record.id, 0)
									}
								>
									Submit
								</Button>
								<Button
									type="primary"
									onClick={() =>
										handlerUpdateStatus(record.id, 1)
									}
								>
									Accept
								</Button>
								<Button
									type="primary"
									danger
									onClick={() =>
										handlerUpdateStatus(record.id, 2)
									}
								>
									Cancel
								</Button>
							</Space>
						}
						title="Chọn trạng thái"
					>
						<ActionStyled type="primary">Status</ActionStyled>
					</Popover>
					<ActionStyled onClick={() => handlerDelete(record.id)}>
						Delete
					</ActionStyled>
				</Space>
			),
		},
	];

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

	// get all product
	useEffect(() => {
		getAllProduct();
	}, []);
	const getAllProduct = async () => {
		let res = await fetch(process.env.REACT_APP_API_URL + 'product/all', {
			method: 'get',
			headers: {
				Authorization: `Bearer ${cookies?.token}`,
			},
		});
		let data = await res.json();
		setProducts(data);
	};

	// create product
	const handlerPost = async (values) => {
		setIsLoading(true);
		const formData = new FormData();
		//add image to formData
		formData.append('image', file[0], file[0].name);
		delete values['image'];

		//add data to formdata
		formData.append('data', JSON.stringify(values));
		let res = await fetch(
			process.env.REACT_APP_API_URL + 'product/create',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${cookies?.token}`,
				},
				body: formData,
			}
		);
		setIsLoading(false);
		form.resetFields();
	};

	let handlerUpdate = async (values) => {
		// setIsLoading(true);
		const formData = new FormData();
		//add image to formData
		if (values.image) {
			formData.append('image', file[0], file[0].name);
		}
		delete values['image'];
		//add data to formdata
		formData.append('data', JSON.stringify(values));
		try {
			let res = await fetch(
				process.env.REACT_APP_API_URL +
					`product/update?id=${rowSelect.id}`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${cookies?.token}`,
					},
					body: formData,
				}
			);
			let dataT = await res.json();
			console.log(dataT);
			getAllProduct();
			setIsModalOpen(false);
		} catch {
			console.log('error');
		}

		// setIsLoading(false);
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
				encType={'multipart/form-data'}
			>
				<Form.Item
					label="Tên"
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
					label="Số lượng"
					name="stock"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
					]}
				>
					<InputNumber min={0} />
				</Form.Item>

				<Form.Item
					label="Giá"
					name="price"
					rules={[
						{
							required: true,
							message: 'Vui lòng không bỏ trống!',
						},
					]}
				>
					<InputNumber min={0} />
				</Form.Item>

				<Form.Item label="Thương hiệu" name="brandId">
					<Select>
						{brands.map((brand) => (
							<Select.Option value={brand.id} key={brand.id}>
								{brand.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					label="Mô tả"
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

				<Form.Item name="image" label="Ảnh sản phẩm">
					<input
						type="file"
						onChange={(e) => {
							setFile(e.target.files);
						}}
					/>
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
			<Table rowKey="id" dataSource={products} columns={columns} />
			<ModalProduct
				data={rowSelect}
				handleCancel={handleCancel}
				handleAdd={handlerUpdate}
				isModalOpen={isModalOpen}
				brands={brands}
			/>
		</>
	);
};

export default ManageProduct;
