import React, { useState } from "react";
import { Box, Container, Divider, Paper, TextField, Typography } from "@mui/material"
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";


function AdminNewShift(){
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  const [clockStartTime, setClockStartTime] = useState(null)
  const [clockOffTime, setClockOffTime] = useState(null)
  const boxColor = (success ? "#66bb6a" : (errors ? "#f44336" : "#f9b612"))

  // console.log(`${clockStartTime.$H}:${clockStartTime.$m}`)

  function handleSubmit(e){
    e.preventDefault()
  }

  function handleTime(e,location){
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
            <Typography variant="h5" align="center">
              Create New Shift
            </Typography>
            <Divider />
            <TimePicker
              label="Start Time"
              minutesStep={15}
              value={clockStartTime}
              onChange={(e)=>handleTime(e,"S")}
              views={['hours','minutes']}
              sx={{ width:"80%", marginBottom: "12px", marginTop: "12px", flexGrow:1 }}
            />
            <TimePicker
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
              margin="dense"
              required
              size="small"
              autoComplete="off"
            />
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default AdminNewShift