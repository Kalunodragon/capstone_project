import { Button, Container, Paper, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllEmployees from "./AllEmployees";

function AdminEmployees(){
  const navigate = useNavigate()
  const buttonNames = ["Main", "All", "New"]

  const displayButtons = buttonNames.map((name) =>{
    return(
      <>
        <Button
          style={{ flexGrow:1 }}
          size="large"
          key={name}
          variant="contained" 
          onClick={()=>{
            handleNavigation(name)
          }}
        >{name}
        </Button>
      </>
    )
  })

  useEffect(()=>{
    fetch("/employees")
      .then((res)=>{
        if(res.ok){
          res.json()
          .then((d)=>{
            console.log(d)
          })
        } else {
          res.json()
          .then((d)=>{
            console.log(d)
          })
        }
      })
  }, [])

  function handleNavigation(route){
    switch(route){
      case "All": navigate("all"); break;
      case "New": navigate("new"); break;
      case "Main": navigate("/admin-employees");
    }
  }

  return(
    <>
      <br/>
      <Container align="center" maxWidth="xs">
        <Stack direction="row" spacing={2}>
          {displayButtons}
        </Stack>
      </Container>
      <Routes>
        <Route path="all" element={<AllEmployees />}/>
      </Routes>
    </>
  )
}

export default AdminEmployees