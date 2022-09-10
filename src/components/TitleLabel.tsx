import React from "react"
import { Typography, Box } from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";

const TitleLabel = (props: any) => {
    return (
        <Box display= "flex" alignItems= "center">
            <LabelIcon />
            <Typography variant="subtitle2" align= "center">
                {props?.children}
            </Typography>
        </Box>
    )
}

export default TitleLabel

