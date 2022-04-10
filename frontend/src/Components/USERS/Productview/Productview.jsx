import React from "react";
import CardS from "../Card/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../../Context/Context";

function Productview() {
  const { State, AdminTrue, Users, Cartcount } = useContext(DataContext);
  const [adminTrue, setadminTrue] = AdminTrue;

  const [res, setres] = useState(false);
  const [state, setstate] = useState([]);
  const [cartCount, setcartCount] = Cartcount;

  const getData = () => {
    console.log("getdata working");
    axios.get(process.env.REACT_APP_API_URL).then((response) => {
      console.log(response.data);
      setcartCount(response.data.cartCount);
      setstate(response.data.products);
    });
  };
  useEffect(() => {
    setadminTrue(false);
    getData();
  }, [res]);

  return (
    <div>
      <div className="map-items">
        {state.map((i) => {
          return <CardS setres={setres} i={i} />;
        })}
      </div>
    </div>
  );
}

export default Productview;
