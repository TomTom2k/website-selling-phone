import { Tabs } from 'antd';
import styled from 'styled-components';
import {
	ManageBrand,
	ManageOrder,
	ManageProduct,
} from '../components/AdminTabs';

const WrapperStyled = styled.div`
	padding: 2rem 1rem;
`;

const items = [
	{
		key: 'product',
		label: `Các sản phẩm`,
		children: <ManageProduct />,
	},
	{
		key: 'brand',
		label: `Các thương hiệu`,
		children: <ManageBrand />,
	},
	{
		key: 'order',
		label: `Các hóa đơn`,
		children: <ManageOrder />,
	},
];

const AdminPage = () => {
	return (
		<WrapperStyled>
			<Tabs defaultActiveKey="1" items={items} />
		</WrapperStyled>
	);
};

export default AdminPage;
