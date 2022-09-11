import React, {useState, useContext} from "react"
import { Typography, Box, FormHelperText, Button } from "@mui/material";
import BorderBox from "../components/BorderBox.tsx"
import { useNavigate } from "react-router-dom";
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"


const CollectFees = (props: any) => {

    let navigate = useNavigate();
    
    const { userInfo, updateUserInfo }: any = useContext(FeeCollectionContext)

    const {userPropertyCode = "RC-UKMS-PT-10054"} = props

    const handlePaymentButtonClick = (paymentOption: any) => {
        switch (paymentOption) {
            case "cash" :
                navigate("/fee-collection")
                return

            case "upi" :
                navigate("/upi-payment")
                return
        }
    }
    
    return (
        <Box pt= {6}>
            {/* <BorderBox text= {`User Property Code : ${userPropertyCode}`}> */}
            <BorderBox text= {`User Property Code : ${userInfo?.propertyCode}`}>
                <Box sx={{ minWidth: 240 }} display= "flex" flexDirection= "column" justifyContent= "center">
                    <Typography sx= {{mb: 3, fontWeight: 600}} align= "center">
                        Pay: ₹ 100
                    </Typography>
                    <Box mb= {3} width= {1}>
                        <Button variant="contained" color="success" fullWidth onClick = {() => handlePaymentButtonClick("cash")} >
                            Cash
                        </Button>
                    </Box>
                    <Box mb= {3} width= {1}>
                        <Button variant="contained" color="info" fullWidth onClick = {() => handlePaymentButtonClick("upi")} >
                            UPI
                        </Button>
                    </Box>
                </Box>
            </BorderBox>
        </Box>
    )
}

export default CollectFees