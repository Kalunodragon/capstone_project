import { Alert, Button, Container, Stack } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllEmployees from "./AllEmployees";

export const allEmployeesContext = createContext(null)

function AdminEmployees(){
  const navigate = useNavigate()
  const [employees, setEmployees] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [errors, setErrors] = useState(null)
  const [removeSuccess, setRemoveSuccess] = useState(null)
  const buttonNames = ["Main", "All", "New"]

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
            console.log(d)
          })
        }
      })
  }, [])

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

  function handleEmployees(handleType, employeeData){
    if(handleType === "Update"){
      setEmployees(employees.map((emp) => (emp.id === employeeData.id ? employeeData : emp)))
    }
    if(handleType === "Remove"){
      setRemoveSuccess(employeeData.first_name + " " + employeeData.last_name)
      window.scrollTo(0,0)
      setEmployees(employees.filter((emp)=> emp.id !== employeeData.id))
    }
  }

  function handleNavigation(route){
    if(removeSuccess) setRemoveSuccess(null)
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
        {removeSuccess ? <><br/><Alert severity="success" align="center" variant="filled">{removeSuccess}, Has been removed</Alert></> : null}
      </Container>
      <br/>
      {errors ? <><Alert severity="error" align="center" variant="filled">{errors}</Alert><br/></> : null}
      <allEmployeesContext.Provider value={employees}>
        <Routes>
          <Route path="all" element={<AllEmployees loaded={loaded} setEmployeesState={handleEmployees}/>}/>
        </Routes>
      </allEmployeesContext.Provider>
    </>
  )
}

export default AdminEmployees