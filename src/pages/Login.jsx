import { Box, Button, TextField, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const nav = useNavigate();
    return (
        <Box sx={{ borderRadius: 2, boxShadow: 5, background: grey[300], p: 5, m: '10vh auto', width: { xs: '100%', sm: '80%', md: '50%', lg: '40%', xl: '30%' } }}>
            <Typography variant='h4' sx={{ mb: 4 }}>Sign In</Typography>
            <TextField fullWidth placeholder='Enter your username' sx={{ mb: 1, bgcolor: 'white', }} />
            <TextField fullWidth placeholder='Enter your password' sx={{ bgcolor: 'white' }} />
            <Button variant='contained' fullWidth sx={{ mt: 4, py: 2 }}>Submit</Button>
            <Typography sx={{ cursor: 'pointer', ":hover": { color: blue['200'] } }} variant='body1' onClick={() => nav('/register')}>Don't have an account?</Typography>
        </Box>
    )
}


export default Login