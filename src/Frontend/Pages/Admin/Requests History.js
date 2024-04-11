import { useEffect, useState } from "react";
import axios from 'axios'
import { RequestStatusColor } from "../../JS/main";
import { useNavigate } from "react-router-dom";
function RequestsHistory() {
    const navigate = useNavigate();
    const [requestsHistory, getrequestsHistory] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/requests-history/', { withCredentials: true})
            .then(res => {getrequestsHistory(res.data);
            })
            .catch(err => navigate("/"))
      
    },[])

    useEffect(() => {

                RequestStatusColor();           

    }, [requestsHistory])
    return (
        <section>
            <div className="page-name">
                <h2>Requests History</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem similique aliquam mollitia necessitatibus
                </p>
            </div>
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
                        requestsHistory.map((data, i) => {
                            
                            return (
                                <tr key={i}>
                                    <td>{data.SuperVisorName}</td>
                                    <td>{data.WarehouseName}</td>
                                    <td>{data.ProductName}</td>
                                    <td>{data.Quantity}</td>
                                    <td>{data.State}</td>
                                </tr>
                            );
                        })
                       
                    }

                   
                </tbody>
            </table>
        </section>
        

    );
}

export default RequestsHistory