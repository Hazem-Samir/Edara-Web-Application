import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios"

function SupervisorNavBar() {
    const navigate = useNavigate();
    function Logout() {
        axios.put('http://localhost:4000/Authentication', {
            params: {
                Token: Cookies.get('Token'),
            }
        })
            .then(res => {
                console.log(res)
                Cookies.remove('Name');
                Cookies.remove('Token');
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
                        <li><Link to="/S/Home"><i className="fa fa-home" aria-hidden="true"></i> Home</Link>
                        </li>
                        <li><Link to="/S/My Requests History"><i className="fa fa-history" aria-hidden="true"></i> My Requests History</Link></li>
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

export default SupervisorNavBar