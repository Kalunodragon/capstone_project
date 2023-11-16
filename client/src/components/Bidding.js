import React, { useEffect, useState } from "react";
import Loading from "./Loading";

function Bidding(){
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    fetch("/schedules")
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
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

  // Check if todays date is within the range of any schedules bid_open/bid_close
    // if yes:
      // if Employee does not have bid submitted for same schedule date ranges show Create Bid button
      // else show Manage button
    // else:
      // Have a info page telling the Employee that there isnt a bid currently open.

  return(
    <>
      
    </>
  )
}

export default Bidding