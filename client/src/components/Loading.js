import React from "react";
import { CircularProgress, Container } from "@mui/material";

function Loading(){

  return(
    <div
      className="loading"
    >
      <CircularProgress
        disableShrink
        size={100}
      />
    </div>
  )
}

export default Loading