import { Alert, Button, Container, Divider, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { employeeContext } from "./App";

function MainPage(){
  const navigate = useNavigate()
  const employee = useContext(employeeContext)

  const bidOpen = true
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
              <><Alert variant="filled" severity="success">Bid Submitted</Alert><br/></> :
              <><Button align="center" variant="filled" severity="error">Create Bid</Button><br/></>) :
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
              see a button above this area with "Create Bid", after a bid is submitted this button will change to a 
              "Bid Submitted" notification. To edit your account head to your Account and then Settings in the Top 
              Right from your Account.
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