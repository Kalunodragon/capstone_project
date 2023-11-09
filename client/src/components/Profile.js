import React, { useContext } from "react";
import { employeeContext } from "./App";
import { Container, Divider, Paper, Typography } from "@mui/material";

function Profile(){
  const employee = useContext(employeeContext)

  return(
    <>
      <Container align="center" className="profile">
        <Paper className="profile">
          <Typography variant="h5" align="left">
            {employee.first_name} {employee.last_name}
          </Typography>
          <Divider />
          <Typography variant="subtitle1" align="left">
            {employee.station} - {employee.admin ? employee.department + " Admin" : employee.department} - {employee.employee_number}
          </Typography>
        </Paper>
        <Paper className="profile">
          <Typography variant="h5" align="left">
            Main Info
          </Typography>
          <Divider />
          <Typography variant="subtitle2" align="left">
            Phone number: {employee.phone_number}
          </Typography>
          <Divider />
          <Typography variant="subtitle2" align="left">
            Email: {employee.email}
          </Typography>
          <Divider />
          <Typography variant="subtitle2" align="left">
            Hire Date: {employee.seniority_date}
          </Typography>
          <Divider />
          <Typography variant="subtitle2" align="left">
            Date of Birth: {employee.date_of_birth}
          </Typography>
        </Paper>
      </Container> 
    </>
  )
}

export default Profile