import React, {useState, useContext, useEffect} from "react"
import { Typography, Box, FormHelperText, Button } from "@mui/material";
import SelectInput from "../components/SelectInput.tsx"
import { AREA_LIST } from "../utils/AppConstants"
import { useNavigate } from "react-router-dom";
import BorderBox from "../components/BorderBox.tsx"
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { feeCollectionInfo } from "../lib/apis/index.ts"
import { ToastContainer, toast } from "react-toastify";


const UserAvailable = (props: any) => {

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

    const handlefeeCollectionInfo = async (collectionStatus: any, redirectionRoute) => {
        const response = await feeCollectionInfo({
            ddn: userInfo?.propertyCode,
            propertyStatus: "OPEN",
            collectionStatus: collectionStatus,
            createdPlatform: "User-Services-Web",
            // survey: "5f03f560f302935a63901f63"
            survey: userInfo?.surveyKey,
            area: userInfo?.area,
        })
        console.log("222", response)
        if(response?.data){
            navigate(redirectionRoute)
        }
        else {
            toast.error("Unable to fetch data ~")
        }
    }

    const paymentInfo = (option: any, redirectionRoute: any) => {

        switch (option) {
            case "collect-fees" : 
                navigate(redirectionRoute)
                break;

            case "refused-to-pay" : 
                handlefeeCollectionInfo("REFUSED_TO_PAY", redirectionRoute)
                // const yo = feeCollectionInfo({
                //     ddn: userInfo?.propertyCode,
                //     propertyStatus: "OPEN",
                //     collectionStatus: "REFUSED_TO_PAY",
                //     createdPlatform: "User-Services-Web",
                //     survey: "5f03f560f302935a63901f63"
                // })
                // console.log("yo", yo)
                // navigate(redirectionRoute)
                break;

            case "refused-service" : 
                handlefeeCollectionInfo("REFUSED_TO_AVAIL_SERVICE", redirectionRoute)
                // navigate(redirectionRoute)
                break;

            case "service-to-be-provided" : 
                // navigate(redirectionRoute)
                handlefeeCollectionInfo("SERVICE_TO_BE_PROVIDED", redirectionRoute)
                break;

            default : 
                break
        }
    }

    return (
        <Box pt= {6}>
            {/* <BorderBox text= {`User Property Code : ${userPropertyCode}`}> */}
            <BorderBox text= {`User Property Code : ${userInfo?.propertyCode}`}>
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