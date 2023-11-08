import React, { useContext, useState } from "react";
import { allShiftsContext } from "./AdminShifts";
import { Alert, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Loading from "./Loading";

function AllShifts({ handleDelete }){
  const shifts = useContext(allShiftsContext)
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  // const color = (success ? "#66bb6a" : (errors ? "#f44336" : "#f9b612"))

  function handleRemoveClick(id){
    // Create confim delete action that takes in Admin password to actually delete the shift
    console.log(id)
    if(errors) setErrors(null)
    if(success) setSuccess(null)
    if(id !== 1){
      fetch(`/shifts/${id}`,{method:"DELETE"})
      .then((res)=>{
        if(res.ok){
          res.json()
          .then((d)=>{
            setSuccess(d)
            console.log(d)
            handleDelete(d)
          })
        } else {
          res.json()
          .then((d)=>{
            setErrors(d.errors)
          })
        }
      })
    }
  }

  return(
    <>
      <Container align="center">
        {!shifts ? <Loading /> : null}
        <TableContainer align="center" component={Paper} className="shiftTable">
          {errors ? <><Alert severity="error" variant="filled" align="center" sx={{ margin: "10px" }}>{errors}</Alert><br/></> : null}
          {success ? <><Alert severity="success" variant="filled" align="center" sx={{ margin: "10px" }}>
              Success - {success.position} shift: {success.shift_start_time}-{success.shift_off_time} has been removed!
            </Alert><br/></> : null}
          <Table sx={{ minWidth: 300, maxWidth: 750 }} size="small" aria-label="Shifts" className="shiftTable" style={{ tableLayout:"auto" }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Shift ID</TableCell>
                <TableCell align="center">Position</TableCell>
                <TableCell align="center">Shift Time</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shifts ? shifts.map((shift, index)=>{
                return(
                  <TableRow key={shift.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">
                      <Typography variant="subtitle2">{index + 1}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="p">{shift.position}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="p">{shift.shift_start_time ? `${shift.shift_start_time}-${shift.shift_off_time}` : "N/A"}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      {shift.id !== 1 ? <IconButton
                        onClick={()=>handleRemoveClick(shift.id)}
                        size="small"
                        aria-label="Delete"
                        title="Delete"
                        color="warning"
                      >
                        <DeleteForeverIcon />
                      </IconButton> : null}
                    </TableCell>
                  </TableRow>
                )
              }): null}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default AllShifts