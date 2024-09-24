import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // fetch(
    //   'http://localhost:5000/users',
    //   { 
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ name: 'John Doe' })
    //    }
    // )
    // .then(res => res.json())
    // .then(data => console.log(data))

    // axios.post('http://localhost:5000/users', { name: 'John Doe' })
    //   .then(data => console.log(data))

    axios.get('http://localhost:5000/').then(res => setMessage(res.data.message))
  }, [])

  return (
    <div>
      {message}
    </div>
  )
}

export default App