import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export let AuthToken = createContext();

const AuthProvide = ({ children }) => {
	let navigate = useNavigate();
	const [cookies, setCookie, removeCookie] = useCookies(['user']);

	let [role, setRole] = useState(
		sessionStorage.getItem('role')
			? JSON.parse(sessionStorage.getItem('role'))
			: null
	);
	let [user, setUser] = useState(null);

	// get info user
	useEffect(() => {
		getInfoDetail();
	}, []);
	let getInfoDetail = async () => {
		let res = await fetch(
			process.env.REACT_APP_API_URL + 'account/info-detail',
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${cookies?.token}`,
				},
			}
		);
		let data = await res.json();
		if (res.status === 200) {
			setUser(data);
			setRole(data.role);
			sessionStorage.setItem('role', JSON.stringify(data.role));
		}
	};

	//login user
	let login = async (data) => {
		let res = await fetch(process.env.REACT_APP_API_URL + 'account/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		let resData = await res.json();
		if (res.status === 200) {
			setCookie('token', resData.token, { path: '/' });
			setUser(resData);
			setRole(resData.role);
			sessionStorage.setItem('role', JSON.stringify(resData.role));
			navigate('/');
		} else {
			alert('Đăng nhập không thành công');
		}
	};
	// logout user
	let logout = () => {
		setRole(null);
		setUser(null);
		removeCookie('token');
		sessionStorage.removeItem('role');
		navigate('/login');
	};

	// register user
	let regis = async (data) => {
		try {
			let res = await fetch(
				process.env.REACT_APP_API_URL + 'account/register/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);
			if (res.status === 200) navigate('/login');
			else alert('Đăng ký không thành công');
		} catch {
			alert('Đăng ký không thành công');
		}
	};
	let authData = {
		user: user,
		setUser: setUser,
		role: role,

		login: login,
		logout: logout,
		regis: regis,
	};
	return <AuthToken.Provider value={authData}>{children}</AuthToken.Provider>;
};

export default AuthProvide;
