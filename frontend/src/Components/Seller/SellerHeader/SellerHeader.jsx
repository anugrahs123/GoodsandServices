import React from "react";
import { Link } from "react-router-dom";
import "./SellerHeader.scss";
import { useContext, useEffect } from 'react'
import { DataContext } from '../../../Context/Context'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react'




function SellerHeader() {

  const { Sellers, Cartcount, AdminTrue, IsLoaged } = useContext(DataContext)
  const [isLoaged, setisLoaged] = IsLoaged
  const [adminTrue, setadminTrue] = AdminTrue
  const history = useHistory()
  const [seller, setseller] = Sellers
  const [cartCount, setcartCount] = Cartcount
  const [refresh, setrefresh] = useState(false)
  const [currentSeller, setcurrentSeller] = useState()
  const notify = () => toast("successfuly Logout");


  const logout = () => {
    notify()
    axios.get('http://localhost:8008/signout').then((res) => {
      console.log(res);
      if (res.data.message === 'logout success') {
        localStorage.removeItem('seller')
        setisLoaged(false)
        history.push('/seller-signin')

      } else {
        alert('something went wrong')
      }

      // res.data.message = 'logout success' ?  localStorage.removeItem('seller') : alert('something went wrong')

    })
  }
  const reload = () => {
    setrefresh(true)
    setrefresh(false)
  }

  useEffect(() => {
    const it = localStorage.getItem('seller')
    it ? setisLoaged(true) : setisLoaged(false)
    setcurrentSeller(it);
  }, [refresh, isLoaged])



  return (
    <div>


      <header>
        <nav>
          <div className="logo">
            <span>Pas_Seller</span>{" "}
          </div>
          <div className="menu">
            <ul>
              <li>
                <Link to="/seller-viewprod">View products</Link>
              </li>
              <li>
                <Link to="/seller-addprod">Add products</Link>
              </li>
              <li>
                <Link to="/seller-addshop">Add Shop</Link>
              </li>
              <li>
                <Link to="/seller-shop/:id">Shops</Link>
              </li>
              <li>
                <Link to="/seller-orders">Orders</Link>
              </li>
              <li>
                <Link to='/seller-messages1'>Chat</Link>
              </li>
            </ul>
          </div>
          <div class="login">
            <ul>


                <li>
                <div className=" button">{isLoaged ? <h5 onClick={logout}> Logout </h5> : <Link style={{ textDecoration: 'none' }} to='seller-signin' > <h5 onClick={reload}  >Login</h5></Link>}</div>
                </li>
              

            </ul>
          </div>
          <input type="checkbox" name="" id="hamburger" />

          <div class="toogle">
            <label for="hamburger">
              <span></span>
            </label>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default SellerHeader;
