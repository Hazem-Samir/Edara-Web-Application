import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { FaPen } from "react-icons/fa";
import Empty from "../Empty";
import Snackbar from '@mui/material/Snackbar';
    import Alert from '@mui/material/Alert';
axios.defaults.withCredentials = true

function RequestsRequests() {
    const navigate = useNavigate();
    const [Requests, getRequests] = useState([]);
    const [reload, setreload] = useState(0);
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
    useEffect(() => {
        axios.get("http://localhost:4002/requests")
            .then(res => {console.log(res.data)
                getRequests(res.data)})
            .catch(err => {    showMessage('The Request Service is currently down try again later', 'error');
//    showMessage(err.response.data||'The Warehouse Management Service is currently down try again later', 'error');
if(err.response.data){
    setTimeout(()=>{
        navigate('/')
    },500)
   
}

})

    }, [reload])

    function Accept(RID) {
        console.log(RID)
        axios.put('http://localhost:4002/requests/accept', {

            RID: RID

        })
            .then(res => {
                console.log(res)
                // window.location.reload(false);
                showMessage('The Request is Accepted','success')
                setreload(!reload);


            })
            .catch(err => {
                showMessage('The Request Service is currenlty down try again later!','error')
            })
    }

    function Decline(RID) {
        axios.put('http://localhost:4002/requests/decline', {

            RID: RID

        })
            .then(res => {
                console.log(res)
                // window.location.reload(false);
                showMessage('The Request is Decline','success')

                setreload(!reload);

            })
            .catch(err => {
                showMessage('The Request Service is currenlty down try again later!','error')
            })
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
                                    <th>Supervisor Name</th>
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
                                                    <div className="buttons"><button className="button" onClick={() => { Accept(data.ID) }}> Accept </button>
                                                        <button className="button" id="Delete" onClick={() => { Decline(data.ID) }}> Decline </button>
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

export default RequestsRequests