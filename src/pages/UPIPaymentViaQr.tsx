import React, { useState, useEffect, useContext} from "react"
import { Typography, Box, FormHelperText, Button } from "@mui/material";
import BorderBox from "../components/BorderBox.tsx"
import QRCode from 'qrcode'
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { useNavigate } from "react-router-dom";

const UPIPaymentViaQr = (props: any) => {

    let navigate = useNavigate();

    const {userPropertyCode = "RC-UKMS-PT-10054"} = props

    const { userInfo, updateUserInfo }: any = useContext(FeeCollectionContext)

    useEffect(() => {
        console.log("userInfo?.propertyCode", userInfo, userInfo?.propertyCode, userInfo?.surveyKey)
        if(!userInfo?.propertyCode || !userInfo?.surveyKey) {
            navigate("/fee-collection")
        }
        // navigate("/fee-collection")
    }, [])

    const [text, setText] = useState<any>("NW-PPPP-PT-10054")
    const [imgUrl, setImgUrl] = useState<any>("")

    const generateQRCode = async () => {
        try {
            const response = await QRCode.toDataURL(text)
            setImgUrl(response)
            console.log("imgUrl", response)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        generateQRCode()
    }, [])

    return (
        <Box pt= {6}>
            {/* <BorderBox text= {`User Property Code : ${userPropertyCode}`}> */}
            <BorderBox text= {`User Property Code : ${userInfo?.propertyCode}`}>
                <Box sx={{ minWidth: 240 }} display= "flex" flexDirection= "column" justifyContent= "center">
                    <Typography sx= {{mb: 3, fontWeight: 600}} align= "center">
                        Pay: ₹ 100
                    </Typography>
                    {imgUrl ? (
                        <Box width= {1} display= "flex" justifyContent= "center">
                            <a href= {imgUrl} download >
                                <img src= {imgUrl} alt= "qr-code" />
                            </a>
                        </Box>
                    ) : null}
                </Box>
            </BorderBox>
        </Box>
    )
}

export default UPIPaymentViaQr