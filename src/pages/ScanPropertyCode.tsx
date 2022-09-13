import React, {useState, useContext, useEffect} from "react"
import { Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import QrReader from 'react-qr-scanner'
// import QrReader from 'modern-react-qr-reader'
import BorderBox from "../components/BorderBox.tsx"
import { useNavigate } from "react-router-dom";
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { getPropertyDetails } from "../lib/apis/index.ts"
import { ToastContainer, toast } from "react-toastify";
import audio from "../assets/audio/audio2.mp3"
import {Howl, Howler} from 'howler';
// import logo from "../assets/images/logo.jpg"

const ScanPropertyCode = (props: any) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    let navigate = useNavigate();

    const { userInfo, updateUserInfo, isLoading, handleLoader }: any = useContext(FeeCollectionContext)

    const [delay, setDelay] = useState<any>(500)
    const [result, setResult] = useState<any>('')


    const sound = new Howl({
        src: audio
      });


    const handleScan = async (data: any) => {
        if(data) {
            setResult(data)
            // const propertyDetailResponse = await getPropertyDetails("RC-UKMS-PT-1-000002")
            const propertyDetailResponse = await getPropertyDetails(data)
            if(propertyDetailResponse?.success) {
                sound?.play();
                await updateUserInfo({surveyKey: propertyDetailResponse?.data?._id, ownerName: propertyDetailResponse?.data?.propertyOwnerName, contactNumber: propertyDetailResponse?.data?.contactNumber})
            }
            else {
                toast.error("Unable to fetch data ~")
            }
        }
    }

    const handleNewScan = data => {
        if (data) {
            console.log("data", data)
        }
    }

    const handleNewScan = data => {
        if (data) {
            console.log("data", data)
        }
    }

    useEffect(() => {
        if(result && userInfo?.surveyKey) {
            updateUserInfo({propertyCode: result})
        }
    }, [userInfo?.surveyKey, result])
    
    useEffect(() => {
        if(userInfo?.surveyKey && userInfo?.propertyCode) {
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
                        // style={previewStyle}
                        style={{width: "240px!important"}}
                        onError={handleError}
                        onScan={handleScan}
                        // onScan={handleNewScan}
                        facingMode={"environment"}
                        // constraints={ {facingMode: 'environment!important'} }
                    />
                </Box>
            </BorderBox>
        </Box>
    )
}

export default ScanPropertyCode