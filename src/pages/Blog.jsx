import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../configs/api';
import formatDateTime from '../utility/formatDateTime';

const Blog = () => {
    const [blog, setBlog] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        api.get(`/blogs/${id}`)
            .then(response => setBlog(response.data.blog))
            .catch(error => console.error('Error fetching blog', error));
    }, []);

    return (
        <Card sx={{ maxWidth: '100%', mb: 2, }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {blog?.user.username[0].toUpperCase()}
                    </Avatar>
                }
                title={blog?.user?.username}
                subheader={formatDateTime(blog?.createdAt || new Date())}
            />
            {blog?.image && <CardMedia
                component="img"
                height="594"
                image={blog.image}
                alt={blog?.title}
            />}
            <CardContent>
                {blog?.title && <Typography noWrap variant="h6">
                    {blog.title}
                </Typography>}
                {blog?.body ? <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog?.body}
                </Typography> : undefined}
            </CardContent>
        </Card>
    )
}

export default Blog