import { Alert, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllShifts from "./AllShifts";
import AdminNewShift from "./AdminNewShift";

export const allShiftsContext = createContext(null)

function AdminShifts(){
  const navigate = useNavigate()
  const [current, setCurrent] = useState("main")
  const buttonNames = ["Main", "All", "New"]
  const [shifts, setShifts] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(()=>{
    fetch("/shifts")
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
          setShifts(d)
          setLoaded(true)
        })
      } else {
        res.json()
        .then((d)=>{
          setErrors(d.errors)
          setLoaded(true)
          console.log(d)
        })
      }
    })
  },[])

  const displayButtons = buttonNames.map((name)=>{
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

  function handleNavigation(route){
    if(route === "All" || route === "New"){
      setCurrent("not-main")
    } else {
      setCurrent("main")
    }
    switch(route){
      case "All": navigate("all"); break;
      case "New": navigate("new"); break;
      default: navigate("/admin-shifts");
    }
  }

  function handleAddShift(shiftToAdd){
    setShifts([...shifts, shiftToAdd].sort((a,b)=> {
      return (b.day_off - a.day_off || a.position.localeCompare(b.position) || a.shift_start_time.localeCompare(b.shift_start_time))
    }))
  }

  function handleDeleteShift(shiftToDelete){
    setShifts(shifts.filter((shift)=> shift.id !== shiftToDelete.id))
  }

  return(
    <>
      <br/>
      <Container align="center" maxWidth="xs">
        <Stack direction="row" spacing={0}>
          {displayButtons}
        </Stack>
      </Container>
      <br/>
      {current === "main" ?
        <Container align="center" className="profile">
          <Paper className="profile">
            <Typography align="center" variant="h4">
              Shifts!
            </Typography>
            {errors ? <><Alert align="center" variant="filled" severity="error">{errors}</Alert><br/></> : null}
            <Divider /> 
            <Typography variant="p">
              Welcome to RADS-ADMIN Shifts section. This section will allow an Admin to View information about 
              all the Shifts, Add new Shifts, Update existing Shifts, and Remove Shifts that are no longer needed.
            </Typography>
          </Paper>
        </Container> : null}
        <allShiftsContext.Provider value={shifts}>
          <Routes>
            <Route path="all" element={ <AllShifts loaded={loaded} handleDelete={handleDeleteShift}/> }/>
            <Route path="new" element={ <AdminNewShift handleAddShift={handleAddShift}/> }/>
          </Routes>
        </allShiftsContext.Provider>
    </>
  )
}

export default AdminShifts