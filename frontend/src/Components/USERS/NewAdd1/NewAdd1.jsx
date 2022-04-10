import React from 'react'
import axios from 'axios';
import { useEffect ,useState ,useContext} from 'react';
import {Modal ,Button} from 'react-bootstrap';
import {Link} from 'react-dom'
import { DataContext } from '../../../Context/Context';
import {useHistory,useParams} from 'react-router-dom'


function NewAdd1() {
    const {id}=useParams();
    console.log(id)
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
        Name: '',
        Category: '',
        Price: null,
        Description: ''
    })
    const getData=()=>{
axios.get(`http://localhost:8008/edit/${id}`).then((result)=>{
console.log(result)
setinput(result.data)
})
    }
    const handleChange = (e) => {
        
        setinput({ ...input, [e.target.name]: e.target.value })
        console.log(input)
    }
    const handleAdd = async () => {
     
    await    axios.post('http://localhost:8008/editprod', { id:id,input: input }).then((res) => {
            console.log(res);
            
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
        getData()
        setadminTrue(false)
      
    handleShow()
    }, [])
    
  return (
    <div>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
          <div className="title">
                    <h1>Update PRODUCTS</h1>
                </div></Modal.Title>
        </Modal.Header>
        <Modal.Body>  <div className="addprod-form">
                    <input type="text" onChange={handleChange}  name='Name'  value={input.Name}  /><br /><br />
                    <input type="text" onChange={handleChange} name='Category'value={input.Category} placeholder='Category' /><br /><br />
                    <input type="text" onChange={handleChange} name='Price'value={input.Price} placeholder='Price' /><br /><br />
                    <input type="text"  onChange={handleChange} name='Description' value={input.Description} placeholder='Description' />
                    <span style={{color:"orange"}}><h6>*not lessthan 10 words</h6></span><br />


                </div></Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        <Button onClick={handleAdd}>add </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default NewAdd1
