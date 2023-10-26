import React, { useContext } from "react";
import { employeeContext } from "./App";
import { Typography } from "@mui/material";

function Profile(){
  const employee = useContext(employeeContext)

  console.log("From Profile element", employee)
  return(
    <>
      <Typography variant="h4" align="center">
        {employee.first_name} This is a test of your information
      </Typography>
    </>
  )
}

export default Profile