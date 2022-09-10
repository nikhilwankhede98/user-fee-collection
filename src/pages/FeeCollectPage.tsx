import React from "react"
import { Typography, Box } from "@mui/material";
import { format} from 'date-fns'
import StyledTable from "../components/StyledTable.tsx"

const FeeCollectPage = (props: any) => {
    return (
        <Box width= {1} pt= {5} pb= {2}>
           <StyledTable /> 
        </Box>
    )
}

export default FeeCollectPage