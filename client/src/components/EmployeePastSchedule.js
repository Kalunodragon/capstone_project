import React, { useEffect, useState } from "react";
import Loading from "./Loading"
import { Container, FormLabel, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// Create awarded section using icon and have the icon be colored as well
  // The icon should be the EmojiEventIcon

function EmployeePastSchedule({ scheduleArray }){
  const [loading, setLoading] = useState(false)
  const [bids, setBids] = useState(null)
  let tableCellNumber = 0

  useEffect(()=>{
    fetch("/bids")
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
          setBids(d)
          console.log(d)
          setLoading(true)
        })
      } else {
        res.json()
        .then((d)=>{

          setLoading(true)
        })
      }
    })
  },[])

  if(!loading){
    return(
      <Loading />
    )
  }

  return(
    <Container align="center">
      <TableContainer align="center" component={Paper} className="scheduleListTable" sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader sx={{ minWidth:350, maxWidth:900 }} size="small" aria-label="ScheduleList">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ position:'sticky' ,left:0 ,zIndex:1000, background:"#e2e2e2" }}>Line</TableCell>
              <TableCell align="center">Choice Number</TableCell>
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
            {scheduleArray.map((schedule, index)=>{
              const bidFoundByID = (num) => bids.find(bid => {
                if(bid.schedule_id === num){
                  return(bid.choice_number)
                } else {
                  return(null)
                }
              })
              return(
                <TableRow
                  key={schedule.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" style={{ position:'sticky' ,left:0, zIndex:0, background:"#e2e2e2" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">
                    {!!bidFoundByID(schedule.id) ? bidFoundByID(schedule.id).awarded ? <><EmojiEventsIcon /> {bidFoundByID(schedule.id).choice_number}</> : bidFoundByID(schedule.id).choice_number : "---"}
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
  )
}

export default EmployeePastSchedule