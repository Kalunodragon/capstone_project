import { Container, Divider } from "@mui/material";
import React from "react";

function EmployeeBidCreate(){

  // Create a function or variable that creates biddedLines(lineToAdd)
    // LOBL (List of bidded lines) array
    // This function or variable will take in a schedule line and add this line to an array of bidded lines
    // these lines will then be (map)ped through and given the ability to move the line up or down
    // Main thing needed is the schedule.id for subbmiting the list of lines.
    // These lines in here will also have a delete button that allows an Employee to remove the line from the
      // LOBL.

  // Have a list of all schedule lines on current bid. These lines will show similar to the AllSchedules.js
    // The main difference will be an add line feature if you click on a line have it added to the LOBL

  // For the backend once submitted
    // employee_id will come from backend @current_employee
    // schedule_id's will come from an array of lines from the frontend
    // choice_number will be the index value + 1 from the array of lines from the frontend
    // awarded will always be false from the backend

  return(
    <>
      <Container align="center">
        <h1>LIST OF BIDDED LINES</h1>
      </Container>
      <Container align="center">
        <h1>SCHEDULE LIST</h1>
      </Container>
    </>
  )
}

export default EmployeeBidCreate