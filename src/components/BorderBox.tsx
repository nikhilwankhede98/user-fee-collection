import React from "react"
import { Typography, Box, FormHelperText, Button } from "@mui/material";

const BorderBox = (props: any) => {
    return (
        <Box width= {1}>
            <Box width= {1} py= {2}  display= "flex" flexDirection= "column" justifyContent= "center" alignItems= "center" minHeight= "400px" border= "1px solid green">
                <Typography color= "#27878e" sx= {{fontWeight: 600, fontSize: "20px", fontFamily: "Montserrat", mb: 6}}>
                    {props?.text}
                </Typography>
                {props?.children}
            </Box>
        </Box>
    )
}

export default BorderBox