import React, { useEffect, useState } from 'react'
import axios from "axios"
import { RequestStatusColor } from '../../JS/main';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function MyRequestsHistory() {
    const navigate = useNavigate();
    const [requests_history, setRequestsHistory] = useState([])


    useEffect(
        () => {

            axios.get(`http://localhost:4000/my-requests-history/${Cookies.get('Token')}`)
                .then(res => setRequestsHistory(res.data))
                .catch(err => navigate("/"));
        }, [])
    useEffect(
        () => {

            RequestStatusColor();
        }, [requests_history])

    return (
        <>
            <section>
                <div className="page-name">
                    <h2>My Requests History</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem similique aliquam mollitia necessitatibus
                    </p>
                </div>
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
                            requests_history.map((data, i) => {
                                let photo_url = `http://localhost:4000/${data.Photo}`;

                                return (
                                    <tr key={i}>
                                        <td>{data.Name}</td>
                                        <td>{data.Stock}</td>
                                        <td><img alt="Product Photo" src={photo_url} /></td>
                                        <td>{data.Quantity}</td>
                                        <td>{data.State}</td>

                                    </tr>
                                );
                            })

                        }


                    </tbody>
                </table>
                <div className="add">

                </div>
            </section >

        </>


    )
}
export default MyRequestsHistory