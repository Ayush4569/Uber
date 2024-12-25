import { Navigate } from "react-router-dom";
import {  useUser } from "../context/userContext";

const UserProtectWrapper = ({ children, route = null,component=null }) => {
  const { user } = useUser()
  if (user && route) {
    return <Navigate to={route} />;
  }
  if(!user && component == 'home'){
    return <Navigate to='/login' />;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
