import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import MainPage from "./MainPage";
import AdminMain from "./AdminMain";
import Header from "./Header";
import Footer from "./Footer";
import LoginPage from "./LoginPage";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import AdminEmployees from "./AdminEmployees";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AppInfo from "./AppInfo";
import AdminShifts from "./AdminShifts";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import AdminSchedules from "./AdminSchedules";
import Bidding from "./Bidding";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Denver');


export const employeeContext = createContext(null)

function App(){
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)
  const [logCheck, setLogCheck] = useState(false)

  useEffect(()=>{
    fetch("/employee")
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
          setEmployee(d)
          setLogCheck(true)
          if(d.admin){
            navigate("/admin-main")
          } else {
            navigate("/main")
          }
        })
      } else {
        setLogCheck(true)
        navigate("/sign-in")
      }
    })
    .catch(err => console.log(err))
  }, [])

  function handleLogin(data){
    setEmployee(data)
    setLogCheck(true)
    if(data.admin){
      navigate("/admin-main")
    } else {
      navigate("/main")
    }
  }

  function handleLogout(data){
    setEmployee(data)
    setLogCheck(true)
    navigate("/sign-in")
  }

  function handleEmployeeUpdate(updatedInfo){
    setEmployee(updatedInfo)
    setLogCheck(true)
  }

  function navigateTo(location){
    navigate(location)
  }

  if(!logCheck){
    return(
      <Loading />
    )
  }

  if(employee){
    return(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <employeeContext.Provider value={employee}>
          <Header onLogout={handleLogout} navigateTo={navigateTo}/>
          <Routes>
            <Route path="/main" element={ <MainPage/> }/>
            <Route path="/profile" element={ <Profile /> }/>
            <Route path="/edit-profile" element={ <EditProfile onUpdate={handleEmployeeUpdate}/> }/>
            <Route path="/bidding" element={ <Bidding /> }/>
            <Route path="/admin-main" element={ <AdminMain/> }/>
            <Route path="/admin-employees/*" element={ <AdminEmployees /> }/>
            <Route path="/app-info" element={ <AppInfo /> }/>
            <Route path="/admin-shifts/*" element={ <AdminShifts /> }/>
            <Route path="/admin-schedules/*" element={ <AdminSchedules /> }/>
          </Routes>
          <Footer />
        </employeeContext.Provider>
      </LocalizationProvider>
    )
  } else {
    return(
      <>
        <Routes>
          <Route path="/sign-in" element={ <LoginPage onLogin={handleLogin}/> }/>
        </Routes>
      </>
    )
  }
}

export default App