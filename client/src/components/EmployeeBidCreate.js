import { Button, Container, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ForwardIcon from '@mui/icons-material/Forward';
import Loading from "./Loading";

function EmployeeBidCreate({ scheduleArray, month }){
  const [bid, setBid] = useState([])
  const [clicked, setClicked] = useState(false)
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [previous, setPrevious] = useState(null)
  let tableCellNumber = 0

  useEffect(()=>{
    const dateInfo = {
      "bid_open": scheduleArray[0].bid_open,
      "bid_close": scheduleArray[0].bid_close
    }
    fetch("/bid_check",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(dateInfo)
    })
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
          setLoaded(true)
        })
      } else {
        res.json()
        .then((d)=>{
          setPrevious(d)
          console.log(d)
          setLoaded(true)
        })
      }})
  },[])

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
          setPrevious(d)
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

  if(!loaded){
    return(
      <Loading />
    )
  }

  if(previous){
    return(
      <>
      <Container align="center">
        <Paper align="center" className="profile">
          <Typography variant="h4" align="center">Current Submitted Bid</Typography>
          <Typography variant="p">
            You have already submitted a Bid for this current Bid. That Bid is as follows.
          </Typography>
          <br/>
        </Paper>
      </Container>
      <br/>
      <Container align="center">
        <TableContainer align="center" component={Paper} className="scheduleListTable" sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader sx={{ minWidth:350, maxWidth:900 }} size="small" aria-label="ScheduleList">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ position:"sticky", left:0, zIndex:1000, background:"#f9b612" }}>Choice</TableCell>
                <TableCell align="center">Line</TableCell>
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
              {previous.map((line, index)=>{
                return(
                  <TableRow
                    key={line.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" style={{ position:'sticky' ,left:0, zIndex:5, background:"#f9b612" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">
                      {line.id}
                    </TableCell>
                    {line.schedule.shifts.map((shiftObj)=>{
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
      </>
    )
  }

  return(
    <>
      <Container align="center">
        <Paper align="center" className="profile">
          <Typography variant="h4" align="center">Your Bid</Typography>
          <Typography variant="p">
            Your current Bid is below this section with the Yellow Choice numbers. When finished press the "SUBMIT" button.
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
      <Divider />
      </> : null}
      <Container align="center">
        <Paper align="center" className="profile">
          <Typography variant="h4" align="center">{month} Bid</Typography>
        </Paper>
      </Container>
      <br/>
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