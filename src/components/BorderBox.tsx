import React from "react"
import { Typography, Box, FormHelperText, Button, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const BorderBox = (props: any) => {
    const {hasCustomBackMethod = false, customBackMethod} = props
    let navigate = useNavigate();

    const handleBackArrow = () => {
        if(hasCustomBackMethod) {
            customBackMethod()
        }
        navigate(-1)
    }

    return (
        <Box>
            <Box display= "flex" justifyContent= "flex-start" mb= {2}>
                <IconButton onClick={() => handleBackArrow()}>
                    <ArrowBackIcon />   
                </IconButton>
            </Box>
            <Box py= {2} px= {2} sx= {{borderRadius: "8px"}} display= "flex" flexDirection= "column" justifyContent= "center" alignItems= "center" minHeight= "400px" border= "1px solid green">
                <Typography color= "#27878e" sx= {{fontWeight: 600, fontSize: "20px", fontFamily: "Montserrat", mb: 6}}>
                    {props?.text}
                </Typography>
                {props?.children}
            </Box>
        </Box>
    )
}

export default BorderBox