import axios from 'axios'
import { useEffect, useState } from 'react';
import { closeform, closeupdateform, showform, updateform } from '../../JS/main';
import { Link, useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import Stack from '@mui/material/Stack';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import Empty from '../Empty';

axios.defaults.withCredentials = true
let wid;

function WarehousesManagement() {
    const [updateFormData, setUpdateFormData] = useState({
        WID: 0,
        Name: '',
        Location: '',

    });
    const [addFormData, setAddFormData] = useState({
        Name: '',
        Location: '',
    });
    const [open, setOpen] = useState(false);

    const [warehouses, getwarehouses] = useState([]);
    const [supervisors, getsupervisors] = useState([]);
    const [reload, setreload] = useState(0);
    const navigate = useNavigate();
    function AddWarehouse() {
        setOpenModal(true);
        axios.get("http://localhost:4003/supervisors")
            .then(res => getsupervisors(res.data))
            .catch((err)=>{
                showMessage('The Supervisor Service is currently down try again later', 'error');

            })
    }
    function DeleteWarehouse(WID,msg,svrt) {
        axios.delete(`http://localhost:4005/warehouses/${WID}`)
            .then(res => {console.log(res)
                // window.location.reload(false);
                showMessage(msg, svrt);
                setreload(!reload);
})
            .catch(err => {
                showMessage('The Warehouse Management Service is currently down try again later', 'error');

            })
    }

    function UpdateWarehouse(data) {
        setUpdateFormData({
            WID:data.ID,
            Name:data.Name,
            Location:data.Location
        })
        axios.get("http://localhost:4003/supervisors")
            .then(res => {getsupervisors(res.data);
            })
            .catch((err)=>{
                showMessage('The Supervisor Service is currently down try again later', 'error');

            })
        // wid = WID;
        // console.log(wid);
        updateform();
    }

    function UpdateData(msg,svrt) {
        var select = document.querySelector('#updateSelection');
        var value = select.options[select.selectedIndex].value;
        console.log(value);
        // console.log(wid);
        axios.put('http://localhost:4005/warehouses', {
                WID: updateFormData.WID,
                Name: updateFormData.Name,
                Location: updateFormData.Location,
                SID: value
            
        })
            .then(res => {console.log(res);
             
                // window.location.reload(false);
                closeupdateform();
                setreload(!reload);
              
                showMessage(msg,svrt)
                setUpdateFormData({Name:'',Location:'',WID:0})
})
            .catch(err => {
                showMessage(err.response.data.errors[0].msg||err.response.data||'The Warehouse Management Service is currently down try again later', 'error');

            })
    }
    function DeleteAll(msg,svrt){
        axios.delete(`http://localhost:4005/warehouses/`)
            .then(res => {console.log(res);
                showMessage(msg,svrt)
                window.location.reload(false);
            })
            .catch(err => {
                showMessage('The Warehouse Management Service is currently down try again later', 'error');

            })
    }
    useEffect(() => {
        axios.get("http://localhost:4005/warehouses")
            .then(res => {
                
                getwarehouses(res.data)
                // console.log(res.data)
            })
            .catch(err=> {  
                  showMessage(err.response.data||'The Warehouse Management Service is currently down try again later', 'error');
                if(err.response.data){
                    setTimeout(()=>{
                        navigate('/')
                    },500)
                   
                }

})

    }, [reload])

    function InsertData(msg,svrt) {
        handleCloseModal();
        var select = document.querySelector('#createSelection');
        var value = select.options[select.selectedIndex].value;
        axios.post("http://localhost:4005/warehouses", { warehouseName: addFormData.Name, Location: addFormData.Location, SID: value }, { withCredentials: true })
            .then(res => {console.log(res);
                // window.location.reload(false);
                closeform();
                setreload(!reload);
                showMessage(msg,svrt)
               setAddFormData({Name:'',Location:''})

})
            .catch(err => {
                showMessage(err.response.data.errors[0].msg||err.response.data||'The Warehouse Management Service is currently down try again later', 'error');

            })
        }
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = warehouses.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(warehouses.length / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)
    const prePage = () => {
        if (currentPage !== firstIndex) {
        setCurrentPage(currentPage - 1)
    }}
    const nextPage = () => {
        if (currentPage !== lastIndex) {
        setCurrentPage(currentPage + 1)
        }
    }
    const changeCPage = (id) => {
        setCurrentPage(id)
    }
    const handleCloseModal = () => {
        setOpenModal(false);
        
    };
    


    const [openUpdate, setOpenUpdate] = useState(false);
    const [openModal, setOpenModal] = useState(false);
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
    const handleCloseUpdateModal = () => {
        setOpenUpdate(false);
        setUpdateFormData({
            WID: 0,
            Name: '',
            Location: '',
        });
    };
    
    return (
        <section>
            <div className="page-name">
                <Stack spacing={70} direction='row'>
                    <div className='leftside'>
                        <Stack spacing={5} direction='row' className='header-container'>
                            <div className='page-title'>Warehouses Management</div>
                            <div>
                                <Stack direction='row' spacing={2}>
                                    <div className='count'><FaPen /></div>
                                    <div className='count'>{warehouses.length} warehouses</div>
                                </Stack>
                            </div>
                            <Stack direction='row' spacing={2} className="add">
                                <button className="button" onClick={() => { AddWarehouse() }} >
                                    <Stack direction='row' spacing={1}>
                                        <p><FaPlus/></p>
                                        <p>add</p>
                                    </Stack>
                                </button>
                                {
                                    (warehouses.length>0) &&
                                    <button className="button" onClick={() => { DeleteAll('all warehouses deleted successfully!', 'success') }} id="delall">
                                        <Stack direction='row' spacing={1}>
                                            {/* <p><RiDeleteBin6Line/></p> */}
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
                warehouses.length > 0 ?
                    <div className='table-container'>
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
                                    records.map((data, i) => {
                                        console.log(warehouses)
                                        return (
                                            <tr key={i}>
                                                <td>{data.WHName}</td>
                                                <td>{data.Location}</td>
                                                <td>{data.Status ? "Active" : "In-Active"}</td>
                                                <td>{data.Name}</td>
                                                <td><div className="buttons"><Link to={`/A/Warehouse/${data.ID}/products`} className='Productbutton'><i  aria-hidden="true"></i>Products</Link></div></td>
                                                <td>   <div className="buttons"><button className="button" style={{ margin: 10 + 'px' }} onClick={() => {  UpdateWarehouse(data) }}>Update</button>
                                                    <button className="button" style={{ margin: 10 + 'px' }} onClick={() => { DeleteWarehouse(data.ID,'warehouse deleted successfully!','success') }} >Delete</button>
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
                    <Empty />
            }
            

            <div style={{ display: openModal? 'block' : 'none' }} id="form" className="form" >
                <div className="form">
                    <div className="overlay">
                        <div className="container">
                        <Stack direction='row' spacing={30} pt={3}>
                                <h3 style={{paddingLeft: '280px',paddingBottom:'18px'}}>Add Warehouse</h3>
                                <div className='close-btn' onClick={handleCloseModal}>
                                    <IoClose />
                                </div>

                            </Stack>
                            <div className="form">
                                <input placeholder="Name" type="text"  onChange={(e) => { setAddFormData({...addFormData,Name:e.target.value}) }} id="name" />
                                <input placeholder="Location" type="text"  onChange={(e) => {  setAddFormData({...addFormData,Location:e.target.value}) }} id="location" />
                                <select id="createSelection" className="selection">
                                    {

                                        supervisors.map((data, i) => {
                                            return (
                                                <option key={i} value={data.ID}>{data.Name}</option>
                                            );
                                        })
                                    }
                                </select>
                                <button className="button" onClick={()=>{InsertData('warehouse added successfully!','success')}} id="create">Add Warehouse</button>
                            </div></div></div></div>
            </div>

            <div style={{ display: "none" }} id="updateform" className="form" >
                <div className="form">
                    <div className="overlay">
                        <div className="container">
                            <h3>Update Warehouse</h3>


                            <div className="form">

                                
                                <input placeholder="Name" type="text" value={updateFormData.Name} onChange={(e) => {setUpdateFormData( {...updateFormData,Name:e.target.value}) }} id="name" />
                                <input placeholder="Location" type="text"value={updateFormData.Location} onChange={(e) => { setUpdateFormData( {...updateFormData,Location:e.target.value}) }} id="location" />
                                <select id="updateSelection" className="selection">
                                    {

                                        supervisors.map((data, i) => {
                                            return (
                                                <option key={i} value={data.ID}>{data.Name}</option>
                                            );
                                        })
                                    }
                                </select>

                                <button className="button" onClick={()=>{UpdateData('warehouse updated successfully!','success')}} id="create">Update Warehouse</button>
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

export default WarehousesManagement