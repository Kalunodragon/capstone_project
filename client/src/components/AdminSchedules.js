import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"
import { Alert, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import AllSchedules from "./AllSchedules";
import Loading from "./Loading";

export const allSchedulesContext = createContext(null)

function AdminSchedules(){
  const navigate = useNavigate()
  const [current, setCurrent] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [errors, setErrors] = useState(null)
  const [schedules, setSchedules] = useState(null)
  const buttonNames = ["Main", "All", "New"]

  useEffect(()=>{
    fetch("/schedules")
      .then((res)=>{
        if(res.ok){
          res.json()
          .then((d)=>{
            setSchedules(d)
            setLoaded(true)
            console.log(d)
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
      setCurrent(false)
    } else {
      setCurrent(true)
    }
    switch(route){
      case "All": navigate("all"); break;
      case "New": navigate("new"); break;
      default: navigate("/admin-schedules");
    }
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
          <Route path="all" element={ loaded ? <AllSchedules loaded={loaded}/> : <Loading /> }/>
        </Routes>
      </allSchedulesContext.Provider>
    </>
  )
}

// Create a schedule with ids from shifts
  // schedule must have at least 2 days off
  // once a schedule line is added the add section should move to the bottom
  // Date range should be chosen once then locked in until changed (bid open,close,start_date,end_date)
  // Days can be entered as follows:
    // days off selection and then shift selection?
    // each day selection?
    // Radial toggle for same shifts???
  // schedules can only be added if before the date for the date range of the bid
  // must include number available
  // shifts can show short day names with times directly under
  // shifts selected by dropdown/searchbar???

export default AdminSchedules