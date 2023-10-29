import React, { useContext } from "react";
import { allEmployeesContext } from "./AdminEmployees";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function AllEmployees(){
  const allEmployees = useContext(allEmployeesContext)
  const rows = []

  if(allEmployees){
    allEmployees.forEach((emp) => {
      const name = `${emp.first_name}, ${emp.last_name}`
      const num = emp.employee_number
      rows.push({key:name,value:num})
    })
  }

  // Have collapse/able rows that also how update/remove button
    // onUpdate => open drawer with prefilled info to update
    // onRemove => open drawer with request to delete (requires password)
  const displayThese = rows.map((empData)=>{
    return(
      <TableRow
        key={empData.key}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align="center" component="th" scope="row">
          {rows.indexOf(empData) + 1}
        </TableCell>
        <TableCell align="left">
          {empData.key}
        </TableCell>
        <TableCell align="center">
          {empData.value}
        </TableCell>
      </TableRow>
    )
  })

  return(
    <Container align="center">
      <TableContainer align="center" component={Paper} className="empTable">
        <Table sx={{ minWidth: 350, maxWidth: 800 }} size="small" aria-label="Employees">
          <TableHead>
            <TableRow>
              <TableCell align="center">Seniority</TableCell>
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="center">Employee Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayThese}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default AllEmployees