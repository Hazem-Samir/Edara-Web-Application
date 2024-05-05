import React, { useState, useEffect } from 'react'
import axios from "axios";
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Stack from '@mui/material/Stack';
import { FaPen } from "react-icons/fa";
import Empty from "../Empty";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const MyProducts = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [reload, setreload] = useState(0);
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
    function sendRequest(data,msg,svrt) {
        if(data.Quantity!=0){
            axios.post("http://localhost:4001/my-products", {
                SID: data.CID2,
                WID: data.CID3,
                PID: data.PID,
                Quantity: data.Quantity
    
            })
                .then(res => {
                    console.log(res)
                    // window.location.reload(false);
                    setreload(!reload);
    
                })
                .catch(err => showMessage('This Service is currently have problem try again later','error'))
            showMessage(msg,svrt)
        }
        else {
            showMessage('Set What Quantity Needed','error')
        }
      
    }


    const loadData = async () => {
        await axios.get(`http://localhost:4001/my-products/`)
            .then(res => {
                setData(res.data.map((item) => {
                    item["Quantity"] = 0;
                    return item;
                }))

            })

            .catch(err => navigate("/"))
    };

    useEffect(() => {
        loadData();
    }, [reload]);

    const handleDecrement = (product_id) => {
        setData(data =>
            data.map((item) =>
                product_id === item.PID ? { ...item, Quantity: item.Quantity - 1 } : item
            )
        );
    }
    const handleIncrement = (product_id) => {

        setData(data =>
            data.map((item) =>
                product_id === item.PID ? { ...item, Quantity: item.Quantity + 1 } : item
            )
        );

    }
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(data.length / recordsPerPage)
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
        <div >

            <section>
                <div className="page-name">
                    <Stack spacing={70} direction='row'>
                        <div className='leftside'>
                            <Stack spacing={5} direction='row' className='header-container'>
                                <div className='page-title'>Products in my Warehouse</div>
                                <div>
                                    <Stack direction='row' spacing={2}>
                                        <div className='count'><FaPen /></div>
                                        <div className='count'>{data.length} products</div>
                                    </Stack>
                                </div>
                            </Stack>
                        </div>
                    </Stack>
                </div>
                {
                    data.length>0? 
                        <div className='table-container'>
                            <table >
                                <thead>
                                    <tr>
                                        <th>Warehouse</th>
                                        <th>Product Name</th>
                                        <th>Description</th>
                                        <th>Photo</th>
                                        <th>Stock</th>
                                        <th>Quantity Requested</th>
                                        <th>Increase or Decrease</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((item, index) => {
                                        let photo_url = `http://localhost:4001/${item.Photo}`;
                                        return (
                                            <tr key={item.PID}>
                                                <td>{item.WName}</td>
                                                <td>{item.Name}</td>
                                                <td>{item.Description}</td>
                                                <td><img alt="ProductPhoto" src={photo_url} /></td>
                                                <td>{item.Stock}</td>
                                                <td>{item.Quantity}</td>
                                                <td>
                                                    <div className="buttons">
                                                        <button className="button" onClick={() => handleDecrement(item.PID)} >-</button>
                                                        <button className="button" onClick={() => handleIncrement(item.PID)}>+</button>
                                                        <button className="button" onClick={() => sendRequest(item,'request sent successfully!','success')}>Send Request</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
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
        </div>
    );
};


export default MyProducts;