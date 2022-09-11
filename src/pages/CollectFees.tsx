import React, {useState, useContext, useEffect} from "react"
import { Typography, Box, FormHelperText, Button, TextField } from "@mui/material";
import BorderBox from "../components/BorderBox.tsx"
import { useNavigate } from "react-router-dom";
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { feeCollectionInfo } from "../lib/apis/index.ts"
import { ToastContainer, toast } from "react-toastify";

const CollectFees = (props: any) => {

    let navigate = useNavigate();
    
    const { userInfo, updateUserInfo }: any = useContext(FeeCollectionContext)

    const {userPropertyCode = "RC-UKMS-PT-10054"} = props

    const [enteredAmount, setEnteredAmount] = useState<any>("")
    const [helperText, setHelperText] = useState<any>("")

    useEffect(() => {
        console.log("userInfo?.propertyCode", userInfo, userInfo?.propertyCode, userInfo?.surveyKey)
        if(!userInfo?.propertyCode || !userInfo?.surveyKey) {
            navigate("/fee-collection")
        }
        // navigate("/fee-collection")
    }, [])

    const handlePayment = async (paymentOption: any, redirectionRoute: any) => {
        const response = await feeCollectionInfo({
            ddn: userInfo?.propertyCode,
            propertyStatus: "OPEN",
            collectionStatus: "CURRENT",
            createdPlatform: "User-Services-Web",
            survey: userInfo?.surveyKey,
            // survey: "5f03f560f302935a63901f63",
            amount:"30.00",
            type:paymentOption
        })
        console.log("333", response)
        if(response?.data){
            navigate(redirectionRoute)
        }
        else {
            toast.error("Unable to fetch data ~")
        }
    }

    // const handlePaymentButtonClick = (paymentOption: any) => {
    //     switch (paymentOption) {
    //         case "cash" :
    //             navigate("/fee-collection")
    //             return

    //         case "upi" :
    //             navigate("/upi-payment")
    //             return
    //     }
    // }

    const handleAmountChange = (e: any) => {
        console.log("amount", e)
        const {value, name} = e?.target
        setEnteredAmount(value)
        if(!value) {
            setHelperText("Please enter an amount") 
        }
        else setHelperText("") 
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
                        <TextField 
                            InputLabelProps={{
                                style: { color: "#f2a17e" }
                            }}
                            fullWidth 
                            id="outlined-basic" 
                            label="Enter Amount" 
                            variant="outlined" 
                            size= "small" 
                            sx={{ input: { color: "#27878E" }}}
                            value= {enteredAmount}
                            onChange= {(e) =>handleAmountChange(e)}
                            type="number"
                            // helperText={helperText || ""}
                        />
                            {helperText && helperText!== "" && (
                                // <Typography>
                                //     {areaHelperText}
                                // </Typography>
                                <FormHelperText id="my-helper-text" error>{helperText}</FormHelperText>
                            )}
                    </Box>
                    <Box mb= {3} width= {1}>
                        <Button variant="contained" color="success" fullWidth onClick = {() => handlePayment("CASH", "/fee-collection")} >
                            Cash
                        </Button>
                    </Box>
                    <Box mb= {3} width= {1}>
                        <Button variant="contained" color="info" fullWidth onClick = {() => handlePayment("UPI", "/upi-payment")} >
                            UPI
                        </Button>
                    </Box>
                </Box>
            </BorderBox>
        </Box>
    )
}

export default CollectFees