import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { blue, blueGrey, grey } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import formatDateTime from '../utility/formatDateTime'
import SendIcon from '@mui/icons-material/Send';
import autoScroll from '../utility/autoScroll';
import { useSocket } from '../context/SocketContext'
import { useUser } from '../context/UserContext'
import api from '../configs/api';

const ChatArea = () => {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const { socket } = useSocket()
    const { currentUser } = useUser()

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message) {
            autoScroll()
            socket.emit('message', { message, sender: currentUser._id })
            setMessage('')
        }
    }

    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', socket.id)
            socket.on('message', (newMessage) => {
                autoScroll()
                setMessages(prev => [...prev, newMessage])
            })
        }
    }, [socket])

    useEffect(() => {
        api.get('getMessages')
            .then(res => setMessages(res.data.messages))
    }, [])

    return (
        <Paper elevation={12} sx={{
            width: '80%',
            m: 'auto',
            mt: 2,
            height: '84vh',
            overflow: 'auto',
            position: 'relative'
        }} className='chat-body'>
            <Typography variant='h5' sx={{ position: 'sticky', top: 0, width: '100%', p: 2, background: blueGrey[400], textAlign: 'center', color: '#fff' }}>Chat area</Typography>

            <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {
                    messages.map(msg => (
                        msg.sender === currentUser?._id ?
                            <Box key={msg._id} sx={{ bgcolor: blue[500], p: 1.5, ml: 'auto', borderRadius: 5, color: 'white', width: 'fit-content' }}>
                                <Typography>{msg.sender}</Typography>
                                <Typography variant='h6'>{msg.message}</Typography>
                                <Typography variant='body2'>{formatDateTime(new Date())}</Typography>
                            </Box> :
                            <Box key={msg._id} sx={{ bgcolor: grey[500], p: 1.5, borderRadius: 5, color: 'white', width: 'fit-content' }}>
                                <Typography>{msg.sender}</Typography>
                                <Typography variant='h6'>{msg.message}</Typography>
                                <Typography variant='body2'>{formatDateTime(new Date())}</Typography>
                            </Box>

                    ))
                }
                {/* <Box sx={{ bgcolor: grey[500], p: 1.5, borderRadius: 5, color: 'white', width: 'fit-content' }}>
                    <Typography>User 1</Typography>
                    <Typography variant='h6'>Heawefawefaewfaew fawefaewlo</Typography>
                    <Box sx={{ width: '350px', height: '350px' }}>
                        <img style={{ width: '100%', height: '100%' }} src='https://res.cloudinary.com/daem3tpao/image/upload/v1727398315/xx6dlyo14ui78raxiyuh.jpg' />
                    </Box>
                    <Typography variant='body2' mt={1}>{formatDateTime(new Date())}</Typography>
                </Box> */}
            </Box>


            <form style={{ position: 'sticky', bottom: 0, background: 'white', }} onSubmit={handleSendMessage}>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <TextField value={message} onChange={e => setMessage(e.target.value)} sx={{ width: '80%' }} fullWidth placeholder='Send Message 👋' />
                    <Button type='submit' sx={{ width: '20%' }} fullWidth variant='contained' endIcon={<SendIcon />}>
                        Send
                    </Button>
                </Box>
            </form>

        </Paper >
    )
}

export default ChatArea