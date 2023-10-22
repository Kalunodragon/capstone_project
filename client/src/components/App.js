import React, { createContext, useEffect, useState } from "react";
import { Typography, AppBar } from '@mui/material'
import LoginForm from "./LoginForm";
import Loading from "./Loading";
import MainPage from "./MainPage";
import Header from "./Header";
import Footer from "./Footer";

export const employeeContext = createContext(null)

function App(){
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
        })
      } else {
        setLogCheck(true)
      }
    })
    .catch(err => console.log(err))
  },[])

  function handleLogin(data){
    setEmployee(data)
    setLogCheck(true)
  }

  function handleLogout(data){
    setEmployee(data)
    setLogCheck(true)
  }

  if(!logCheck){
    return(
      <Loading />
    )
  }

  if(employee){
    return(
      <employeeContext.Provider value={employee}>
        <Header logout={handleLogout} />
        <MainPage logout={handleLogout} />
        <Footer />
      </employeeContext.Provider>
    )
  }

  return(
    <>
      <AppBar position="static">
          <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>RADBP</Typography>
      </AppBar>
      <br/>
      <Typography variant="h5" align="center">
        Ramp Agent Digital Bidding Platform
      </Typography>
      <LoginForm login={handleLogin}/>
      <Footer />
    </>
  )
}

export default App