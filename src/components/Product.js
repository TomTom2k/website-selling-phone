import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Badge } from 'antd';
import { faCartShopping, faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import configs from '../configs';

const WrapperStyled = styled.div`
	width: 100%;
	padding: 1rem;
	border-radius: 1rem;
	position: relative;
	overflow: hidden;

	background-color: var(--background);
	box-shadow: 0 0 1rem rgba(24, 24, 36, 0.13);
	transition: all 0.2s linear;
	position: relative;

	:hover {
		box-shadow: 0 0 1rem rgba(24, 24, 36, 0.25);
		transform: scale(1.01);

		.icons {
			transform: translateX(0);
		}
	}
`;
const OutOfStockStyled = styled.div`
	position: absolute;
	top: 0;
	left: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;

	background-color: rgba(0, 0, 0, 0.1);

	p {
		width: 100%;
		background-color: var(--red);
		color: var(--white);
		font-weight: 500;
		font-size: 1.5rem;
		text-align: center;
	}
`;
const ImageStyled = styled.img`
	width: 100%;
	border-radius: 0.5rem;
	user-select: none;

	aspect-ratio: 4/3;
	object-fit: contain;
`;
const TitleStyled = styled.h4`
	margin: 0.5rem 0;
	color: var(--text-color);
`;
const InfoStyled = styled.div`
	display: flex;
	justify-content: space-between;
	color: var(--gray);
`;
const IconsStyled = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	margin-right: 1rem;
	position: absolute;
	right: 0;
	top: 0;

	transform: translateX(4rem);
	transition: all 0.2s linear;

	> * {
		background: var(--white);
		padding: 0.5rem;
		margin: 0.25rem 0;
		border-radius: 50%;
		width: 1rem;
		height: 1rem;

		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.13);
		transition: all 0.2s linear;
		:hover {
			transform: scale(1.1);
			background-color: var(--primary);
			color: var(--white);
			box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.26);
		}
	}
`;
const Product = ({ data }) => {
	let navigate = useNavigate();

	const handlerCartBtn = () => {
		navigate('/cart');
	};
	const handlerInfoBtn = () => {
		navigate(`/product/${data.id}`);
	};
	return (
		<WrapperStyled>
			<Link to={'/product/' + data.id}>
				<ImageStyled
					src={
						process.env.REACT_APP_API_URL +
						`product/${data.id}/image`
					}
				/>
				<TitleStyled>{data.name}</TitleStyled>
				<InfoStyled>
					<p>
						Giá:{' '}
						<span>{Intl.NumberFormat().format(data.price)}</span>
					</p>
					<p>
						Số lượng: <span>{data.stock}</span>
					</p>
				</InfoStyled>
			</Link>
			<IconsStyled className="icons">
				<FontAwesomeIcon
					icon={faCartShopping}
					onClick={handlerCartBtn}
				/>

				<FontAwesomeIcon icon={faInfo} onClick={handlerInfoBtn} />
			</IconsStyled>
			{data.stock === 0 && (
				<OutOfStockStyled>
					<p>HẾT HÀNG</p>
				</OutOfStockStyled>
			)}
		</WrapperStyled>
	);
};

export default Product;
