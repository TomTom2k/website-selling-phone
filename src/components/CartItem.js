import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import React from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

const WrapperStyled = styled.div`
	margin-bottom: 0.5rem;
	padding: 1rem;
	border-radius: 1rem;
	width: 100%;

	overflow: hidden;
	background-color: var(--background);
	box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
`;
const ImageStyled = styled.div`
	width: 100%;
	max-width: 8rem;
	padding: 0.5rem;
	border-radius: 0.5rem;
	aspect-ratio: 1/1;
	background-color: var(--white);
	box-shadow: 1px 1px 0.5rem rgba(0, 0, 0, 0.05);

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
const TitleStyled = styled.h2`
	font-size: 1.25rem;
	margin-bottom: 0.5rem;
	color: var(--text-color);
`;
const QuantityStyled = styled.p`
	color: var(--gray);
`;
const PriceStyled = styled.p`
	font-size: 1.125rem;
	color: var(--text-color);
	font-weight: 500;
`;
const DeleteStyled = styled.p`
	width: calc(100% + 2rem);
	height: calc(100% + 2rem);
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--white);
	font-size: 1.5rem;
	background-color: var(--red);
	margin: -1rem;
	padding: -1rem;

	:hover {
		opacity: 0.5;
		cursor: pointer;
	}
`;
const CartItem = ({ data }) => {
	const [cookies] = useCookies(['user']);
	const handlerDeleteCartItem = async () => {
		await fetch(
			process.env.REACT_APP_API_URL + `cart-item/delete?id=${data.id}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${cookies?.token}`,
					'Content-Type': 'application/json',
				},
			}
		);
		window.location.reload();
	};
	return (
		<WrapperStyled>
			<Row justify="space-between">
				<Col span={8}>
					<ImageStyled>
						<img
							src={
								process.env.REACT_APP_API_URL +
								`product/${data?.product.id}/image`
							}
							alt=""
						/>
					</ImageStyled>
				</Col>
				<Col span={14}>
					<TitleStyled>{data.product.name}</TitleStyled>
					<QuantityStyled>Số lượng: {data.quantity}</QuantityStyled>

					<PriceStyled>
						{Intl.NumberFormat().format(data.price)} VND
					</PriceStyled>
				</Col>
				<Col span={1}>
					<DeleteStyled onClick={handlerDeleteCartItem}>
						<FontAwesomeIcon icon={faTimes} />
					</DeleteStyled>
				</Col>
			</Row>
		</WrapperStyled>
	);
};

export default CartItem;
