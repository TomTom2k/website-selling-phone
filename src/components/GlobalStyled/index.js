import PropTypes from 'prop-types';
import { ConfigProvider } from 'antd';

import './GlobalStyled.css';

const GlobalStyled = ({ children }) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#5b507a',
				},
			}}
		>
			{children}
		</ConfigProvider>
	);
};

GlobalStyled.propTypes = {
	children: PropTypes.node.isRequired,
};

export default GlobalStyled;
