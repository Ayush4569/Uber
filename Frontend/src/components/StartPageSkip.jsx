import React from 'react'
import { useUser } from '../context/userContext'
import { useCaptain } from '../context/CaptainContext'
import { Navigate } from 'react-router-dom'

const StartPageSkip = ({children}) => {
    const {user} = useUser()
    const {captain} = useCaptain();
    // console.log(user,captain);
    if(user){
     return <Navigate to='/home'/>
    }
    if(captain){
     return <Navigate to='/captain-home'/>
    }
   
     return children

}

export default StartPageSkip