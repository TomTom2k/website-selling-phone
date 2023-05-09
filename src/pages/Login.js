import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import configs from '../configs';
import { AuthToken } from '../AuthToken/AuthToken';

const WrapperStyled = styled.div``;
const TitleStyled = styled.h2`
	width: 100%;
	text-align: center;
	letter-spacing: 0.1rem;
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
const Login = () => {
	let { login } = useContext(AuthToken);
	const [isLoading, setIsLoading] = useState(false);

	let onFinish = async (values) => {
		setIsLoading(true);
		await login(values);
		setIsLoading(false);
	};

	return (
		<WrapperStyled>
			<TitleStyled>Đăng nhập</TitleStyled>
			<ContainerStyled disabled={isLoading} onFinish={onFinish}>
				<Form.Item
					label="Tài khoản"
					name="username"
					rules={[
						{
							message: 'Vui lòng nhập tài khoản của bạn',
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
							message: 'Please input your username!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item>Quên mật khẩu</Form.Item>
				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
						Đăng nhập
					</Button>
				</Form.Item>
				<Form.Item>
					<p>
						Tạo tài khoản ngay{' '}
						<LinkStyled to={configs.routes.regis}>
							tại đây
						</LinkStyled>
					</p>
				</Form.Item>
			</ContainerStyled>
		</WrapperStyled>
	);
};

export default Login;
