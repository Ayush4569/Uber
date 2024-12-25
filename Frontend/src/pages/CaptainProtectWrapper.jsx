import { Navigate } from 'react-router-dom'
import { useCaptain } from '../context/CaptainContext';

const CaptainProtectWrapper = ({children,route=null,component=null}) => {
const {captain} = useCaptain()
  if (captain && route) {
    return <Navigate to={route} />;
  }
 if(!captain && component == 'captain-home'){
  return <Navigate to='/captain-login' />;
 }
  return <>{children}</>;
}

export default CaptainProtectWrapper