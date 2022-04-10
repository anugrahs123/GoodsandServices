import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { BsBasket, BsCart4 } from "react-icons/bs";
import { useContext, useEffect } from 'react'
import { DataContext } from '../../Context/Context'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';




import './Navbar.css'

function Navbar () {
    // const { Users, Cartcount, AdminTrue,IsLoaged } = useContext(DataContext)
    // const [cartCount, setcartCount] = Cartcount


    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    // const [isLoaged,setisLoaged]=IsLoaged

    const { Users, Cartcount, AdminTrue,IsLoaged } = useContext(DataContext)
    const [adminTrue, setadminTrue] = AdminTrue
    const history= useHistory()
    const [user, setuser] = Users
    const [cartCount, setcartCount] = Cartcount
    const [isLoaged,setisLoaged]=IsLoaged
    const [refresh, setrefresh] = useState(false)
    const [currentUser, setcurrentUser] = useState()
    const notify = () => toast("successfuly Logout");


    const logout = () => {
        notify()
        axios.get('http://localhost:8008/signout').then((res) => {
            console.log(res);
            if (res.data.message = 'logout success') {
                localStorage.removeItem('user')
                setisLoaged(false)
                history.push('/Login')
                
            } else {
                alert('something went wrong')
            }

            // res.data.message = 'logout success' ?  localStorage.removeItem('user') : alert('something went wrong')

        })
    }
    const reload = () => {
        setrefresh(true)
        setrefresh(false)
    }

    useEffect(() => {
        const it =localStorage.getItem('user')
        it ? setisLoaged(true) :setisLoaged(false)
        setcurrentUser(it);
    }, [refresh,isLoaged])


  return (
    <div className='navbar'>
        <div>
            <Link to='/'><img src="C:\Users\user\Downloads\logo.png" alt="" /></Link>
        </div>
        <div className='navbar-nav'>
            <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to='/productview'><li>Products</li></Link>
               {isLoaged &&
                <>
                <Link to='/messages'><li>Chat</li></Link>
                <Link to='/profile'> <li>Profile</li></Link>
               <div style={{ marginTop: '15px' }} className="cartIcon">
                    <Link style={{ textDecoration: 'none', color: '#fff' }} to='/cart' >  <h2 > <BsCart4 /> <span style={{ fontSize: '30px' }} >{ isLoaged && cartCount} </span>  </h2> </Link>
                </div>
                </>
                
}
                {/* <Link to='/cart'><li>Cart</li></Link> */}
                <li>
                     <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt="" onMouseOver={() => {
                         setIsSidebarOpen(!isSidebarOpen)
                     }} />
                     {isSidebarOpen && (
                         <div className='navbar-nav-dropdown'>
                         <button>{isLoaged ? <h5 onClick={logout}> Logout </h5> : <Link style={{ textDecoration: 'none' }} to='/Login' > <h5 onClick={reload}  >Login</h5></Link>}</button>
                        <Link to='/signup'><button>Signup</button></Link>
                        <Link to='/admin'><button>Admin panel</button></Link>
                      </div>
                     )}
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar;