import React, {useState, useContext, useEffect} from "react"
import { Typography, Box, FormHelperText, Button } from "@mui/material";
import SelectInput from "../components/SelectInput.tsx"
import BorderBox from "../components/BorderBox.tsx"
import { AREA_LIST } from "../utils/AppConstants"
import { useNavigate } from "react-router-dom";
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { feeCollectionInfo, getAreaConstant } from "../lib/apis/index.ts"
import { ToastContainer, toast } from "react-toastify";


const UserAvailabilityStatus = (props: any) => {

    const { userInfo, updateUserInfo, areaConstant, handleAreaConstant, handleConstantsArray }: any = useContext(FeeCollectionContext)

    console.log("userInfo", userInfo)

    const {userPropertyCode = "RC-UKMS-PT-10054"} = props

    let navigate = useNavigate();

    const [areaList, setAreaList] = useState<any>([])

    const [selectedArea, setSelectedArea] = useState<any>("")
    const [areaHelperText, setAreaHelperText] = useState<any>("")

    useEffect(() => {
        console.log("userInfo?.propertyCode", userInfo, userInfo?.propertyCode, userInfo?.surveyKey)
        if(!userInfo?.propertyCode || !userInfo?.surveyKey) {
            navigate("/fee-collection")
        }
        // navigate("/fee-collection")
    }, [userInfo?.propertyCode, userInfo?.surveyKey])

    const handleOptionChange = (e: any) => {
        let { name, value }: any = e.target;
        setSelectedArea(value)
        if(!value) {
            setAreaHelperText("Please choose your area")
        }
        else {
            // updateUserInfo({area: value})
            setAreaHelperText("")   
        }
    }

    const handlefeeCloseCollection = async (redirectionRoute) => {
        console.log("check", userInfo?.surveyKey, userInfo?.propertyCode)
        if(userInfo?.propertyCode && userInfo?.surveyKey) {
            const response = await feeCollectionInfo({
                ddn: userInfo?.propertyCode,
                propertyStatus: "CLOSED",
                collectionStatus: "N.A",
                createdPlatform: "User-Services-Web",
                // need to send dynamically
                survey: userInfo?.surveyKey,
                area: selectedArea
                // survey: "5f03f560f302935a63901f63"
            })
            console.log("222", response)
            if(response?.data){
                if(response?.message) {
                    toast.success(response?.message)
                }
                updateUserInfo({area: selectedArea})
                navigate(redirectionRoute)
            }
            else {
                toast.error("Unable to fetch data ~")
            }
        }
    }

    const availablityHandler = (option: any, redirectionRoute: any) => {
        if(!selectedArea || selectedArea=== "") {
            setAreaHelperText("Please choose your area")
        }
        else {
            // navigate(redirectionRoute)

            switch(option) {
                case "open" : 
                    updateUserInfo({area: selectedArea})
                    navigate(redirectionRoute)
                    // navigate("/user-available")
                    return
                
                case "closed" :
                    handlefeeCloseCollection(redirectionRoute) 
                    // navigate("/fee-collection")
                    return

                case "revisit" : 
                    updateUserInfo({area: selectedArea})
                    navigate("/revisit")
                    return

                default :
                    break
            }
        }
    }

    const callAreaConstants = async () => {
        const areaResponse = await getAreaConstant()
        console.log("areaConstant", areaResponse)
        if(areaResponse?.success) {
            handleConstantsArray("AREA", areaResponse?.data?.areas)
            setAreaList(areaResponse?.data?.areas)
        }
    }

    useEffect(() => {
        callAreaConstants()
    }, [])

    console.log('areaList', areaList)

    const customBackMethod = () => {
        updateUserInfo({surveyKey: "", propertyCode: ""})
    }

    return (
        <Box pt= {6}>
            {/* <BorderBox text= {`Property Code : ${userPropertyCode}`}> */}
            <BorderBox text= {`Property Code : ${userInfo?.propertyCode}`} hasCustomBackMethod customBackMethod= {customBackMethod}>
                {/* <Box width= {1} >
                <Box width= {1} py= {2}  display= "flex" flexDirection= "column" justifyContent= "center" alignItems= "center" minHeight= "400px" border= "1px solid green"> */}
                    <Box sx={{ minWidth: 240 }} display= "flex" flexDirection= "column" justifyContent= "center">
                        <Box mb= {4} width= {1}>
                            <SelectInput 
                                options= {areaList} 
                                // options={[
                                //     { label: "Active", value: true },
                                //     { label: "Inactive", value: false },
                                // ]}
                                name="status"
                                label="Select Area"
                                value={selectedArea}
                                // labelFormat={(obj: any) => `${obj?.displayName}`}
                                labelFormat={(obj: any) => `${obj?.displayName.slice(2)}`}
                                valueFormat={(obj: any) => obj?.value}
                                onChange={handleOptionChange}
                                required={true}
                                helperText=""
                            />
                            {areaHelperText && areaHelperText!== "" && (
                                // <Typography>
                                //     {areaHelperText}
                                // </Typography>
                                <FormHelperText id="my-helper-text" error>{areaHelperText}</FormHelperText>
                            )}
                        </Box>
                        <Box mb= {3} width= {1}>
                            <Button variant="contained" color="success" fullWidth onClick = {() => availablityHandler("open", "/user-available")} >
                                Open
                            </Button>
                        </Box>
                        <Box mb= {3} width= {1}>
                            <Button variant="contained" color="error" fullWidth onClick = {() => availablityHandler("closed", "/fee-collection")} >
                                Closed
                            </Button>
                        </Box>
                        <Box width= {1}>
                            <Button variant="contained" color="info" fullWidth onClick = {() => availablityHandler("revisit", "/revisit")} >
                                Schedule Revisit
                            </Button>
                        </Box>
                    </Box>
                {/* </Box>
            </Box> */}
            </BorderBox>
        </Box>
    )
}

export default UserAvailabilityStatus