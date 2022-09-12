import React from "react";
import { Box } from "@mui/material";

function EmptyRecords({ text = "There are No Records to show" }) {
    return (
        <Box display= "flex" justifyContent= "center">
            <p>{text}</p>
        </Box>
    );
}

export default EmptyRecords;