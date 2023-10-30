import { Container } from "@mui/material";
import React, { useState } from "react";

function AdminEmployeeUpdate({ employee, setEmployeesState }){
  const {
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
  return(
    <>
      <Container align="left">
        
      </Container>
    </>
  )
}

export default AdminEmployeeUpdate