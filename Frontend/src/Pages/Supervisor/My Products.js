import React, { useState, useEffect } from 'react'
import axios from "axios";
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
const MyProducts = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [reload, setreload] = useState(0);
    function sendRequest(data) {
        axios.post("http://localhost:4000/my-products", {
            SID: data.SID,
            WID: data.WID,
            PID: data.PID,
            Quantity: data.Quantity

        })
            .then(res => {
                console.log(res)
                // window.location.reload(false);
                setreload(!reload);

            })
            .catch(err => console.log(err))

    }


    const loadData = async () => {
        await axios.get(`http://localhost:4000/my-products/${Cookies.get('Token')}`)
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

    return (
        <div >

            <section>
                <div className="page-name">
                    <h2>Products in my Warehouse</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem similique aliquam mollitia necessitatibus
                    </p>
                </div>
                <table >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Photo</th>
                            <th>Stock</th>
                            <th>Quantity Requested</th>
                            <th>Increase or Decrease</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            let photo_url = `http://localhost:4000/${item.Photo}`;
                            return (
                                <tr key={item.PID}>

                                    <td>{item.Name}</td>
                                    <td>{item.Description}</td>
                                    <td><img alt="Product Photo" src={photo_url} /></td>
                                    <td>{item.Stock}</td>
                                    <td>{item.Quantity}</td>
                                    <td>
                                        <div className="buttons">
                                            <button className="button" onClick={() => handleDecrement(item.PID)} >-</button>
                                            <button className="button" onClick={() => handleIncrement(item.PID)}>+</button>

                                            <button className="button" onClick={() => sendRequest(data[index])}>Send Request</button>


                                        </div>
                                    </td>
                                </tr>
                            );

                        })}

                    </tbody>
                </table>
            </section>
        </div>
    );
};


export default MyProducts;