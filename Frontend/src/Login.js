import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles/Login.css'
import { incorrect } from "./JS/main";
import { useCookies } from 'react-cookie';
const Login = () => {
	const navigate = useNavigate();


	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cookies, setCookie] = useCookies(['user']);
	const Login = (event) => {
		event.preventDefault();
	};

	function check() {
		axios.post('http://localhost:4000/Authentication', { Email: email, Password: password })
			.then(res => {
				console.log(res);
				setCookie('Token', res.data.token, { path: '/' });
				setCookie('Name', res.data.name, { path: '/' });
				if (res.data.type === 'Admin')
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
							<input id="email" type="email" required placeholder="Email" value={email}
								onChange={(event) => { setEmail(event.target.value) }} />
						</div>
						<div className="inputBox">
							<input id="password" type="password" required placeholder="Password" value={password}
								onChange={(event) => { setPassword(event.target.value) }}
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