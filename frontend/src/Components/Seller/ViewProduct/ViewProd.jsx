import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { DataContext } from '../../../Context/Context';

function ShowallProds() {
    const [ref, setref] = useState(false);
    const [allprods, setallprods] = useState([]);
    const { seller } = useContext(DataContext);

    const getAllProds = () => {
        console.log('first');
        axios
            .get(`http://localhost:8008/seller/all-prod/${seller?.Email}`)
            .then((result) => {
                setallprods(result.data.response);
            });
    };

    const deleteProd = (id) => {
        let it = window.confirm('Are You Sure Delete ?');
        it &&
            axios
                .delete(`http://localhost:8008/seller/delete-product/${id}`)
                .then((res) => {
                    console.log(res);
                    setref(true);
                    setref(false);
                });
    };

    useEffect(() => {
        getAllProds();
    }, [ref]);

    return (
        <table class='styled-table'>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>mail id</th>
                    <th>Option</th>
                </tr>
            </thead>
            <tbody>
                {allprods.map((i, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{i.Name}</td>
                        <td>{i.Category}</td>

                        <td>
                            <button
                                onClick={() => deleteProd(i._id)}
                                className='btn btn-danger'
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ShowallProds;
