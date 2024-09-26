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
import BlogLikers from './BlogLikers';
import { useSocket } from '../context/SocketContext';

export default function BlogCard({ blog, methods }) {
    const { socket } = useSocket()
    const { currentUser } = useUser()

    const [likes, setLikes] = React.useState(0)
    const [isLike, setIsLike] = React.useState(false)

    const handleToggleLike = () => {
        api.post(`/blogs/${blog._id}/like`)
            .then(res => {
                setLikes(res.data.likes)
                setIsLike(res.data.isLike)
            })

        blog.user._id === currentUser._id ?
            undefined :
            socket.emit(`notification`, {
                title: `${currentUser.username} likes your ${blog.title} blog.`,
                blog,
                sender: currentUser
            })
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
                title={blog.user.username}
                subheader={formatDateTime(blog.createdAt)}
            />
            <CardMedia
                component="img"
                height="394"
                image={blog.image}
                alt="Paella dish"
            />
            {blog.body ? <CardContent>
                <Typography noWrap variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog.body}
                </Typography>
            </CardContent> : undefined}
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => handleToggleLike()}>
                    <FavoriteIcon sx={{ color: isLike ? pink[500] : grey[500] }} />
                </IconButton>
                <BlogLikers likes={likes} blog={blog} />
            </CardActions>
        </Card>
    );
}
