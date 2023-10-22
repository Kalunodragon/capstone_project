import React from "react";
import { CircularProgress } from "@mui/material";

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