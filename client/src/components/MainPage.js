import { Alert, Container, Divider, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { employeeContext } from "./App";

function MainPage(){
  const navigate = useNavigate()
  const employee = useContext(employeeContext)

  // Create Backend Route for just checking if a bid is open
    // This should run in a useEffect() and set bidOpen to true or false
    // if bid is open have it return the date range of bidding period
    // it should also check if the @currentEmployee has placed a bid for said bid

  const bidOpen = false
  const bidSubmitted = false

  if(!employee){
    navigate("/sign-in")
  } else {
    return(
      <>
        <Container align="center" className="profile">
          <Paper className="profile">
            <Typography variant="h4" align="center">
              Hello {employee.first_name}!
            </Typography>
            {bidOpen ? (bidSubmitted ? 
              <><Alert variant="filled" severity="success">
                Bid Submitted
                </Alert><br/></> :
              <><Alert align="center" variant="filled" severity="warning" style={{ "backgroundColor":"#f9b612"}}>
                Bid is now open!
              </Alert><br/></>) :
              null
            }
            <Divider />
            <Typography variant="p">
              Welcome to the Ramp Agent Digital Scheduling system, RADS for short! This System is designed to make the
              whole process of schedule bidding as easy as possible for an Agent.
            </Typography>
            <Divider />
            <Typography variant="p">
              Quick reference: Top Left is the Navigation tab, Top Right is the Profile tab. If a bid is open you will 
              see an alert above this area, after a bid is submitted this alert will change to a "Bid Submitted" 
              notification. To edit your account head to your Account and then Settings in the Top Right from your Account.
            </Typography>
            <Divider />
            <Typography variant="p">
              Happy Bidding!
            </Typography>
          </Paper>
        </Container>
      </>
    )
  }
}

export default MainPage