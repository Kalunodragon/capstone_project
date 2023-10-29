import { Button, Container, Stack } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllEmployees from "./AllEmployees";

export const allEmployeesContext = createContext(null)

function AdminEmployees(){
  const navigate = useNavigate()
  const [employees, setEmployees] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [errors, setErrors] = useState(null)
  const buttonNames = ["Main", "All", "New"]

  const displayButtons = buttonNames.map((name) =>{
    return(
      <Container key={name}>
        <Button
          style={{ flexGrow:1 }}
          size="large"
          variant="contained" 
          onClick={()=>{
            handleNavigation(name)
          }}
        >{name}
        </Button>
      </Container>
    )
  })

  useEffect(()=>{
    fetch("/employees")
      .then((res)=>{
        if(res.ok){
          res.json()
          .then((d)=>{
            setEmployees(d)
            setLoaded(true)
          })
        } else {
          res.json()
          .then((d)=>{
            setErrors(d)
          })
        }
      })
  }, [])

  function handleNavigation(route){
    switch(route){
      case "All": navigate("all"); break;
      case "New": navigate("new"); break;
      default: navigate("/admin-employees");
    }
  }

  return(
    <>
      <br/>
      <Container align="center" maxWidth="xs">
        <Stack direction="row" spacing={2}>
          {displayButtons}
        </Stack>
      </Container>
      <br/>
      <allEmployeesContext.Provider value={employees}>
        <Routes>
          <Route path="all" element={<AllEmployees loaded={loaded}/>}/>
        </Routes>
      </allEmployeesContext.Provider>
    </>
  )
}

export default AdminEmployees