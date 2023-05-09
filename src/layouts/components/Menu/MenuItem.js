import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const LinkStyled = styled(Link)`
	font-size: 1.125rem;
	font-weight: 500;
`;
const LinkActiveStyled = styled(LinkStyled)`
	color: var(--primary) !important;
`;

const MenuItem = ({ item }) => {
	const location = useLocation();

	const Nav = location.pathname === item.path ? LinkActiveStyled : LinkStyled;
	return <Nav to={item.path}>{item.label}</Nav>;
};

export default MenuItem;
