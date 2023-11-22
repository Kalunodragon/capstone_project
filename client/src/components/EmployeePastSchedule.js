import React, { useEffect, useState } from "react";
import Loading from "./Loading"

function EmployeePastSchedule({ scheduleArray }){
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    fetch("/bids")
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{

          console.log(d)
          setLoading(true)
        })
      } else {
        res.json()
        .then((d)=>{

          setLoading(true)
        })
      }
    })
  },[])

  if(!loading){
    return(
      <Loading />
    )
  }

  return(
    <h1>PAST COMP TEST</h1>
  )
}

export default EmployeePastSchedule