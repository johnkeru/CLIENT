import { Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material'
import { blue, blueGrey, grey } from '@mui/material/colors'
import React, { useEffect, useState, useCallback } from 'react'
import formatDateTime from '../utility/formatDateTime'
import SendIcon from '@mui/icons-material/Send';
import autoScroll from '../utility/autoScroll';
import { useSocket } from '../CONTEXT/SocketContext'
import { useUser } from '../CONTEXT/UserContext'
import api from '../configs/api';
import { useDropzone } from 'react-dropzone';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CloseIcon from '@mui/icons-material/Close';
import uploadToCloudinary from '../utility/uploadToCloudinary';

const ChatArea = () => {
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState('')
    const [file, setFile] = useState(null)

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0])
            setPreview(URL.createObjectURL(acceptedFiles[0]));
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg'], },
        maxSize: 10000000, //10MB
    });

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const { socket } = useSocket()
    const { currentUser } = useUser()

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message) {
            setLoading(true)
            let imageUrl = file ? await uploadToCloudinary(file) : '';
            socket.emit('message', { message, image: imageUrl, sender: currentUser._id })
            autoScroll()
            setLoading(false)
            setMessage('')
            handleClearImage()
        }
    }

    const handleClearImage = () => {
        setFile(null)
        setPreview('')
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
            .then(res => {
                setMessages(res.data.messages)
                autoScroll()
            })
    }, [])

    return (
        <Paper elevation={12} sx={{
            width: { xs: '100%', md: '80%' },
            m: 'auto',
            height: '90vh',
            overflow: 'auto',
            position: 'relative'
        }} className='chat-body'>
            <Typography variant='h5' sx={{ position: 'sticky', top: 0, width: '100%', p: 2, background: blueGrey[400], textAlign: 'center', color: '#fff' }}>Chat area</Typography>

            <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {
                    messages.map(msg => (
                        msg.sender._id === currentUser?._id ?
                            <Box key={msg._id} sx={{ bgcolor: blue[500], p: 1.5, ml: 'auto', borderRadius: 5, color: 'white', width: 'fit-content' }}>
                                <Typography>{msg.sender.username}</Typography>
                                {
                                    msg?.image && <Box sx={{ width: '100%', height: '100%' }}>
                                        <img style={{ width: '100%', height: '100%' }} src={msg.image} />
                                    </Box>
                                }
                                <Typography variant='h6'>{msg.message}</Typography>
                                <Typography variant='body2'>{formatDateTime(msg.createdAt)}</Typography>
                            </Box> :
                            <Box key={msg._id} sx={{ bgcolor: grey[500], p: 1.5, borderRadius: 5, color: 'white', width: 'fit-content' }}>
                                <Typography>{msg.sender.username}</Typography>
                                {
                                    msg?.image && <Box sx={{ width: '100%', height: '100%' }}>
                                        <img style={{ width: '100%', height: '100%' }} src={msg.image} />
                                    </Box>
                                }
                                <Typography variant='h6'>{msg.message}</Typography>
                                <Typography variant='body2'>{formatDateTime(msg.createdAt)}</Typography>
                            </Box>

                    ))
                }
            </Box>


            <form style={{ position: 'sticky', bottom: 0, }} onSubmit={handleSendMessage}>
                {preview &&
                    <Box sx={{ position: 'relative', width: 'fit-content' }}>
                        <IconButton onClick={handleClearImage} color='error' sx={{ position: 'absolute', top: 0, right: 0 }}>
                            <CloseIcon />
                        </IconButton>
                        <img style={{ marginLeft: '10px' }} width='150px' height='150px' src={preview} alt="" />
                    </Box>
                }
                <Box sx={{ display: 'flex', width: '100%', background: 'white' }}>
                    <TextField value={message} onChange={e => setMessage(e.target.value)} sx={{ width: '80%' }} fullWidth placeholder='Send Message 👋' />
                    <Box  {...getRootProps()} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <input {...getInputProps()} />
                        <IconButton>
                            <DriveFolderUploadIcon />
                        </IconButton>
                    </Box>
                    <Button disabled={loading} type='submit' sx={{ width: '20%' }} fullWidth variant='contained' endIcon={<SendIcon />}>
                        {loading ? 'Loading...' : 'Send'}
                    </Button>
                </Box>
            </form>

        </Paper >
    )
}

export default ChatArea
