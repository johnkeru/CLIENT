import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import formatDateTime from '../utility/formatDateTime'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import api from '../configs/api';

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
                title={blog?.title}
                subheader={formatDateTime(blog?.createdAt || new Date())}
            />
            <CardMedia
                component="img"
                height="594"
                image={blog?.image}
                alt={blog?.title}
            />
            {blog?.body ? <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog?.body}
                </Typography>
            </CardContent> : undefined}
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Blog