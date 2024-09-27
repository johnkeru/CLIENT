import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../configs/api';
import { useUser } from '../CONTEXT/UserContext';


const Login = () => {
    const nav = useNavigate();
    const { setToken } = useUser();

    const validation = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters long'),
        password: Yup.string()
            .required('Password is required')
            .min(3, 'Password must be at least 8 characters long'),
    })

    const { register, handleSubmit, setError, formState: { errors, }, }
        = useForm({ resolver: yupResolver(validation) });

    const onSubmit = (data) => {
        api.post('/login', data)
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                setToken(res.data.token)
                nav('/blogs')
            }).catch(e => {
                const errField = e.response.data.field
                const msg = e.response.data.message
                setError(errField, { type: 'validate', message: msg })
            })
    }


    return (
        <Box sx={{ borderRadius: 2, boxShadow: 5, background: 'white', p: 5, m: '10vh auto', width: { xs: '100%', sm: '80%', md: '50%', lg: '40%', xl: '30%' } }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h4' sx={{ mb: 4 }}>Sign In</Typography>
                <TextField error={!!errors?.username} helperText={errors?.username?.message} {...register('username')} required fullWidth placeholder='Enter your username' sx={{ mb: 1, bgcolor: 'white', }} />
                <TextField error={!!errors?.password} helperText={errors?.password?.message}  {...register('password')} required fullWidth placeholder='Enter your password' sx={{ bgcolor: 'white' }} />
                <Button type='submit' variant='contained' fullWidth sx={{ mt: 4, py: 2 }}>Submit</Button>
                <Typography sx={{ width: 'fit-content', cursor: 'pointer', ":hover": { color: blue['200'] } }} variant='body1' onClick={() => nav('/register')}>Don't have an account?</Typography>
            </form>
        </Box>
    )
}


export default Login
