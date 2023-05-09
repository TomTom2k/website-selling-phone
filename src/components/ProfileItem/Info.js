import React, { useContext, useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, Space } from 'antd';
import styled from 'styled-components';
import { AuthToken } from '../../AuthToken/AuthToken';
import { useCookies } from 'react-cookie';

const WrapperStyled = styled.div`
	width: 100%;
	max-width: 25rem;
`;
const ContainerStyled = styled.div`
	margin-bottom: 1rem;
`;
const ItemStyled = styled.p`
	display: grid;
	grid-template-columns: 0.5fr 1fr;
	font-size: 1rem;
	margin-bottom: 0.5rem;
	span {
		font-weight: 500;
		margin-right: 1rem;
	}
`;
const Info = () => {
	const { user, setUser } = useContext(AuthToken);
	const [cookies] = useCookies(['user']);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const onFinish = async (values) => {
		let newUser = {
			...user,
			birthday: values.birthday.$d.toISOString(),
			email: values.email,
			phoneNumber: values.phoneNumber,
		};
		try {
			let res = await fetch(
				process.env.REACT_APP_API_URL + 'account/update_info',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${cookies?.token}`,
					},
					body: JSON.stringify(newUser),
				}
			);
			setUser(newUser);
			setIsModalOpen(false);
		} catch {
			alert('Thay đổi thông tin không thanh công');
			setIsModalOpen(false);
		}
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<WrapperStyled>
				<ContainerStyled>
					<ItemStyled>
						<span>Email: </span>
						{user?.email}
					</ItemStyled>
					<ItemStyled>
						<span>SĐT: </span>
						{user?.numberPhone}
					</ItemStyled>
					<ItemStyled>
						<span>Ngày sinh: </span>
						{user?.birthday.slice(0, 10)}
					</ItemStyled>
				</ContainerStyled>

				<Button type="primary" onClick={showModal}>
					Sửa thông tin
				</Button>
			</WrapperStyled>
			<Modal title="Sửa thông tin" open={isModalOpen} footer={[]}>
				<Form onFinish={onFinish}>
					<Form.Item
						label="SĐT"
						name="numberPhone"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Input placeholder="+8424363663" />
					</Form.Item>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<Input placeholder="abcxyz@gmail.com" />
					</Form.Item>
					<Form.Item
						label="Ngày sinh"
						name="birthday"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống!',
							},
						]}
					>
						<DatePicker placeholder="26/03/2004" />
					</Form.Item>
					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Space>
							<Button type="primary" htmlType="submit">
								Lưu
							</Button>
							<Button onClick={handleCancel}>Hủy</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Info;
