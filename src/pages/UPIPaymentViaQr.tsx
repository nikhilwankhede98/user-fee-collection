import React, { useState, useEffect, useContext} from "react"
import { Typography, Box, FormHelperText, Button } from "@mui/material";
import BorderBox from "../components/BorderBox.tsx"
import QRCode from 'qrcode'
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { updatePaymentCollectionStatus, getReceiptsPdf } from "../lib/apis/index.ts"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UPIPaymentViaQr = (props: any) => {

    let navigate = useNavigate();

    const {userPropertyCode = "RC-UKMS-PT-10054"} = props

    const { userInfo, updateUserInfo, upiQRCodeUrl }: any = useContext(FeeCollectionContext)

    useEffect(() => {
        console.log("xxx", userInfo?.upiQRCodeUrl, userInfo, userInfo?.amount, userInfo?.feeCollectionId)
        console.log('userInfo?.feeCollectionId', userInfo?.feeCollectionId)
        if(!userInfo?.propertyCode || !userInfo?.surveyKey || !userInfo?.amount || !userInfo?.feeCollectionId) {
            console.log('xxx', !userInfo?.propertyCode || !userInfo?.surveyKey || !userInfo?.amount || userInfo?.feeCollectionId)
            navigate("/fee-collection")
        }
        // navigate("/fee-collection")
    }, [])

    const [text, setText] = useState<any>("NW-PPPP-PT-10054")
    const [imgUrl, setImgUrl] = useState<any>("")

    const generateQRCode = async () => {
        try {
            // const response = await QRCode.toDataURL(text)
            const response = await QRCode.toDataURL(userInfo?.upiQRCodeUrl)
            setImgUrl(response)
            console.log("imgUrl", response)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        generateQRCode()
    }, [])

    const handleConfirmPayment = async () => {
        const response = await updatePaymentCollectionStatus({
            feeCollectionId: userInfo?.feeCollectionId,
            statusPayload : {
                "status":"SUCCESS"
            }
        })
        if(response?.data){
            window.open(`https://universal-code.recity.in/v1/fee-collections/receipts/${response?.data?.feeCollection?._id}`)
            navigate("/fee-collection")
        }
        else {
            toast.error("Unable to fetch data ~")
        }
        console.log("yyy", response)
    }

    console.log("nnn", userInfo)

    return (
        <Box pt= {6}>
            {/* <BorderBox text= {`Property Code : ${userPropertyCode}`}> */}
            <BorderBox text= {`Property Code : ${userInfo?.propertyCode}`}>
                <Box sx={{ minWidth: 240 }} display= "flex" flexDirection= "column" justifyContent= "center">
                    <Typography sx= {{mb: 3, fontWeight: 600}} align= "center">
                        {`Pay: ₹ ${userInfo?.amount}`}
                    </Typography>
                    {imgUrl ? (
                        <Box width= {1}>
                            <Box width= {1} display= "flex" justifyContent= "center" mb= {2}>
                                <a href= {imgUrl} download >
                                    <img src= {imgUrl} alt= "qr-code" />
                                </a>
                            </Box>
                            <Button variant="contained" color="info" fullWidth onClick= {handleConfirmPayment} >
                                Confirm Payment
                            </Button>
                        </Box>
                    ) : null}
                </Box>
            </BorderBox>
        </Box>
    )
}

export default UPIPaymentViaQr