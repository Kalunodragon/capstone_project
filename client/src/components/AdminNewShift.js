import React, { useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material"

function AdminNewShift(){
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  const boxColor = (success ? "#66bb6a" : (errors ? "#f44336" : "#f9b612"))

  function handleSubmit(e){
    e.preventDefault()
  }

  return(
    <>
      <Container align="center" className="adminNew">
        <Paper className="adminNew" sx={{ backgroundColor:boxColor }}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ backgroundColor:"#fff" }}>
            <Typography variant="h5" align="center">
              Create New Shift
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default AdminNewShift