import React, { useEffect, useState } from 'react'
import axios from "axios"
import { RequestStatusColor } from '../../JS/main';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa6';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Empty from '../Empty';

function MyRequestsHistory() {
    const navigate = useNavigate();
    const [requests_history, setRequestsHistory] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = requests_history.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(requests_history.length / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)

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

    useEffect(
        () => {

            axios.get(`http://localhost:4001/my-requests-history/${Cookies.get('Token')}`)
                .then(res => setRequestsHistory(res.data))
                .catch(err => {    showMessage('The Supervisor Service is currently down try again later', 'error');
                showMessage(err.response.data||'The Warehouse Management Service is currently down try again later', 'error');
                if(err.response.data){
                    setTimeout(()=>{
                        navigate('/')
                    },500)
                   
                }

});
        }, [])
    useEffect(
        () => {

            RequestStatusColor();
        }, [requests_history,currentPage])

    return (
        <>
            <section>
                <div className="page-name">
                <Stack spacing={70} direction='row'>
                    <div className='leftside'>
                        <Stack spacing={5} direction='row' className='header-container'>
                            <div className='page-title'>My Requests History Management</div>
                            <div>
                                <Stack direction='row' spacing={2}>
                                    <div className='count'><FaPen /></div>
                                    <div className='count'>{requests_history.length} requests</div>
                                </Stack>
                            </div>
                            
                        </Stack>
                    </div>
                </Stack>
                </div>
                {
                    requests_history ?
                    <div className='table-container'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Stock</th>
                                <th>Photo</th>
                                <th>Quantity</th>
                                <th>State</th>
                            </tr>
                        </thead>
                        <tbody>
    
                            {
                                records.map((data, i) => {
                                    let photo_url = `http://localhost:4001/${data.Photo}`;
    
                                    return (
                                        <tr key={i}>
                                            <td>{data.Name}</td>
                                            <td>{data.Stock}</td>
                                            <td><img alt="ProductPhoto" src={photo_url} /></td>
                                            <td>{data.Quantity}</td>
                                            <td>{data.State}</td>
    
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

        </>


    )
}
export default MyRequestsHistory