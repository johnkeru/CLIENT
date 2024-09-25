import React, { useEffect } from 'react'
import api from '../configs/api'
import { useUser } from '../CONTEXT/UserContext'

const Blog = () => {
    const { currentUser } = useUser()
    return (
        <div>
            <h1>{currentUser?.username}</h1>
        </div>
    )
}

export default Blog