import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { DataContext } from '../../../Context/Context'

function ChatTable() {
  const { AdminTrue } = useContext(DataContext)
  const [adminTrue, setadminTrue] = AdminTrue
  const [arr, setarr] = useState([]);
  const [send, setsend] = useState([])
  const getMessages = () => {

    axios.get(`http://localhost:8008/messages`).then((result) => {
      console.log(result.data)
      setarr(result.data)

    })
  }



  useEffect(() => {
    setadminTrue(false)
    getMessages()

  }, [])

  return (

    arr.map((i) => {

      return (<>
        <table class="styled-table">
          <tbody>
            <tr>
              <td><thead>Message From</thead></td>
              <td><Link to={`/chat/${i.sender}`}>{i.sender}</Link></td>
            </tr>
          </tbody>
        </table>
      </>
      )
    })


  )
}

export default ChatTable