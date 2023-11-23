import React, { useContext, useState } from "react";
import { allSchedulesContext } from "./AdminSchedules";
import { Button, Container, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CircleIcon from '@mui/icons-material/Circle';
import dayjs from "dayjs";

function AllSchedules(){
  const allSchedules = useContext(allSchedulesContext)
  const [selected, setSelected] = useState("")
  const [filteredSchedules, setFilteredSchedules] = useState(allSchedules)
  const [awardClicked, setAwardClicked] = useState(false)
  // const [scheduleRunDates, setScheduleRunDates] = useState(null)
  let tableCellNumber = 0

  const scheduleRunDates = allSchedules.filter((schedule, index)=>{
    return allSchedules.findIndex((indexed)=>{
      return indexed.start_date === schedule.start_date && indexed.end_date === schedule.end_date
    }) === index
  })

  const sortedRunDates = scheduleRunDates.sort((a,b)=>{
    return(a.id - b.id)
  })

  const runDates = sortedRunDates.map((dateRange)=>{
    return(
      <TableRow
        key={dateRange.start_date}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        selected={selected === dateRange.start_date}
        onClick={()=>{
          setSelected(dateRange.start_date)
          setFilteredSchedules(allSchedules.filter((s)=> s.start_date === dateRange.start_date && s.end_date === dateRange.end_date))
        }}
      >
        <TableCell align="center">
          <IconButton
            align="center"
            aria-label="Select"
            size="small"
          >
            {selected === dateRange.start_date ? <CircleIcon htmlColor="#3453c4"/> : <PanoramaFishEyeIcon htmlColor="#f9b612"/>}
          </IconButton>
        </TableCell>
        <TableCell align="center" scope="row">
        {dayjs(dateRange.start_date).format("MMM - MM/DD/YYYY")} | {dayjs(dateRange.end_date).format("MMM - MM/DD/YYYY")}
        </TableCell>
      </TableRow>
    )
  })

  const bidClosed = dayjs().format("YYYY-MM-DD") > filteredSchedules[0].bid_close ?
    <>
      <Container align="center">
        <Button
          variant="contained"
          size="large"
          align="center"
          sx={{ marginTop:"15px" }}
          color="error"
          disabled={awardClicked}
          onClick={(e)=> {
            setAwardClicked(true)
            console.log(filteredSchedules[0].bid_close)
            handleAwardBidClick(e)
          }}
        >
          Award Bid
        </Button> 
      </Container>
      <br/>
      <Divider />
    </>
    : null

  function handleAwardBidClick(e){
    e.preventDefault()
    fetch("/award_bid",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        "bid_close":filteredSchedules[0].bid_close,
        "start_date":filteredSchedules[0].start_date
      })
    }).then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
          console.log(d)
          setAwardClicked(false)
        })
      } else {
        res.json()
        .then((d)=>{
          console.log(d)
          setAwardClicked(false)
        })
      }
    })
  }

  return(
    <>
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
              {runDates}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {selected !== "" ? 
        <>
          <br/>
          <Divider />
          {bidClosed}
          <br/>
          <Container align="center">
            <TableContainer align="center" component={Paper} className="scheduleListTable" sx={{ maxHeight: "70vh" }}>
              <Table stickyHeader sx={{ minWidth:350, maxWidth:900 }} size="small" aria-label="ScheduleList">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ position:'sticky' ,left:0 ,zIndex:1000, background:"#e2e2e2" }}>Line</TableCell>
                    <TableCell align="center">Limit</TableCell>
                    <TableCell align="center">Sunday</TableCell>
                    <TableCell align="center">Monday</TableCell>
                    <TableCell align="center">Tuesday</TableCell>
                    <TableCell align="center">Wednesday</TableCell>
                    <TableCell align="center">Thursday</TableCell>
                    <TableCell align="center">Friday</TableCell>
                    <TableCell align="center">Saturday</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSchedules.map((schedule, index)=>{
                    return(
                      <TableRow
                        key={schedule.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center" style={{ position:'sticky' ,left:0, zIndex:0, background:"#e2e2e2" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">
                          {schedule.number_available}
                        </TableCell>
                        {schedule.shifts.map((shiftObj)=>{
                          tableCellNumber++
                          return(
                            <TableCell align="center" key={tableCellNumber} sx={{ minWidth:"75px" }}>
                                {shiftObj.shift.day_off ? 
                                  <Typography
                                    variant="h6"
                                    color="#3453c4"
                                    sx={{ backgroundColor:"#e2e2e2" }}
                                  >OFF</Typography> :
                                  <Typography align="center" variant="subtitle2">
                                    {shiftObj.shift.position}
                                  </Typography>}
                                {shiftObj.shift.day_off ? null : `${shiftObj.shift.start_time}-${shiftObj.shift.off_time}`}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </> : null}
    </>
  )
}

export default AllSchedules