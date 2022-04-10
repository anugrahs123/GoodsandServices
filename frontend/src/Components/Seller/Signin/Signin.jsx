import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { DataContext } from '../../../Context/Context';
import './Signin.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import logo1 from './../../../loginq.jfif';
import useForm from '../../Validation/Validation';
import './Signin.css'

function Signin() {
  //Final submit function
  const formLogin = () => {
    console.log('Callback function when form is submitted!');
    console.log('Form Values ', values);
  };

  //Custom hook call
  const { handleChange, values, errors, handleSubmit } = useForm(formLogin);

  const history = useHistory();
  const { State, AdminTrue, Sellers, IsLoaged } = useContext(DataContext);
  const LoginSuccess = () => toast('Login Success');
  const [adminTrue, setadminTrue] = AdminTrue;
  const [isLoaged, setisLoaged] = IsLoaged;
  const [state, setstate] = State;

  const [seller, setseller] = Sellers;
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

    axios
      .post('http://localhost:8008/seller/signin', input)
      .then((response) => {
        const vname = response.data.session?.seller;
        console.log('chh', vname);
        const vvname = response.data.session?.seller.Name;
        // response&& toast(response.data.user)

        // console.log('resq',response.data.session.user.Name);

        // setuser(response.data.session.user)
        setseller(vname);

        setmessage(response.data.message);

        localStorage.setItem('seller', vvname);
        setreload(true);
        setreload(false);
        if (response.data.session?.signedIn) {
          LoginSuccess();
          setisLoaged(true);
          history.push('/seller');
        } else alert('Login failed');
      });
  };
  useEffect(() => {
    setadminTrue(false);
    localStorage.getItem('seller');
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

    //         <Link style={{ textDecoration: 'none' }} to='/seller-signup'>
    //             <Button className='btn btn-primary text-dark'>
    //                 SignUp
    //             </Button>
    //         </Link>

    //         {/* <p className='login-form-bottontext'>Don't have an account? <span>Signup</span></p> */}
    //     </form>
    // </div>


    // try
    <div className='body'> <div class="container">
      <h1 >Signin</h1>
      <form  >
        {error ? <h2 style={{ color: 'red' }}>{error}</h2> : ''}
        <h4>{message}</h4>
        <input onChange={handleChane}
          name='Email'
          value={input.Email}
          placeholder='Username'
          class='input'
          autoComplete='on'
          type='email'
          required />
        <input
            onChange={handleChane}
            name='Password'
            value={input.Password}
            placeholder='Password'
            class='input'
            type='password'
            required
        />
        <div class="btns">
      
            <Button onClick={handleClick} type='submit' class='button'>
                Login{' '}
            </Button>
       
        <Link style={{ textDecoration: 'none' }} to='/seller-signup'>
            <Button className='btn btn-primary text-dark'>
                SignUp
            </Button>
        </Link>
        </div>

      </form>
    </div></div>


  );
}

export default Signin;
