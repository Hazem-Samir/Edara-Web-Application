import { useEffect, useState } from "react";
import axios from 'axios'
import { RequestStatusColor } from "../../JS/main";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Stack from '@mui/material/Stack';
import { FaPen } from "react-icons/fa";
import Empty from "../Empty";

function RequestsHistory() {
    const navigate = useNavigate();
    const [requestsHistory, getrequestsHistory] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4002/requests-history/', { withCredentials: true})
            .then(res => {getrequestsHistory(res.data);
            })
            .catch(err => navigate("/"))
    },[])

    useEffect(() => {
        RequestStatusColor();           
    }, [requestsHistory])

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = requestsHistory.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(requestsHistory.length / recordsPerPage)
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
                <Stack spacing={70} direction='row'>
                    <div className='leftside'>
                        <Stack spacing={5} direction='row' className='header-container'>
                            <div className='page-title'>Requests History Management</div>
                            <div>
                                <Stack direction='row' spacing={2}>
                                    <div className='count'><FaPen /></div>
                                    <div className='count'>{requestsHistory.length} supervisors</div>
                                </Stack>
                            </div>
                        </Stack>
                    </div>
                </Stack>
            </div>
            {
                requestsHistory.length ? 
                    <div className='table-container'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Supervisor Name</th>
                                    <th>Warehouse Name</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>State</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    records.map((data, i) => {
                                        
                                        return (
                                            <tr key={i}>
                                                <td>{data.SName}</td>
                                                <td>{data.WName}</td>
                                                <td>{data.PName}</td>
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
                    <Empty />
            }
        </section>
        

    );
}

export default RequestsHistory