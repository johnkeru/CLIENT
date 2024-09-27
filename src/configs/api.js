import axios from 'axios'
import loadEnv from '../utility/loadEnv'

const api = axios.create({ baseURL: loadEnv('VITE_SERVER_URL'), })

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) config.headers['Authorization'] = `Bearer ${token}`
        return config
    },
    Promise.reject
)
export default api

// api.get('/users').then(res => {
//     console.log(res.data)
// })


// axios.get('http://localhost:5000/users', {
//     header: 'Authorization Bearer aefawefawefawefawefawe',
// })
//     .then(res => {
//         console.log(res.data)
//     })

// axios.get('http://localhost:5000/posts', {
//     header: 'Authorization Bearer aefawefawefawefawefawe',
// })
//     .then(res => {
//         console.log(res.data)
//     })