import configs from '../configs';

import Home from '../pages/Home';
import ListProduct from '../pages/ListProduct';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Regis from '../pages/Regis';
import FormLayout from '../layouts/FormLayout';
import ForgetPassword from '../pages/ForgetPassword';
import AdminPage from '../pages/AdminPage';

const publicRoutes = [
	{
		path: configs.routes.home,
		component: Home,
	},
	{
		path: configs.routes.listProduct,
		component: ListProduct,
	},
	{
		path: configs.routes.product,
		component: Product,
	},
	{
		path: configs.routes.cart,
		component: Cart,
	},

	{
		path: configs.routes.forgotPassword,
		component: ForgetPassword,
		layout: null,
	},
];

const privateRoutes = [
	{
		path: configs.routes.login,
		component: Login,
		layout: FormLayout,
		role: [],
		redirect: configs.routes.profile,
	},
	{
		path: configs.routes.regis,
		component: Regis,
		layout: FormLayout,
		role: [],
		redirect: configs.routes.profile,
	},
	{
		path: configs.routes.profile,
		component: Profile,
		role: [configs.roles.user, configs.roles.admin, configs.roles.staff],
		redirect: configs.routes.login,
	},
	{
		path: configs.routes.cart,
		component: Cart,
		role: [configs.roles.user, configs.roles.admin, configs.roles.staff],
		redirect: configs.routes.login,
	},
	{
		path: configs.routes.admin,
		component: AdminPage,
		layout: null,
		role: [configs.roles.admin, configs.roles.staff],
		redirect: configs.routes.home,
	},
];

export { publicRoutes, privateRoutes };
