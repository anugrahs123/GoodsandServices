import React from 'react'
import axios from 'axios';
import { useEffect ,useState ,useContext} from 'react';
import {Modal ,Button} from 'react-bootstrap';
import {Link} from 'react-dom'
import { DataContext } from '../../../Context/Context';
import {useHistory} from 'react-router-dom'
import './AddProd.css'

function NewAdd() {
    const {Users,AdminTrue,Cartcount} = useContext(DataContext)
    const [adminTrue,setadminTrue]=AdminTrue
    const [cartCount, setcartCount] = Cartcount
    const [res, setres] = useState(false)
    const history=useHistory()




    const [show, setShow] = useState(false);

    
    const [image, setimage] = useState()
    const [isloading, setisloading] = useState(false)
    const [url, seturl] = useState()
    const [input, setinput] = useState({
        name: '',
        category: '',
        price: null,
        description: ''
    })
    const handleChange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const handleAdd = async () => {
        setisloading(true)
        console.log('handleAdd Working');
        const formdata =  new FormData()
        
        formdata.append('file', image)
        formdata.append('upload_preset', 'llcm6mzz')
        await axios.post('https://api.cloudinary.com/v1_1/di0bgblj1/image/upload ', formdata).then((response) => {
            console.log(response);
            seturl(response.data.url)
        })
        url && await axios.post('http://localhost:8008/addproduct', { input: input,url:url }).then((res) => {
            console.log("ee",res);
            res.data.vibe && alert('successfuly added')
            setimage()
            setisloading(false)
            history.push('/')
        })
    }
    const handleClose = () =>{
        setShow(false);
        history.push('/')
    }
    const handleShow = () =>{
         setShow(true);
        
    }

    useEffect(() => {
        setadminTrue(false)
      
    handleShow()
    }, [])
    
  return (
    <div>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
          <div className="title">
                    <h1>ADD PRODUCTS</h1>
                </div></Modal.Title>
        </Modal.Header>
        <Modal.Body>  <div className="addprod-form">
                    <input type="text" onChange={handleChange} name='name' placeholder='Product name' /><br /><br />
                    <input type="text" onChange={handleChange} name='category' placeholder='Category' /><br /><br />
                    <input type="text" onChange={handleChange} name='price' placeholder='Price' /><br /><br />
                    <input type="text"  onChange={handleChange} name='description' placeholder='Description' />
                    <span style={{color:"orange"}}><h6>*not lessthan 10 words</h6></span><br />
                    <input accept="image/png" onChange={(e) => setimage(e.target.files[0])} type="file" />
                    <span style={{color:"red"}}><h4>*image mandatory</h4></span>


                </div></Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        <Button onClick={handleAdd}>{isloading ? 'confirm':'Add Product'} </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default NewAdd
