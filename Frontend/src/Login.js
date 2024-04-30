import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { decryptData, encryptData } from "./Pages/FrontendEncryption";
import Input from '@mui/joy/Input';
import { FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Stack from '@mui/material/Stack';
import { FaKey } from "react-icons/fa";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ Email: '', Password: '' });
    const [cookies, setCookie] = useCookies(['user']);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        check();
    };

    const check = () => {
        let data_encrypted = encryptData(data);
        console.log(data);

        axios.post('http://localhost:4000/Authentication', { data: data_encrypted})
            .then(res => {
                const decryptedData = JSON.parse(decryptData(res.data));
                setCookie('Name', decryptedData.name, { path: '/' });
                setCookie('Token', decryptedData.token, { path: '/' });
                if (decryptedData.type === 'Admin')
                    navigate("/A/Home");
                else
                    navigate("/S/Home");
            })
            .catch(error => {
                setErrorMessage('Email or password is incorrect');
            });
    };

    return (
        <section className="section">
            <div className="loginContainer">
                <div className="loginform">
                    <h2>Login </h2>
                    <form onSubmit={handleLogin}>
                        <Stack direction='column' spacing={5} pb={3}>
                            <Input 
                                startDecorator={<MdOutlineAlternateEmail />} 
                                variant="plain" 
                                color="neutral" 
                                id="email" 
                                type="email" 
                                required 
                                placeholder="Email" 
                                value={data.Email}
                                onChange={(event) => setData({ ...data, Email: event.target.value })}
                            />
                            <Input
                                placeholder="Password"
                                id="password"
                                type="password"
                                required 
                                startDecorator={<FaKey />}
                                variant="plain"
                                color="neutral"
                                value={data.Password}
                                onChange={(event) => setData({ ...data, Password: event.target.value })}
                            />
                            <Button variant="contained" type="submit">Login</Button>
                        </Stack>
                    </form>
                    {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
                </div>
            </div>
        </section>
    );
};

export default Login;
