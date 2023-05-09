import React, { useEffect, useState } from 'react';

import { List } from 'antd';
import styled from 'styled-components';

import Product from '../components/Product';

const WrapperStyled = styled.div`
	display: flex;
`;
const ListBrandStyled = styled.aside`
	width: 15rem;
	height: calc(100vh - var(--default-layout-header-height));
	padding: 2rem 1rem;
	padding-left: 2rem;
	border-right: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.15);

	position: fixed;
	left: 0;
	z-index: 1;

	background-color: var(--white);
`;
const NameBrandStyled = styled.p`
	padding: 0.5rem 0;
	cursor: pointer;
	user-select: none;

	font-size: 1.125rem;
	font-weight: 500;
	color: var(--text-color);

	transition: all 0.2s linear;
	:hover {
		transform: translateX(1rem);
	}
	:active {
		color: var(--primary);
	}
`;
const ListStyled = styled(List)`
	min-height: calc(
		100vh - var(--default-layout-header-height) -
			var(--default-layout-footer-height)
	);
	.ant-list-items {
		width: calc(100% - 15rem) !important;
		margin-left: 15rem;
		padding: 2rem 1rem;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
`;

const ListProduct = () => {
	const [listProduct, setListProduct] = useState([]);
	const [productsRender, setProductsRender] = useState([]);
	const [brands, setBrands] = useState([]);
	const [brand, setBrand] = useState(-1);
	// get list brand
	useEffect(() => {
		fetch(process.env.REACT_APP_API_URL + 'brand')
			.then((res) => res.json())
			.then((data) => setBrands(data));
	}, []);
	// get list product
	useEffect(() => {
		fetch(process.env.REACT_APP_API_URL + 'product/views')
			.then((res) => res.json())
			.then((data) => {
				setListProduct(data);
			});
	}, []);
	// filter product
	useEffect(() => {
		if (brand === -1) setProductsRender(listProduct);
		else {
			let data = listProduct.filter(
				(product) => product.brand.id === brand
			);
			setProductsRender(data);
		}
	}, [brand, listProduct]);

	//set brand select
	let handlerBrand = (id) => {
		setBrand(id);
	};
	return (
		<WrapperStyled>
			<ListBrandStyled>
				<NameBrandStyled onClick={() => handlerBrand(-1)}>
					Tất cả
				</NameBrandStyled>
				{brands?.map((br, index) => (
					<NameBrandStyled
						key={index}
						onClick={() => handlerBrand(br.id)}
					>
						{br.name}
					</NameBrandStyled>
				))}
			</ListBrandStyled>
			<ListStyled
				dataSource={productsRender}
				renderItem={(product) => (
					<List.Item>
						<Product key={product.id} data={product} />
					</List.Item>
				)}
			/>
		</WrapperStyled>
	);
};

export default ListProduct;
