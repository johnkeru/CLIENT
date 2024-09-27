import React, { useEffect, useState } from 'react'
import api from '../configs/api'
import BlogCard from '../components/BlogCard'
import { Box, Button, Paper, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroller';

const Blogs = () => {
    const nav = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [hasMore, setHasMore] = useState(false)

    const handleGoToEdit = (blog) => nav(`/update-blog/${blog._id}`)
    const handleGoToBlog = (blog) => nav(`/blog/${blog._id}`)
    const handleDelete = (blog) => {
        api.delete(`/blogs/${blog._id}`)
            .then(() => setBlogs(blogs.filter(b => b._id !== blog._id)))
    }

    const methods = {
        handleDelete,
        handleGoToEdit,
        handleGoToBlog
    }

    const handleLoadMore = () => {
        api.get(`/blogs?lastId=${blogs[blogs.length - 1]._id}`)
            .then(res => {
                setHasMore(res.data.hasMore)
                setBlogs(prev => [...prev, ...res.data.blogs])
            })
    }

    useEffect(() => {
        api.get('/blogs')
            .then(res => {
                setHasMore(res.data.hasMore)
                setBlogs(res.data.blogs)
            })
    }, [])

    return (
        <Box sx={{ py: 2 }}>
            <Box sx={{ width: { xs: '100%', sm: '80%', md: '50%' }, m: 'auto' }}>
                <Paper elevation={2} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h5'>Blogs</Typography>
                    <Button onClick={() => nav('/create-blog')} color='success' startIcon={<AddIcon />} variant='contained'>Add Blog</Button>
                </Paper>

                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleLoadMore}
                    hasMore={hasMore}
                    loader={<div className="loader" key={0}>Loading...</div>}
                >
                    {
                        blogs && blogs.length > 0 ?
                            blogs.map(blog => (
                                <BlogCard methods={methods} key={blog._id} setBlogs={setBlogs} blog={blog} />
                            )) : 'No blog found'
                    }
                </InfiniteScroll>
            </Box>
        </Box>
    )
}

export default Blogs