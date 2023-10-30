import React, { useContext, useState } from "react";
import { allEmployeesContext } from "./AdminEmployees";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EmpTableRow from "./EmpTableRow";
import Loading from "./Loading";

function AllEmployees({ loaded, setEmployeesState }){
  const allEmployees = useContext(allEmployeesContext)
  const [mainCollapseOpen, setMainCollapseOpen] = useState(null)
  const [innerCollapseOpen, setInnerCollapseOpen] = useState(null)
  const [removeCollapseOpen, setRemoveCollapseOpen] = useState(null)
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

  function handleMainCollapseOpen(clickedIndex){
    if(removeCollapseOpen) setRemoveCollapseOpen(null)
    if(innerCollapseOpen) setInnerCollapseOpen(null)
    if(mainCollapseOpen === clickedIndex){
      setMainCollapseOpen(null)
    } else {
      setMainCollapseOpen(clickedIndex)
    }
  }
  function handleInnerCollapseOpen(clickedIndex){
    if(removeCollapseOpen) setRemoveCollapseOpen(null)
    if(innerCollapseOpen === clickedIndex){
      setInnerCollapseOpen(null)
    } else {
      setInnerCollapseOpen(clickedIndex)
    }
  }
  function handleRemoveCollapseOpen(clickedIndex){
    if(innerCollapseOpen) setInnerCollapseOpen(null)
    if(removeCollapseOpen === clickedIndex){
      setRemoveCollapseOpen(null)
    } else {
      setRemoveCollapseOpen(clickedIndex)
    }
  }

  // Have collapse/able rows that also how update/remove button
    // onUpdate => open drawer with prefilled info to update
    // onRemove => open drawer with request to delete (requires password)
  if(!loaded){
    return <Loading />
  }

  return(
    <>
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
              {rows.map((empData)=> (
                <EmpTableRow
                  key={empData.employee.employee_number}
                  index={rows.indexOf(empData)}
                  empData={empData}
                  employee={empData.employee}
                  setEmployeesState={setEmployeesState}
                  mainCollapseOpen={mainCollapseOpen}
                  mainCollapseClick={handleMainCollapseOpen}
                  innerCollapseOpen={innerCollapseOpen}
                  innerCollapseClick={handleInnerCollapseOpen}
                  removeCollapseOpen={removeCollapseOpen}
                  removeCollapseClick={handleRemoveCollapseOpen}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default AllEmployees