import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { List, Input, Form, Button, Row, Col } from 'antd';
import styled from 'styled-components';

const FormStyled = styled(Form)`
	padding: 1rem;
	border-right: 1px solid #dfdfdf;
`;
const ListItemStyled = styled(List.Item)`
	font-size: 1.125rem;
`;

const Address = () => {
	const [cookies] = useCookies(['user']);
	const [addressList, setAddressList] = useState([]);

	// get all address of user
	useEffect(() => {
		getAllAddress();
	}, []);

	let getAllAddress = async () => {
		let res = await fetch(process.env.REACT_APP_API_URL + 'address', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${cookies?.token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setAddressList(data));
	};

	// post address when submit
	let handlerPostAddress = async (values) => {
		await fetch(process.env.REACT_APP_API_URL + 'address/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${cookies?.token}`,
			},
			body: JSON.stringify(values),
		});
		getAllAddress();
	};

	return (
		<Row gutter={40}>
			<Col span={10}>
				<FormStyled
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					onFinish={handlerPostAddress}
				>
					<h3>Thêm địa chỉ của bạn</h3>
					<Form.Item
						label="Đường"
						name="street"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Quận/huyện"
						name="district"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Tỉnh"
						name="city"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Quốc gia"
						name="coutry"
						rules={[
							{
								required: true,
								message: 'Vui lòng không bỏ trống',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Thêm
						</Button>
					</Form.Item>
				</FormStyled>
			</Col>

			<Col span={14}>
				<List
					header={<h3>Địa chỉ của bạn</h3>}
					dataSource={addressList}
					renderItem={(address) => (
						<ListItemStyled>
							{[
								address.streeet,
								address.district,
								address.city,
								address.coutry,
							].join(', ')}
						</ListItemStyled>
					)}
				/>
			</Col>
		</Row>
	);
};

export default Address;
