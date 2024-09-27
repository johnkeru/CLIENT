import { useContext, createContext, useState, useEffect } from "react";
import io from 'socket.io-client'
import loadEnv from "../utility/loadEnv";

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socket = io(loadEnv('VITE_SERVER_URL'))
        setSocket(socket)
    }, [])

    return <SocketContext.Provider value={{ socket }}>
        {children}
    </SocketContext.Provider>
}

export default SocketProvider
export const useSocket = () => useContext(SocketContext)