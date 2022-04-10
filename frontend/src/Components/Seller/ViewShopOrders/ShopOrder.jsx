import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Shoporders() {
    const [data, setdata] = useState([]);
    const getShoporders = () => {
        axios
            .get('http://localhost:8008/seller/shop-orders')
            .then((response) => {
                console.log(response);
                setdata(response.data.orders);
            });
    };

    useEffect(() => {
        getShoporders();
    }, []);

    return (

        <table class="styled-table">
            <thead>
                <tr>
                    <th>Order id</th>
                    <th>Mode of Payment</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {data.map((i, index) => (
                    <tr>
                        <td>{i.orderObject.date}</td>
                        <td>{i.orderObject.paymentMethod}</td>
                        <td>{i.orderObject.totalAmount}</td>

                        {/* <td><button onClick={()=>deleteUser(i._id)}  className='btn btn-danger' >Delete</button></td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Shoporders;
