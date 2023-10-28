import React, { useContext, useState } from "react";
import { employeeContext } from "./App";
import { Alert, Box, Button, Container, Divider, FormControlLabel, Paper, Switch, TextField, Typography } from "@mui/material";

function EditProfile({ onUpdate }){
  const employee = useContext(employeeContext)
  const id = employee.id
  const [checked, setChecked] = useState(false)
  const [active, setActive] = useState(false)
  const [submitClicked, setSubmitClicked] = useState(false)
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  const prefillInfo = {
    "phone_number":employee.phone_number,
    "email":employee.email,
    "password":"",
    "new_password":"",
    "new_password_confirmation":""
  }
  const [editData, setEditData] = useState(prefillInfo)

  const changePassword = <>
    <br/>
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
    /> <br/>
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
  </>

// Have submit button turn on when new pass and conf new pass are added/ off when not added
  if(!checked){
    clearNewPasswords()
    if(editData.phone_number !== "" && editData.email !== "" && editData.password !== "" && !submitClicked){
      if(active) setActive(v=>!v)
    } else {
      if(!active) setActive(v=>!v)
    }
  } else {
    if(editData.phone_number !== "" && editData.email !== "" && editData.password !== "" && editData.new_password !== "" && editData.new_password_confirmation !== "" && !submitClicked){
      if(active) setActive(v=>!v)
    } else {
      if(!active) setActive(v=>!v)
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    setSubmitClicked(v=>!v)
    if(errors) setErrors(null)
    if(success) setSuccess(false)
    let dataToSend
    if(checked){
      dataToSend = {
        "phone_number":editData.phone_number,
        "email":editData.email,
        "password":editData.password,
        "new_password":editData.new_password,
        "new_password_confirmation":editData.new_password_confirmation
      }
    } else {
      dataToSend = {
        "phone_number":editData.phone_number,
        "email":editData.email,
        "password":editData.password
      }
    }
    console.log("Data being sent", dataToSend)
    fetch(`/employees/${id}`,{
      method: "PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(dataToSend)
    })
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
          onUpdate(d)
          setSuccess(true)
          setSubmitClicked(v=>!v)
          setEditData({
            ...editData,
            "phone_number":d.phone_number,
            "email":d.email,
            "password":""
          })
        })
      } else {
        res.json()
        .then((d)=>{
          setErrors(d.errors)
          setSubmitClicked(v=>!v)
          setEditData(prefillInfo)
        })
      }
    })
  }

  function clearNewPasswords(){
    if(editData.new_password !=="" || editData.new_password_confirmation !==""){
      setEditData({...editData,
        "new_password":"",
        "new_password_confirmation":""
      })
    }
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
            {errors ? <Alert className="editAlert" severity="error" variant="filled">{errors}</Alert> : null}
            {success ? <Alert className="editAlert" severity="success" variant="filled">Success - Information updated</Alert> : null}
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
            <TextField 
              label={checked ? "Current Password" : "Password"}
              type="password"
              sx={{ flexGrow:1 }}
              margin="dense"
              value={editData.password}
              onChange={(e)=>setEditData({...editData, "password":e.target.value})}
              required
              size="small"
              autoComplete="off"
            />
            {checked ? changePassword : null}
            <br/><br/>
            <Button
              type="submit"
              variant="contained"
              disabled={active}
            >
              {submitClicked ? "Sending...": "Submit"}
            </Button>
          </Box>
        </Paper>
      </Container> 
    </>
  )
}

export default EditProfile