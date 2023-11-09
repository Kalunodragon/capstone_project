import React, { useContext, useState } from "react";
import { allSchedulesContext } from "./AdminSchedules";
import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CircleIcon from '@mui/icons-material/Circle';

function AllSchedules(){
  const allSchedules = useContext(allSchedulesContext)
  const [selected, setSelected] = useState("")

  const scheduleRunDates = allSchedules.filter((schedule, index)=>{
    return allSchedules.findIndex((indexed)=>{
      return indexed.start_date === schedule.start_date && indexed.end_date === schedule.end_date
    }) === index
  })

  const runDates = scheduleRunDates.map((dateRange)=>{
    return(
      <>
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
              onClick={()=>setSelected(dateRange.start_date)}
            >
              {selected === dateRange.start_date ? <CircleIcon htmlColor="#3453c4"/> : <PanoramaFishEyeIcon htmlColor="#f9b612"/>}
            </IconButton>
          </TableCell>
          <TableCell align="center" scope="row">
            {dateRange.start_date}-{dateRange.end_date}
          </TableCell>
        </TableRow>
      </>
    )
  })

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
    </>
  )
}

export default AllSchedules