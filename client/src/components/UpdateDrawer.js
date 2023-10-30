import { Box, Button, Drawer } from "@mui/material";
import React, { useState } from "react";

function UpdateDrawer({ open }){
  const [isOpen, setIsOpen] = useState(false)

  if(open){
    setIsOpen(true)
  }

  return(
    <>
      <Drawer 
        anchor="bottom"
        open={isOpen}
        onClose={()=>setIsOpen(false)}
      >
        <Box height={"100%"}>
          <Button onClick={()=>setIsOpen(false)}>
            X
          </Button>
        </Box>
      </Drawer>
    </>
  )
}

export default UpdateDrawer