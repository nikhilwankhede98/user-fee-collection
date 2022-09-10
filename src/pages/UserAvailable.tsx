import React, {useState} from "react"
import { Typography, Box, FormHelperText, Button } from "@mui/material";
import SelectInput from "../components/SelectInput.tsx"
import { AREA_LIST } from "../utils/AppConstants"
import { useNavigate } from "react-router-dom";
import BorderBox from "../components/BorderBox.tsx"

const UserAvailable = (props: any) => {

    let navigate = useNavigate();
    const {userPropertyCode = "RC-UKMS-PT-10054"} = props

    const paymentInfo = (option: any, redirectionRoute: any) => {
        
        switch (option) {
            case "collect-fees" : 
                navigate(redirectionRoute)
                break;

            case "refused-to-pay" : 
                navigate(redirectionRoute)
                break;

            case "refused-service" : 
                navigate(redirectionRoute)
                break;

            case "service-to-be-provided" : 
                navigate(redirectionRoute)
                break;

            default : 
                break
        }
    }

    return (
        <Box pt= {4}>
            <BorderBox text= {`User Property Code : ${userPropertyCode}`}>
                {/* <Typography color= "#27878e" sx= {{fontWeight: 600, fontSize: "20px", fontFamily: "Montserrat", mb: 6}}>
                    {`User Property Code : ${userPropertyCode}`} 
                </Typography> */}
                <Box sx={{ minWidth: 240 }} display= "flex" flexDirection= "column" justifyContent= "center">
                    <Box mb= {3} width= {1}>
                        <Button variant="contained" color="success" fullWidth onClick = {() => paymentInfo("collect-fees", "/collect-fees")} >
                            Collect Fees
                        </Button>
                    </Box>
                    <Box mb= {3} width= {1}>
                        <Button variant="contained" color="error" fullWidth onClick = {() => paymentInfo("refused-to-pay", "/fee-collection")} >
                            Refused to Pay
                        </Button>
                    </Box>
                    <Box mb= {3} width= {1}>
                        <Button variant="contained" color="info" fullWidth onClick = {() => paymentInfo("refused-service", "/fee-collection")} >
                            Refused to avail service
                        </Button>
                    </Box>
                    <Box  width= {1}>
                        <Button variant="contained" color="warning" fullWidth onClick = {() => paymentInfo("service-to-be-provided", "/fee-collection")} >
                            Service to be provided
                        </Button>
                    </Box>
                </Box>
            </BorderBox>
        </Box>
    )
}

export default UserAvailable