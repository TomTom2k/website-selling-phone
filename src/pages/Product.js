import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import {
	Col,
	Row,
	Form,
	InputNumber,
	Button,
	List,
	Avatar,
	Skeleton,
	message,
} from 'antd';
import styled from 'styled-components';

const WrapperStyled = styled.div`
	display: flex;
	justify-content: center;
`;
const ContainerStyled = styled.div`
	width: 100%;
	margin-top: 2rem;
	min-height: calc(100vh - var(--default-layout-header-height));
	max-width: var(--default-layout-max-width);
`;
const ImageStyled = styled.img`
	width: 100%;
	aspect-ratio: 4/3;
`;
const TitleStyled = styled.h2`
	font-size: 1.5rem;
	color: var(--text-color);
`;
const SubTitleStyled = styled.p`
	font-size: 1rem;
	color: var(--gray);

	margin-bottom: 0.5rem;
`;
const PriceStyled = styled.h4`
	font-size: 1.25rem;
	font-weight: 500;
`;
const DescriptionStyled = styled.p`
	margin-top: 1rem;

	text-indent: 2rem;
`;
const TextStyled = styled.h2`
	margin: 1rem 0;
`;

const data = [];

const Product = () => {
	let { productId } = useParams();
	let [cookies] = useCookies();
	const [messageApi, contextHolder] = message.useMessage();

	const [product, setProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(product);

	const success = () => {
		messageApi.open({
			type: 'success',
			content: 'Thêm sản phẩm thành công',
		});
	};
	const error = () => {
		messageApi.open({
			type: 'error',
			content: 'Thêm hàng không thành công',
		});
	};
	const warning = () => {
		messageApi.open({
			type: 'warning',
			content: 'Số lượng sản phẩm không đủ',
		});
	};

	// get info product
	useEffect(() => {
		setIsLoading(true);
		fetch(process.env.REACT_APP_API_URL + `product/${productId}`)
			.then((res) => res.json())
			.then((data) => setProduct(data));
		setIsLoading(false);
	}, []);

	// click add cart item
	let handlerAddToCart = async (values) => {
		let res = await fetch(
			process.env.REACT_APP_API_URL + 'cart-item/create',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies?.token}`,
				},
				body: JSON.stringify({
					productId: product.id,
					quantity: values.quantity,
				}),
			}
		);
		let data = await res.json();
		if (res.status === 200) success();
		else if (res.status === 404) warning();
		else error();
	};

	return (
		<WrapperStyled>
			{contextHolder}
			<ContainerStyled>
				{product === null || isLoading ? (
					<Skeleton active />
				) : (
					<Row gutter={24}>
						<Col span={12}>
							<ImageStyled
								src={
									process.env.REACT_APP_API_URL +
									`product/${productId}/image`
								}
								alt=""
							/>
						</Col>
						<Col span={12}>
							<TitleStyled>{product.name}</TitleStyled>
							<SubTitleStyled>
								{product.brand.name}
							</SubTitleStyled>
							<PriceStyled>
								<span>Giá: </span>
								{Intl.NumberFormat().format(product.price)}
							</PriceStyled>
							<Form
								name="basic"
								onFinish={handlerAddToCart}
								initialValues={{ quantity: 1 }}
							>
								<Form.Item label="Số lượng" name="quantity">
									<InputNumber min={1} />
								</Form.Item>

								<Form.Item>
									<Button type="primary" htmlType="submit">
										Thêm vào giỏ hàng
									</Button>
								</Form.Item>
							</Form>
							<DescriptionStyled>
								{product?.description}
							</DescriptionStyled>
						</Col>
					</Row>
				)}

				<Row>
					<TextStyled>Các bình luận</TextStyled>
				</Row>
				<Row>
					<Col span={24}>
						<List
							itemLayout="horizontal"
							dataSource={data}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										avatar={<Avatar src={item.avatar} />}
										title={item.title}
										description="Ant Design, a design language for background applications, is refined by Ant UED Team"
									/>
								</List.Item>
							)}
						/>
					</Col>
				</Row>
			</ContainerStyled>
		</WrapperStyled>
	);
};

export default Product;
