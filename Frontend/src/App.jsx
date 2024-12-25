import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import StartPage from "./pages/StartPage";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import StartPageSkip from "./components/StartPageSkip";
import axios from "axios";
import ErrorPage from "./pages/ErrorPage";

axios.defaults.withCredentials = true;
const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <StartPageSkip>
              <StartPage />
            </StartPageSkip>
          }
        />
        <Route path="*" element={<ErrorPage/>}/>
        <Route
          path="/signup"
          element={
            <UserProtectWrapper route="/home" >
              <UserSignup />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <UserProtectWrapper route="/home">
              <UserLogin />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain-signup"
          element={
            <CaptainProtectWrapper route={"/captain-home"} >
              <CaptainSignup />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captain-login"
          element={
            <CaptainProtectWrapper route={"/captain-home"}>
              <CaptainLogin />
            </CaptainProtectWrapper>
          }
        />
        <Route path="/riding/:rideId" element={
          <UserProtectWrapper>
            <Riding />
          </UserProtectWrapper>
        } />
        <Route path="/captain-riding" element={<CaptainRiding />} />

        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper component='captain-home'>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/home"
          element={
            <UserProtectWrapper component='home'>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
