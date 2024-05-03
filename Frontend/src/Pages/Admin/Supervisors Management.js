import { useEffect, useState } from 'react';
import { closeform, closeupdateform, showform, updateform } from '../../JS/main'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { encryptData } from '../FrontendEncryption';
import { FaPen } from "react-icons/fa";
import Stack from '@mui/material/Stack';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Empty from '../Empty';
import { FaPlus } from "react-icons/fa6";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { IoClose } from "react-icons/io5";

axios.defaults.withCredentials = true;

function SupervisorsManagement() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        Name: '',
        Email: '',
        Password: '',
        Phone: '',
        Token: ''
    });
    const [addFormData, setAddFormData] = useState({
        Name: '',
        Email: '',
        Password: '',
        Phone: ''
    });
    
    const [updateFormData, setUpdateFormData] = useState({
        Token: '',
        Name: '',
        Email: '',
        Phone: 0,
        Password: ''
    });
    
    const [supervisors, getsuperviosrs] = useState([]);
    const [reload, setreload] = useState(0);
    const [open, setOpen] = useState(false);
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

    useEffect(() => {
        axios.get('http://localhost:4000/supervisors/')
            .then(res => {
                console.log(res.data);
                getsuperviosrs(res.data)
            })
            .catch(err => navigate("/"))

    }, [reload])
    const handleCloseModal = () => {
        setOpenModal(false);
        setAddFormData({
            Name: '',
            Email: '',
            Password: '',
            Phone: ''
        });
    };
    
    const handleCloseUpdateModal = () => {
        setOpenUpdate(false);
        setUpdateFormData({
            Token: '',
            Name: '',
            Email: '',
            Phone: '',
            Password: ''
        });
    };
    
    function InsertData(msg, svrt) {
        handleCloseModal();
        setOpenModal(false);
        let data_encrypted = encryptData(addFormData);
        console.log(encryptData(addFormData));
        axios.post('http://localhost:4000/supervisors/', { data: data_encrypted })
            .then(res => {
                console.log(res.data);
                closeform();
                setreload(!reload);
            })
            .catch(err => {
                console.log("msh sh8ala", err)
            });
        showMessage(msg, svrt);
    }
    
    function Update(Data) {
        setOpenUpdate(true);
        setUpdateFormData({
            Token: Data.Token,
            Name: Data.Name,
            Email: Data.Email,
            Phone: Data.Phone,
            Password:''
        });
        console.log(updateFormData);
        updateform();
    }
    
    function DeleteSupervisor(ID,msg,svrt) {
        axios.delete(`http://localhost:4000/supervisors/${ID}`)
            .then(res => {
                console.log(res);
                setreload(!reload);
                
            })
            .catch(err => console.log("msh sh8ala", err))
            showMessage(msg,svrt);
    }
    function UpdateData(msg,svrt) {
        let updateData_encrypted = encryptData(updateFormData);
        axios.put('http://localhost:4000/supervisors', {
            data: updateData_encrypted,

        })
            .then(res => {
                console.log(res);
                setData({});
                closeupdateform();
                setreload(!reload);

            })
            .catch(err => console.log("msh sh8ala", err))
        showMessage(msg,svrt)
    }
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = supervisors.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(supervisors.length / recordsPerPage)
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
    return (
        <section>
            <div className="page-name">
                    <div className='leftside'>
                        <Stack spacing={5} direction='row' className='header-container'>
                            <div className='page-title'>Supervisors Management</div>
                            <div>
                                <Stack direction='row' spacing={2}>
                                    <div className='count'><FaPen /></div>
                                    <div className='count'>{supervisors.length} supervisors</div>
                                </Stack>
                            </div>
                            <div className="add rightside"><button className="button" onClick={()=>setOpenModal(true)}>
                                <Stack direction='row' spacing={0.5}>
                                    <p><FaPlus /></p>
                                    <p>Add</p>
                                </Stack>
                            </button></div>
                        </Stack>
                    </div>
            </div>
            {
                supervisors.length ? 
                    <div className='table-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Edit Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    records.map((Data, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{Data.Name}</td>
                                                <td>{Data.Email}</td>
                                                <td>{Data.Phone}</td>
                                                <td>{Data.Status ? "Active" : "In-Active"}</td>
                                                <td>
                                                    <div className="buttons"><button className="button" style={{ margin: 10 + 'px' }} onClick={() => { Update(Data)}}>Update</button>
                                                        <button className="button" style={{ margin: 10 + 'px' }} onClick={() => { DeleteSupervisor(Data.ID,'supervisor deleted successfully!','error') }} >Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
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
            <div style={{display: openModal? 'block' : 'none'}} id="form" className="form" >
                <div className="form">
                    <div className="overlay">
                        <div className="container">
                            <Stack direction='row' spacing={30} pt={3}>
                                <h3 style={{paddingLeft: '280px',paddingBottom:'18px'}}>Add Supervisor</h3>
                                <div className='close-btn' onClick={handleCloseModal}>
                                    <IoClose />
                                </div>

                            </Stack>
                            <div className="form">
                            <input placeholder="Name" type="text" value={addFormData.Name} onChange={(e) => { setAddFormData({ ...addFormData, Name: e.target.value }) }} id="name" />
                            <input placeholder="Email" type="email" value={addFormData.Email} onChange={(e) => { setAddFormData({ ...addFormData, Email: e.target.value }) }} id="location" />
                            <input placeholder="Password" type="password" value={addFormData.Password} onChange={(e) => { setAddFormData({ ...addFormData, Password: e.target.value }) }} id="location" />
                            <input placeholder="Phone" type="phone" value={addFormData.Phone} onChange={(e) => { setAddFormData({ ...addFormData, Phone: e.target.value }) }} id="location" />

                                <button className="button" onClick={() => { InsertData('supervisor added successfully!','success') }} id="create">Add</button>
                            </div></div></div></div>
            </div>
            <div style={{ display: openUpdate ? "block" : "none" }} id="updateform" className="form" >
                <div className="form">
                    <div className="overlay">
                        <div className="container">
                            <Stack direction='row' spacing={26} pt={3}>
                                <h3 style={{paddingLeft: '280px',paddingBottom:'18px'}}>Update Supervisor</h3>
                                <div className='close-btn' onClick={handleCloseUpdateModal}>
                                    <IoClose />
                                </div>
                            </Stack>
                            <div className="form">
                            <input placeholder="Name" type="text" value={updateFormData.Name} onChange={(e) => { setUpdateFormData({ ...updateFormData, Name: e.target.value }) }} id="name" />
                            <input placeholder="Email" type="email" value={updateFormData.Email} onChange={(e) => { setUpdateFormData({ ...updateFormData, Email: e.target.value }) }} id="location" />
                            <input placeholder="Password" type="password" value={updateFormData.Password} onChange={(e) => { setUpdateFormData({ ...updateFormData, Password: e.target.value }) }} id="location" />
                            <input placeholder="Phone" type="phone" value={updateFormData.Phone} onChange={(e) => { setUpdateFormData({ ...updateFormData, Phone: e.target.value }) }} id="location" />

                                <button className="button" onClick={() => { UpdateData('supervisor updated successfully!','success') }} id="create">Update</button>
                            </div></div></div></div>

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

        </section>
    );
}

export default SupervisorsManagement