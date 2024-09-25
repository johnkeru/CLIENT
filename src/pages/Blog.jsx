import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import api from '../configs/api'
import BlogCard from '../components/BlogCard'

const Blog = () => {
    const { currentUser } = useUser()
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        api.get('/blogs')
            .then(res => setBlogs(res.data.blogs))
    }, [])
    return (
        <div>
            {
                blogs && blogs.length > 0 ?
                    blogs.map(blog => (
                        <BlogCard key={blog._id} blog={blog} />
                    )) : 'No blog found'
            }
        </div>
    )
}

export default Blog