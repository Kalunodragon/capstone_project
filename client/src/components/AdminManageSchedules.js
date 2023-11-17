import React, { useEffect, useState } from "react";
import { Box, Button, Container, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, Switch, TextField, Typography } from "@mui/material";
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
  const [submitClicked, setSubmitClicked] = useState(false)
  const boxColor = (success ? "#66bb6a" : (errors ? "#f44336" : "#f9b612"))
  const [formDataDates, setFormDataDates] = useState({
    "start_date": null,
    "end_date": null,
    "bid_open": null,
    "bid_close": null
  })
  const [formDataDays, setFormDataDays] = useState({
    "sunday_shift": 0,
    "monday_shift": 0,
    "tuesday_shift": 0,
    "wednesday_shift": 0,
    "thursday_shift": 0,
    "friday_shift": 0,
    "saturday_shift": 0
  })
  const [formDataNumberAvailable, setFormDataNumberAvailable] = useState(0)

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

  function handleWeeklySchedule(value,location,day){
    if(value === "Reset"){
      setShiftId(0)
      setFormDataDays({
        "sunday_shift": 0,
        "monday_shift": 0,
        "tuesday_shift": 0,
        "wednesday_shift": 0,
        "thursday_shift": 0,
        "friday_shift": 0,
        "saturday_shift": 0
      })
    }
    if(location === "Same"){
      setShiftId(value)
      setFormDataDays({
        "sunday_shift": (daysOff === 1 || daysOff === 7 ? 1 : value),
        "monday_shift": (daysOff === 1 || daysOff === 2 ? 1 : value),
        "tuesday_shift": (daysOff === 2 || daysOff === 3 ? 1 : value),
        "wednesday_shift": (daysOff === 3 || daysOff === 4 ? 1 : value),
        "thursday_shift": (daysOff === 4 || daysOff === 5 ? 1 : value),
        "friday_shift": (daysOff === 5 || daysOff === 6 ? 1 : value),
        "saturday_shift": (daysOff === 6 || daysOff === 7 ? 1 : value)
      })
    }
    if(location === "Diff"){
      if(day === "Sunday") setFormDataDays({...formDataDays, "sunday_shift":(value)})
      if(day === "Monday") setFormDataDays({...formDataDays, "monday_shift":(value)})
      if(day === "Tuesday") setFormDataDays({...formDataDays, "tuesday_shift":(value)})
      if(day === "Wednesday") setFormDataDays({...formDataDays, "wednesday_shift":(value)})
      if(day === "Thursday") setFormDataDays({...formDataDays, "thursday_shift":(value)})
      if(day === "Friday") setFormDataDays({...formDataDays, "friday_shift":(value)})
      if(day === "Saturday") setFormDataDays({...formDataDays, "saturday_shift":(value)})
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    setSubmitClicked(v=>!v)
    const submissionData = {
      "start_date": formDataDates.start_date,
      "end_date": formDataDates.end_date,
      "bid_open": formDataDates.bid_open,
      "bid_close": formDataDates.bid_close,
      "sunday_shift": formDataDays.sunday_shift,
      "monday_shift": 0,
      "tuesday_shift": 0,
      "wednesday_shift": 0,
      "thursday_shift": 0,
      "friday_shift": 0,
      "saturday_shift": 0
    }
    fetch("/schedules",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify()
    })
  }

  return(
    <>
      <Container align="center" className="adminManageUpper">
        <Paper className="adminManageUpper" sx={{ backgroundColor:boxColor }}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ backgroundColor:"#fff", padding:"5px" }}>
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
                value={dayjs(formDataDates.start_date)}
                onChange={(e)=>setFormDataDates({...formDataDates, "start_date":e.$d})}
                sx={{ width:"80%" }}
                />
              <DatePicker 
                label="Schedule End"
                required
                valueDefault={null}
                value={dayjs(formDataDates.end_date)}
                onChange={(e)=>setFormDataDates({...formDataDates, "end_date":e.$d})}
                sx={{ width:"80%" }}
              />
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} margin={1}>
              <DatePicker 
                label="Bid Open"
                required
                valueDefault={null}
                value={dayjs(formDataDates.bid_open)}
                onChange={(e)=>setFormDataDates({...formDataDates, "bid_open":e.$d})}
                sx={{ width:"80%" }}
                />
              <DatePicker 
                label="Bid Close"
                required
                valueDefault={null}
                value={dayjs(formDataDates.bid_close)}
                onChange={(e)=>setFormDataDates({...formDataDates, "bid_close":e.$d})}
                sx={{ width:"80%" }}
              />
            </Stack>
            <Divider />
            <Typography variant="subtitle1" align="center">
              Weekly Schedule Section
            </Typography>
            {/* <FormControlLabel
              label="Different Shifts? No|Yes"
              labelPlacement="start"
              control={<Switch checked={fullWeek} onChange={()=>setFullWeek(v=>!v)}/>}
            >
            </FormControlLabel> */}
            <br/>
            <FormControl sx={{ width:"80%" }}>
                <InputLabel>Days Off</InputLabel>
                <Select
                  value={daysOff}
                  label="Days Off"
                  onChange={(e)=>{
                    if(filterPosition !== "") setFilterPosition("")
                    if(shiftId !== 0) handleWeeklySchedule("Reset")
                    setDaysOff(e.target.value)
                    handleWeeklySchedule(0,"Same")
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
                        if(shiftId !== 0) handleWeeklySchedule("Reset")
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
                      value={shiftId === 0 ? "" : shiftId}
                      label="Time"
                      onChange={(e)=>handleWeeklySchedule(e.target.value,"Same")}
                    >
                      <MenuItem value={0}><em style={{ color:"#3453c4" }}>Select Time</em></MenuItem>
                      {shiftTimeDropdown}
                    </Select>
                  </FormControl>
                </Stack>
              </>}
            <TextField
              label="Number Available"
              sx={{ flexGrow:1, width:"80%" }}
              margin="dense"
              value={formDataNumberAvailable}
              onChange={(e)=>{
                if(e.target.value >= 0){
                  setFormDataNumberAvailable(e.target.value)
                } else {
                  setFormDataNumberAvailable(0)
                }
              }}
              type="number"
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <Button 
              type="submit"
              variant="contained"
              sx={{ margin: "8px"}}
              disabled={ formDataDates.start_date === null ||
                formDataDates.end_date === null ||
                formDataDates.bid_open === null ||
                formDataDates.bid_close === null ||
                daysOff === "" ||
                filterPosition === "" ||
                shiftId === 0}
            >
              {submitClicked ? "Adding to Schedule" : "Add to schedule"}
            </Button>
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

  // Test out handleWeeklySchedule to see if it preforms correctly
    // Should set days off after days off is picked
  // Create full week schedule selection and test there as well
  // Make sure each day can be set to a different shift besides the days off

export default AdminManageSchedules