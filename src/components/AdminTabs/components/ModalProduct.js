import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, Select, Space } from 'antd';
import { useCookies } from 'react-cookie';

const ModalProduct = ({
	data,
	isModalOpen = false,
	handleCancel,
	handleAdd,
	brands,
}) => {
	const [cookies] = useCookies(['user']);
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const initialValues = {
		brandId: data?.brand.id,
		description: data?.description,
		name: data?.name,
		price: data?.price,
		stock: data?.stock,
	};

	return (
		<Modal title="Thông tin sản phẩm" open={isModalOpen} footer={[]}>
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
				disabled={isLoading}
				onFinish={handleAdd}
				encType={'multipart/form-data'}
				initialValues={initialValues}
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
						{brands?.map((brand) => (
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
					<Space>
						<Button type="primary" htmlType="submit">
							Thêm
						</Button>
						<Button onClick={handleCancel}>Hủy</Button>
					</Space>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ModalProduct;
