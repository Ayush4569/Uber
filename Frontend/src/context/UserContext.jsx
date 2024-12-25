import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
export const UserDataContext = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`)
      .then((response) => {
        setUser(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <ColorRing visible color="#4fa94d" width={200} height={200} />
      </div>
    );
  }

  return (
    <div>
      <UserDataContext.Provider value={{ user, setUser }}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export const useUser = () => useContext(UserDataContext);
