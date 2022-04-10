import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Stripe from "../Stripe/Stripe";
import {
  FaCcVisa,
  FaCcAmazonPay,
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
} from "react-icons/fa";
import "./Placeorder.css";
import { DataContext } from "../../../Context/Context";
import { useHistory } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { result } from "lodash";
import GooglePayButton from "@google-pay/button-react";

function Placeorder() {
  const navigate = useHistory();
  const [data, setdata] = useState();
  const [val, setval] = useState();
  const { AdminTrue } = useContext(DataContext);
  const [adminTrue, setadminTrue] = AdminTrue;
  const [input, setinput] = useState({
    name: "",
    email: "",
    address: "",
  });
  const placeOrder = () => {
    axios.get("http://localhost:8008/place-order").then((response) => {
      console.log("hAA", response);
      setdata(response.data);
      console.log("yes", response.data);
    });
  };
  const placeOrders = (meth) => {
    axios
      .post("http://localhost:8008/place-order", { meth, order: input })
      .then((response) => {
        console.log("AAh", response);
        // response.data.codSuccess && navigate.push('/order-success')
        setval(response.data.codSuccess);
        alert("clear cart now");

        console.log("no", response.data);
      });
  };
  const delet = () => {
    axios.post("http://localhost:8008/delete").then((result) => {
      console.log("deleted", result.data);
      navigate.push("/order-success");
    });
  };
  const handleChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    placeOrder();
    setadminTrue(false);
  }, []);

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
async function displayRazorpay() {
  const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  

  const options = {
      key:"rzp_test_Z rDhS62F5xMNjrZ4yn8ESMeyG", // Enter the Key ID generated from the Dashboard
      amount: data?.total?.toString(),
      currency: "INR",
      name: "shop",
      description: "Purchase",
      image:"",
      order_id: "order_DBJOWzybf0sJbb",
      handler: async function (response) {
        placeOrders("online")
        
          
      },
      prefill: {
          name: "shop",
          email: "something@gamil.com",
          contact: "99999999",
      },
      notes: {
          address: "address here",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

  return (
    <div className="hei">
      <div className="contact">
        <div className="leftSide">
          <div className="Contents">
            <h1>CheckOut Here</h1>

            {data && <h2>Total is : {data && data.total}</h2>}
            <h4>Cart Items : {data && data.cartCount}</h4>
          </div>
          <div className="payment"></div>
        </div>
        <div className="rightSide">
          <h1>Checkout Address</h1>

          <form id="contact-form" method="POST">
            <label htmlFor="name">Full Name</label>
            <input
              onChange={handleChange}
              name="name"
              placeholder="Enter full name..."
              type="text"
            />
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              placeholder="Enter email..."
              type="email"
            />

            <label htmlFor="message">Address</label>
            <textarea
              onChange={handleChange}
              rows="6"
              placeholder="Address..."
              name="address"
              required
            ></textarea>
          </form>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-evenly",
            }}
            className="checkout-btns"
          >
            <button
              className="btn btn-success"
              style={{ height: "35px" }}
              onClick={() => placeOrders("COD")}
            >
              Cash On Delivery
            </button>
            <button
              className="btn btn-success"
              style={{ height: "35px" }}
              onClick={() =>displayRazorpay() }
            >
             Pay online
            </button>

            {/* <Stripe data={data} /> */}

            <div className="">
              {/* <h1><img src={logo} className="App-logo" alt="logo" /> Google Pay React Demo</h1> */}
              {/* <hr /> */}
              {/* <GooglePayButton
       onClick={()=>placeOrders('CARD')}
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '1',
            currencyCode: 'INR',
            countryCode: 'US',
          },
          shippingAddressRequired: true,
          callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Success', paymentRequest);
        }}
        onPaymentAuthorized={paymentData => {
            console.log('Payment Authorised Success', paymentData)
            return { transactionState: 'SUCCESS'}
          }
        }
        onPaymentDataChanged={paymentData => {
            console.log('On Payment Data Changed', paymentData)
            return { }
          }
        }
        existingPaymentMethodRequired='true'
        buttonColor='black'
        buttonType='Buy'
      /> */}
            </div>

            {/* <button onClick={()=>placeOrders('CARD')}>click</button> */}
          </div>
          <button
            className="btn btn-success"
            style={{ height: "35px" }}
            onClick={delet}
          >
            Clear cart now
          </button>
          <div className="cards">
            <h1>
              <FaCcVisa />
            </h1>
            <h1>
              <FaCcStripe />
            </h1>
            <h1>
              <FaCcMastercard />
            </h1>
            <h1>
              <FaCcAmazonPay />
            </h1>
            <h1>
              <FaCcPaypal />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Placeorder;