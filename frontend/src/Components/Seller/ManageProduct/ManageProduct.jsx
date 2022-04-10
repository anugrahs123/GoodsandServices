import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../Context/Context";
import { useContext } from "react";
import "./ManageProduct.css";

function ManageProduct() {
  const [ref, setref] = useState(false);
  const { sellers, AdminTrue, Cartcount } = useContext(DataContext);
  const [adminTrue, setadminTrue] = AdminTrue;
  const [state, setstate] = useState([]);
  const manage = () => {
    axios.get(`http://localhost:8008/seller/sellerproducts`).then((res) => {
      console.log("sellerp", res);
      setstate(res.data);
    });
  };
  const deleteItem = (id) => {
    alert("deleted");
    axios
      .post(`http://localhost:8008/admin/delete-product/${id}`)
      .then((res) => {
        console.log(res);
        setref(true);
        setref(false);
      });
  };

  useEffect(() => {
    manage();
    setadminTrue(false);
  }, [ref]);

  return (
    <div>
      

      {/* try */}
      <table class="styled-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          {state.map((i, index) => {
            return (
              <tr style={{ color: "#000" }}>
                <td>{index + 1}</td>
                <td>{i.Name}</td>
                <td>{i.Price}</td>
                <td>{i.Category}</td>
                <td>{i.Description}</td>
                <td>
                  <img
                    src={i.url}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>
                  <Link to={`/editproduct/${i._id}`}>Edit</Link>
                </td>
                <td>
                  <button
                    onClick={() => deleteItem(i._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* try */}
    </div>
  );
}

export default ManageProduct;
