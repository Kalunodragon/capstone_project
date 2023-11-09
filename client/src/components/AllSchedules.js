import React, { useContext, useState } from "react";
import { allSchedulesContext } from "./AdminSchedules";
import { Container, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CircleIcon from '@mui/icons-material/Circle';
import Loading from "./Loading";

function AllSchedules({ loaded }){
  const allSchedules = useContext(allSchedulesContext)
  const [selected, setSelected] = useState("")
  const [filteredSchedules, setFilteredSchedules] = useState(allSchedules)
  // const [scheduleRunDates, setScheduleRunDates] = useState(null)
  let tableCellNumber = 0

  const scheduleRunDates = allSchedules.filter((schedule, index)=>{
    return allSchedules.findIndex((indexed)=>{
      return indexed.start_date === schedule.start_date && indexed.end_date === schedule.end_date
    }) === index
  })

  const runDates = scheduleRunDates.map((dateRange)=>{
    return(
      <TableRow
        key={dateRange.start_date}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        selected={selected === dateRange.start_date}
      >
        <TableCell align="center">
          <IconButton
            align="center"
            aria-label="Select"
            size="small"
            onClick={()=>{
              setSelected(dateRange.start_date)
              setFilteredSchedules(allSchedules.filter((s)=> s.start_date === dateRange.start_date && s.end_date === dateRange.end_date))
            }}
          >
            {selected === dateRange.start_date ? <CircleIcon htmlColor="#3453c4"/> : <PanoramaFishEyeIcon htmlColor="#f9b612"/>}
          </IconButton>
        </TableCell>
        <TableCell align="center" scope="row">
          {dateRange.start_date} | {dateRange.end_date}
        </TableCell>
      </TableRow>
    )
  })

  if(!loaded){
    return(
      <Loading/>
    )
  }

  return(
    <>
      <Container align="center">
        <TableContainer align="center" component={Paper} className="scheduleDateTable">
          <Table sx={{ minWidth:350, maxWidth:900 }} size="small" aria-label="ScheduleDates">
            <TableHead>
              <TableRow>
                <TableCell align="center">Selected</TableCell>
                <TableCell align="center">Date Range</TableCell>
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
          <br/>
          <Container align="center">
            <TableContainer align="center" component={Paper} className="scheduleListTable">
              <Table stickyHeader sx={{ minWidth:350, maxWidth:900 }} size="small" aria-label="ScheduleList">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ position:'sticky' ,left:0 ,zIndex:1000, background:"#e2e2e2" }}>Line</TableCell>
                    <TableCell align="center">Available</TableCell>
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