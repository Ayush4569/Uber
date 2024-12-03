import axios from 'axios'
import React, { useContext, useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectWrapper = ({children}) => {
    const {captain,setCaptain} = useContext(CaptainDataContext)
    const [loading,setLoading ] = useState(true)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            return navigate('/captain-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data)
                setLoading(false)
            }
        })
            .catch(err => {
                localStorage.removeItem('token')
                navigate('/captain-login')
            })
    }, [ token ])
  
    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

  return (
    <>
     {children}
    </>
  )
}

export default CaptainProtectWrapper