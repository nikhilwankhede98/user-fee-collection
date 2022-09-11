import React, {useState, useContext, useEffect} from "react"
import { Typography, Box } from "@mui/material";
import QrReader from 'react-qr-scanner'
import BorderBox from "../components/BorderBox.tsx"
import { useNavigate } from "react-router-dom";
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { getPropertyDetails } from "../lib/apis/index.ts"
import { ToastContainer, toast } from "react-toastify";

const ScanPropertyCode = (props: any) => {

    let navigate = useNavigate();

    const { userInfo, updateUserInfo }: any = useContext(FeeCollectionContext)

    const [delay, setDelay] = useState<any>(500)
    const [result, setResult] = useState<any>('')

    const handleScan = async (data: any) => {
        console.log("scanned", data)
        if(data) {
            setResult(data?.text)
            if(data?.text) {
                const propertyDetailResponse = await getPropertyDetails("RC-UKMS-PT-1-000002")
                if(propertyDetailResponse?.success) {
                    await updateUserInfo({surveyKey: propertyDetailResponse?.data?._id})
                }
                console.log("propertyDetailResponse", propertyDetailResponse)
            }
        }
    }

    useEffect(() => {
        if(result && userInfo?.surveyKey) {
            updateUserInfo({propertyCode: result})
        }
    }, [userInfo?.surveyKey, result])
    
    useEffect(() => {
        if(userInfo?.surveyKey && userInfo?.propertyCode) {
            console.log("check", userInfo?.surveyKey, userInfo?.propertyCode)
            navigate("/user-availablity-status")
        }
    }, [userInfo?.surveyKey, userInfo?.propertyCode])


    const handleError = (err) => {
        console.error(err)
        toast.error(err)
    }

    const previewStyle = {
        height: 240,
        width: 320,
        video: { 
            facingMode: "environment" 
        }
      }

    return (
        <Box width= {1} pt= {6}>
            <BorderBox >
                <Box sx={{ minWidth: 240 }} display= "flex" flexDirection= "column" justifyContent= "center">
                    <Typography color= "#27878e" align= "center" sx= {{fontWeight: 600, fontSize: "20px", fontFamily: "Montserrat", mb: 4}}>
                        Scan QR to verify property info
                    </Typography>
                    <QrReader
                        delay={500}
                        style={previewStyle}
                        onError={handleError}
                        onScan={handleScan}
                    />
                </Box>
            </BorderBox>
        </Box>
    )
}

export default ScanPropertyCode