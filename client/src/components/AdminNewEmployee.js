import React, { useState } from "react";
import { Alert, Box, Button, Container, Divider, FormControlLabel, IconButton, Paper, Switch, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import RestorePageIcon from '@mui/icons-material/RestorePage';
import CloseIcon from '@mui/icons-material/Close';


function AdminNewEmployee({ setEmployeesState }){
  const [submitClicked, setSubmitClicked] = useState(false)
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  const [active, setActive] = useState(false)
  const [checked, setChecked] = useState(false)
  const boxColor = (success ? "#66bb6a" : (errors ? "#f44336" : "#f9b612"))
  const blankForm = {
    "first_name":"",
    "last_name":"",
    "department":"",
    "phone_number":"",
    "email":"",
    "station":"",
    "seniority_date": null,
    "date_of_birth": null,
    "admin": false,
    "password": ""
  }
  const [formData, setFormData] = useState(blankForm)
  const formEmpty = (formData.first_name === "" &&
  formData.last_name === "" &&
  formData.department === "" &&
  formData.email === "" &&
  formData.station === "" &&
  formData.password === "") ? true : false

  if(!checked || checked){
    if(formData.first_name !== "" &&
      formData.last_name !== "" &&
      formData.department !== "" &&
      formData.email !== "" &&
      formData.station !== "" &&
      formData.seniority_date !== null &&
      formData.date_of_birth !== null &&
      formData.password !== "" &&
      !submitClicked){
        if(active) setActive(v=>!v)
      } else {
        if(!active) setActive(v=>!v)
      }
  }

  function handleClear(){
    setFormData(blankForm)
  }

  function handleSubmit(e){
    e.preventDefault()
    console.log(formData)
    setSubmitClicked(true)
    if(errors) setErrors(null)
    if(success) setSuccess(null)
    fetch("/employees",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData)
    })
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
          setEmployeesState("New",d)
          handleClear()
          setSuccess(true)
          setSubmitClicked(false)
        })
      } else {
        res.json()
        .then((d)=>{
          setErrors(d.errors)
          setSubmitClicked(false)
        })
      }
    })
  }

  return(
    <>
      <Container align="center" className="adminNew">
        <Paper className="adminNew" sx={{ backgroundColor: boxColor}}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{backgroundColor:"#fff"}}>
            <br/>
            <Typography variant="h5" align="center">
              Register New Employee
              {!formEmpty ? 
                <Button
                  onClick={()=>handleClear()}
                  size="small"
                  color="error"
                  title="Reset Form"
                  variant="contained"
                  endIcon={<RestorePageIcon />}
                  sx={{ margin:"10px" }}
                >
                  Reset form
                </Button> : null}
              </Typography>
            <Divider />
            {errors ? <>
              <Alert severity="error" align="center" variant="filled" sx={{ margin: "5px" }}>{errors}</Alert>
              <Divider />
            </> : null}
            {success ? <>
              <Alert
                severity="success"
                align="center"
                variant="filled"
                onClose={()=>setSuccess(null)}
                sx={{ margin: "5px" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={()=> setSuccess(null)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                } 
              >Success - Employee Account Created</Alert>
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
              value={formData.password}
              onChange={(e)=>setFormData({...formData, "password":e.target.value})}
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