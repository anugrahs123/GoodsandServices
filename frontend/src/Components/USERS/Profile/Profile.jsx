import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../Context/Context";
import ProfilePic from "../../../backw.jfif";
import Sidetab from "../Tabs/SideTab";

function Profile() {
  const { State, AdminTrue, Users, Cartcount } = useContext(DataContext);
  const [adminTrue, setadminTrue] = AdminTrue;
  const [OpenModal, setOpenModal] = useState(false);
  const [nwUser, setnwUser] = useState();
  const [openWish, setopenwish] = useState();

  const getUserDetails = () => {
    axios.get("http://localhost:8008/userDetails").then((res) => {
      console.log(res);
      setnwUser(res.data.message);
    });
  };
  const getWishListItems = (textt) => {
    axios.get("http://localhost:8008/wishlist").then((resp) => {
      console.log(resp);
      // setopenwish(resp.data.textt)
    });
  };
  const getUserorders = (txt) => {
    setopenwish(txt);
    axios.get("http://localhost:8008/userOrderItems").then((response) => {
      console.log(response);
      setopenwish(response.data.txt);
    });
  };
  const modalFunction = () => {
    setopenwish("modal");
  };
  useEffect(() => {
    getUserDetails();
    getUserorders();
    modalFunction();
    getWishListItems();
    setadminTrue(false);
  }, []);
  return (
    <div>
      <Sidetab nwUser={nwUser} />
    </div>
  );
}

export default Profile;
