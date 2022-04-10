import React from 'react'
import axios from 'axios'
import { Button, Container, Dropdown, DropdownButton ,Navbar ,Nav ,NavDropdown ,NavLink} from 'react-bootstrap'
import './Adminheader.css'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'

function Adminheader() {
  const history=useHistory()

  const logout=()=>{
    axios.get('http://localhost:8008/admin/signout').then((response)=>{
      console.log(response);
      history.push('/admin')
    })
  }
    return (
              
            <div className="mainhead">
                <div className='left'>
                  {/* <h1>Admin Page</h1>   */}
                </div>
                <div className='right' >
                  {/* <Link to='/admins' ><button>-</button></Link>  */}
                   <Link to='/adminhome' > <button  >Product</button> </Link>  
                   <Link to='/getallusers' > <button>User</button></Link> 
                   <Link to='/getallsellers' > <button>Seller</button></Link> 
                   <Link to='/allorders' > <button>Orders</button></Link> 
                   <Link to='/service' ><button>addService</button></Link>
                   <Link to='/admin' ><button onClick={logout}>LOGOUT</button></Link>
                   
                    
                    
                    
                </div>
                </div>
              
    
            
         
        
    )
}

export default Adminheader
