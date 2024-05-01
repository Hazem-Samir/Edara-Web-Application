import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { FaPen } from "react-icons/fa";
import Empty from "../Empty";

axios.defaults.withCredentials = true

function RequestsRequests() {
    const navigate = useNavigate();
    const [Requests, getRequests] = useState([]);
    const [reload, setreload] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:4000/requests")
            .then(res => getRequests(res.data))
            .catch(err => navigate("/"))

    }, [reload])

    function Accept(RID) {
        axios.put('http://localhost:4000/requests/accept', {

            RID: RID

        })
            .then(res => {
                console.log(res)
                // window.location.reload(false);
                setreload(!reload);


            })
            .catch(err => console.log("msh sh8ala", err))
    }

    function Decline(RID) {
        axios.put('http://localhost:4000/requests/decline', {

            RID: RID

        })
            .then(res => {
                console.log(res)
                // window.location.reload(false);
                setreload(!reload);

            })
            .catch(err => console.log("msh sh8ala", err))
    }
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = Requests.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(Requests.length / recordsPerPage)
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
                            <div className='page-title'>Requests Management</div>
                            <div>
                                <Stack direction='row' spacing={2}>
                                    <div className='count'><FaPen /></div>
                                    <div className='count'>{Requests.length} Requests</div>
                                </Stack>
                            </div>
                        </Stack>
                    </div>
                    {/* <div className="add rightside"><button className="button" onClick={showform}>Add</button></div> */}
                </Stack>
            </div>
            {
                Requests.length ? 
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Supervisor Name </th>
                                    <th>Warehouse </th>
                                    <th>Product Name</th>
                                    <th>Stock</th>
                                    <th>Requested Quantity</th>
                                    <th>Decision</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Requests.map((data, i) => {
                                        return (
                                            <tr>
                                                <td>{data.SName}</td>
                                                <td>{data.WName}</td>
                                                <td>{data.PName}</td>
                                                <td>{data.Stock}</td>
                                                <td>{data.Quantity}</td>
                                                <td>
                                                    <div className="buttons"><button className="button" onClick={() => { Accept(data.RID) }}> Accept </button>
                                                        <button className="button" id="Delete" onClick={() => { Decline(data.RID) }}> Decline </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    :
                    <Empty />
            }
        </section>

    );
}

export default RequestsRequests