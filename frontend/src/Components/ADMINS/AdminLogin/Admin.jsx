import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './Admin.css'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../../Context/Context'
import Footer1 from '../../Footer copy/Footer'

function Admin() {
    const { AdminTrue } = useContext(DataContext)
    const [adminTrue, setadminTrue] = AdminTrue
    const history = useHistory()
    const [input, setinput] = useState({
        Email: '',
        password: ''
    })
    const [message, setmessage] = useState()

    const handleChange = (e) => {
        setmessage('')
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const handleClick = () => {
        axios.post('http://localhost:8008/admin/signin', input).then((res) => {
            console.log(res);
            setadminTrue(res.data.admin)
            setmessage(res.data.message)
            res.data.Signed && history.push('/adminhome')
        })
    }

    useEffect(() => {
        localStorage.removeItem('user')
        setadminTrue(false)

    }, [])

    return (

        // <div>


        //     <div className="main">
        //         <br />
        //         <br />
        //     <div className="demo">
        //     <h1>admin page</h1>
        //     <h5>LogIn</h5>

        //     </div>
        //         <div className="sub">
        //         <h2 className='yyy'>{message}</h2>
        //             <input type="text" placeholder='email' name='Email' onChange={handleChange} />
        //             <br />
        //             <input type="password" placeholder='password' name='password' onChange={handleChange} />
        //             <br />
        //             <button onClick={handleClick} >Login</button>
        //         </div>
        //     </div>


        // </div>


        // try
        <div className="admin_body">
            <div class="admin_container">
                <div class="row">
                   
                    <div class="col-lg-6 col-md-8 login-box">
                    
                        <div class="col-lg-12 login-title">
                            ADMIN PANEL
                        </div>
                        <h2 className='yyy'>{message}</h2>
                        <div class="col-lg-12 login-form">
                            <div class="col-lg-12 login-form">
                                <form>
                                    <div class="form-group">
                                        <label class="form-control-label">USERNAME</label>
                                        <input type="text" placeholder='email' name='Email' onChange={handleChange} />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-control-label">PASSWORD</label>
                                        <input type="password" placeholder='password' name='password' onChange={handleChange} />
                                    </div>
                                    <div class="col-lg-12 loginbttm">
                                        <div class="col-lg-6 login-btm login-text">

                                        </div>
                                        <div class="col-lg-6 login-btm login-button">
                                            <button type="submit" class="btn btn-outline-primary" onClick={handleClick} >LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-2"></div>
                    </div>
                </div>

            </div>
        </div>




    )
}

export default Admin
