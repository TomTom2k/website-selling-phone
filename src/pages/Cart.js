import React, { useEffect, useState } from 'react';
import { Button, List, message, Popover } from 'antd';

import CartItem from '../components/CartItem';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

const WrapperStyled = styled.div`
	width: 100%;
	min-height: calc(
		100vh - var(--default-layout-header-height) -
			var(--default-layout-footer-height)
	);
	padding: 2rem 0;

	display: flex;
	flex-direction: column;
	align-items: center;
`;
const ListStyled = styled(List)`
	width: 100%;
	max-width: var(--default-layout-max-width);

	.ant-list-items {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
`;
const ListItemStyled = styled(List.Item)`
	font-size: 1.125rem;
	cursor: pointer;

	:active {
		opacity: 0.6;
	}
`;

const Cart = () => {
	const [cookies] = useCookies(['user']);
	const [messageApi, contextHolder] = message.useMessage();
	const [cartItems, setCartItems] = useState([]);
	const [address, setAddress] = useState([]);
	const [addressId, setAddressId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getAllCartItem();
	}, []);
	let getAllCartItem = () => {
		fetch(process.env.REACT_APP_API_URL + 'cart-item', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${cookies?.token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setCartItems(data);
			});
	};
	let handlerPayBtn = async () => {
		if (cartItems.length === 0)
			messageApi.open({
				type: 'error',
				content: 'Giỏ hàng của bạn đang trống',
			});
		else if (addressId === null)
			messageApi.open({
				type: 'error',
				content: 'Vui lòng chọn địa chỉ',
			});
		else {
			setIsLoading(true);
			try {
				let res = await fetch(
					process.env.REACT_APP_API_URL + 'order/create',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${cookies?.token}`,
						},
						body: JSON.stringify({
							addressId: addressId,
						}),
					}
				);
				if (res.status === 200) {
					messageApi.open({
						type: 'success',
						content: 'Mua hàng thành công',
					});
				}
				getAllCartItem();
				setIsLoading(false);
			} catch {
				console.log('Mua hàng không thành công');
				setIsLoading(false);
			}
		}
	};

	// get all address of user
	useEffect(() => {
		getAllAddress();
	}, []);
	let getAllAddress = () => {
		fetch(process.env.REACT_APP_API_URL + 'address', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${cookies?.token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setAddress(data));
	};

	const AddressList = (
		<List
			dataSource={address}
			renderItem={(address) => (
				<ListItemStyled onClick={() => setAddressId(address.id)}>
					{[
						address.streeet,
						address.district,
						address.city,
						address.coutry,
					].join(', ')}
				</ListItemStyled>
			)}
		/>
	);

	return (
		<WrapperStyled>
			{contextHolder}
			<ListStyled
				dataSource={cartItems}
				loading={isLoading}
				renderItem={(item) => (
					<List.Item>
						<CartItem key={item.id} data={item} />
					</List.Item>
				)}
			/>
			<Popover content={AddressList} title="Chọn địa chỉ: ">
				<Button type="primary" onClick={handlerPayBtn}>
					Xác nhận mua hàng
				</Button>
			</Popover>
		</WrapperStyled>
	);
};

export default Cart;
