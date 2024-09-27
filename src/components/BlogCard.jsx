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
import { useUser } from '../CONTEXT/UserContext'
import BlogLikers from './BlogLikers';
import { useSocket } from '../CONTEXT/SocketContext';

export default function BlogCard({ blog, methods }) {
    const { socket } = useSocket()
    const { currentUser } = useUser()

    const [likesCount, setLikesCount] = React.useState(0)
    const [isLike, setIsLike] = React.useState(false)

    const handleToggleLike = () => {
        api.post(`/blogs/${blog._id}/like`)
            .then(res => {
                setLikesCount(res.data.likesCount)
                setIsLike(res.data.isLike)
            })

        // if you like your own blog you won't get notification
        if (blog.user._id !== currentUser._id) {
            socket.emit(`notification`, {
                title: `${currentUser.username} ${isLike ? 'unlike' : 'likes'} your ${blog.title} blog.`,
                blog,
                sender: currentUser
            })
        }
    }

    React.useEffect(() => {
        setLikesCount(blog.likesCount)
        blog.likes.forEach(userId => {
            if (currentUser?._id === userId) setIsLike(true)
        })
    }, [])

    return (
        <Card sx={{ maxWidth: '100%', mb: 2, }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {blog.user.username[0].toUpperCase()}
                    </Avatar>
                }
                action={<BlogMenu blog={blog} methods={methods} />}
                title={blog.user.username}
                subheader={formatDateTime(blog.createdAt)}
            />
            {blog.image && <CardMedia
                component="img"
                image={blog.image}
                alt={blog.title}
                style={{
                    width: '100%',   // This makes the image take the full width of the container
                    objectFit: 'cover', // This ensures the image covers the container while maintaining aspect ratio
                }}
            />
            }
            <CardContent>
                {blog.title && <Typography noWrap variant="h6">
                    {blog.title}
                </Typography>}
                {blog.body && <Typography noWrap variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog.body}
                </Typography>}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites"
                    onClick={() => handleToggleLike()}>
                    <FavoriteIcon sx={{ color: isLike ? pink[500] : grey[500] }} />
                </IconButton>
                <BlogLikers likesCount={likesCount} blog={blog} />
            </CardActions>
        </Card>
    );
}
