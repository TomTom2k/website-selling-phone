import {
	faHandHoldingHeart,
	faPaste,
	faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { Carousel, Skeleton } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import images from '../assets';
import Feature from '../components/Feature';
import Product from '../components/Product';

const WrapperStyled = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;
const SliderStyled = styled.div`
	width: 100%;
	max-width: var(--default-layout-max-width);
`;
const ItemStyled = styled(Link)`
	width: 100%;
	aspect-ratio: 3/1.25;
	background-color: var(--gray);

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
const SkeletonStyled = styled(Skeleton)`
	width: 100%;
	padding: 2rem;
	aspect-ratio: 3/1.25;
	background-color: rgba(30, 29, 29, 0.091);
`;
const FeatureStyled = styled.div`
	margin: var(--default-layout-vertical-space) 0;
	width: 100%;
	max-width: var(--default-layout-max-width);
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 1rem;
`;
const ProductListStyled = styled.div`
	margin: var(--default-layout-vertical-space) 0;
	max-width: var(--default-layout-max-width);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: var(--primary);
`;
const TitleStyled = styled.h3`
	font-size: 1.5rem;
	margin-bottom: 2rem;
`;
const ListStyled = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1.5rem;
`;
const EventItems = [
	{
		image: images.event1,
		to: '#',
	},
	{
		image: images.event2,
		to: '#',
	},
];
const Home = () => {
	const [listProduct, setListProduct] = useState([]);
	const [listEvent, setListEvent] = useState([]);
	useEffect(() => {
		setListEvent(EventItems);
	}, []);
	useEffect(() => {
		fetch(process.env.REACT_APP_API_URL + 'product/views')
			.then((res) => res.json())
			.then((data) => setListProduct(data));
	}, []);
	return (
		<WrapperStyled>
			<SliderStyled autoplay>
				{listEvent.length === 0 ? (
					<SkeletonStyled active />
				) : (
					<Carousel>
						{listEvent.map((item, index) => (
							<ItemStyled key={index} to={item.to}>
								<img src={item.image} alt="" />
							</ItemStyled>
						))}
					</Carousel>
				)}
			</SliderStyled>
			<FeatureStyled>
				<Feature
					icon={faTruck}
					title="GIAO HÀNG TOÀN QUỐC"
					paragraph="Thời gian giao hàng linh động từ 3 - 4 - 5 ngày tùy khu vực, đôi khi sẽ nhanh hơn hoặc chậm hơn. Mong Quý Khách hàng thông cảm và cố gắng đợi hàng giúp shop."
				/>
				<Feature
					icon={faHandHoldingHeart}
					title="GIAO HÀNG NHẬN TIỀN VÀ KIỂM KÊ ĐƠN HÀNG"
					paragraph="Được phép kiểm hàng trước khi thanh toán. Lưu ý: Trường hợp Quý Khách hàng đã nhận hàng về nhà, vui lòng quay video unbox đơn hàng trong tình trạng nguyên vẹn để có căn cứ xác thực đơn hàng gặp phải vấn đề, trường hợp không có video shop không thể hỗ trợ."
				/>
				<Feature
					icon={faPaste}
					title="CHÍNH SÁCH ĐỔI TRẢ HÀNG"
					paragraph="Sản phẩm được phép đổi hàng trong vòng 36h nếu phát sinh lỗi từ nhà sản xuất (Yêu cầu: hình ảnh phần bị lỗi rõ nét, chi tiết và đầy đủ)."
				/>
			</FeatureStyled>
			<ProductListStyled>
				<TitleStyled>Sản phẩm nổi bật</TitleStyled>
				<ListStyled>
					{listProduct.length === 0
						? [1, 2, 3, 4].map((item) => <Skeleton key={item} />)
						: listProduct
								.slice(0, 12)
								.map((product, index) => (
									<Product key={index} data={product} />
								))}
				</ListStyled>
			</ProductListStyled>
		</WrapperStyled>
	);
};

export default Home;
