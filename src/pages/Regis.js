import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { Link } from 'react-router-dom';
import configs from '../configs';
import { AuthToken } from '../AuthToken/AuthToken';

const { Option } = Select;

const WrapperStyled = styled.div``;
const TitleStyled = styled.h2`
	width: 100%;
	text-align: center;
	letter-spacing: 0.2rem;
	font-size: 1.75rem;
	font-weight: 500;
	color: var(--primary);
`;
const ContainerStyled = styled(Form)`
	margin-top: 1.5rem;
`;
const LinkStyled = styled(Link)`
	color: var(--primary);
	font-weight: 500;
`;
const Regis = () => {
	const { regis } = useContext(AuthToken);
	const [isLoading, setIsLoading] = useState(false);
	const onFinish = async (values) => {
		const data = {
			birthday: values.birthday.$d.toISOString(),
			email: values.email,
			fullName: values.fullname,
			password: values.password,
			phoneNumber: values.phone,
			username: values.username,
		};
		setIsLoading(true);
		await regis(data);
		setIsLoading(false);
	};
	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select
				style={{
					width: 70,
				}}
			>
				<Option value="84">+84</Option>
			</Select>
		</Form.Item>
	);
	return (
		<WrapperStyled>
			<TitleStyled>Đăng ký</TitleStyled>
			<ContainerStyled
				disabled={isLoading}
				onFinish={onFinish}
				scrollToFirstError
			>
				<Form.Item
					label="Họ và tên"
					name="fullname"
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập họ tên của bạn',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Ngày sinh"
					name="birthday"
					rules={[
						{
							required: true,
							message:
								'Vui lòng chọn ngày tháng năm sinh của bạn',
						},
					]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item
					name="phone"
					label="Phone Number"
					rules={[
						{
							required: true,
							message: 'Please input your phone number!',
						},
					]}
				>
					<Input
						style={{
							width: '100%',
						}}
					/>
				</Form.Item>
				<Form.Item
					label="Tài khoản"
					name="username"
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập tài khoản của bạn',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							type: 'email',
							message: 'Vui lòng nhập đúng email',
						},
						{
							required: true,
							message: 'Vui lòng nhập email của bạn',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập khẩu của bạn',
						},
						{
							validator: async (_, password) => {
								var formatPassw =
									/^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/;
								if (!password.match(formatPassw)) {
									return Promise.reject(
										new Error(
											'Mật khẩu có ít nhất 8 kí tự, phải có chữ hoa, chữ thường, số và ký tự đặt biệt'
										)
									);
								}
							},
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label="Nhập lại"
					name="entry-password"
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập lại mật khẩu',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (
									!value ||
									getFieldValue('password') === value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('Vui lòng nhập lại đúng mật khẩu')
								);
							},
						}),
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
						Đăng ký
					</Button>
				</Form.Item>
				<Form.Item>
					<p>
						Đăng nhập ngay{' '}
						<LinkStyled to={configs.routes.login}>
							tại đây
						</LinkStyled>
					</p>
				</Form.Item>
			</ContainerStyled>
		</WrapperStyled>
	);
};

export default Regis;
