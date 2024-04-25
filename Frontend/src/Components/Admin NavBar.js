import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios"
import { useNavigate } from "react-router-dom";

function AdminNavBar() {
    const navigate = useNavigate();
    function Logout() {
        axios.put('http://localhost:4000/Authentication', {
            params: {
                Token: Cookies.get('Token'),
            }
        })
            .then(res => {
                Cookies.remove('Name');
                Cookies.remove('Token');
                Cookies.remove('connect.sid');
                navigate("/");
            })
            .catch(err => console.log("msh sh8ala", err))
        
    }
    return (
        <header>
            <nav className="container">

                <h1>Edara</h1>
                <div className="links">
                    <span className="menu-icon">

                        <span></span>
                        <span></span>
                        <span></span>


                    </span>
                    <ul>
                        <li><Link to="/A/Home"><i className="fa fa-home" aria-hidden="true"></i> Home</Link>
                        </li>
                        <li><Link to="/A/Warehouses Management"><i className="fa fa-building" aria-hidden="true"></i> Warehouses</Link></li>
                        <li><Link to="/A/Supervisors Management"><i className="fa fa-users" aria-hidden="true"></i> Supervisors</Link>
                        </li>
                        <li><Link to="/A/Requests History"><i className="fa fa-history" aria-hidden="true"></i> Requests History</Link></li>
                    </ul>
                </div>
                <div className="user">


                    <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i> 

                    <p>Hello, {Cookies.get('Name')} </p>
                    <ul>
                        {/* <li><Link to="#"> <i className="fa fa-gear"></i> Settings</Link></li> */}
                        <li><button className="logout" onClick={() => { Logout(); }}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</button></li>
                    </ul>
                </div>
            </nav>
        </header >
    );
}

export default AdminNavBar