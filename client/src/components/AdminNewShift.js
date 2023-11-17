import React, { useState } from "react";
import { Alert, Box, Button, Container, Divider, Paper, TextField, Typography } from "@mui/material"
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function AdminNewShift({ handleAddShift }){
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  const [clockStartTime, setClockStartTime] = useState(null)
  const [clockOffTime, setClockOffTime] = useState(null)
  const [positionValue, setPositionValue] = useState("")
  const [submitClicked, setSubmitClicked] = useState(false)
  const boxColor = (success ? "#66bb6a" : (errors ? "#f44336" : "#f9b612"))

  // console.log(`${clockStartTime.$H}:${clockStartTime.$m}`)


  function handleSubmit(e){
    e.preventDefault()
    if(errors) setErrors(null)
    if(success) setSuccess(null)
    const shiftInfo = {
      "start_time": `${clockStartTime.$H}:${clockStartTime.$m}`,
      "off_time": `${clockOffTime.$H}:${clockOffTime.$m}`,
      "position":positionValue,
      "day_off":false
    }
    console.log(shiftInfo)
    fetch("/shifts",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(shiftInfo)
    })
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
          setSuccess(d)
          handleAddShift(d)
          setClockStartTime(null)
          setClockOffTime(null)
          setPositionValue("")
          setSubmitClicked(false)
        })
      } else {
        res.json()
        .then((d)=>{
          console.log(d)
          setErrors(d.errors)
          setSubmitClicked(false)
        })
      }
    })
  }

  function handleTime(e,location){
    if(errors) setErrors(null)
    if(success) setSuccess(null)
    if(location === "S"){
      setClockStartTime(e)
      if(e.$H + 8 <= 12){
        setClockOffTime(e.add(8,"hour"))
      } else {
        const addEightPointFive = e.add(8.5,"hour")
        setClockOffTime(addEightPointFive)
      }
    }
    if(location === "O"){
      setClockOffTime(e)
      if(e.$H <= 12){
        setClockStartTime(e.subtract(8,"hour"))
      } else {
        const subEightPointFive = e.subtract(8.5,"hour")
        setClockStartTime(subEightPointFive)
      }
    }
  }

  // Have time picker auto generate the off time
    // function that calculates time plus 8.5 hours unless time can fit 8 hours in before noon
    // have time picker only be able to increment minutes by 15 mins at a time

  return(
    <>
      <Container align="center" className="adminNew">
        <Paper className="adminNew" sx={{ backgroundColor:boxColor }}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ backgroundColor:"#fff" }}>
            <br/>
            <Typography variant="h5" align="center">
              Create New Shift
            </Typography>
            {success ? <><Alert align="center" severity="success" variant="filled" sx={{ margin:1 }}>
                Success - {success.position} shift: {success.shift_start_time}-{success.shift_off_time} has been added!
              </Alert></>:null}
            {errors ? <><Alert align="center" severity="error" variant="filled">{errors}</Alert></>:null}
            <Divider />
            <TimePicker
              timezone="America/Denver"
              label="Start Time"
              minutesStep={15}
              value={clockStartTime}
              onChange={(e)=>handleTime(e,"S")}
              views={['hours','minutes']}
              sx={{ width:"80%", marginBottom: "12px", marginTop: "12px", flexGrow:1 }}
            />
            <TimePicker
              timezone="America/Denver"
              label="Off Time"
              minutesStep={15}
              value={clockOffTime}
              onChange={(e)=>handleTime(e,"O")}
              views={['hours','minutes']}
              sx={{ width:"80%", marginBottom: "12px", flexGrow:1 }}
            />
            <TextField 
              label="Position"
              sx={{ flexGrow:1, width:"80%" }}
              value={positionValue}
              onChange={(e)=>setPositionValue(e.target.value)}
              margin="dense"
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <Button
              type="submit"
              variant="contained"
              disabled={!(positionValue !== "" && !submitClicked && clockStartTime !== null && clockOffTime !== null)}
              sx={{ marginTop: "8px"}}
            >
              {submitClicked ? "Submitting...":"Submit"}
            </Button>
            <br/><br/>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default AdminNewShift