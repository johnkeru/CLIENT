import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import * as React from 'react';
import api from '../configs/api';

function SimpleDialog(props) {
    const { blog, open, likesCount, handleClickOpen } = props;
    const [people, setPeople] = React.useState([])

    React.useEffect(() => {
        api.get(`/blogs/${blog._id}/likes`)
            .then(res => setPeople(res.data.likes))
    }, [])

    return (
        <Dialog open={open} onClose={handleClickOpen}>
            <DialogTitle>{likesCount} people likes your blog</DialogTitle>
            <List sx={{ pt: 0 }}>
                {people.map((person) => (
                    <ListItem disableGutters key={person._id + person.username + new Date().toString()}>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    {person.username[0].toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={person.username} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default function BlogLikers({ likesCount, blog }) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(!open);

    return (
        <div>
            <Typography variant="body1" sx={{ cursor: 'pointer' }} onClick={handleClickOpen}>
                {likesCount}
            </Typography>
            {open && <SimpleDialog
                likesCount={likesCount}
                blog={blog}
                open={open}
                handleClickOpen={handleClickOpen}
            />}
        </div>
    );
}

