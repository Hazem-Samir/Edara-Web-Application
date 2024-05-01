import { Link, NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { IoLogOutOutline } from "react-icons/io5";

import logo from '../idea.png';
function AdminNavBar() {
    const navigate = useNavigate();
    const adminRoutes = [
        {
            id: 1,
            route: 'Home',
            path: '/A/Home',
            className: 'fa fa-home'
        },
        {
            id: 2,
            route: 'Warehouses',
            path: '/A/Warehouses Management',
            className: 'fa fa-building'
        },
        {
            id: 3,
            route: 'Supervisors',
            path: '/A/Supervisors Management',
            className: 'fa fa-users'
        },
        {
            id: 4,
            route: 'Requests History',
            path: '/A/Requests History',
            className: 'fa fa-history'
        },
    ]
    function Logout() {
        axios.put('http://localhost:4000/Authentication', {
            // params: {
            //     Token: Cookies.get('Token'),
            // }
            Token: Cookies.get('Token')
        })
            .then(res => {
                console.log(Cookies.get());
                Cookies.remove('Name');
                Cookies.remove('Token');
                Cookies.remove("'connect.sid'");
                navigate("/");
            })
            .catch(err => console.log("msh sh8ala", err))
        
    }
    return (
        <header>
            <nav className="container">
                <Stack direction='row' spacing={2}>
                    <img src={logo} alt="logo" width={40} height={40}/>
                    <p className="web-title">Edara</p>
                </Stack>
                <div className="links">
                    <span className="menu-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                    <Stack direction='row' spacing={3}>
                        {
                            adminRoutes.map((subpage) => (
                                    <NavLink to={subpage.path} key={subpage.route} className="route" activeClassName='active'>
                                        <Stack direction='row' spacing={1}>
                                            <i className={subpage.className} aria-hidden="true"></i>  <p>{subpage.route}</p>
                                        </Stack>
                                    </NavLink>
                            ))
                        }
                    </Stack>
                </div>
                <div className="user">
                    {/* <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>  */}
                    {/* <Avatar sx={{ width: 35, height: 35 }}   alt={Cookies.get('Name')} src="/static/images/avatar/1.jpg" /> */}
                    {/* <ul> */}
                        {/* <li><button className="logout" onClick={() => { Logout(); }}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</button></li> */}
                    {/* 
                    </ul> */}
                    <p style={{paddingRight:'10px'}}>Hello, {Cookies.get('Name')} </p>
                    <div onClick={()=>Logout()} className="logout-icon">
                        <IoLogOutOutline/>
                    </div>
                </div>
            </nav>
        </header >
    );
}

export default AdminNavBar