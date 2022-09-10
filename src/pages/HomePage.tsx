import React from "react"
import {
    AppBar,
    Box,
    styled,
    Typography,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Homepage = (props) => {
    return (
        <Box height= "calc(100vh - 68px)">
            <Box display= "flex" justifyContent= "center" pt= {5}>
                <Typography>
                    Homepage
                </Typography>
            </Box>
        </Box>
    )
}

export default Homepage
