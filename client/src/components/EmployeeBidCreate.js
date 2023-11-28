import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";

function EmployeeBidCreate({ scheduleArray }){
  const [bid, setBid] = useState([])
  let tableCellNumber = 0

  // Create a function or variable that creates biddedLines(lineToAdd)
    // LOBL (List of bidded lines) array
    // This function or variable will take in a schedule line and add this line to an array of bidded lines
    // these lines will then be (map)ped through and given the ability to move the line up or down
    // Main thing needed is the schedule.id for subbmiting the list of lines.
    // These lines in here will also have a delete button that allows an Employee to remove the line from the
      // LOBL.

  // Have a list of all schedule lines on current bid. These lines will show similar to the AllSchedules.js
    // The main difference will be an add line feature if you click on a line have it added to the LOBL

  // For the backend once submitted
    // employee_id will come from backend @current_employee
    // schedule_id's will come from an array of lines from the frontend
    // choice_number will be the index value + 1 from the array of lines from the frontend
    // awarded will always be false from the backend

  function handleLineAdd(scheduleToAdd, line){
    console.log(line, scheduleToAdd)
    // cont. building out adding lines to the array in state then map through it and display those lines
  }

  return(
    <>
      <Container align="center">
        <h1>LIST OF BIDDED LINES</h1>
      </Container>
      <Container align="center">
        <TableContainer align="center" component={Paper} className="scheduleListTable" sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader sx={{ minWidth:350, maxWidth:900 }} size="small" aria-label="ScheduleList">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ position:"sticky", left:0, zIndex:1000, background:"#e2e2e2" }}>Line</TableCell>
                <TableCell align="center">Limit</TableCell>
                <TableCell />
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
                const lineNumber = index + 1
                return(
                  <TableRow
                    key={schedule.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" style={{ position:'sticky' ,left:0, zIndex:5, background:"#e2e2e2" }}>
                      {lineNumber}
                    </TableCell>
                    <TableCell>
                      {schedule.number_available}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        align="center"
                        variant="contained"
                        size="small"
                        onClick={()=>handleLineAdd(schedule, lineNumber)}
                      >
                        ADD
                      </Button>
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
    </>
  )
}

export default EmployeeBidCreate