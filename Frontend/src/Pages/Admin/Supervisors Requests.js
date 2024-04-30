import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true
function SupervisorsRequests() {
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
    return (
        <section>
            <div className="page-name">
                <h2>Supervisors Requests</h2>
                {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem similique aliquam mollitia necessitatibus
                </p> */}
            </div>
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
        </section>

    );
}

export default SupervisorsRequests