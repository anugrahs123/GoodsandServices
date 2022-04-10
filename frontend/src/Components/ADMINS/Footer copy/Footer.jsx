import React from 'react'
import {BsFacebook, BsYoutube, BsInstagram, BsTwitter} from 'react-icons/bs'
import {BiPhoneCall} from 'react-icons/bi'
import './Footer.scss'

function Footer() {
  return (
      <div className='footer-wrapper'>
    <div className='footer'>
        <div className='footer__top'>
            <div className='footer__top__contact'>
                <span>
                    <BiPhoneCall />
                </span>
                <div>
                    <h2>CALL US 24/7</h2>
                    <a href="tel:+917559814382">+91 7994766524</a>
                </div>
            </div>
            <div className='footer__top__social'>
                <h2>FOLLOW US</h2>
                <div className='footer__top__social__icons'>
                    <BsFacebook />
                    <BsYoutube />
                    <BsInstagram />
                    <BsTwitter />
                </div>
            </div>
            <div className='footer__top__cards'>
                <img src="https://zealous-snyder-7f3261.netlify.app/static/media/paymentCards.bb5de1e5315214537c9b.png" alt="" />
            </div>
        </div>
        <div className='footer__bottom'>
            <p>Copyright © {new Date().getFullYear()} <span>Products And Services</span>. All Rights Reserved.</p>
        </div>
    </div>
    </div>
  )
}

export default Footer