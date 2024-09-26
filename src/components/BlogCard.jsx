import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey, pink, red } from '@mui/material/colors';
import * as React from 'react';
import formatDateTime from '../utility/formatDateTime';
import BlogMenu from './BlogMenu';
import api from '../configs/api';
import { useUser } from '../context/UserContext'

// CTRL + SHIFT + P

export default function BlogCard({ blog, methods }) {

    const { currentUser } = useUser()

    const [likes, setLikes] = React.useState(0)
    const [isLike, setIsLike] = React.useState(false)

    const handleToggleLike = () => {
        api.post(`/blogs/${blog._id}/like`)
            .then(res => {
                setLikes(res.data.likes)
                setIsLike(res.data.isLike)
            })
        // socket emit
        // socket.emit(`${blog.user._id}-blog-like`, `${currentUser.username} likes your ${blog.title} blog.`)
    }

    React.useEffect(() => {
        setLikes(blog.likes.length)
        blog.likes.forEach(userId => {
            if (currentUser?._id === userId._id) {
                setIsLike(true)
            }
        })
    }, [])

    return (
        <Card sx={{ cursor: 'pointer', maxWidth: '100%', mb: 2, }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {blog.user.username[0].toUpperCase()}
                    </Avatar>
                }
                action={<BlogMenu blog={blog} methods={methods} />}
                title={blog.title}
                subheader={formatDateTime(blog.createdAt)}
            />
            <CardMedia
                component="img"
                height="194"
                image={blog.image}
                alt="Paella dish"
            />
            {blog.body ? <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog.body}
                </Typography>
            </CardContent> : undefined}
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => handleToggleLike()}>
                    <FavoriteIcon sx={{ color: isLike ? pink[500] : grey[500] }} />
                </IconButton>
                {likes}
            </CardActions>
        </Card>
    );
}
