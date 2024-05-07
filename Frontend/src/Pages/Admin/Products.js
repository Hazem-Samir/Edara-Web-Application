
//import { AddWarehouseForm } from '../JS/main'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { closeform, closeupdateform, incorrect, showform, updateform } from '../../JS/main';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import { FaPen, FaPlus } from 'react-icons/fa';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Empty from '../Empty';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
axios.defaults.withCredentials = true
let pid;
let Photo;
function Products() {
    const navigate = useNavigate();
    let { wid } = useParams();
    const [data, setData] = useState({
        Name:'',
        Description:'',
        Stock:0,
    });

    const [products, getproducts] = useState([]);

    function AddProducts() {
        showform()
    }

    function DeleteProduct(PID ,msg,svrt) {
        axios.delete(`http://localhost:4004/Products/${PID}`)
            .then(res => {
                // incorrect(res.data);
                setreload(!reload);
                showMessage(msg,svrt)
                // window.location.reload(false);
            })
            .catch(err => {
                
                showMessage(err.response.data.errors[0].msg||err.response.data||'The Product Management Service is currently down try again later', 'error');

            })
    }

    function change(e) {
        console.log(e.target.files[0]);
        Photo = e.target.files[0];
        // console.log(Photo);
    }

    function UpdateProducts(Data) {
     setData({
        Name:Data.PName,
        PID:Data.ID,
        Description:Data.Description,
        Stock:Data.Stock
     })
    //  console.log(Data)
        updateform();
    }
    const [reload, setreload] = useState(0);
    function UpdateData(msg,svrt,pid) {
        console.log(data.Des)
        console.log(pid);
        const formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("Description", data.Description);

        if(!Photo){
            showMessage('Photo Must Be Uploaded','error')
        }
        else{
        console.log("pp", Photo);
        formData.append("Photo", Photo, Photo.name);
        formData.append("Stock", data.Stock);
        formData.append("WID", wid);
        formData.append("PID", data.PID);
        axios.put("http://localhost:4004/Products", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(res => {
                // incorrect(res.data);
                // window.location.reload(false);
                closeupdateform();
                setData({})
                showMessage(msg,svrt)
                setreload(!reload);
            })
            .catch(err => {
                showMessage(err.response.data.errors[0].msg||err.response.data||'The Product Management Service is currently down try again later', 'error');
                // showMessage(err.response.data.errors[0].msg, 'error');
            })
    }
    }

    function DeleteAll(msg,svrt) {
        axios.delete(`http://localhost:4004/Products/`)
            .then(res => {
                console.log(res);
                setreload(!reload);
                showMessage(msg,svrt)

                // window.location.reload(false);
            })
            .catch(err => {
                showMessage('The Product Management Service is currently down try again later', 'error');

            })
    }
    useEffect(() => {
        axios.get(`http://localhost:4004/Products/${wid}`)
            .then(res => { getproducts(res.data); })
            .catch(err => {    showMessage('The Product Management Service is currently down try again later', 'error');
            showMessage(err.response.data||'The Warehouse Management Service is currently down try again later', 'error');
            if(err.response.data){
                setTimeout(()=>{
                    navigate('/')
                },500)
               
            }

})
    }, [reload])

    function InsertData(msg,svrt) {
        const formData = new FormData();
       
        formData.append("Name", data.Name);
        formData.append("Description", data.Description);
        console.log("pp", Photo);
      
        if(!Photo){
            showMessage('Photo Must Be Uploaded','error')
        }
        else{
        formData.append("Photo", Photo, Photo.name);
        
        formData.append("Stock", data.Stock);
        formData.append("WID", wid);
        console.log(formData)
    

        axios.post("http://localhost:4004/Products", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(res => {
                console.log(res)
                closeform();
                showMessage(msg,svrt)
                setData({})
                setreload(!reload);

                // window.location.reload(false);
            })
            .catch(err => {
                console.log(err)
                showMessage(err.response.data.errors[0].msg||err.response.data||'The Product Management Service is currently down try again later', 'error');

            }) }
    }
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = products.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(products.length / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)
    const prePage = () => {
        if (currentPage !== firstIndex) {
        setCurrentPage(currentPage - 1)
    }
}
    const nextPage = () => {
        if (currentPage !== lastIndex) {
        setCurrentPage(currentPage + 1)
        }
    }
    const changeCPage = (id) => {
        setCurrentPage(id)
    }
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const showMessage = (message,severity) => {
        setOpen(true);
        setSeverity(severity);
        setMessage(message);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
    
        setOpen(false);
    };
    return (
        <section>
            <div className="page-name">
                <Stack spacing={70} direction='row'>
                    <div className='leftside'>
                        <Stack spacing={5} direction='row' className='header-container'>
                            <div className='page-title'>Products Management</div>
                            <div>
                                <Stack direction='row' spacing={2}>
                                    <div className='count'><FaPen /></div>
                                    <div className='count'>{products.length} products</div>
                                </Stack>
                            </div>
                            <Stack direction='row' spacing={2} className="add">
                                <button className="button" onClick={() => { AddProducts() }} >
                                    <Stack direction='row' spacing={1}>
                                        <p><FaPlus/></p>
                                        <p>add</p>
                                    </Stack>
                                </button>
                                {
                                    (products.length>0) &&
                                    <button className="button" onClick={() => { DeleteAll('all products deleted successfully!', 'succcess') }} id="delall">
                                        <Stack direction='row' spacing={1}>
                                            <p>delete all</p>
                                        </Stack>
                                    </button>
                                }
                            </Stack>
                        </Stack>
                    </div>
                </Stack>
            </div>
            {
                products.length > 0 ?
                <div className='table-container'>
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
                            records.map((Data, i) => {
                                let photo_url = `http://localhost:4004/${Data.Photo}`;
                                return (
                                    <tr key={i}>
                                        <td>{Data.PName}</td>
                                        <td>{Data.Description}</td>
                                        <td><img alt="ProductPhoto" src={photo_url} /></td>
                                        <td>{Data.Stock}</td>
                                        <td>{Data.Status ? "Active" : "In-Active"}</td>
                                        <td>{Data.Name}</td>

                                        <td>   <div className="buttons"><button className="button" style={{ margin: 10 + 'px' }} onClick={() => { UpdateProducts(Data) }}>Update</button>
                                            <button className="button" style={{ margin: 10 + 'px' }} onClick={() => { DeleteProduct(Data.ID,'product deleted successfully!','success') }} >Delete</button>
                                        </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <nav>
                            <ul className="pagination-bar">
                                <li>
                                <button onClick={prePage} className="arrow">
                                    <IoIosArrowBack />
                                </button>
                                </li>
                                {
                                numbers.map((n, i) => (
                                    <li key={i} className={`page-item-bar ${currentPage===n? 'activate' : ''}`}>
                                    <button onClick={() => changeCPage(n)} className="page-btn">{n}</button>
                                    </li>
                                ))
                                }
                                <li>
                                <button onClick={nextPage} className="arrow">
                                    <IoIosArrowForward />
                                </button>
                                </li>
                            </ul>
                        </nav>
                </div>
                :
                <Empty/>
            }
            <div style={{ display: "none" }} id="form" className="form" >
                <div className="form">
                    <div className="overlay">
                        <div className="container">
                            <h3>Add Products</h3>
                            <div className="form">
                                <input placeholder="Name" type="text"  onChange={(e) => { setData({...data,Name:e.target.value}) }} id="name" />
                                <input placeholder="Description" type="text" onChange={(e) => { setData({...data,Description:e.target.value}) }} id="Description" />
                                <input type="file" id='Photo' onChange={change} />
                                <input placeholder="Stock" type="text" onChange={(e) => { setData({...data,Stock:e.target.value}) }} id="Stock" />

                                <button className="button" onClick={() => { InsertData('product added successfully!','success') }} id="create">Add Product</button>
                            </div></div></div></div>
            </div>

            <div style={{ display: "none" }} id="updateform" className="form" >
                <div className="form">
                    <div className="overlay">
                        <div className="container">
                            <h3>Update Product</h3>


                            <div className="form">

                                <input placeholder="Name" type="text" value={data.Name} onChange={(e) => { setData({...data,Name:e.target.value}) }} id="name" />
                                <input placeholder="Description" type="text" value={data.Description} onChange={(e) => { setData({...data,Description:e.target.value}) }} id="Description" />
                                <input type="file" id='Photo' onChange={change} />
                                <input placeholder="Stock" type="text" value={data.Stock} onChange={(e) => { setData({...data,Stock:e.target.value}) }} id="Stock" />

                                <button className="button" onClick={() => { UpdateData('product updated successfully!','success',) }} id="create">Update Product</button>
                            </div>

                        </div></div></div>

            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
                >
                {message}
                </Alert>
            </Snackbar>
        </section >

    );
}

export default Products