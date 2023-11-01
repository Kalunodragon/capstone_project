import { Box, Button, Container, FormControlLabel, Paper, Switch, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function AdminEmployeeRemove({ employee, setEmployeesState }){
  const [active, setActive] = useState(false)
  const [checked, setChecked] = useState(false)
  const [submitClicked, setSubmitClicked] = useState(false)
  const [success, setSuccess] = useState(null)
  const [errors, setErrors] = useState(null)
  const [formData, setFormData] = useState({
    "id":employee.id,
    "admin_password":"",
    "admin_confirm_password":""
  })

  if(!checked || checked){
    if(formData.admin_password !== "" &&
      formData.admin_confirm_password !== "" &&
      checked &&
      !submitClicked){
      if(active) setActive(v=>!v)
    } else {
      if(!active) setActive(v=>!v)
    }
  }

  function handleSubmit(){

  }

  return(
    <>
      <Container align="center" className="adminUpdate">
        <Paper className="adminUpdate" sx={{ backgroundColor: "#f44336"}}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ backgroundColor:"#fff" }}>
            <br/>
            <Typography variant="h5" align="center">
              Remove Employee
            </Typography>
            <Typography variant="subtitle2" align="center" color="#f44336">
              This is a permanent action and can not be undone!
            </Typography>
            <FormControlLabel
              label="Confirm - Remove Employee"
              labelPlacement="start"
              control={<Switch color="error" checked={checked} onChange={()=>setChecked(v=>!v)}/>}
            ></FormControlLabel> <br/>
            <TextField
              label="Admin Password"
              type="password"
              color="error"
              sx={{ flexGrow:1, width:"80%" }}
              margin="dense"
              value={formData.admin_password}
              onChange={(e)=>setFormData({...formData, "admin_password":e.target.value})}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <TextField
              label="Confirm Admin Password"
              type="password"
              color="error"
              sx={{ flexGrow:1, width:"80%" }}
              margin="dense"
              value={formData.admin_confirm_password}
              onChange={(e)=>setFormData({...formData, "admin_confirm_password":e.target.value})}
              required
              size="small"
              autoComplete="off"
            /> <br/>
            <Button
              type="submit"
              variant="contained"
              disabled={active}
              color="error"
              sx={{ marginTop: "8px" }}
            >
              {submitClicked ? "Removing...": "Remove"}
            </Button>
            <br/>

            <br/>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default AdminEmployeeRemove