import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { employeeContext } from "./App";

function MainPage(){
  const navigate = useNavigate()
  const employee = useContext(employeeContext)

  if(!employee){
    navigate("/sign-in")
  } else {
    return(
      <Typography>
        Employee main page
      </Typography>
    )
  }
}

export default MainPage