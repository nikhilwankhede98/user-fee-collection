import React, {useState, useContext, useEffect} from "react"
import { Typography, Box, FormHelperText, Button, TextField } from "@mui/material";
import BorderBox from "../components/BorderBox.tsx"
import { useNavigate } from "react-router-dom";
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { feeCollectionInfo } from "../lib/apis/index.ts"
import { ToastContainer, toast } from "react-toastify";

const CollectFees = (props: any) => {

    let navigate = useNavigate();
    
    const { userInfo, updateUserInfo, area }: any = useContext(FeeCollectionContext)

    const {userPropertyCode = "RC-UKMS-PT-10054"} = props

    const [feeCollectionId, setFeeCollectionId] = useState<any>("")
    const [upiQRCodeUrl, setUpiQRCodeUrl] = useState<any>("")

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
        if(!enteredAmount || enteredAmount === "") {
            setHelperText("Please enter an amount") 
        }
        else {
            const response = await feeCollectionInfo({
            ddn: userInfo?.propertyCode,
            propertyStatus: "OPEN",
            collectionStatus: "CURRENT",
            createdPlatform: "User-Services-Web",
            survey: userInfo?.surveyKey,
            // survey: "5f03f560f302935a63901f63",
            // amount:"30.00",
            area: userInfo?.area,
            amount: parseFloat(enteredAmount).toFixed(2).toString(),
            type:paymentOption
            })
            console.log("hnh", response, response?.data?.feeCollection?._id)
            if(response?.data){
                // updateUserInfo({amount: parseFloat(enteredAmount).toFixed(2).toString()})
                if(paymentOption === "UPI") {
                    console.log("hnh", response?.data?.feeCollection?._id)
                    setFeeCollectionId(response?.data?.feeCollection?._id)
                    // setUpiQRCodeUrl(response?.data?.payment?.data?.url)
                    updateUserInfo({upiQRCodeUrl: response?.data?.payment?.data?.url})
                    // updateUserInfo({feeCollectionId: response?.data?.feeCollection?._id})
                    // updateUserInfo({upiQRCodeUrl: response?.data?.payment?.data?.url})
                }
                else {
                    // updateUserInfo({amount: parseFloat(enteredAmount).toFixed(2).toString()})
                    navigate(redirectionRoute)
                }
                // navigate(redirectionRoute)

            }
            else {
                toast.error("Unable to fetch data ~")
            }
        }
    }

    useEffect(() => {
        if(upiQRCodeUrl) {
            console.log('upiQRCodeUrl', upiQRCodeUrl)
            updateUserInfo({upiQRCodeUrl: upiQRCodeUrl})
        }
    }, [upiQRCodeUrl])

    useEffect(() => {
        if(feeCollectionId) {
            console.log("hnh", feeCollectionId, userInfo?.feeCollectionId)
            updateUserInfo({feeCollectionId: feeCollectionId})
        }
    }, [feeCollectionId])

    useEffect(() => {
        console.log("hnh", userInfo?.upiQRCodeUrl, parseFloat(enteredAmount).toFixed(2).toString())
        if(enteredAmount) {
            updateUserInfo({amount: parseFloat(enteredAmount).toFixed(2).toString()})
        }
    }, [userInfo?.upiQRCodeUrl, userInfo?.feeCollectionId])

    useEffect(() => {
        console.log("hnh", userInfo?.upiQRCodeUrl)
    }, [userInfo?.upiQRCodeUrl])

    useEffect(() => {
        console.log("hnh", userInfo?.feeCollectionId, userInfo?.amount, userInfo?.feeCollectionId, userInfo?.upiQRCodeUrl, userInfo?.amount!== "", userInfo?.feeCollectionId!== "")
        if(userInfo?.amount!== "" && userInfo?.feeCollectionId!== "" && userInfo?.upiQRCodeUrl!== "") {
            alert("dfsdsf")
            console.log("hnh", userInfo?.amount, userInfo?.feeCollectionId, userInfo?.upiQRCodeUrl)
            navigate("/upi-payment")
        }
    }, [userInfo?.amount, userInfo?.feeCollectionId, userInfo?.upiQRCodeUrl])

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
                    {/* <Typography sx= {{mb: 3, fontWeight: 600}} align= "center">
                        Pay: ₹ 100
                    </Typography> */}
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