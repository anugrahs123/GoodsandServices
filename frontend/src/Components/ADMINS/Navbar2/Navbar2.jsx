import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar2.scss'
import {useEffect ,useState  ,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { DataContext } from '../../Context/Context'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


function Navbar2() {
   // const { Users, Cartcount, AdminTrue,IsLoaged } = useContext(DataContext)
    // const [cartCount, setcartCount] = Cartcount


    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    // const [isLoaged,setisLoaged]=IsLoaged

    const { Users, Cartcount, AdminTrue,IsLoaged } = useContext(DataContext)
    const [adminTrue, setadminTrue] = AdminTrue
    const history= useHistory()
    const [user, setuser] = Users
    const [cartCount, setcartCount] = Cartcount
    const [isLoaged,setisLoaged]=IsLoaged
    const [refresh, setrefresh] = useState(false)
    const [currentUser, setcurrentUser] = useState()
    const notify = () => toast("successfuly Logout");


    const logout = () => {
        notify()
        axios.get('http://localhost:8008/signout').then((res) => {
            console.log(res);
            if (res.data.message = 'logout success') {
                localStorage.removeItem('user')
                setisLoaged(false)
                history.push('/Login')
                
            } else {
                alert('something went wrong')
            }

            // res.data.message = 'logout success' ?  localStorage.removeItem('user') : alert('something went wrong')

        })
    }
    const reload = () => {
        setrefresh(true)
        setrefresh(false)
    }

    useEffect(() => {
        const it =localStorage.getItem('user')
        it ? setisLoaged(true) :setisLoaged(false)
        setcurrentUser(it);
    }, [refresh,isLoaged])
  return (
    <div className='navbar2'>
      <div className='navbar2__left'>
      <Link to='/viewService'><button>Services</button></Link>
        {/* <Link to='/service'> <button>Services</button></Link> */}
      </div>
      {isLoaged &&
                <>
      <div className='navbar2__right'>
      <Link to='/add-product'><button>Create Product</button></Link>

        {/* <Link to='/add-prod'> <button>Create Products</button></Link> */}
        <Link to='/manageproduct'>  <button>Manage Products</button></Link>
      </div>
      </>}
    </div>

  )
}

export default Navbar2