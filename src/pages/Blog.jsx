import React, { useEffect, useState } from 'react'
import api from '../configs/api'
import BlogCard from '../components/BlogCard'
import { Box, Button, Paper, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const nav = useNavigate()
    const [blogs, setBlogs] = useState([])

    const handleDelete = (blog) => {
        api.delete(`/blogs/${blog._id}`)
            .then(() => setBlogs(blogs.filter(b => b._id !== blog._id)))
    }

    const handleGoToEdit = (blog) => nav(`/update-blog/${blog._id}`)

    useEffect(() => {
        api.get('/blogs').then(res => setBlogs(res.data.blogs))
    }, [])

    return (
        <Box sx={{ py: 2 }}>
            <Box sx={{ width: '50%', m: 'auto' }}>
                <Paper elevation={2} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h5'>Blogs</Typography>
                    <Button onClick={() => nav('/create-blog')} color='success' startIcon={<AddIcon />} variant='contained'>Add Blog</Button>
                </Paper>

                {
                    blogs && blogs.length > 0 ?
                        blogs.map(blog => (
                            <BlogCard handleGoToEdit={handleGoToEdit} handleDelete={handleDelete} key={blog._id} setBlogs={setBlogs} blog={blog} />
                        )) : 'No blog found'
                }
            </Box>
        </Box>
    )
}

export default Blog