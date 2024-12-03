import axios from 'axios'
import React,{useContext, useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext'

const UserProtectWrapper = ({children}) => {
    // see if the token is in local storage or not it will tell that user exisits or not
   const {setUser} = useContext(UserDataContext)
   const [loading,setLoading ] = useState(true)
   const token = localStorage.getItem('token')
   const navigate = useNavigate()
    useEffect(() => {
      if(!token) {
          return  navigate('/login')
      }
      axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((response)=>{
         setLoading(false)
         setUser(response.data)
      })
      .catch((error)=>{
        console.log(error);
        localStorage.removeItem('token')
        navigate('/login')
      })
    }, [token])
    

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

export default UserProtectWrapper