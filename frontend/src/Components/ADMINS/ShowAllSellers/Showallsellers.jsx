import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Showallsellers.css";

function Showallsellers() {
  const [ref, setref] = useState(false);
  const [allsellers, setallsellers] = useState([]);
  const getAllSellers = () => {
    axios.get("http://localhost:8008/admin/all-sellers").then((result) => {
      console.log(result);
      setallsellers(result.data.sellers);
    });
  };
  const deleteSeller = (id) => {
    let it = window.confirm("Are You Sure Delete ?");
    it &&
      axios
        .get(`http://localhost:8008/admin/remove-seller/${id}`)
        .then((res) => {
          console.log(res);
          setref(true);
          setref(false);
        });
  };

  useEffect(() => {
    getAllSellers();
  }, [ref]);
  return (
    <div className="main-i">
      {/* <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>mail id</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {allsellers.map((i, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{i.Name}</td>
              <td>{i.Email}</td>

              <td>
                <button
                  onClick={() => deleteSeller(i._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}

      {/* try */}
      <table class="styled-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>mail id</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {allsellers.map((i, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{i.Name}</td>
              <td>{i.Email}</td>

              <td>
                <button
                  onClick={() => deleteSeller(i._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* try */}
    </div>
  );
}

export default Showallsellers;
