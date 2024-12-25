import { createContext, useContext, useEffect } from 'react';
import {io} from 'socket.io-client'
export const SocketContext = createContext();
const socket = io (`${import.meta.env.VITE_BASE_URL}`)
export const SocketContextProvider = ({children})=>{
    useEffect(() => {
     socket.on('connect',()=>{
        console.log('connected to server');
     })
     socket.on('disconnect',()=>{
        console.log('disconnected to server');
     })
    }, [])
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket =()=> useContext(SocketContext)