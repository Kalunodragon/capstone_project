import React, { useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material"

function AdminNewShift(){
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  const boxColor = (success ? "#66bb6a" : (errors ? "#f44336" : "#f9b612"))

  function handleSubmit(e){
    e.preventDefault()
  }

  // Have time picker auto generate the off time
    // function that calculates time plus 8.5 hours unless time can fit 8 hours in before noon
    // have time picker only be able to increment minutes by 15 mins at a time

  return(
    <>
      <Container align="center" className="adminNew">
        <Paper className="adminNew" sx={{ backgroundColor:boxColor }}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ backgroundColor:"#fff" }}>
            <Typography variant="h5" align="center">
              Create New Shift
            </Typography>
            {/* Time picker comp */}
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default AdminNewShift