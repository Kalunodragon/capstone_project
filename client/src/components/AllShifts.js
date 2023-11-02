import React, { useContext } from "react";
import { allShiftsContext } from "./AdminShifts";
import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function AllShifts(){
  const shifts = useContext(allShiftsContext)

  function handleRemoveClick(id){
    console.log(id)
  }

  return(
    <>
      <Container align="center">
        <TableContainer align="center" component={Paper} className="shiftTable">
          <Table sx={{ minWidth: 300, maxWidth: 750 }} size="small" aria-label="Shifts" className="shiftTable" fixedHeader style={{ tableLayout:"auto" }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Shift ID</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">Off Time</TableCell>
                <TableCell align="center">Position</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shifts.map((shift, index)=>{
                return(
                  <TableRow key={shift.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">
                      <Typography variant="subtitle2">{index + 1}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="p">{shift.shift_start_time ? shift.shift_start_time : "N/a"}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="p">{shift.shift_off_time ? shift.shift_off_time : "N/a"}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="p">{shift.position}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={()=>handleRemoveClick(shift.id)}
                        size="small"
                        aria-label="Delete"
                        title="Delete"
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
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

export default AllShifts