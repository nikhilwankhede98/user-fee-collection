import React, {useState} from "react"
import { Typography, Box } from "@mui/material";
import { Dna } from  'react-loader-spinner'

const AppLoader = (props: any) => {
    return (
        <Box>
            <Dna
                visible={true}
                height="100"
                width="100"
                
                ariaLabel="dna-loading"
                wrapperStyle={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginLeft: "-50px",
                    marginTop: "-50px"
                }}
                wrapperClass="dna-wrapper"
            />
        </Box>
    )
}

export default AppLoader