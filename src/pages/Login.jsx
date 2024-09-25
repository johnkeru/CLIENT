import { Box, Button, TextField, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';


const Login = () => {
    const nav = useNavigate();

    const validation = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters long'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long'),
    })

    const { register, handleSubmit, formState: { errors }, }
        = useForm({ resolver: yupResolver(validation) });

    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <Box sx={{ borderRadius: 2, boxShadow: 5, background: grey[300], p: 5, m: '10vh auto', width: { xs: '100%', sm: '80%', md: '50%', lg: '40%', xl: '30%' } }}>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h4' sx={{ mb: 4 }}>Sign In</Typography>
                <TextField error={!!errors?.username} helperText={errors?.username?.message} {...register('username')} required fullWidth placeholder='Enter your username' sx={{ mb: 1, bgcolor: 'white', }} />
                <TextField error={!!errors?.password} helperText={errors?.password?.message}  {...register('password')} required fullWidth placeholder='Enter your password' sx={{ bgcolor: 'white' }} />
                <Button type='submit' variant='contained' fullWidth sx={{ mt: 4, py: 2 }}>Submit</Button>
                <Typography sx={{ cursor: 'pointer', ":hover": { color: blue['200'] } }} variant='body1' onClick={() => nav('/register')}>Don't have an account?</Typography>
            </form>
        </Box>
    )
}


export default Login