import React from 'react';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-dom';
import { DataContext } from '../../../Context/Context';
import { useHistory } from 'react-router-dom';
import './AddShop.scss';

function AddShop() {
    const [OpenModal, setOpenModal] = useState(true);
    const history = useHistory();
    const { Sellers, AdminTrue, Cartcount, seller } = useContext(DataContext);
    const [adminTrue, setadminTrue] = AdminTrue;
    const [res, setres] = useState(false);
    const [image, setimage] = useState();
    const [isloading, setisloading] = useState(false);
    const [url, seturl] = useState();
    const [show, setShow] = useState(false);
    const [input, setinput] = useState({
        name: '',
        category: '',
        price: null,
        description: '',
    });
    const handleChange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        setisloading(true);
        console.log('handleAdd Working');
        const formdata = new FormData();

        formdata.append('file', image);
        formdata.append('upload_preset', 'llcm6mzz');

        // console.log(seller);

        await axios
            .post(
                'https://api.cloudinary.com/v1_1/di0bgblj1/image/upload ',
                formdata
            )
            .then((response) => {
                console.log(response);
                seturl(response.data.url);
            });
        url &&
            (await axios
                .post('http://localhost:8008/seller/addshop', {
                    input: input,
                    url: url,
                    sellerId: seller,
                })
                .then((res) => {
                    console.log(res);
                    res.data.vibe && alert('successfuly added');
                    setimage();
                    setisloading(false);
                }));
    };
    const handleClose = () => {
        setShow(false);
        history.push('/seller');
    };

    useEffect(() => {
        setadminTrue(false);
    });

    return (
        // <div className='modalBackground'>
        //     <div className='modalContainer'>
        //         <div className='titleCloseBtn'>
        //             <button
        //             // onClick={() => {
        //             //     setOpenModal(false);
        //             // }}
        //             >
        //                 X
        //             </button>
        //         </div>
        //         <div className='title'>
        //             <h1>Create Shop</h1>
        //         </div>
        //         <div className='body'>
        //             <input
        //                 type='text'
        //                 onChange={handleChange}
        //                 name='name'
        //                 placeholder='Shop name'
        //             />
        //             <input
        //                 type='text'
        //                 onChange={handleChange}
        //                 name='category'
        //                 placeholder='Category'
        //             />
        //             <input
        //                 type='number'
        //                 onChange={handleChange}
        //                 name='price'
        //                 placeholder='Contact Number'
        //             />
        //             <input
        //                 type='text area'
        //                 onChange={handleChange}
        //                 name='description'
        //                 placeholder='Description'
        //             />
        //             <span style={{ color: 'orange' }}>
        //                 <h6>*not lessthan 10 words</h6>
        //             </span>
        //             <input
        //                 accept='image/png'
        //                 onChange={(e) => setimage(e.target.files[0])}
        //                 type='file'
        //             />
        //         </div>
        //         <div></div>
        //         <div className='footer'>
        //             {/* <button
        //                 onClick={() => {
        //                     setOpenModal(false);
        //                 }}
        //                 id="cancelBtn"
        //             >
        //                 Cancel
        //             </button> */}
        //             <button onClick={handleAdd}>
        //                 {isloading ? 'confirm' : 'Add Shop'}{' '}
        //             </button>
        //             <br />
        //         </div>
        //     </div>
        // </div>

        <div>
            {/* try */}
            <div className='shop_body'>
                <div class='container'>
                    <form id='contact' method='post'>
                        <h3>ADD SHOP</h3>

                        <input
                            type='text'
                            onChange={handleChange}
                            name='name'
                            placeholder='Shop name'
                            required
                        />

                        <input
                            type='text'
                            onChange={handleChange}
                            name='category'
                            placeholder='Category'
                            required
                        />

                        <input
                            onChange={handleChange}
                            name='price'
                            placeholder='Contact Number'
                            type='text'
                            required
                        />

                        <input
                            accept='image/png'
                            onChange={(e) => setimage(e.target.files[0])}
                            type='file'
                            required
                        />
                        <textarea
                            placeholder='Emter the description'
                            onChange={handleChange}
                            name='description'
                            required
                        ></textarea>

                        <button name='submit' type='submit' onClick={handleAdd}>
                            {isloading ? 'confirm' : 'Add Shop'}{' '}
                        </button>
                        <button
                            name='submit'
                            type='reset'
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </form>
                </div>

                {/* try */}
            </div>
        </div>
    );
}

export default AddShop;
