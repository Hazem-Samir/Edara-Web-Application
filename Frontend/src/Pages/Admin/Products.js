
//import { AddWarehouseForm } from '../JS/main'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { closeform, closeupdateform, incorrect, showform, updateform } from '../../JS/main';
import { useNavigate, useParams } from 'react-router-dom';
axios.defaults.withCredentials = true
let pid;
let Photo;
function Products() {
    const navigate = useNavigate();
    let { wid } = useParams();
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Stock, setStocks] = useState("");
    const [products, getproducts] = useState([]);

    function AddProducts() {
        showform()
    }

    function DeleteProduct(PID) {
        axios.delete(`http://localhost:4000/Products/${PID}`)
            .then(res => {
                incorrect(res.data);
                setreload(!reload);

                // window.location.reload(false);
            })
            .catch(err => console.log("msh sh8ala", err))
    }

    function change(e) {
        console.log(e.target.files[0]);
        Photo = e.target.files[0];
        // console.log(Photo);
    }

    function UpdateProducts(PID) {
        pid = PID;
        console.log(pid);
        updateform();
    }
    const [reload, setreload] = useState(0);
    function UpdateData() {
        console.log(pid);
        const formData = new FormData();
        formData.append("Name", Name);
        formData.append("Description", Description);
        console.log("pp", Photo);
        formData.append("Photo", Photo, Photo.name);
        formData.append("Stock", Stock);
        formData.append("WID", wid);
        formData.append("PID", pid);
        axios.put("http://localhost:4000/Products", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(res => {
                incorrect(res.data);
                // window.location.reload(false);
                closeupdateform();
                setreload(!reload);
            })
            .catch(err => console.log("msh sh8ala", err))
    }

    function DeleteAll() {
        axios.delete(`http://localhost:4000/Products/`)
            .then(res => {
                console.log(res);
                setreload(!reload);

                // window.location.reload(false);
            })
            .catch(err => console.log("msh sh8ala", err))
    }
    useEffect(() => {
        axios.get(`http://localhost:4000/Products/${wid}`)
            .then(res => { getproducts(res.data); })
            .catch(err => navigate("/"))
    }, [reload])

    function InsertData() {

        const formData = new FormData();
        formData.append("Name", Name);
        formData.append("Description", Description);
        console.log("pp", Photo);
        formData.append("Photo", Photo, Photo.name);
        formData.append("Stock", Stock);
        formData.append("WID", wid);
        axios.post("http://localhost:4000/Products", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(res => {
                console.log(res)
                closeform();
                setreload(!reload);

                // window.location.reload(false);
            })
            .catch(err => console.log("msh sh8ala", err))
    }
    return (
        <section>
            <div className="page-name">
                <h2>Products Managment</h2>
                {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem similique aliquam mollitia necessitatibus</p> */}
            </div>

            <table>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Photo</th>
                        <th>Quanitity</th>
                        <th>Status</th>
                        <th>Warehouse Name</th>
                        <th >Edit Info</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((data, i) => {
                            let photo_url = `http://localhost:4000/${data.Photo}`;
                            return (
                                <tr key={i}>
                                    <td>{data.PName}</td>
                                    <td>{data.Description}</td>
                                    <td><img alt="Product Photo" src={photo_url} /></td>
                                    <td>{data.Stock}</td>
                                    <td>{data.Status ? "Active" : "In-Active"}</td>
                                    <td>{data.Name}</td>

                                    <td>   <div className="buttons"><button className="button" style={{ margin: 10 + 'px' }} onClick={() => { UpdateProducts(data.ID) }}>Update</button>
                                        <button className="button" style={{ margin: 10 + 'px' }} onClick={() => { DeleteProduct(data.ID) }} >Delete</button>
                                    </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <div className="add"><button className="button" onClick={() => { AddProducts() }} >Add</button>
                <button className="button" onClick={() => { DeleteAll() }} id="delall">delete all</button></div>

            <div style={{ display: "none" }} id="form" className="form" >
                <div className="form">
                    <div className="overlay">
                        <div className="container">
                            <h3>Add Products</h3>
                            <div className="form">
                                <input placeholder="Name" type="text" value={Name} onChange={(e) => { setName(e.target.value) }} id="name" />
                                <input placeholder="Description" type="text" value={Description} onChange={(e) => { setDescription(e.target.value) }} id="Description" />
                                <input type="file" id='Photo' onChange={change} />
                                <input placeholder="Stock" type="text" value={Stock} onChange={(e) => { setStocks(e.target.value) }} id="Stock" />

                                <button className="button" onClick={() => { InsertData() }} id="create">Add Product</button>
                            </div></div></div></div>
            </div>

            <div style={{ display: "none" }} id="updateform" className="form" >
                <div className="form">
                    <div className="overlay">
                        <div className="container">
                            <h3>Update Product</h3>


                            <div className="form">

                                <input placeholder="Name" type="text" value={Name} onChange={(e) => { setName(e.target.value) }} id="name" />
                                <input placeholder="Description" type="text" value={Description} onChange={(e) => { setDescription(e.target.value) }} id="Description" />
                                <input type="file" id='Photo' onChange={change} />
                                <input placeholder="Stock" type="text" value={Stock} onChange={(e) => { setStocks(e.target.value) }} id="Stock" />

                                <button className="button" onClick={() => { UpdateData(); }} id="create">Update Product</button>
                            </div>

                        </div></div></div>

            </div>


        </section >

    );
}

export default Products