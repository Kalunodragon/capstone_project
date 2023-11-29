import { Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import ForwardIcon from '@mui/icons-material/Forward';

function EmployeeBidCreate({ scheduleArray }){
  const [bid, setBid] = useState([])
  const [clicked, setClicked] = useState(false)
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  let tableCellNumber = 0

  // Create a function or variable that creates biddedLines(lineToAdd)
    // LOBL (List of bidded lines) array
    // This function or variable will take in a schedule line and add this line to an array of bidded lines
    // these lines will then be (map)ped through and given the ability to move the line up or down
    // Main thing needed is the schedule.id for submitting the list of lines.
    // These lines in here will also have a delete button that allows an Employee to remove the line from the
      // LOBL.

  // Have a list of all schedule lines on current bid. These lines will show similar to the AllSchedules.js
    // The main difference will be an add line feature if you click on a line have it added to the LOBL

  // For the backend once submitted
    // employee_id will come from backend @current_employee
    // awarded will always be false from the backend

  // Work on making lines move up or down in the list of bidded lines

  function handleLineAdd(scheduleToAdd, lineNumber){
    const found = bid.find((line)=>line.s.id === scheduleToAdd.id)
    if(found){
      window.alert(`Line ${lineNumber} has already been added to your current bid. Can not add duplicate lines.`)
    } else {
      setBid([...bid,{l:lineNumber, s:scheduleToAdd}])
    }
  }

  function reorder(event, currentBid){
    const lineToMove = currentBid.find((item, index)=> index === event.currentIndex)
    const otherLines = currentBid.filter((item, index)=> index !== event.currentIndex)
    return [
      ...otherLines.slice(0, event.movingToIndex),
      lineToMove,
      ...otherLines.slice(event.movingToIndex)
    ]
  }

  function handleMoveUpDown(indexValue, direction){
    setBid(reorder({currentIndex: indexValue, movingToIndex: indexValue + (direction === "U" ? (-1) : 1)}, bid))
  }

  function handleSubmit(e){
    e.preventDefault()
    setClicked(true)
    // console.log(bid.map((line,index)=>{
    //   return {"choice_number":index+1, "schedule_id":line.s.id}
    // }))
    const bidInfo = {
      "time_now": new Date(Date.now()).toJSON(),
      "bid_open": scheduleArray[0].bid_open,
      "bid_close": scheduleArray[0].bid_close,
      "bids": bid.map((line,index)=>{
        return {"choice_number":index+1, "schedule_id":line.s.id}
      })
    }
    fetch("/bids",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(bidInfo)
    })
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
          console.log(d)
          setSuccess(d)
          setClicked(false)
        })
      } else {
        res.json()
        .then((d)=>{
          console.log(d)
          setErrors(d.errors)
          setClicked(false)
        })
      }
    })
  }

  return(
    <>
      <Container align="center">
        <Paper align="center" className="profile">
          <Typography variant="h4" align="center">Bid</Typography>
          <Typography variant="p">
            This is your current Bid. When finished press the "SUBMIT" button at the bottom of this section.
            CAUTION: A Bid can only be submitted once! Make sure your lines are as you want them before submitting!
          </Typography>
          <br/>
          {bid.length === 0 ? null : <Button
            sx={{ marginTop:1 }}
            variant="contained"
            size="large"
            disabled={clicked}
            onClick={handleSubmit}
          >
            Submit
          </Button>}
        </Paper>
      </Container>
      <br/>
      {bid.length !== 0 ? <> 
      <Container align="center">
        <TableContainer align="center" component={Paper} className="scheduleListTable" sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader sx={{ minWidth:350, maxWidth:900 }} size="small" aria-label="ScheduleList">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ position:"sticky", left:0, zIndex:1000, background:"#f9b612" }}>Choice</TableCell>
                <TableCell align="center">Line</TableCell>
                <TableCell />
                <TableCell>Move</TableCell>
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
              {bid.map((sObj, index)=>{
                return(
                  <TableRow
                    key={sObj.s.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" style={{ position:'sticky' ,left:0, zIndex:5, background:"#f9b612" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">
                      {sObj.l}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        align="center"
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={()=>setBid(bid.filter((b)=>b.l !== sObj.l))}
                      >
                        delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      {index === 0 ? null : <IconButton
                      
                      >
                        <ForwardIcon 
                          style={{ transform: "rotate(-90deg)" }}
                          onClick={()=>handleMoveUpDown(index, "U")}
                        />
                      </IconButton>}
                      {index === bid.length - 1 ? null : <IconButton
                      
                      >
                        <ForwardIcon 
                          style={{ transform: "rotate(90deg)" }}
                          onClick={()=>handleMoveUpDown(index, "D")}
                        />
                      </IconButton>}
                    </TableCell>
                    {sObj.s.shifts.map((shiftObj)=>{
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
      <br/>
      </> : null}
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
                    <TableCell align="center">
                      {schedule.number_available}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        align="center"
                        variant="contained"
                        size="small"
                        onClick={()=>handleLineAdd(schedule, lineNumber)}
                      >
                        add
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