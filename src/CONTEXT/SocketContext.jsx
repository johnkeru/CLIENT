import { useContext, createContext, useState, useEffect } from "react";
import io from 'socket.io-client'

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socket = io('http://192.168.18.58:5000')
        setSocket(socket)
    }, [])

    return <SocketContext.Provider value={{ socket }}>
        {children}
    </SocketContext.Provider>
}

export default SocketProvider
export const useSocket = () => useContext(SocketContext)