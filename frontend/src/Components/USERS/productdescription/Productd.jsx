// import axios from 'axios'
// import React from 'react'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { DataContext } from '../../../Context/Context'
// import { useContext } from 'react'
// import './SingleProd.css'
// import { toast, ToastContainer } from 'react-toastify'



// function Productd() {
//   const [detail, setdetails] = useState('')
//   const { Users, AdminTrue, Cartcount } = useContext(DataContext)
//   const [cartCount, setcartCount] = Cartcount


//   const [adminTrue, setadminTrue] = AdminTrue

//   const { id } = useParams()

//   const addItem = (itm) => {
//     console.log(itm);
//     axios.get(`http://localhost:8008/add-to-cart/${itm}`).then((resp) => {
//       console.log(resp);
//       resp && toast(resp.data.message)
//       alert("Product Added ,Checkout Cart")
//       //  setres(true)
//       //  setres(false)
//     })
//   }





//   const description = () => {
//     console.log("product id", id)
//     axios.get(`http://localhost:8008/describ/${id}`).then((response) => {
//       console.log("product details", response.data)
//       setdetails(response.data);
//     })
//   }
//   useEffect(() => {
//     setadminTrue(false)
//     description()


//   }, [])
//   return (
//     <div>
//       <div className='body'>
//         <div className="container">
//           <div className='prod-items'>
//             <div className='left-img'>
//               <img src={detail.url} />

//             </div>
//             <div className='center-img'>
//               <img src={detail.url} />
//             </div>


//             <div className='desc'>
//               <h1 style={{ color: "blue" }}>{detail.Name}</h1>
//               <h4>{detail.Category}</h4>
//               <u className='price'><h2>&#x20B9;{detail.Price}</h2></u>

//               <button onClick={() => addItem(detail._id)} className=' bg-success' >Add to Cart</button>
//               <br />
//               <br />




//               <h3>Description:{detail.Description}</h3>
//               <h6 style={{ color: "GrayText" }}>uploaded by: {detail.CreatedBy}</h6>

//             </div>

//           </div>
//         </div >




//       </div >
//     </div>
//   )
// }

// export default Productd



import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../../../Context/Context'
import { useContext } from 'react'
import './SingleProd.scss'
import { toast, ToastContainer } from 'react-toastify'



function Productd() {
  const [detail, setdetails] = useState('')
  const { Users, AdminTrue, Cartcount } = useContext(DataContext)
  const [cartCount, setcartCount] = Cartcount


  const [adminTrue, setadminTrue] = AdminTrue

  const { id } = useParams()

  const addItem = (itm) => {
    console.log(itm);
    axios.get(`http://localhost:8008/add-to-cart/${itm}`).then((resp) => {
      console.log(resp);
      resp && toast(resp.data.message)
      alert("Product Added ,Checkout Cart")
      //  setres(true)
      //  setres(false)
    })
  }





  const description = () => {
    console.log("product id", id)
    axios.get(`http://localhost:8008/describ/${id}`).then((response) => {
      console.log("product details", response.data)
      setdetails(response.data);
    })
  }
  useEffect(() => {
    setadminTrue(false)
    description()


  }, [])
  return (

    // <div>
    //   <div className='body'>
    //     <div className="container">
    //       <div className='prod-items'>
    //         <div className='left-img'>
    //           <img src={detail.url} />

    //         </div>
    //         <div className='center-img'>
    //           <img src={detail.url} />
    //         </div>
    //         <div className='desc'>
    //           <h1 style={{ color: "blue" }}>{detail.Name}</h1>
    //           <h4>{detail.Category}</h4>
    //           <u className='price'><h2>&#x20B9;{detail.Price}</h2></u>
    //           <button onClick={() => addItem(detail._id)} className=' bg-success' >Add to Cart</button>
    //           <br />
    //           <br />
    //           <h3>Description:{detail.Description}</h3>
    //           <h6 style={{ color: "GrayText" }}>uploaded by: {detail.CreatedBy}</h6>

    //         </div>

    //       </div>
    //     </div >
    //   </div >
    // </div>

    // try

    <div className="product_body">
      <section class="product">
	<div class="product__photo">
		<div class="photo-container">
			<div class="photo-main">
      <img src={detail.url} />
			</div>
			{/*  */}
		</div>
	</div>
	<div class="product__info">
		<div class="title">
			<h1>{detail.Name}</h1>
			
		</div>
		<div class="price">
			R$ <span>{detail.Price}</span>
		</div>
		
		<div class="description">
			<h3>DESCRIPTION</h3>
			<h5>
      {detail.Description}
      </h5>
		</div>
		<button class="buy--btn" onClick={() => addItem(detail._id)} >ADD TO CART</button>
    <br /><br /><br />
    <h3>UPLOADED BY</h3><br />
			<h5>
      {detail.CreatedBy}
      </h5>
	</div>
</section>


    </div>

  )
}

export default Productd