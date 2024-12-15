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

    const sendMessage = (eventName,message)=>{
        socket.emit(eventName,message)
    }
    const receiveMessage = (eventName,callback)=>{
        socket.on(eventName,callback)
    }

    return (
        <SocketContext.Provider value={{sendMessage,receiveMessage}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket =()=> useContext(SocketContext)