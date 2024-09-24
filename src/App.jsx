import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => setMessage(res.data.message))
  }, [])

  return (
    <div>
      {message}
    </div>
  )
}

export default App