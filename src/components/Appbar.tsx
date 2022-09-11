import React from "react"
import {
    AppBar,
    Box,
    styled,
    Typography,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.jpg"


export const APPBAR_HEIGHT = {
    xs: 56,
    lg: 68,
};

let { xs, lg } = APPBAR_HEIGHT;

const StyledMainAppbar = styled(AppBar)(({ theme }) => ({
    borderRadius: "0px",
    height: lg,
    [theme.breakpoints.down("sm")]: {
        height: xs,
    },
}));

const MainAppbar = (props) => {

    return (
        <StyledMainAppbar
            elevation={0}
            position="sticky"
            sx={{
                backgroundColor: "transparent linear-gradient(180deg, #2B2D33 0%, #1C1F2A 100%) 0% 0% no-repeat padding-box;",
            }}
        >
            <Box
                maxWidth="xl"
                sx={{
                    py: {
                        xs: "10px",
                        md: "1.125rem",  
                    },
                    px: {
                        xs: "1rem",
                        md: "2rem",
                    },
                }}
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
                position="relative"
            >
                <Box display= "flex" alignItems= "center" width= {1}>
                    <a href= "/" style= {{textDecoration: "none", color: "white" }}>
                        <Box display= "flex" alignItems= "center" width= {1}>
                            <img src= {logo} alt= "logo" style= {{height: "22px", width: "22px"}} />
                            <Typography variant= "h5" sx= {{
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                    marginLeft: "8px"
                                }}
                            >
                                Recity
                            </Typography>
                        </Box>
                    </a>
                    <Link to="/fee-collection" style={{ textDecoration: 'none', marginLeft: "60px" }}>
                        <Typography variant= "h6" color= "#FFFFFF99" sx= {{fontWeight: 600}}>
                            Collect Fee
                        </Typography>
                    </Link>
                    
                </Box>
                <AccountCircleIcon fontSize="large" sx= {{
                    "&:hover": {
                        cursor: "pointer",
                    },
                }} />
            </Box>
        </StyledMainAppbar>
    )
}

export default MainAppbar