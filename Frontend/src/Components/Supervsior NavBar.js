import { Link, NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Stack from "@mui/material/Stack";
import Avatar from '@mui/material/Avatar';
import logo from '../idea.png';
// import { TbLogout } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";

function SupervisorNavBar() {
    const navigate = useNavigate();
    const supervisorRoutes = [
        {
            id: 1,
            route: 'Home',
            path: '/S/Home',
            className: 'fa fa-home'
        },
        {
            id: 2,
            route: 'My Requests History',
            path: '/S/My Requests History',
            className: 'fa fa-history'
        }
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
                    {/* <ul>
                        <li><Link to="/S/Home"><i className="fa fa-home" aria-hidden="true"></i> Home</Link>
                        </li>
                        <li><Link to="/S/My Requests History"><i className="fa fa-history" aria-hidden="true"></i> My Requests History</Link></li>
                    </ul> */}
                    <Stack direction='row' spacing={3}>
                        {
                            supervisorRoutes.map((subpage) => (
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
                    <p style={{paddingRight:'10px'}}>Hello, {Cookies.get('Name')} </p>
                    <div onClick={()=>Logout()} className="logout-icon">
                        <IoLogOutOutline/>
                    </div>
                </div>
            </nav>
        </header >
    );
}

export default SupervisorNavBar