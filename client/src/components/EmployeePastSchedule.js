import React, { useEffect, useState } from "react";
import Loading from "./Loading"
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function EmployeePastSchedule({ scheduleArray }){
  const [loading, setLoading] = useState(false)
  const [bids, setBids] = useState(null)

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
      <TableContainer align="center" component={Paper} className="scheuduleListTable" sx={{ maxHeight: "70vh" }}>
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
              const idExsits = (num) => bids.find(bid => {
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
                    {!!idExsits(schedule.id) ? idExsits(schedule.id).choice_number : "-"}
                  </TableCell>
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