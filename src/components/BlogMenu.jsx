import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useUser } from '../CONTEXT/UserContext';

const ITEM_HEIGHT = 48;

export default function BlogMenu({ blog, methods }) {
    const { currentUser } = useUser()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const isAllow = blog.user._id === currentUser?._id

    const options = isAllow ? [
        {
            label: 'View',
            icon: <VisibilityIcon />,
            onClick: () => methods.handleGoToBlog(blog)
        },
        {
            label: 'Edit',
            icon: <BorderColorIcon />,
            onClick: () => methods.handleGoToEdit(blog)
        },
        {
            label: 'Delete',
            icon: <DeleteIcon />,
            onClick: () => methods.handleDelete(blog),
        },
    ] : [
        {
            label: 'View',
            icon: <VisibilityIcon />,
            onClick: () => methods.handleGoToBlog(blog)
        }
    ];

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
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
                            width: '20ch',
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem onClick={() => option.onClick()} key={option.label} sx={{ gap: 2 }}  >
                        {option.icon}
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
