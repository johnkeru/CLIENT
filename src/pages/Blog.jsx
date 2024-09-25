import React, { useEffect } from 'react'
import api from '../configs/api'

const Blog = () => {
    useEffect(() => {
        api.get('/currentUser').then(console.log)
    }, [])
    return (
        <div>Blog</div>
    )
}

export default Blog