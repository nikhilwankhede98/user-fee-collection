import React from "react"
import { Typography, Box,} from "@mui/material";
import StyledTable from "../components/StyledTable.tsx"

const AdminPage = (props: any) => {
    return (
        <Box width= {1} pt= {7} pb= {4}>
           <StyledTable isAdmin/> 
        </Box>
    )
}

export default AdminPage