import React, {useState, useContext, useEffect} from "react"
import { Typography, Box, FormHelperText, Button } from "@mui/material";
import SelectInput from "../components/SelectInput.tsx"
import BorderBox from "../components/BorderBox.tsx"
import { AREA_LIST } from "../utils/AppConstants"
import { useNavigate } from "react-router-dom";
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"


const UserAvailabilityStatus = (props: any) => {

    const { userInfo, updateUserInfo }: any = useContext(FeeCollectionContext)

    console.log("userInfo", userInfo)

    const {userPropertyCode = "RC-UKMS-PT-10054"} = props

    let navigate = useNavigate();

    const [selectedArea, setSelectedArea] = useState<any>("")
    const [areaHelperText, setAreaHelperText] = useState<any>("")

    useEffect(() => {
        if(!userInfo?.propertyCode) {
            navigate("/fee-collection")
        }
    }, [userInfo])

    const handleOptionChange = (e: any) => {
        let { name, value }: any = e.target;
        setSelectedArea(value)
        if(!value) {
            setAreaHelperText("Please choose your area")
        }
        else {
            updateUserInfo({area: value})
            setAreaHelperText("")   
        }
    }

    const availablityHandler = (option: any, redirectionRoute: any) => {
        if(!selectedArea || selectedArea=== "") {
            setAreaHelperText("Please choose your area")
        }
        else {
            navigate(redirectionRoute)
            // switch(option) {
            //     case "open" : 
            //         navigate("/user-available")
            //         return
                
            //     case "closed" : 
            //         navigate("/fee-collection")
            //         return

            //     case "revisit" : 
            //         navigate("/revisit")
            //         return

            //     default :
            //         break
            // }
        }
    }

    return (
        <Box pt= {6}>
            {/* <BorderBox text= {`User Property Code : ${userPropertyCode}`}> */}
            <BorderBox text= {`User Property Code : ${userInfo?.propertyCode}`}>
                {/* <Box width= {1} >
                <Box width= {1} py= {2}  display= "flex" flexDirection= "column" justifyContent= "center" alignItems= "center" minHeight= "400px" border= "1px solid green"> */}
                    <Box sx={{ minWidth: 240 }} display= "flex" flexDirection= "column" justifyContent= "center">
                        <Box mb= {4} width= {1}>
                            <SelectInput 
                                options= {AREA_LIST} 
                                // options={[
                                //     { label: "Active", value: true },
                                //     { label: "Inactive", value: false },
                                // ]}
                                name="status"
                                label="Select Area"
                                value={selectedArea}
                                labelFormat={(obj: any) => `${obj?.value}`}
                                valueFormat={(obj: any) => obj?.value}
                                onChange={handleOptionChange}
                                required={true}
                                helperText="Incorrect entry."
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