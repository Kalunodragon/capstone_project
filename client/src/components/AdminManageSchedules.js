import React, { useEffect, useState } from "react";
import { Box, Button, Container, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, Switch, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import Loading from "./Loading";

function AdminManageSchedules(){
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  const [fullWeek, setFullWeek] = useState(false)
  const [daysOff, setDaysOff] = useState("")
  const [loaded, setLoaded] = useState(false)
  const [shifts, setShifts] = useState(null)
  const [filterPosition, setFilterPosition] = useState("")
  const [shiftId, setShiftId] = useState(0)
  const boxColor = (success ? "#66bb6a" : (errors ? "#f44336" : "#f9b612"))

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
        })
      }
    })
  },[])

  if(!loaded){
    return(
      <Loading />
    )
  }

  const shiftPositions = shifts.filter((shift, index)=>{
    return shifts.findIndex((indexed)=>{
      return indexed.position === shift.position
    }) === index
  })

  const shiftPositionDropdown = shiftPositions.map((shift)=>{
    if(shift.position === "Off"){
      return(
        <MenuItem key={shift.id} value={""}><em style={{ color:"#3453c4" }}>Select Position</em></MenuItem>
      )
    } else {
      return(
        <MenuItem
          key={shift.id}
          value={shift.position}
        >
          {shift.position}
        </MenuItem>
      )
    }
  })

  const shiftTimes = shifts.filter((shift)=>{
    return shift.position === filterPosition
  })

  const shiftTimeDropdown = shiftTimes.map((position)=>{
    return(
      <MenuItem
        key={position.id}
        value={position.id}
      >
        {position.shift_start_time}-{position.shift_off_time}
      </MenuItem>
    )
  })

  return(
    <>
      <Container align="center" className="adminManageUpper">
        <Paper className="adminManageUpper" sx={{ backgroundColor:boxColor }}>
          <Box sx={{ backgroundColor:"#fff", padding:"5px" }}>
            <br/>
            <Typography variant="h5" align="center">
              Schedule Management
            </Typography>
            <Divider />
            <Typography variant="subtitle1" align="center">
              Schedule Date Selection
            </Typography>
            <Stack direction="row" spacing={2} margin={1}>
              <DatePicker 
                label="Schedule Start"
                required
                valueDefault={null}
                sx={{ width:"80%" }}
                />
              <DatePicker 
                label="Schedule End"
                required
                valueDefault={null}
                // value={dayjs(formData.date_of_birth)}
                // onChange={(e)=>setFormData({...formData, "date_of_birth":e.$d})}
                sx={{ width:"80%" }}
              />
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} margin={1}>
              <DatePicker 
                label="Bid Open"
                required
                valueDefault={null}
                sx={{ width:"80%" }}
                />
              <DatePicker 
                label="Bid Close"
                required
                valueDefault={null}
                // value={dayjs(formData.date_of_birth)}
                // onChange={(e)=>setFormData({...formData, "date_of_birth":e.$d})}
                sx={{ width:"80%" }}
              />
            </Stack>
            <Divider />
            <Typography variant="subtitle1" align="center">
              Weekly Schedule Section
            </Typography>
            <FormControlLabel
              label="Different Shifts? No|Yes"
              labelPlacement="start"
              control={<Switch checked={fullWeek} onChange={()=>setFullWeek(v=>!v)}/>}
            >
            </FormControlLabel>
            <br/>
            <FormControl sx={{ width:"80%" }}>
                <InputLabel>Days Off</InputLabel>
                <Select
                  value={daysOff}
                  label="Days Off"
                  onChange={(e)=>{
                    if(filterPosition !== "") setFilterPosition("")
                    if(shiftId !== 0) setShiftId(0)
                    setDaysOff(e.target.value)
                  }}
                >
                  <MenuItem value={""}><em style={{ color:"#3453c4" }}>Select Days Off</em></MenuItem>
                  <MenuItem value={1}>Sunday-Monday</MenuItem>
                  <MenuItem value={2}>Monday-Tuesday</MenuItem>
                  <MenuItem value={3}>Tuesday-Wednesday</MenuItem>
                  <MenuItem value={4}>Wednesday-Thursday</MenuItem>
                  <MenuItem value={5}>Thursday-Friday</MenuItem>
                  <MenuItem value={6}>Friday-Saturday</MenuItem>
                  <MenuItem value={7}>Saturday-Sunday</MenuItem>
                </Select>
              </FormControl>
            {fullWeek ?
              <>
                <h2>Yes</h2>
              </>:
              <>
                <Typography align="center" variant="subtitle1">
                  Same shift across week
                </Typography>
                <Stack direction="row" spacing={2} margin={1}>
                  <FormControl sx={{ width:"80%" }}>
                    <InputLabel>Position</InputLabel>
                    <Select
                      disabled={daysOff === ""}
                      value={filterPosition}
                      label="Position"
                      onChange={(e)=>{
                        if(shiftId !== 0) setShiftId(0)
                        setFilterPosition(e.target.value)
                      }}
                    >
                      {shiftPositionDropdown}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width:"80%" }}>
                    <InputLabel>Time</InputLabel>
                    <Select
                      disabled={daysOff === "" || filterPosition === ""}
                      value={shiftId}
                      label="Time"
                      onChange={(e)=>setShiftId(e.target.value)}
                    >
                      <MenuItem value={0}><em style={{ color:"#3453c4" }}>Select Time</em></MenuItem>
                      {shiftTimeDropdown}
                    </Select>
                  </FormControl>
                </Stack>
              </>}
          </Box>
        </Paper>
      </Container>
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

export default AdminManageSchedules