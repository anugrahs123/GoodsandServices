import "./App.css";
import Main from "./Components/USERS/Main/Main";
import { BrowserRouter, Route } from "react-router-dom";
import About from "./Components/USERS/About/About";
import Signup from "./Components/USERS/Signup/Signup";
import Cart from "./Components/USERS/Cart/Cart";
import Placeorder from "./Components/USERS/Place-order/Placeorder";
import Admin from "./Components/ADMINS/AdminLogin/Admin";
import Showallusers from "./Components/ADMINS/ShowAllUsers/Showallusers";
import { DataContext } from "./Context/Context";
import { useContext, useEffect, useState } from "react";
import Adminheader from "./Components/ADMINS/AdminHeader/Adminheader";
import axios from "axios";
import Ordersuccess from "./Components/USERS/Order-Scucess/Ordersuccess";
import Change from "./Components/Change/Change";
import Allorders from "./Components/ADMINS/All-Orders/Allorders";
import Profile from "./Components/USERS/Profile/Profile";
import Chat from "./Components/USERS/Chat/Chat";
import ViewService from "./Components/viewServices/viewServices";
import Productd from "./Components/USERS/productdescription/Productd";
import NewAdd from "./Components/USERS/NewAdd/NewAdd";
import NewService from "./Components/ADMINS/NewService/NewService";
import Productview from "./Components/USERS/Productview/Productview";
import Footer from "./Components/Footer copy/Footer";
import ChatTable from "./Components/USERS/Chattable/Chattable";

import Navbar1 from "./Components/Navbar/Navbar";
import Navbar2 from "./Components/Navbar2/Navbar2";
import ManageProduct from "./Components/USERS/ManagrProduct/ManageProduct";
import NewAdd1 from "./Components/USERS/NewAdd1/NewAdd1";
import Update from "./Components/USERS/NewAdd1/Update";
import ShopView from "./Components/USERS/ShopView/ShopView";

import SlrSignup from "./Components/Seller/Signup/Signup";
import Signin from "./Components/Seller/Signin/Signin";
import AddShop from "./Components/Seller/AddShop/AddShop";
import AddProd from "./Components/Seller/AddProduct/AddProd";
import ShowallProds from "./Components/Seller/ViewProduct/ViewProd";
import Shopd from "./Components/Seller/ShopDesc/Shopd";
import Shoporders from "./Components/Seller/ViewShopOrders/ShopOrder";
// import SellerH from './Components/Seller/SellerH/SellerH';
import SellerHeader from "./Components/Seller/SellerHeader/SellerHeader";
import Showallsellers from "./Components/ADMINS/ShowAllSellers/Showallsellers";
import ChatTable1 from "./Components/USERS/Chattable/Chattable1";

function App() {
  const { Users, Cartcount, AdminTrue, IsLoaged, sellerTrue } =
    useContext(DataContext);
  const [adminTrue, setadminTrue] = AdminTrue;
  // const [sellerTrue, setsellerTrue] = SellerTrue
  const [isLoaged, setisLoaged] = IsLoaged;
  const [thing, setthing] = useState(false);

  useEffect(() => {
    let it = localStorage.getItem("user");
    it && setisLoaged(true);
    setthing(it);

    axios.get("http://localhost:8008/signin").then((res) => {
      console.log(res);
      res.user && setisLoaged(true);
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {adminTrue ? <Adminheader /> : <Navbar1></Navbar1>}

        {/* {!sellerTrue ? <Navbar1></Navbar1> : <SellerH/> } */}
        <Navbar2></Navbar2>

        <Route path="/admin" component={Admin} />
        <Route path="/adminhome" component={Change} />
        <Route path="/getallusers" component={Showallusers} />
        <Route path="/getallsellers" component={Showallsellers} />
        <Route path="/allorders" component={Allorders} />
        {/* <Route path='/admins' component={AdminHome} /> */}
        <Route path="/service" component={NewService}></Route>

        {/* Users Section */}
        <Route exact path="/">
          {" "}
          <Main />{" "}
        </Route>
        <Route path="/Login" component={About} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Cart" component={Cart} />
        <Route path="/place-order" component={Placeorder} />
        <Route path="/order-success" component={Ordersuccess} />
        <Route path="/profile" component={Profile} />
        <Route path="/Chat/:id" component={Chat} />
        <Route path="/viewService" component={ViewService}></Route>
        <Route path="/productd/:id" component={Productd} />
        <Route path="/productview" component={Productview} />
        <Route path="/messages" component={ChatTable} />
        <Route path="/seller-messages1" component={ChatTable1} />

        <Route path="/manageproduct" component={ManageProduct} />
        <Route path="/editproduct/:id" component={NewAdd1} />
        <Route path="/add-product" component={NewAdd} />
        <Route path="/shopview" component={ShopView}/>

        {/* <Route path='/*' component={Cart} /> */}

        {/* seller Section */}
        <Route path="/seller-signup" component={SlrSignup} />
        <Route path="/seller-signin" component={Signin} />
        <Route path="/seller-addshop" component={AddShop} />
        <Route path="/seller-addprod" component={AddProd} />
        <Route path="/seller-viewprod" component={ShowallProds} />
        <Route path="/seller-shopd/:id" component={Shopd} />
        <Route path="/seller-orders" component={Shoporders} />
        <Route path="/seller" component={SellerHeader} />
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
