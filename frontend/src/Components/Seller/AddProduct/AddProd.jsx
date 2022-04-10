import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-dom";
import { DataContext } from "../../../Context/Context";
import { useHistory } from "react-router-dom";
import "./AddProd.scss";
import SellerHeader from '../SellerHeader/SellerHeader'

function AddProd() {
  const { Users, AdminTrue, Cartcount, seller } = useContext(DataContext);
  const [adminTrue, setadminTrue] = AdminTrue;
  const [cartCount, setcartCount] = Cartcount;
  const [res, setres] = useState(false);
  const history = useHistory();
  const [show, setShow] = useState(false);

  const [image, setimage] = useState();
  const [isloading, setisloading] = useState(false);
  const [url, seturl] = useState();
  const [input, setinput] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    setisloading(true);
    console.log("handleAdd Working");
    const formdata = new FormData();

    formdata.append("file", image);
    formdata.append("upload_preset", "llcm6mzz");
    await axios
      .post("https://api.cloudinary.com/v1_1/di0bgblj1/image/upload ", formdata)
      .then((response) => {
        console.log(response);
        seturl(response.data.url);
      });
    url &&
      (await axios
        .post("http://localhost:8008/seller/addproduct", {
          input: input,
          url: url,
          sellerId: seller,
        })
        .then((res) => {
          console.log(res);
          res.data.vibe && alert("successfuly added");
          setimage();
          setisloading(false);
          history.push("/seller");
        }));
  };

  const handleClose = () => {
    setShow(false);
    history.push("/seller");
  };
  
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    setadminTrue(false);

    handleShow();
  }, []);

  return (
    <div>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="title">
              <h1>ADD PRODUCTS</h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="addprod-form">
            <input
              type="text"
              onChange={handleChange}
              name="name"
              placeholder="Product name"
              required
            />
            <br />
            <br />
            <input
              type="text"
              onChange={handleChange}
              name="category"
              placeholder="Category"
              required
            />
            <br />
            <br />
            <input
              type="text"
              onChange={handleChange}
              name="price"
              placeholder="Price"
              required
            />
            <br />
            <br />
            <input
              type="text"
              onChange={handleChange}
              name="description"
              placeholder="Description"
              required
            />
            <span style={{ color: "orange" }}>
              <h6>*not lessthan 10 words</h6>
            </span>
            <br />
            <input
              accept="image/png"
              onChange={(e) => setimage(e.target.files[0])}
              type="file"
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd}>
            {isloading ? "confirm" : "Add Product"}{" "}
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
      {/* </Modal.Footer>
      </Modal> */}

      {/* try */}
      {/* <SellerHeader/> */}
      <div class="container">
        <form method='POST' id="contact" onSubmit={handleAdd} >
          <h3>ADD PRODUCTS</h3>

          <input
            type="text"
            onChange={handleChange}
            name="name"
            placeholder="Product name"
            required
          />

          <input
            type="text"
            onChange={handleChange}
            name="category"
            placeholder="Category"
            required
          />

          <input
            type="text"
            onChange={handleChange}
            name="price"
            placeholder="Price"
            required
          />

          <input
            accept="image/png"
            onChange={(e) => setimage(e.target.files[0])}
            type="file"
            required
          />
          <textarea
            placeholder="Emter the description"
            onChange={handleChange}
            name="description"
            required
          ></textarea>

          <button name="submit" type="submit" onClick={handleAdd}>
            {isloading ? "confirm" : "Add Product"}{" "}
          </button>
          <button name="submit" type="reset" onClick={handleClose}>
            Close
          </button>
        </form>
      </div>

      {/* try */}
    </div>
  );
}

export default AddProd;
