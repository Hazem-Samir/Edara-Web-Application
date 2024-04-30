import { useEffect, useState } from 'react';
import { closeform, closeupdateform, showform, updateform } from '../../JS/main'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { encryptData } from '../FrontendEncryption';
import { FaPen } from "react-icons/fa";

axios.defaults.withCredentials = true
let supervisorToken;
function SupervisorsManagement() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        Name: '',
        Email: '',
        Password: '',
        Phone: '',
        Token: ''
    });

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
    function Update(Data) {
        setData({ Token: Data.Token, Name: Data.Name, Email: Data.Email, Phone: Data.Phone, Password: ''})
        console.log(data);
        updateform();
    }
    function UpdateData() {
        let updateData_encrypted = encryptData(data);
        // console.log(encryptData(data));
        axios.put('http://localhost:4000/supervisors', {
            data: updateData_encrypted,

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
                
                
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        {/* <th>Password</th> */}
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
                                    {/* <td>{Data.Password}</td> */}
                                    <td>{Data.Phone}</td>
                                    <td>{Data.Status ? "Active" : "In-Active"}</td>
                                    <td>
                                        <div className="buttons"><button className="button" style={{ margin: 10 + 'px' }} onClick={() => { Update(Data)}}>Update</button>
                                            <button className="button" style={{ margin: 10 + 'px' }} onClick={() => { DeleteSupervisor(Data.ID) }} >Delete</button>
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
                                <input placeholder="Password" type="password" onChange={(e) => { setData({...data,Password: e.target.value}) }} id="location" />
                                <input placeholder="Phone" type="phone" value={data.Phone} onChange={(e) => { setData({...data,Phone: e.target.value}) }} id="location" />

                                <button className="button" onClick={() => { UpdateData() }} id="create">Update Supervisor</button>
                            </div></div></div></div>

            </div>





        </section>
    );
}

export default SupervisorsManagement