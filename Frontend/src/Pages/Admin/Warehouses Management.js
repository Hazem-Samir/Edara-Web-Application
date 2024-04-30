import axios from 'axios'
import { useEffect, useState } from 'react';
import { closeform, closeupdateform, showform, updateform } from '../../JS/main';
import { Link, useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true
let wid;

function WarehousesManagement() {

    const navigate = useNavigate();
    function AddWarehouse() {
        axios.get("http://localhost:4000/supervisors")
            .then(res => getsupervisors(res.data))
            .catch(console.log("fail"))
        showform()
    }

    function DeleteWarehouse(WID) {
        axios.delete(`http://localhost:4000/warehouses/${WID}`)
            .then(res => {console.log(res)
                // window.location.reload(false);
                setreload(!reload);
})
            .catch(err => console.log("msh sh8ala", err))
    }


    const [Name, setName] = useState("");
    const [Location, setLocation] = useState("");
    const [warehouses, getwarehouses] = useState([]);
    const [supervisors, getsupervisors] = useState([]);
    const [reload, setreload] = useState(0);

    function UpdateWarehouse(WID) {
        axios.get("http://localhost:4000/supervisors")
            .then(res => {getsupervisors(res.data);
            })
            .catch(console.log("fail"))
        wid = WID;
        console.log(wid);
        updateform();
    }

    function UpdateData() {
        var select = document.querySelector('#updateSelection');
        var value = select.options[select.selectedIndex].value;
        console.log(value);
        console.log(wid);
        axios.put('http://localhost:4000/warehouses', {
           
                WID: wid,
                Name: Name,
                Location: Location,
                SID: value
            
        })
            .then(res => {console.log(res);
                // window.location.reload(false);
                closeupdateform();
                setreload(!reload);
                setName("");
                setLocation("");
})
            .catch(err => console.log("msh sh8ala", err))
    }

    function DeleteAll(){
        axios.delete(`http://localhost:4000/warehouses/`)
            .then(res => {console.log(res);
                window.location.reload(false);
})
            .catch(err => console.log("msh sh8ala", err))
    }
    useEffect(() => {
        axios.get("http://localhost:4000/warehouses")
            .then(res => getwarehouses(res.data))
            .catch(err=> navigate("/"))

    }, [reload])

    function InsertData() {
        var select = document.querySelector('#createSelection');
        var value = select.options[select.selectedIndex].value;
        axios.post("http://localhost:4000/warehouses", { warehouseName: Name, Location: Location, SID: value }, { withCredentials: true })
            .then(res => {console.log(res);
                // window.location.reload(false);
                closeform();
                setreload(!reload);
                setName("");
                setLocation("");

})
            .catch(err => console.log("msh sh8ala", err))
    }
    return (
        <section>
            <div className="page-name">
                <h2>Warehouse Managment</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem similique aliquam mollitia necessitatibus</p>
            </div>
           
            <table>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Supervisor</th>
                        <th>PRODUCTS</th>
                        <th >Edit Info</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        warehouses.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{data.WHName}</td>
                                    <td>{data.Location}</td>
                                    <td>{data.Status ? "Active" : "In-Active"}</td>
                                    <td>{data.Name}</td>
                                    <td><div className="buttons"><Link to={`/A/Warehouse/${data.ID}/products`} className='Productbutton'><i  aria-hidden="true"></i>Products</Link></div></td>
                                    <td>   <div className="buttons"><button className="button" style={{ margin: 10 + 'px' }} onClick={() => {  UpdateWarehouse(data.ID) }}>Update</button>
                                        <button className="button" style={{ margin: 10 + 'px' }} onClick={() => { DeleteWarehouse(data.ID) }} >Delete</button>
                                    </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <div className="add"><button className="button" onClick={() => { AddWarehouse() }} >Add</button>
                <button className="button" onClick={()=>{DeleteAll()}} id="delall">delete all</button></div>

            <div style={{ display: "none" }} id="form" className="form" >
                <div className="form">
                    <div className="overlay">
                        <div className="container">
                            <h3>Add Warehouse</h3>
                            <div className="form">
                                <input placeholder="Name" type="text" value={Name} onChange={(e) => { setName(e.target.value) }} id="name" />
                                <input placeholder="Location" type="text" value={Location} onChange={(e) => { setLocation(e.target.value) }} id="location" />
                                <select id="createSelection" className="selection">
                                    {

                                        supervisors.map((data, i) => {
                                            return (
                                                <option key={i} value={data.ID}>{data.Name}</option>
                                            );
                                        })
                                    }
                                </select>
                                <button className="button" onClick={()=>{InsertData()}} id="create">Add Warehouse</button>
                            </div></div></div></div>
            </div>

            <div style={{ display: "none" }} id="updateform" className="form" >
                <div className="form">
                    <div className="overlay">
                        <div className="container">
                            <h3>Update Warehouse</h3>


                            <div className="form">

                                
                                <input placeholder="Name" type="text" onChange={(e) => { setName(e.target.value) }} id="name" />
                                <input placeholder="Location" type="text" onChange={(e) => { setLocation(e.target.value) }} id="location" />
                                <select id="updateSelection" className="selection">
                                    {

                                        supervisors.map((data, i) => {
                                            return (
                                                <option key={i} value={data.ID}>{data.Name}</option>
                                            );
                                        })
                                    }
                                </select>

                                <button className="button" onClick={()=>{UpdateData();}} id="create">Update Warehouse</button>
                            </div>

                        </div></div></div>
                        
            </div>


        </section >

    );
}

export default WarehousesManagement