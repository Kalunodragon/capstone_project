import { Box, Container, Divider, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function AdminEmployeeUpdate({ employee, setEmployeesState }){
  const {
    id,
    first_name,
    last_name,
    department,
    phone_number,
    email, station,
    seniority_date,
    date_of_birth,
    admin,
    employee_number
  } = employee

  const [formData, setFormData] = useState({
    "id":id,
    "first_name":first_name,
    "last_name":last_name,
    "department":department,
    "phone_number":phone_number,
    "email":email,
    "station":station,
    "seniority_date":seniority_date,
    "date_of_birth":date_of_birth,
    "admin":admin,
    "employee_number":employee_number
    })

    function handleSubmit(){
      console.log(employee)
    }


  return(
    <>
      <Container align="center" className="adminUpdate">
        <Paper className="adminUpdate" sx={{ backgroundColor: "#f9b612"}}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{backgroundColor:"#fff"}}>
            <Typography variant="h5" align="center">
              Edit Information
            </Typography>
            <Divider />
            <TextField
              label="First Name"
              sx={{ flexGrow:1 }}
              margin="dense"
              value={formData.first_name}
              onChange={(e)=>setFormData({...formData, "first_name":e.target.value})}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <TextField 
              label="Last Name"
              sx={{ flexGrow:1 }}
              margin="dense"
              value={formData.last_name}
              onChange={(e)=>setFormData({...formData, "last_name":e.target.value})}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <TextField 
              label="Department"
              sx={{ flexGrow:1 }}
              margin="dense"
              value={formData.department}
              onChange={(e)=>setFormData({...formData, "department":e.target.value})}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <TextField 
              label="Phone Number"
              sx={{ flexGrow:1 }}
              margin="dense"
              value={formData.phone_number}
              onChange={(e)=>setFormData({...formData, "phone_number":e.target.value})}
              helperText="Format: 1234567890"
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <TextField 
              label="Email"
              sx={{ flexGrow:1 }}
              margin="dense"
              value={formData.email}
              onChange={(e)=>setFormData({...formData, "email":e.target.value})}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <TextField 
              label="Station"
              sx={{ flexGrow:1 }}
              margin="dense"
              value={formData.station}
              onChange={(e)=>setFormData({...formData, "station":e.target.value})}
              helperText="Station Code Format: DAL"
              inputProps={{ maxLength: 3 }}
              required
              size="small"
              autoComplete="off"
            /> <br/>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default AdminEmployeeUpdate