import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { DataContext } from '../../../Context/Context';
import './Login.scss';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import logo1 from './../../../loginq.jfif';
import useForm from '../../Validation/Validation';

function About() {
    //Final submit function
    const formLogin = () => {
        console.log('Callback function when form is submitted!');
        console.log('Form Values ', values);
    };

    //Custom hook call
    const { handleChange, values, errors, handleSubmit } = useForm(formLogin);

    const history = useHistory();
    const { State, AdminTrue, Users, IsLoaged } = useContext(DataContext);
    const LoginSuccess = () => toast('Login Success');
    const [adminTrue, setadminTrue] = AdminTrue;
    const [isLoaged, setisLoaged] = IsLoaged;
    const [state, setstate] = State;

    const [user, setuser] = Users;
    const [error, seterror] = useState();
    const [reload, setreload] = useState(false);
    const [input, setinput] = useState({
        Email: '',
        Password: '',
    });
    const [message, setmessage] = useState();

    const formdata = new FormData();

    const handleChane = (e) => {
        setmessage('');

        setinput({ ...input, [e.target.name]: e.target.value });
    };
    const handleClick = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8008/signin', input).then((response) => {
            const vname = response.data.session?.user;
            console.log('chh', vname);
            const vvname = response.data.session?.user.Name;
            // response&& toast(response.data.user)

            // console.log('resq',response.data.session.user.Name);

            // setuser(response.data.session.user)
            setuser(vname);

            setmessage(response.data.message);

            localStorage.setItem('user', vvname);
            setreload(true);
            setreload(false);
            if (response.data.session?.signedIn) {
                LoginSuccess();
                setisLoaged(true);
                history.push('/');
            } else alert('Login failed');
        });
    };
    useEffect(() => {
        setadminTrue(false);
        localStorage.getItem('user');
    }, [reload]);
    return (
        // <div className='login'>
        //     <div className='login-wrapper'>
        //         <h3>Welcome Back</h3>
        //         <p>please signin to continue</p>
        //     </div>
        //     <form className='login-form'>
        //         {error ? <h2 style={{ color: 'red' }}>{error}</h2> : ''}
        //         <h2>{message}</h2>
        //         <input
        //             onChange={handleChane}
        //             name='Email'
        //             value={input.Email}
        //             placeholder='Username'
        //             class='input'
        //             autoComplete='on'
        //             type='email'
        //             required
        //         />
        //         <input
        //             onChange={handleChane}
        //             name='Password'
        //             value={input.Password}
        //             placeholder='Password'
        //             class='input'
        //             type='password'
        //             required
        //         />
        //         <center>
        //             <button onClick={handleClick} type='submit' class='button'>
        //                 Login{' '}
        //             </button>
        //         </center>

        //         <Link style={{ textDecoration: 'none' }} to='/signup'>
        //             {' '}
        //             <Button className='btn btn-primary text-dark'>
        //                 SignUp
        //             </Button>{' '}
        //         </Link>

        //         {/* <p className='login-form-bottontext'>Don't have an account? <span>Signup</span></p> */}
        //     </form>
        // </div>

        <div>
            {/* try */}
            <div className="login_body">
                <div className="login_signupSection">

                    <form class="signupForm" onSubmit={handleClick}>
                        {error ? <h5 style={{ color: 'red' }}>{error}</h5> : ''}
                        <h2>{message}</h2>
                        <h2>Sign In</h2>
                        <ul class="noBullet">

                            <li>
                                <label for="email"></label>
                                <input
                                    type='text'
                                    name='Email'
                                    value={input.Email}
                                    onChange={handleChane}
                                    class="inputFields"
                                    placeholder='email'
                                    autoComplete='on'
                                    required
                                />
                            </li>
                            <li>
                                <label for="pwd"></label>
                                <input
                                    type='password'
                                    name='Password'
                                    class="inputFields"
                                    value={input.Password}
                                    onChange={handleChane}
                                    placeholder='password'
                                    required

                                />
                            </li>

                            <li id="center-btn">

                                <button id="join-btn">SignIn</button><br />
                                <Link to='/signup'>
                                    {' '}
                                    <button id="join-btn">Create Account ?</button>{' '}
                                </Link>
                            </li>
                        </ul>
                    </form>
                    <div class="info">
                        <h2>Welcome</h2>
                        <br />
                        <i class="icon ion-ios-ionic-outline" aria-hidden="true"></i>
                        <p>To The Products And Service</p>
                        <br />
                        <img src="data:image/jpeg;base64,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" alt="" srcset="" />
                    </div>
                </div>
            </div>


        </div>


    );
}

export default About;
