import React, { useState, useEffect } from "react"
import { Typography, Box, FormHelperText, Button } from "@mui/material";
import BorderBox from "../components/BorderBox.tsx"
import QRCode from 'qrcode'

const UPIPaymentViaQr = (props: any) => {

    const {userPropertyCode = "RC-UKMS-PT-10054"} = props

    const [text, setText] = useState<any>("sample text for generating QR")
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
        <Box pt= {4}>
            <BorderBox text= {`User Property Code : ${userPropertyCode}`}>
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