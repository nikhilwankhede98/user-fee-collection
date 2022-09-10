import React from "react"
import { Typography, Box,} from "@mui/material";
import StyledTable from "../components/StyledTable.tsx"

const AdminPage = (props: any) => {
    return (
        <Box width= {1} pt= {5} pb= {2}>
           <StyledTable isAdmin/> 
        </Box>
    )
}

export default AdminPage