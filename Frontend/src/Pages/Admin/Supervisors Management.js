import { useEffect, useState } from 'react';
import { closeform, closeupdateform, showform, updateform } from '../../JS/main'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { encryptData } from '../FrontendEncryption';
axios.defaults.withCredentials = true
let PID;
function SupervisorsManagement() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        Name: '',
        Email: '',
        Password: '',
        Phone: '',
    });

    // const [Name, setName] = useState("");
    // const [Email, setEmail] = useState("");
    // const [Password, setPassword] = useState("");
    // const [Phone, setPhone] = useState("");
    const [supervisors, getsuperviosrs] = useState([]);
    const [reload, setreload] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:4000/supervisors/')
            .then(res => {
                console.log(res.data);
                getsuperviosrs(res.data)
            })
            .catch(err => navigate("/"))

    }, [reload])

    function InsertData() {
        let data_encrypted = encryptData(data);
        console.log(encryptData(data));
        axios.post('http://localhost:4000/supervisors/', { data:data_encrypted })
            .then(res => {
                console.log(res.data);
                // window.location.reload(false);
                closeform();
                setreload(!reload);
                setData({});
            })
            .catch(err => console.log("msh sh8ala", err))
    }

    function DeleteSupervisor(ID) {
        axios.delete(`http://localhost:4000/supervisors/${ID}`)
            .then(res => {
                console.log(res);
                // window.location.reload(false);
                setreload(!reload);

            })
            .catch(err => console.log("msh sh8ala", err))
    }
    function Update(ID) {
        PID = ID;
        updateform();
    }
    function UpdateData() {
        axios.put('http://localhost:4000/supervisors', {

            Name: data.Name,
            Email: data.Email,
            Password: data.Password,
            Phone: data.Phone,
            PID: PID

        })
            .then(res => {
                console.log(res);
                setData({});
                // window.location.reload(false);
                closeupdateform();
                setreload(!reload);

            })
            .catch(err => console.log("msh sh8ala", err))
    }
    return (
        <section>
            <div className="page-name">
                <h2>Supervisors Management</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem similique aliquam mollitia necessitatibus
                </p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Edit Info</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        supervisors.map((Data, i) => {

                            return (
                                <tr key={i}>
                                    <td>{Data.Name}</td>
                                    <td>{Data.Email}</td>
                                    <td>{Data.Password}</td>
                                    <td>{Data.Phone}</td>
                                    <td>{Data.Status ? "Active" : "In-Active"}</td>
                                    <td>
                                        <div className="buttons"><button className="button" style={{ margin: 10 + 'px' }} onClick={() => { Update(data.ID) }}>Update</button>
                                            <button className="button" style={{ margin: 10 + 'px' }} onClick={() => { DeleteSupervisor(data.ID) }} >Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }



                </tbody>
            </table>
            <div className="add"><button className="button" onClick={showform}>Add</button></div>

            <div style={{ display: "none" }} id="form" className="form" >
                <div className="form">
                    <div className="overlay">
                        <div className="container">
                            <h3>Add Supervisor</h3>
                            <div className="form">
                                <input placeholder="Name" type="text" value={data.Name} onChange={(e) => { setData({...data,Name: e.target.value}) }} id="name" />
                                <input placeholder="Email" type="email" value={data.Email} onChange={(e) => { setData({...data,Email: e.target.value})}} id="location" />
                                <input placeholder="Password" type="password" value={data.Password} onChange={(e) => { setData({...data,Password: e.target.value}) }} id="location" />
                                <input placeholder="Phone" type="phone" value={data.Phone} onChange={(e) => { setData({...data,Phone: e.target.value}) }} id="location" />

                                <button className="button" onClick={() => { InsertData() }} id="create">Add Supervisor</button>
                            </div></div></div></div>

            </div>
            <div style={{ display: "none" }} id="updateform" className="form" >
                <div className="form">
                    <div className="overlay">
                        <div className="container">
                            <h3>Update Supervisor</h3>
                            <div className="form">
                                <input placeholder="Name" type="text" value={data.Name} onChange={(e) => { setData({...data,Name: e.target.value}) }} id="name" />
                                <input placeholder="Email" type="email" value={data.Email} onChange={(e) => { setData({...data,Email: e.target.value})}} id="location" />
                                <input placeholder="Password" type="password" value={data.Password} onChange={(e) => { setData({...data,Password: e.target.value}) }} id="location" />
                                <input placeholder="Phone" type="phone" value={data.Phone} onChange={(e) => { setData({...data,Phone: e.target.value}) }} id="location" />

                                <button className="button" onClick={() => { UpdateData() }} id="create">Update Supervisor</button>
                            </div></div></div></div>

            </div>





        </section>
    );
}

export default SupervisorsManagement