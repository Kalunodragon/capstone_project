import { Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";

function AppInfo(){

  return(
    <>
      <Container align="center" className="profile">
        <Paper className="profile">
          <Typography variant="h4" align="center">
            Welcome to RADS!
          </Typography>
          <Divider />
          <Typography variant="p">
            This application is the Capstone project for Flatirons School, built entirely by for Andrew Onulak.
          </Typography>
          <Divider />
          <Typography variant="p">
            This application is a solution to a problem that not only spans a company sized workforce stuck in a 
            paper age, but also a staffing shortage within the Admin department of the same company. This 
            application is intended to help make the entire process of Bidding for a Schedule thousands of times 
            quicker! Instead of Bids having to be combed through multiple times on paper, guessing what numbers 
            are written and not written, dealing with a Fax machine, yes you read that right a Fax machine to 
            submit Bids while out of town. Employees would now be able to submit this Bid digitally from anywhere! 
            The entire Bid process is also improved upon by taking out redundant lines from a bid and condensing 
            them into one line. It will also notify all Employees via text/or email based on choice when the bid 
            is completed. Instead of having to wait for a member of the Admin department to generate the email 
            themselves.
          </Typography>
          <br/> <br/>
          <Divider />
          <Typography variant="p">
            TLDR: Improvements - Digital Bidding with automatic notification and awarding. Removal of paper 
            Bidding which generates thousands upon thousands sheets of paper for one bid. Removal of 
            outdated technology aka. Fax Machine
          </Typography>
          <Divider />
          <br/> <br/>
          <Typography variant="p">
            App version: ALPHA
          </Typography>
        </Paper>
      </Container>
    </>
  )
}

export default AppInfo