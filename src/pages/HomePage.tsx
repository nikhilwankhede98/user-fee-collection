import React from "react"
import {
    AppBar,
    Box,
    styled,
    Typography,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import home from "../assets/images/homeImg.jpg"


const Homepage = (props) => {

    return (
        <Box height= "calc(100vh - 68px)" sx= {{
            backgroundImage: `url(${home})`, 
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover!important",
        }}>
            <Box display= "flex" justifyContent= "center" pt= {6}>
                <Typography variant= "h3" sx= {{fontWeight: 600}}>
                    User Fee Collection
                </Typography>
            </Box>
        </Box>
    )
}

export default Homepage
