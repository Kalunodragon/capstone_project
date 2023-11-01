import React, { useState } from "react";
import { Alert, Box, Button, Container, Divider, FormControlLabel, Paper, Switch, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

function AdminNewEmployee(){
  const [submitClicked, setSubmitClicked] = useState(false)
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  const [active, setActive] = useState(false)
  const [checked, setChecked] = useState(false)
  const boxColor = (success ? "#66bb6a" : (errors ? "#f44336" : "#f9b612"))
  const [formData, setFormData] = useState({
    "first_name":"",
    "last_name":"",
    "department":"",
    "phone_number":"",
    "email":"",
    "station":"",
    "seniority_date": new Date().$d,
    "date_of_birth": null,
    "admin": false
  })

  function handleSubmit(){

  }

  return(
    <>
      <Container align="center" className="adminNew">
        <Paper className="adminNew" sx={{ backgroundColor: boxColor}}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{backgroundColor:"#fff"}}>
            <br/>
            <Typography variant="h5" align="center">
              Register New Employee
            </Typography>
            <Divider />
            {errors ? <>
              <Alert severity="error" align="center" variant="filled" sx={{ margin: "5px" }}>{errors}</Alert>
              <Divider />
            </> : null}
            <TextField
              label="First Name"
              sx={{ flexGrow:1, width:"80%" }}
              margin="dense"
              value={formData.first_name}
              onChange={(e)=>setFormData({...formData, "first_name":e.target.value})}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <TextField 
              label="Last Name"
              sx={{ flexGrow:1, width:"80%" }}
              margin="dense"
              value={formData.last_name}
              onChange={(e)=>setFormData({...formData, "last_name":e.target.value})}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <TextField 
              label="Department"
              sx={{ flexGrow:1, width:"80%" }}
              margin="dense"
              value={formData.department}
              onChange={(e)=>setFormData({...formData, "department":e.target.value})}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <TextField 
              label="Phone Number"
              sx={{ flexGrow:1, width:"80%" }}
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
              sx={{ flexGrow:1, width:"80%" }}
              margin="dense"
              value={formData.email}
              onChange={(e)=>setFormData({...formData, "email":e.target.value})}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <TextField 
              label="Station"
              sx={{ flexGrow:1, width:"80%" }}
              margin="dense"
              value={formData.station}
              onChange={(e)=>setFormData({...formData, "station":e.target.value})}
              helperText="Station Code Format: DAL"
              inputProps={{ maxLength: 3 }}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <DatePicker 
              label="Hire Date"
              required
              valueDefault={null}
              value={dayjs(formData.seniority_date)}
              onChange={(e)=>setFormData({...formData, "seniority_date":e.$d})}
              sx={{ width:"80%", marginBottom: "12px" }}
            /> <br/>
            <DatePicker 
              label="Date Of Birth"
              required
              valueDefault={null}
              value={dayjs(formData.date_of_birth)}
              onChange={(e)=>setFormData({...formData, "date_of_birth":e.$d})}
              sx={{ width:"80%" }}
            /> <br/>
            <FormControlLabel
              label="Start out as Admin"
              labelPlacement="start"
              control={<Switch checked={checked} onChange={()=>{
                setFormData({...formData, "admin":!formData.admin})
                setChecked(v=>!v)}}/>}
            ></FormControlLabel>
            <TextField 
              label="Admin Password"
              type="password"
              sx={{ flexGrow:1, width:"80%" }}
              margin="dense"
              value={formData.admin_password}
              onChange={(e)=>setFormData({...formData, "admin_password":e.target.value})}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <Button
              type="submit"
              variant="contained"
              disabled={active}
              sx={{ marginTop: "8px"}}
            >
              {submitClicked ? "Sending...": "Submit"}
            </Button><br/><br/>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default AdminNewEmployee