import React, { useContext } from "react";
import { employeeContext } from "./App";
import { Container, Divider, Paper, Typography } from "@mui/material";

function Profile(){
  const employee = useContext(employeeContext)

  console.log("From Profile element", employee)
  return(
    <>
      <Container align="center" className="profile">
        <Paper className="profile">
          <Typography variant="h5" align="left">
            {employee.first_name} {employee.last_name}
          </Typography>
          <Divider />
          <Typography variant="subtitle1" align="left">
            {employee.department}
          </Typography>
        </Paper>
      </Container> 
    </>
  )
}

export default Profile