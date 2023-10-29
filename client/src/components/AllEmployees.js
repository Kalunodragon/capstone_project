import React, { useContext } from "react";
import { allEmployeesContext } from "./AdminEmployees";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EmpTableRow from "./EmpTableRow";

function AllEmployees(){
  const allEmployees = useContext(allEmployeesContext)
  const rows = []

  if(allEmployees){
    allEmployees.forEach((emp) => {
      const name = `${emp.first_name}, ${emp.last_name}`
      const num = emp.employee_number
      if(!emp.admin){
        rows.push({key:name,value:num,employee:emp})
      }
    })
  }

  // Have collapse/able rows that also how update/remove button
    // onUpdate => open drawer with prefilled info to update
    // onRemove => open drawer with request to delete (requires password)

  return(
    <Container align="center">
      <TableContainer align="center" component={Paper} className="empTable">
        <Table sx={{ minWidth: 350, maxWidth: 900 }} size="small" aria-label="Employees">
          <TableHead>
            <TableRow>
              <TableCell align="left"/>
              <TableCell align="center">Seniority</TableCell>
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="right">Employee Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((empData)=> <EmpTableRow index={rows.indexOf(empData)} empData={empData} employee={empData.employee}/>)}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default AllEmployees