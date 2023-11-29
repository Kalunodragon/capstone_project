import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Alert, Button, Container, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CircleIcon from '@mui/icons-material/Circle';
import FlightIcon from '@mui/icons-material/Flight';
import dayjs from 'dayjs';
import EmployeePastSchedule from "./EmployeePastSchedule";
import EmployeeBidCreate from "./EmployeeBidCreate";
import { splitFieldInternalAndForwardedProps } from "@mui/x-date-pickers/internals";

function Bidding(){
  const [loading, setLoading] = useState(false)
  const [schedules, setSchedules] = useState(null)
  const [selected, setSelected] = useState(null)
  const [filteredSchedules, setFilteredSchedules] = useState(null)
  const [openBid, setOpenBid] = useState(null)
  const [errors, setErrors] = useState(null)
  const today = dayjs()

  useEffect(()=>{
    fetch("/schedules")
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
          setSchedules(d)
          setLoading(true)
        })
      } else {
        res.json()
        .then((d)=>{
          setLoading(true)
          setErrors(d.errors)
        })
      }
    })
  },[])

  if(!loading){
    return(
      <Loading />
    )
  }

  const listOfScheduleDates = schedules.filter((schedule, index)=>{
    return schedules.findIndex((currentSchedule)=>{
      return currentSchedule.start_date === schedule.start_date && currentSchedule.end_date === schedule.end_date && dayjs(schedule.bid_open).startOf('day') <= today
    }) === index
  })

  const sortedList = listOfScheduleDates.sort((a,b)=>{
    return(a.id - b.id)
  })

  const listDates = sortedList.map((dateRange)=>{
    return(
      <TableRow
        key={dateRange.start_date}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        selected={selected === dateRange.start_date}
        onClick={()=>{
          setSelected(dateRange.start_date)
          setFilteredSchedules(schedules.filter((s)=> s.start_date === dateRange.start_date && s.end_date === dateRange.end_date))
        }}
      >
        <TableCell align="center">
          <IconButton
            align="center"
            aria-label="Select"
            size="small"
          >
            {selected === dateRange.start_date ? 
              openBid === dateRange.id ? <FlightIcon htmlColor="#3453c4"/> : <CircleIcon htmlColor="#3453c4"/> : 
              openBid === dateRange.id ? <FlightIcon htmlColor="#66bb6a"/> : <PanoramaFishEyeIcon htmlColor="#f9b612"/> }
          </IconButton>
        </TableCell>
        <TableCell align="center" scope="row">
          {dayjs(dateRange.start_date).format("MMM - MM/DD/YYYY")} | {dayjs(dateRange.end_date).format("MMM - MM/DD/YYYY")}
        </TableCell>
      </TableRow>
    )
  })

  const pastOrCurrent = (filteredSchedules ?
    dayjs(filteredSchedules[0].bid_close).endOf('day') < today ?
      <EmployeePastSchedule scheduleArray={filteredSchedules}/> :
      <EmployeeBidCreate scheduleArray={filteredSchedules} month={dayjs(selected).format("MMMM")}/>
      : null)

  function checkForOpenBid(){
    if(openBid === null){
      const scheduleFound = sortedList.find((schedule) => {
        const open = dayjs(schedule.bid_open).startOf('day')
        const close = dayjs(schedule.bid_close).endOf('day')
        if(open < today && today < close){
          return schedule
        }
        return undefined
      })
      setOpenBid(scheduleFound ? scheduleFound.id : scheduleFound)
    }
  }

  checkForOpenBid()
  
  return(
    <>
      <br/>
      <Container align="center" className="profile">
        <Paper align="center" sx={{ backgroundColor:"#fff" }} className="profile">
          <Typography variant="h4" align="center">
            Bidding
          </Typography>
          {errors ? <><Divider /><br/><Alert severity="error" align="center" variant="filled">{errors}</Alert><br/></> : null}
          <Divider />
          {!filteredSchedules ? 
            <Typography variant="p">
              WIP TEXT: Secion below is for viewing bids. If a schedule is out of the "Bidding timeframe" then 
              it will now allow you to create a bid for that schedule. If the schedule is within its "Bidding 
              timeframe" the selected section will show a green airplane for that option. This shows that you 
              are able to bid for that schedule time frame.
            </Typography> : null}
          {filteredSchedules ? 
            <Button
              onClick={()=>{
                setSelected(null)
                setFilteredSchedules(null)
              }}
              variant="contained"
              align="center"
              sx={{ marginTop: "10px"}}
            >
              Bidding Main
            </Button> : null}
        </Paper>
      </Container>
      <br/>
      <Container align="center">
        <TableContainer align="center" component={Paper} className="scheduleDateTable">
          <Table sx={{ minWidth:350, maxWidth:900 }} size="small" aria-label="ScheduleDates">
            <TableHead>
              <TableRow>
                <TableCell align="center">Selected</TableCell>
                <TableCell align="center">Schedule: Start Date | End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listDates}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <br/>
      {filteredSchedules ? pastOrCurrent : null}
    </>
  )
}

// FUTURE GOAL: Use React-DND or variant drag and drop library to help with reorganization of bid lines

export default Bidding