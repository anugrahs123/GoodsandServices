// import axios from 'axios';
// import React, { useEffect, useState ,useContext} from 'react'
// import './Change.css'
// import {DataContext} from '../../Context/Context'
// import {Table} from 'react-bootstrap'

// function Change() {
//     const [ref, setref] = useState(false)
//     const { sellers, Cartcount, sellerTrue } = useContext(DataContext)
//     const [sellerTrue, setsellerTrue] = sellerTrue
//     const [items, setitems] = useState([
        
//     ])
//     const getsellerdetails = () => {
//         axios.get('http://localhost:8008/seller/').then((response) => {
//           console.log(response);
//           setitems(response.data.products)
//         })
//       }
//       const deleteItem =(id)=>{
//           alert
//           ("deleted")
//           axios.post(`http://localhost:8008/seller/delete-product/${id}`).then((res)=>{
//               console.log(res);
//               setref(true)
//               setref(false)
//           })
//       }
//       const deleteAllItem =()=>{
//         alert("deleted")
          
//           axios.get('http://localhost:8008/seller/delete-all-products').then((res)=>{
//               console.log(res);
//               setref(true)
//               setref(false)
//           })
//       }
//       useEffect(() => {
//             getsellerdetails()
//             setsellerTrue(true)
//       }, [ref])
//     return (
//         <div className='main-i' >
            
//  <>
//  <Table striped bordered hover variant="dark">
//     <thead>
//         <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Uploaded</th>
//             <th>Delete</th>
//         </tr>
//     </thead>
//     <tbody>
//         {items.map((i)=>(
//             <tr>
//             <td>{i.Name}</td>
//             <td>{i.Price}</td>
//             <td>{i.CreatedBy}</td>
//             <td><button onClick={()=>deleteItem(i._id)} className='btn btn-danger' >Delete</button></td>
//         </tr>

//         ))}
        
       
        
//     </tbody>
// </Table>
// <div className="dlt-btn">
// <button className='btn btn-danger' onClick={deleteAllItem} >Delete All</button>
// </div>
// </>:
// <div  className="no-item mt-4">
 
//  </div>
 
 


    
//         </div>
//     )
// }

// export default Change
