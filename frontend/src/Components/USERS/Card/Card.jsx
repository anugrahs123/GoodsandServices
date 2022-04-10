import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./Card.css";
import { DataContext } from "../../../Context/Context";
import { useContext } from "react";
// import productd from '../productdescription/productd'
function CardS({ i, setres }) {
  const { IsLoaged } = useContext(DataContext);

  const [isLoaged, setisLoaged] = IsLoaged;

  const addItem = (itm) => {
    console.log(itm);
    axios.get(`http://localhost:8008/add-to-cart/${itm}`).then((resp) => {
      console.log(resp);
      resp && toast(resp.data.message);
      setres(true);
      setres(false);
    });
  };

  const wishList = (itm) => {
    axios
      .post(`http://localhost:8008/add-to-wishlist/${itm}`)
      .then((response) => {
        console.log(response);
        response && toast(response.data.message);
      });
  };
  const sendChat = (id) => {
    console.log(id);
    // axios.get(`http://localhost:8008/chat${id}`)
  };
  useEffect(() => {
    // it ? setisLoaged(true) :setisLoaged(false)
  }, [isLoaged]);

  return (
    <div className="card-item">
      <Link to={`/productd/${i._id}`}>
        <ToastContainer
          position="top-center"
          autoClose={2001}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />

        <figure class="snip1171">
          <img src={i.url} alt="sample71" />
          <div class="price">&#8377; {i.Price}</div>
          <figcaption>
            <h3>{i.Name}</h3>
            <p>upload :{i.CreatedBy}</p>

            <button onClick={() => addItem(i._id)}>Add to Cart</button>
            {isLoaged &&
              <>
                <Link to={`/chat/${i.CreatedBy}`}> <button >chat</button></Link>
              </>
            }

          </figcaption>
        </figure>

        <div></div>
      </Link>
    </div>
  );
}

export default CardS;
