import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useSocket } from '../CONTEXT/SocketContext';
import api from '../configs/api';
import { useUser } from '../CONTEXT/UserContext';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;

export default function NotificationMenu() {
    const nav = useNavigate()
    const { currentUser } = useUser();
    const { socket } = useSocket()
    const [notifications, setNotifications] = React.useState([])

    React.useEffect(() => {
        socket?.on('notification', (notif) => {
            setHasNotification(true)
            setNotifications(prev => [notif, ...prev])
        })
    }, [socket])

    React.useEffect(() => {
        if (currentUser) {
            socket?.emit('create-room-notification', currentUser._id)
            api.get('/notifications')
                .then(res => {
                    setNotifications(res.data.notifications)
                })
        }
    }, [currentUser])

    const [hasNotification, setHasNotification] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setHasNotification(false)
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                onClick={handleClick}
            >
                <Badge color="error" variant={!hasNotification ? "standard" : "dot"}>
                    <NotificationsIcon sx={{ color: 'white' }} />
                </Badge>
            </IconButton>

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                        },
                    },
                }}
            >
                {notifications.length > 0 ? notifications.map((notif) => (
                    <MenuItem key={notif._id} onClick={() => nav(`/blog/${notif.blog._id}`)}>
                        {notif.title}
                    </MenuItem>
                )) : <MenuItem>No notifications yet.</MenuItem>}
            </Menu>
        </div>
    );
}
