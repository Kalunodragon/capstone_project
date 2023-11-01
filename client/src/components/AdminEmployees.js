import { Alert, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllEmployees from "./AllEmployees";
import AdminNewEmployee from "./AdminNewEmployee";

export const allEmployeesContext = createContext(null)

function AdminEmployees(){
  const navigate = useNavigate()
  const [employees, setEmployees] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [errors, setErrors] = useState(null)
  const [removeSuccess, setRemoveSuccess] = useState(null)
  const [current, setCurrent] = useState("main")
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
      if(employeeData.admin){
        window.scrollTo(0,0)
      }
    }
    if(handleType === "Remove"){
      setRemoveSuccess(employeeData.first_name + " " + employeeData.last_name)
      setEmployees(employees.filter((emp)=> emp.id !== employeeData.id))
      window.scrollTo(0,0)
    }
    if(handleType === "New"){
      
    }
  }

  function handleNavigation(route){
    if(removeSuccess) setRemoveSuccess(null)
    if(route === "All" || route === "New"){
      setCurrent("not-main")
    } else {
      setCurrent("main")
    }
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
      {current === "main" ?
        <Container align="center" className="profile">
          <Paper className="profile">
            <Typography variant="h4" align="center">
              Employees!
            </Typography>
            <Divider />
            <Typography variant="p">
              Welcome to RADS-ADMIN Employees section. This section will allow an Admin to View information about 
              all the Employees, Add new Employees, Update existing Employees, and Removing Employees that no 
              longer work for the company.
            </Typography>
            <Divider />
            <Typography variant="p">
              Quick reference: The All button will show all the Employees with drop down selections that will 
              show an Edit and Remove feature. The New button will allow an Admin to add a new Employee to the 
              application.
            </Typography>
          </Paper>
        </Container> : null }
      <allEmployeesContext.Provider value={employees}>
        <Routes>
          <Route path="all" element={<AllEmployees loaded={loaded} setEmployeesState={handleEmployees}/>}/>
          <Route path="new" element={<AdminNewEmployee setEmployeesState={handleEmployees}/>}/>
        </Routes>
      </allEmployeesContext.Provider>
    </>
  )
}

export default AdminEmployees