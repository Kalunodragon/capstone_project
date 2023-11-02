import { Alert, Box, Button, Container, Divider, FormControlLabel, Paper, Switch, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useState } from "react";

function AdminEmployeeUpdate({ employee, setEmployeesState, mainCollapseClick }){
  const {
    id,
    first_name,
    last_name,
    department,
    phone_number,
    email, station,
    seniority_date,
    date_of_birth,
    admin
  } = employee

  const [checked, setChecked] = useState(admin)
  const [active, setActive] = useState(false)
  const [submitClicked, setSubmitClicked] = useState(false)
  const [success, setSuccess] = useState(null)
  const [errors, setErrors] = useState(null)
  const [formData, setFormData] = useState({
    "id":id,
    "first_name":first_name,
    "last_name":last_name,
    "department":department,
    "phone_number":phone_number,
    "email":email,
    "station":station,
    "seniority_date":dayjs(seniority_date).$d,
    "date_of_birth":dayjs(date_of_birth).$d,
    "admin":false,
    "admin_password":""
    })

  const boxColor = (success ? "#66bb6a" : (errors ? "#f44336" : "#f9b612"))

  if(!checked || checked){
    if(formData.first_name !== "" &&
      formData.last_name !== "" &&
      formData.department !== "" &&
      formData.phone_number !== "" &&
      formData.email !== "" &&
      formData.station !== "" &&
      formData.seniority_date !== "" &&
      formData.date_of_birth !== "" &&
      formData.admin_password !== "" &&
      !submitClicked){
      if(active) setActive(v=>!v)
    } else {
      if(!active) setActive(v=>!v)
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    setSubmitClicked(true)
    if(errors) setErrors(null)
    if(success) setSuccess(null)
    console.log(formData)
    fetch(`/employees/${id}`,{
      method: "PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData)
    })
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
          setSuccess(true)
          setEmployeesState("Update",d)
          setFormData({...formData, "admin_password":""})
          setSubmitClicked(false)
          if(d.admin){
            mainCollapseClick(null)
          }
        })
      } else {
        res.json()
        .then((d)=>{
          setErrors(d.errors)
          setFormData({...formData, "admin_password":""})
          setSubmitClicked(false)
        })
      }
    })
  }


  return(
    <>
      <Container align="center" className="adminUpdate">
        <Paper className="adminUpdate" sx={{ backgroundColor: boxColor}}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{backgroundColor:"#fff"}}>
            <br/>
            <Typography variant="h5" align="center">
              Edit Information
            </Typography>
            <Divider />
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
              value={dayjs(formData.seniority_date)}
              onChange={(e)=>setFormData({...formData, "seniority_date":e.$d})}
              sx={{ width:"80%", marginBottom: "12px" }}
            /> <br/>
            <DatePicker 
              label="Date Of Birth"
              required
              value={dayjs(formData.date_of_birth)}
              onChange={(e)=>setFormData({...formData, "date_of_birth":e.$d})}
              sx={{ width:"80%" }}
            /> <br/>
            <FormControlLabel
              label="Switch to Admin"
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
            </Button>
            <br/>
            {errors ? 
              <Alert
                severity="error"
                variant="filled"
                align="center"
                sx={{ margin: "5px", marginTop: "10px"}}
              > {errors}</Alert> :null}
            <br/>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default AdminEmployeeUpdate