import React, { useEffect } from 'react'
import api from '../configs/api'

const Blog = () => {
    useEffect(() => {
        api.get('/currentUser').then(res => {
            console.log(res.data)
        })
    }, [])
    return (
        <div>Blog</div>
    )
}

export default Blog