import React, { useContext, useState } from "react";
import { employeeContext } from "./App";
import { Box, Button, Container, Divider, FormControlLabel, Paper, Switch, TextField, Typography } from "@mui/material";

function EditProfile(){
  const employee = useContext(employeeContext)
  const [checked, setChecked] = useState(false)
  const [active, setActive] = useState(false)
  const [editData, setEditData] = useState({
    "phone_number":employee.phone_number,
    "email":employee.email,
    "password":"",
    "new_password":"",
    "new_password_confirmation":""
  })

  const changePassword = <>
    <TextField 
      label="New Password"
      type="password"
      sx={{ flexGrow:1 }}
      margin="dense"
      value={editData.new_password}
      onChange={(e)=>setEditData({...editData, "new_password":e.target.value})}
      required
      size="small"
      autoComplete="off"
    />
    <Divider />
    <TextField 
      label="Confirm New Password"
      type="password"
      sx={{ flexGrow:1 }}
      margin="dense"
      value={editData.new_password_confirmation}
      onChange={(e)=>setEditData({...editData, "new_password_confirmation":e.target.value})}
      required
      size="small"
      autoComplete="off"
    />
    <Divider />
  </>

  if(editData.phone_number !== "" && editData.email !== "" && editData.password !== "" && !checked){
    if(active) setActive(v=>!v)
  } else {
    if(!active) setActive(v=>!v)
  }

  function handleSubmit(e){
    e.preventDefault()

  }
  
  
  // Password section needs a toggle button for changing password
  // If yes then needs old password, new password, confirm new password
    // This needs to check on the backend if the password matches then needs to check
    // if the new password matches the new confim password then change the password
  // If no then only require the password for changing of information

  // This edit page for Admin needs to allow for an employee look up to be able to change
  // Information on other employees accounts such as the Admin, Station, Department, Hire Date, DOB

  return(
    <>
      <Container align="center" className="profile">
        <Paper className="profile">
          <Typography variant="h5" align="left">
            {employee.first_name} {employee.last_name}
          </Typography>
          <Divider />
          <Typography variant="subtitle1" align="left">
            {employee.station} - {employee.admin ? employee.department + " Admin" : employee.department} - E{employee.id}
          </Typography>
        </Paper>
        <Paper className="profile">
          <Box component="form" noValidate onSubmit={handleSubmit} className="editBox">
            <Typography variant="h5" align="center">
              Edit Information
            </Typography>
            <Divider />
            <TextField 
              label="Phone Number"
              sx={{ flexGrow:1 }}
              margin="dense"
              value={editData.phone_number}
              onChange={(e)=>setEditData({...editData, "phone_number":e.target.value})}
              helperText="Format: 1234567890"
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <TextField 
              label="Email"
              sx={{ flexGrow:1 }}
              margin="dense"
              value={editData.email}
              onChange={(e)=>setEditData({...editData, "email":e.target.value})}
              required
              size="small"
              autoComplete="off"
            /> <br />
            <Divider />
            <FormControlLabel
              label="Change Password: No|Yes"
              labelPlacement="start"
              control={<Switch checked={checked} onChange={()=>setChecked(v=>!v)}/>}  
            >
            </FormControlLabel>
            <Divider />
            {checked ? changePassword : null}
            <TextField 
              label="Password"
              type="password"
              sx={{ flexGrow:1 }}
              margin="dense"
              value={editData.password}
              onChange={(e)=>setEditData({...editData, "password":e.target.value})}
              helperText={checked ? "Confirm Old Password" : "Confirm Password"}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <Button
              type="submit"
              variant="contained"
              disabled={active}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container> 
    </>
  )
}

export default EditProfile