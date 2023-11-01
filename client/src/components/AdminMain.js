import React from "react";
import { Container, Divider, Paper, Typography } from "@mui/material";

function AdminMain(){

  return(
    <>
      <Container align="center" className="profile">
        <Paper className="profile">
          <Typography variant="h4" align="center">
            Hello!
          </Typography>
          <Divider />
          <Typography variant="p">
            Welcome to the Ramp Agent Digital Scheduling system Admin side, RADS-ADMIN for short! This System is designed to make the
            whole process of schedule bidding as easy as possible.
          </Typography>
          <Divider />
          <Typography variant="p">
            Quick reference: Top Left is the Navigation tab, Top Right is the Profile tab. To edit your account 
            head to your Account and then Settings in the Top Right from your Account.
          </Typography>
        </Paper>
      </Container>
    </>
  )
}

export default AdminMain