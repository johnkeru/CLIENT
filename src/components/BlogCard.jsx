import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import * as React from 'react';
import formatDateTime from '../utility/formatDateTime';
import BlogMenu from './BlogMenu';

// CTRL + SHIFT + P

export default function BlogCard({ blog, handleDelete, handleGoToEdit }) {

    return (
        <Card sx={{ maxWidth: '100%', mb: 2, }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {blog.user.username[0].toUpperCase()}
                    </Avatar>
                }
                action={<BlogMenu blog={blog} handleGoToEdit={handleGoToEdit} handleDelete={handleDelete} />}
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
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
