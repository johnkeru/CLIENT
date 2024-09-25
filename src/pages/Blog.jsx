import React, { useEffect } from 'react'
import { useUser } from '../context/UserContext'

const Blog = () => {
    const { currentUser } = useUser()
    return (
        <div>
            <h1>{currentUser?.username}</h1>
        </div>
    )
}

export default Blog