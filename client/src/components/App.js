import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import MainPage from "./MainPage";
import AdminMain from "./AdminMain";
import Header from "./Header";
import Footer from "./Footer";
import LoginPage from "./LoginPage";

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

  if(!logCheck){
    return(
      <Loading />
    )
  }

  if(employee){
    return(
      <employeeContext.Provider value={employee}>
        <Header onLogout={handleLogout} />
        <Routes>
          <Route path="/main" element={ <MainPage/> }/>
          <Route path="/admin-main" element={ <AdminMain/> }/>
        </Routes>
        <Footer />
      </employeeContext.Provider>
    )
  } else {
    return(
      <Routes>
        <Route path="/sign-in"
          element={ <LoginPage onLogin={handleLogin}/> }
        />
      </Routes>
    )
  }
}

export default App