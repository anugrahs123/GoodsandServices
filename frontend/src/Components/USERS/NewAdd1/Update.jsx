import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Update() {
    const {id}= useParams();
    console.log(id)
    const [input, setinput] = useState({
        Name: '',
        Category: '',
        Price: null,
        Description: ''
    })
    const handleChange = (e) => {
        
        setinput({ ...input, [e.target.name]: e.target.value })
        console.log(input)
    }
    const getData=()=>{
        axios.get(`http://localhost:8008/edit/${id}`).then((result)=>{
        console.log(result)
        setinput(result.data)
        })
            }
            useEffect(()=>{
                getData()
            },[])
  return (
      
    <div><h1>{input.Name}</h1>
         <input type="text" onChange={handleChange}  name='Name' value={input.Name} /><br /><br />
                    <input type="text" onChange={handleChange} value={input.Name} name='Category' placeholder='Category' /><br /><br />
                    <input type="text" onChange={handleChange} value={input.Name} name='Price' placeholder='Price' /><br /><br />
                    <input type="text"  onChange={handleChange} name='Description' placeholder='Description' />
                    {/* <span style={{color:"orange"}}><h6>*not lessthan 10 words</h6></span><br />
                    <input accept="image/png" onChange={(e) => setimage(e.target.files[0])} type="file" /> */}
                    <span style={{color:"red"}}><h4>*image mandatory</h4></span>

    </div>
  )
}

export default Update