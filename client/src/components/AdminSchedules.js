import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"
import { Alert, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import AllSchedules from "./AllSchedules";
import Loading from "./Loading";
import AdminManageSchedules from "./AdminManageSchedules";

export const allSchedulesContext = createContext(null)

function AdminSchedules(){
  const navigate = useNavigate()
  const [current, setCurrent] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [errors, setErrors] = useState(null)
  const [schedules, setSchedules] = useState(null)
  const buttonNames = ["Main", "All", "Manage"]

  useEffect(()=>{
    fetch("/schedules")
      .then((res)=>{
        if(res.ok){
          res.json()
          .then((d)=>{
            setSchedules(d)
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

  const sortedSchedules = (schedules ? schedules.sort((a,b)=>{
    const aPosition = a.shifts.filter((obj,index)=>{
      return a.shifts.findIndex((currentObj)=>{
        return currentObj.shift.position === obj.shift.position && obj.shift.position !== "Off"
      }) === index
    })
    const bPosition = b.shifts.filter((obj,index)=>{
      return b.shifts.findIndex((currentObj)=>{
        return currentObj.shift.position === obj.shift.position && obj.shift.position !== "Off"
      }) === index
    })
    
    return (aPosition[0].shift.position.localeCompare(bPosition[0].shift.position) ||
      aPosition.shift.start_time - bPosition.shift.start_time ||
      aPosition.length - bPosition.length
      )
  }) : null)

  if(schedules){
    console.log("SCHEDULES",schedules)
    console.log("SORTED", sortedSchedules)
  }

  function handleNavigation(route){
    if(route === "All" || route === "Manage"){
      setCurrent(false)
    } else {
      setCurrent(true)
    }
    switch(route){
      case "All": navigate("all"); break;
      case "Manage": navigate("manage"); break;
      default: navigate("/admin-schedules");
    }
  }

  return(
    <>
      <br/>
      <Container align="center" maxWidth="xs">
        <Stack direction="row" spacing={0} sx={{ display:"flex",alignContent:"center",justifyContent:"center" }}>
          {displayButtons}
        </Stack>
      </Container>
      <br/>
      {errors ? <><Alert severity="error" align="center" variant="filled">{errors}</Alert><br/></> : null}
      {current ? <Container align="center" className="profile">
        <Paper align="center" className="profile">
          <Typography variant="h4" align="center">
            Schedules!
          </Typography>
          <Divider />
          <Typography component="p" align="center">
            Here is where Bid lines can be created as well as view entire schedule lines
          </Typography>
        </Paper>
      </Container> : null}
      <allSchedulesContext.Provider value={schedules}>
        <Routes>
          <Route path="all" element={ loaded ? <AllSchedules/> : <Loading /> }/>
          <Route path="manage" element={ loaded ? <AdminManageSchedules /> : <Loading /> }/>
        </Routes>
      </allSchedulesContext.Provider>
    </>
  )
}

// Sort schedules in table in a similar fashion as to how the shifts are sorted over in the AllShifts.js component

export default AdminSchedules