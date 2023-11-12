import React, { useState } from "react";
import { Box, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

function AdminManageSchedules(){
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(null)
  const [fullWeek, setFullWeek] = useState(true)
  const boxColor = (success ? "#66bb6a" : (errors ? "#f44336" : "#f9b612"))

  return(
    <>
      <Container align="center" className="adminManageUpper">
        <Paper className="adminManageUpper" sx={{ backgroundColor:boxColor }}>
          <Box sx={{ backgroundColor:"#fff", padding:"5px" }}>
            <br/>
            <Typography variant="h5" align="center">
              Schedule Management
            </Typography>
            <Divider />
            <Typography variant="subtitle1" align="center">
              Schedule Date Selection
            </Typography>
            <Stack direction="row" spacing={2} margin={1}>
              <DatePicker 
                label="Schedule Start"
                required
                valueDefault={null}
                sx={{ width:"80%" }}
                />
              <DatePicker 
                label="Schedule End"
                required
                valueDefault={null}
                // value={dayjs(formData.date_of_birth)}
                // onChange={(e)=>setFormData({...formData, "date_of_birth":e.$d})}
                sx={{ width:"80%" }}
              />
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} margin={1}>
              <DatePicker 
                label="Bid Open"
                required
                valueDefault={null}
                sx={{ width:"80%" }}
                />
              <DatePicker 
                label="Bid Close"
                required
                valueDefault={null}
                // value={dayjs(formData.date_of_birth)}
                // onChange={(e)=>setFormData({...formData, "date_of_birth":e.$d})}
                sx={{ width:"80%" }}
              />
            </Stack>
            <Divider />
            <Typography variant="subtitle1" align="center">
              Weekly Schedule Section
            </Typography>
            {fullWeek ?
              <h6>Full week</h6> : <h6>Each day</h6>
            }
          </Box>
        </Paper>
      </Container>
    </>
  )
}

// Create a schedule with ids from shifts
  // schedule must have at least 2 days off
  // once a schedule line is added the add section should move to the bottom
  // Date range should be chosen once then locked in until changed (bid open,close,start_date,end_date)
  // Days can be entered as follows:
    // days off selection and then shift selection?
    // each day selection?
    // Radial toggle for same shifts???
  // schedules can only be added if before the date for the date range of the bid
  // must include number available
  // shifts can show short day names with times directly under
  // shifts selected by dropdown/searchbar???

export default AdminManageSchedules