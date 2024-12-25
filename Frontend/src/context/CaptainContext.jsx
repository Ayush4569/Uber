import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
export const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`)
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data);
        }
      })
      .catch((err) => {
        console.log('err at captain context',err);
        setCaptain(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <ColorRing visible color="#4fa94d" width={200} height={200} />
      </div>
    );
  }
  return (
    <CaptainDataContext.Provider
      value={{
        captain,
        setCaptain,
      }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

export const useCaptain = () => useContext(CaptainDataContext);
