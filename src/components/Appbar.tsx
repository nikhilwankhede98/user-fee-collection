import React from "react"
import {
    AppBar,
    Box,
    styled,
    Typography,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, Link } from "react-router-dom";

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
                // maxWidth="xl"
                maxWidth="xl"
                sx={{
                    pt: "1.125rem ",
                    pb: "1.125rem",
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
                <a href= "/" style= {{textDecoration: "none", color: "white" }}>
                    <Typography variant= "h5" sx= {{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        Recity
                    </Typography>
                </a>
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