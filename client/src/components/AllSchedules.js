import React, { useContext } from "react";
import { allSchedulesContext } from "./AdminSchedules";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function AllSchedules(){
  const allSchedules = useContext(allSchedulesContext)

  const scheduleRunDates = allSchedules.filter((schedule, index)=>{
    return allSchedules.findIndex((indexed)=>{
      return indexed.start_date == schedule.start_date && indexed.end_date == schedule.end_date
    }) == index
  })

  const runDates = scheduleRunDates.map((dateRange)=>{
    return(
      <>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >

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