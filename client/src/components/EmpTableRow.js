import React, { useState } from "react";
import { Box, Button, ButtonGroup, Collapse, Divider, Drawer, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function EmpTableRow({ empData, index, employee }){
  const [open, setOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [removeOpen, setRemoveOpen] = useState(false)

  return(
    <>
      <TableRow
        key={empData.key}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>
          <IconButton
            align="left"
            aria-label="More info"
            size="small"
            onClick={()=>setOpen(v=>!v)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="left">
          {empData.key}
        </TableCell>
        <TableCell align="right">
          {empData.value}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} width="100%">
              <Typography variant="h5" component="div">
                {employee.first_name + " " + employee.last_name}
              </Typography>
              <Box sx={{ padding: 1 }}>
                <Typography variant="subtitle1" align="left">
                  {employee.employee_number}
                </Typography>
                <Divider />
                <Typography variant="subtitle2" align="left">
                  Phone number: {employee.phone_number}
                </Typography>
                <Divider />
                <Typography variant="subtitle2" align="left">
                  Email: {employee.email}
                </Typography>
                <Divider />
                <Typography variant="subtitle2" align="left">
                  Hire Date: {employee.seniority_date}
                </Typography>
                <Divider />
                <Typography variant="subtitle2" align="left">
                  Date of Birth: {employee.date_of_birth}
                </Typography>
                <Divider />
                <Box align="center">
                  <ButtonGroup align="center" variant="contained">
                    <Button onClick={()=>setUpdateOpen(true)}>
                      Edit
                    </Button>
                    <Button>
                      Remove
                    </Button>
                  </ButtonGroup>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Drawer 
        anchor="bottom"
        open={updateOpen}
        onClose={()=>setUpdateOpen(false)}
      >
        <Box height={"91.75vh"}>

        </Box>
      </Drawer>
      <Drawer 
        anchor="bottom"
        open={removeOpen}
        onClose={()=>setRemoveOpen(false)}
      >
        <Box height={"91.75vh"}>

        </Box>
      </Drawer>
    </>
  )
}

// Create icon buttons for edit and remove

export default EmpTableRow