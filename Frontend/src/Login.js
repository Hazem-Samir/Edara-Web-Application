import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles/Login.css'
import { incorrect } from "./JS/main";
import { useCookies } from 'react-cookie';
import { decryptData, encryptData } from "./Pages/FrontendEncryption";

const Login = () => {
	const navigate = useNavigate();


	const [data, setData] = useState({
        Email: '',
        Password: '',
    });
	const [cookies, setCookie] = useCookies(['user']);
	const Login = (event) => {
		event.preventDefault();
	};
	function check() {
		let data_encrypted = encryptData(data);
		console.log(data);

		// console.log(password_encrypted.length);
		axios.post('http://localhost:4000/Authentication', { data: data_encrypted})
			.then(res => {
				const decryptedData = JSON.parse(decryptData(res.data));
			setCookie('Name', decryptedData.name, { path: '/' });
			if (decryptedData.type === 'Admin')
			navigate("/A/Home");
			else navigate("/S/Home");
		}).catch(error => {
			incorrect("Email or Password Is Incorrect");
		})
	}

	return (
		<section className="section">

			<div className="loginContainer">
				<div className="incorrect"></div>
				<div className="loginform">
					<h2>Login Form</h2>
					<form onSubmit={(e) => Login(e)}>
						<div className="inputBox">
							<input id="email" type="email" required placeholder="Email" value={data.Email}
								onChange={(event) => { setData({...data,Email: event.target.value})}} />
						</div>
						<div className="inputBox">
							<input id="password" type="password" required placeholder="Password" value={data.Password}
								onChange={(event) => { setData({...data,Password: event.target.value}) }}
							/>
						</div>
						<div className="inputBox">
							<input type="submit" value="Login"
								onClick={() => { check() }} />
						</div>

					</form>
				</div>
			</div>
		</section>
	)
}

export default Login;